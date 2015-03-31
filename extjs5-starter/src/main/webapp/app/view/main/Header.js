Ext.define('App.view.main.Header', {
	extend : 'Ext.container.Container',
	xtype : 'appHeader',
	cls : 'appHeader',
	layout : {
		type : 'hbox',
		align : 'stretch'
	},
	defaults : {
		margin: '2 0 3 0',
	},
	height :32,
	items : [ {
		html : i18n.app_title,
		cls : 'appHeaderTitle'
	}, {
		xtype : 'tbspacer',
		flex : 1
	} ,{
	    xtype: 'button',
	    text: i18n.settings,
		glyph: 0xe809,
	    menu: {
	    	plain: true,
	    	items: [{
	    		xtype:'form',
	    		width : 210,
	    		fieldDefaults: {
	    			labelAlign: 'left',
	    			labelWith : 90,
					width : 210,
					padding : '0 0 0 5',
					cls : 'x-form-item-label-bold'
	    	    },
	    		items:[{
	                xtype: 'datefield',   
	                name: 'AS_OF_DATE',
	                fieldLabel: i18n.as_of_date,
	                allowBlank : false,
	                bind: {
	                	value: '{environment.asOfDate}'
	        		}
	            }, {
	                xtype: 'textfield',   
	                editable : false,
	                name: 'ENV',
	                bind: {
	                	value: '{environment.name}'
	        		},
	                fieldLabel: i18n.environment
	            }],
	            buttons:[{
	            	text : i18n.save
	            }]
	    	}]
	    }
	}, {
		xtype: 'button',
		bind: {
			text: '{loggedOnUser.soeId}'
		},
		glyph :59403
//		menu: {
//			items: [ {
//				text: i18n.logout,
//				glyph: 0xe802,
//				href: 'logout',
//				hrefTarget: '_self'
//			} ]
//		}
	} ]
});