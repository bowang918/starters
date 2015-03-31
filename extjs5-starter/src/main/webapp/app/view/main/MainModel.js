Ext.define('App.view.main.MainModel', {
	extend : 'Ext.app.ViewModel',
	loggedOnUser : {
		soeId :''
	},
	stores : {
		navigationStore : {
			type : 'tree',
			root: {
		        expanded: true,
		        children: [
		            { text: "detention", leaf: true },
		            { text: "homework", expanded: true, children: [
		                { text: "book report", leaf: true },
		                { text: "algebra", leaf: true}
		            ] },
		            { text: "buy lottery tickets", leaf: true }
		        ]
		    },
//			proxy : {
//				type : 'direct',
//				directFn : 'navigationController.getNavigation'
//			},
			listeners : {
				load : 'onNavigationStoreLoad'
			}
		},

		environment:{
			asOfDate : new Date(),
			datasetId : '1',
			name :'SIT4',
		}
	}
});