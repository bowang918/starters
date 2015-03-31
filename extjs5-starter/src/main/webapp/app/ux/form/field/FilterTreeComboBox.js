/**
 * Server side filtering , need to use Hierarchy or its children as store 
 * .x-tree-node-text-disable {
 * 			font-style:italic;
 * 			color : gray;
 * 		}
 * 
 * Usage:
 ***********************************************************************
 *                                 multiSelect          checkEnabled
 *********************************************************************** 
 * Single select without check box  false                false
 * Single select within check box   false                true
 * Sulti select within check box    true                 true
 * 
 */
Ext.define('App.ux.form.field.FilterTreeComboBox', {
	extend : 'Ext.form.field.Picker',
	requires : [ 'Ext.data.StoreManager' ],
	alternateClassName : 'Ext.form.FilterTreeCombo',
	mixins : [ 'Ext.util.StoreHolder' ],
	alias : 'widget.filtertreecombobox',
	displayField : 'text',
	valueField : 'id',
	matchFieldWidth : true,
	onlyLeafSelected : true,
	multiSelect : false,
	checkEnabled : false, 
	defaultRootSelected : false,
	renderIdWithText : false,
	//Keydown input field event. This event only fires if enableKeyEvents is set to true.
	enableKeyEvents : true,
	modelAssignmentDefaults : '',
//	allowBlank : false,
	toolTip : 'To Search in Hierarchy, type and hit Enter',
	initComponent : function() {
		var me = this;
		Ext.apply(me, {
					fieldLabel : me.fieldLabel,
					labelWidth : me.labelWidth,
					width : me.width,
					pickerAlign : 'tl'
				});
		//me.addEvents('groupSelected');
		me.callParent(arguments);
	},

	createPicker : function() {
		this.initPicker();
		return this.picker;
	},
	isValid : function() {
        var me = this, disabled = me.disabled, validate = me.forceValidation || !disabled;
        validate = validate ? me.validateValue(me.processRawValue(me.getRawValue())): disabled;
        return validate && !me.allowBlank ? App.StringUtils.isNotBlank(me.getValue())&& App.StringUtils.isNotBlank(me.getSelectedValue()):validate; 
    },

	initPicker : function() {
		var me = this;
		var columns = [];
		if (me.renderIdWithText) {
			columns = [{
				xtype : 'treecolumn',
				flex : 1,
				renderer : function(val, meta, record, rowIndex, colIndex , store) {
					var value = record.get(me.valueField) + ' - ' + record.get(me.displayField);
					if(false ===record.raw.enabled){
						meta.tdAttr = "data-qtip='Not Entitled To'";
						return Ext.String.format('<span class="x-tree-node-text-disable x-tree-node-text">{0}</span>', value);
					}
					return value;
					
				}
			}];
		} else {
			columns = [{
						xtype : 'treecolumn',
						dataIndex : me.displayField,
						flex : 1,
						renderer : function(val, meta, record, rowIndex, colIndex , store) {
							var value = record.get(me.displayField);
							if(false ===record.raw.enabled){
								meta.tdAttr = "data-qtip='Not Entitled To'";
								return Ext.String.format('<span class="x-tree-node-text-disable x-tree-node-text">{0}</span>', value);
							}
							return value;
						}
					}];
		}
		//me.picker = new Ext.tree.Panel({
		me.picker = Ext.create('Ext.tree.Panel',{
					width : '100%',
					height : 400,
					autoScroll : true,
					floating : true,
					resizable : false,
					focusOnToFront : false,
					shadow : true,
					ownerCt : this.ownerCt,
					displayField : me.displayField,
					useArrows : false,
					store : me.store,
					//selModel:'MULTI',
					root : me.root,
					rootVisible : false,
					hideHeaders : true,
					columns : columns,
					listeners : {
						scope : this,
						itemexpand : function(node, eOpts) {
							if (me.picker&&me.picker.getEl()) {
								me.picker.getEl().unmask();
							}
						},
						itemclick : this.itemClick,
						checkchange:this.checkchange,
						load : function(panel, node, records, successful, eOpts) {
							if (me.defaultRootSelected && !Ext.isEmpty(records)&& !Ext.isEmpty(records[0])&&records[0].raw.enabled) {
								me.defaultRootSelected = false;
								if(me.multiSelect){
									me.valueIds.add(record[0].get(me.valueField), record[0].get(me.valueField));
								}else{
									me.valueId = records[0].get(me.valueField);
								}
								if (me.renderIdWithText) {
									me.setValue(records[0].get(me.valueField)+ ' - ' + records[0].get(me.displayField));
								} else {
									me.setValue(records[0].get(me.displayField));
								}
								if(me.modelAssignmentDefaults && me.modelAssignmentDefaults == 'balance_acct'){
									treasuryrubyweb.Utils.setTPAccountDefaults(me.valueField);
								}
							}
						}
					}
				});
		me.store.on({
					scope : this,
					beforeload : function() {
						if(me.picker.getEl()){
							me.picker.getEl().mask("Loading", 'x-mask-loading');
						}
					}
				});
	},

	alignPicker : function() {
		// override the original method because otherwise the height of the treepanel would be always 0
		var me = this, picker, isAbove, aboveSfx = '-above';
		if (this.isExpanded) {
			picker = me.getPicker();
			if (me.matchFieldWidth) {
				// Auto the height (it will be constrained by min and max width) unless there are no records to display.
				if (me.bodyEl.getWidth() > this.treeWidth) {
					picker.setWidth(me.bodyEl.getWidth());
				} else
					picker.setWidth(this.treeWidth);
			}
			if (picker.isFloating()) {
				picker.alignTo(me.inputEl, '', me.pickerOffset);// ''->tl
				// add the {openCls}-above class if the picker was aligned above the field due to hitting the bottom of the viewport
				isAbove = picker.el.getY() < me.inputEl.getY();
				me.bodyEl[isAbove ? 'addCls' : 'removeCls'](me.openCls + aboveSfx);
				picker.el[isAbove ? 'addCls' : 'removeCls'](picker.baseCls + aboveSfx);
			}
		}
	},
	/*
	 * valueSelected : function(picker, value, options) { var flag =
	 * this.onlyLeafSelected ? value.data.leaf : true; if (flag) {
	 * this.setValue(value.data.text); this.collapse(); //closes the tree panel. } },
	 */
	itemClick : function(view, record, item, index, e, eOpts) {
		var me = this, flag = me.onlyLeafSelected ? record.get('leaf') : true;
		if (flag&&!me.multiSelect && !me.checkEnabled&&false !=record.raw.enabled) {
			if (me.renderIdWithText) {
				me.setValue(record.get(me.valueField) + ' - ' + record.get(me.displayField));
			} else {
				me.setValue(record.get(me.displayField));
			}
			me.valueId = record.get(me.valueField);
			me.collapse(); // closes the tree panel.
//			me.getPicker().collapseAll();
			if(me.modelAssignmentDefaults && me.modelAssignmentDefaults == 'balance_acct'){
				treasuryrubyweb.Utils.setTPAccountDefaults(record.get(me.valueField));
			}
		}
	},
	checkchange : function( record, checked, eOpts ){
		var me = this, flag = me.onlyLeafSelected ? record.get('leaf') : true;
		if (flag&&false !=record.raw.enabled) {
			if (me.multiSelect) {

				var values = new Ext.util.HashMap();
				if (me.getValue()) {
					me.getValue().split(',').forEach(function(element) {
								values.add(element,element);
							});
				}

				var value = me.renderIdWithText?record.get(me.valueField) + ' - ' + record.get(me.displayField) : record.get(me.displayField);

				me.valueIds = me.valueIds ? me.valueIds : new Ext.util.HashMap();
				if (checked) {
					me.valueIds.add(record.get(me.valueField), record.get(me.valueField));
					values.add(value, value);
				} else {
					me.valueIds.removeAtKey(record.get(me.valueField));
					values.removeAtKey(value);
				}
				me.setValue(values.getKeys().join(','));
			} else {
				if(checked){
					var records = me.getPicker().getView().getChecked();
					Ext.each(records,function(n){
						if(n.get(me.valueField)!=record.get(me.valueField)){
							n.set('checked',false);
						}
					});
					if (me.renderIdWithText) {
					me.setValue(record.get(me.valueField) + ' - ' + record.get(me.displayField));
					} else {
						me.setValue(record.get(me.displayField));
					}
					me.valueId = record.get(me.valueField);
				} else {
					me.setValue('');
					me.valueId = '';
				}
				me.collapse(); // closes the tree panel.
//				me.getPicker().collapseAll();
			}
		}else if(checked){
			record.set('checked',false);
		}
	},
	getSelectedValue : function() {
		var me = this;
		if (me.multiSelect||App.StringUtils.isNotBlank(me.getValue())) {
			return me.multiSelect&&me.valueIds ? me.valueIds.getKeys().join(',') : me.valueId;
		}
		return '';

	},
	listeners : {
		keydown : function(me, e, eOpts) {
			var value = me.getValue();
			if (App.StringUtils.isNotBlank(value)&& e && e.keyCode == Ext.EventObject.ENTER) {
				var picker, store;
				picker = me.getPicker();
				store = picker.getStore();
				var rn_0 = store.getRootNode().getChildAt(0);
				if (rn_0 && rn_0.isExpanded()) {
					picker.collapseAll(function() {
								var dimType = store.getDimType();

								store.setDimType(dimType);
								store.setDesc(value);
								if(me.multiSelect){
									store.setSelectedValue(me.getSelectedValue());
								}
								store.load({
											callback : me.filterBack
										});
							});
				} else {
					var dimType = store.getDimType();

					store.setDimType(dimType);
					store.setDesc(value);
					if(me.multiSelect){
						store.setSelectedValue(me.getSelectedValue());
					}
					store.load({
								callback : me.filterBack
							});
				}
			}
		},
		blur:function(me , e, eOpts){
			var value = me.getValue();
			if(me.allowBlank == false){
				if(me.valueId==undefined){
					me.markInvalid('Please select value from dropdown or type and hit enter');
				}
				if(me.modelAssignmentDefaults && me.modelAssignmentDefaults == 'tp_acct'){
					if(!(me.valueId == 199999 || me.valueId == 299999)){
						// as of now, leave as it is
						me.markInvalid('Please select either 199999 - TP Assets (L2) or 299999 - TP Liabilities (L2)');
					}else{
					}
				}
				
				if(me.modelAssignmentDefaults && me.modelAssignmentDefaults == 'tp_rate_acct'){
					if(!(me.valueId == 418210 || me.valueId == 422110)){
						// as of now, leave as it is
						me.markInvalid('Please select either 418210 - Transfer Pricing Term Revenue L6 or 422110 - Transfer Pricing Term Expense L6');
					}else{
					}
				}
			}
		},
		change : function(me, newValue, oldValue, eOpts) {
			if (!newValue || App.StringUtils.isBlank(newValue)) {
				me.valueId = undefined;
				var picker, store;
				picker = me.getPicker();
				store = picker.getStore();
				var dimType = store.getDimType();

				store.setDimType(dimType);
				store.setDesc(newValue);
				if(me.multiSelect){
					store.setSelectedValue(me.getSelectedValue());
				}
				store.load({
							callback : function(records, operation, success) {
								if(picker.getEl()){
									picker.getEl().unmask();
								}
							}
						});
			}
		},
		afterrender : function(me, eOpts) {
			if (me.toolTip) {
				Ext.create('Ext.tip.ToolTip', {
							target : me.getEl(),
							html : me.toolTip
						});
			}
			if(me.defaultRootSelected){
				me.getPicker().getStore().load();
			}
		},
		focus : function(me, event, eOpts) {
	        if (!me.readOnly && !me.disabled) {
	            if (!me.isExpanded) {
	            	me.onTriggerClick();
	            }
	        }
		}
	},
	filterBack : function(records, operation, success) {
		var me = this, picker = me.ownerTree;
		if(picker&&picker.getEl()){
			picker.getEl().unmask();
		}
		// count the nodes
	
		var nodesCount = 0;
		picker.getRootNode().cascadeBy(function(node) {
					nodesCount++;
				});
		var rn_0 = picker.getRootNode().getChildAt(0);
		if (nodesCount < 115) {
			picker.expandAll();
		} else if (rn_0) {
			picker.expandNode(rn_0, false);
		}
	},
	getDescription : function(children, id){
		children.eachChild(function(child , id){
			if(child.internalId == id){
				return child.data.desc;
			}else{
				if(child.hasChildNodes){
					return this.getDescription(child, id);
				}
			}
		});

    },
	setSelectedItem : function(value){
		var me = this;
		var picker, store;
		picker = me.getPicker();
		store = picker.getStore();
		var rn_0 = store.getRootNode().getChildAt(0);
		if (rn_0 && rn_0.isExpanded()) {
			picker.collapseAll(function() {
				var dimType = store.getDimType();
				store.setDimType(dimType);
				store.setDesc(value);
				if(me.multiSelect){
					store.setSelectedValue(me.getSelectedValue());
				}
				store.load({
					callback : me.filterBack
				});
			});
		} else {
			var dimType = store.getDimType();
			store.setDimType(dimType);
			store.setDesc(value);
			if(me.multiSelect){
				store.setSelectedValue(me.getSelectedValue());
			}
			store.load({
				callback : me.filterBack
			});
		}
	},
	setValueId : function(valueId, desc){
		var me = this;
		var picker, store;
		picker = me.getPicker();
		store = picker.getStore();
		var dimType = store.getDimType();
		store.setDimType(dimType);
		store.setSelectedValue(valueId);
		var desc = store.getDesc(valueId);		
		if('' != desc){
			store.setDescription
		}
		console.log(desc);
		console.log(store);
		console.log(picker.getRootNode());
		//var a =  this.getDescription(picker.getRootNode(), '1033');
		//console.log(a);
//		store.load({
//			callback : me.filterBack
//		});
	}
	
});