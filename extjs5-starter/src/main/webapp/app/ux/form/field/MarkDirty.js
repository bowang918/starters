Ext.define('App.ux.form.field.MarkDirty', {	
	
	alias : 'plugin.markdirty',

	dirtyCls : 'x-form-field-dirty',

	textField : null,

	// ///////////////////////////////////////////////////////////////////////////////////////////////////
	//
	// Set up and tear down
	//
	// ///////////////////////////////////////////////////////////////////////////////////////////////////

	constructor : function(cfg) {
		Ext.apply(this, cfg);

		this.callParent(arguments);
	},

	/**
	 * Called by plug-in system to initialize the plugin for a specific text
	 * field (or text area, combo box, date field). Most all the setup is
	 * delayed until the component is rendered.
	 */
	init : function(textField) {
		this.textField = textField;
		if (textField) {
			textField.on('dirtychange', this.updateDirtyMark, this);
		}else{
			console.log('MarkDirty initialized failed.');
		}
	},
	//dummy method
	show : function(){
		
	},
	// dummy method
	hide : function(){
		
	},

	/**
	 * Called after any event that may influence the clear button visibility.
	 */
	updateDirtyMark : function() {
		var dirty = this.textField && this.textField.isDirty();
		if(dirty&&!this.textField.hasCls(this.dirtyCls)){
			this.textField.addCls(this.dirtyCls);
		}else if(!dirty&&this.textField.hasCls(this.dirtyCls)){
			this.textField.removeCls(this.dirtyCls);
		}
	}
});
