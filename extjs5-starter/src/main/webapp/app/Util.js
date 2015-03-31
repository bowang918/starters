Ext.define('App.Util', {
	singleton: true,

	successToast: function(msg) {
		Ext.toast({
			html: msg,
			title: i18n.successful,
			shadow: true,
			width: 200,
			slideInDuration: 100,
			hideDuration: 100,
			bodyStyle: {
				background: 'lime',
				textAlign: 'center',
				fontWeight: 'bold'
			}
		});
	},

	errorToast: function(msg) {
		Ext.toast({
			html: msg,
			title: i18n.error,
			shadow: true,
			width: 200,
			slideInDuration: 100,
			hideDuration: 100,
			bodyStyle: {
				background: 'red',
				color: 'white',
				textAlign: 'center',
				fontWeight: 'bold'
			}
		});
	},
	
	underline: function(str, c) {
		var pos = str.indexOf(c);
		if (pos !== -1) {
			return str.substring(0, pos) + '<u>' + c + '</u>' + str.substring(pos+1);
		}
		return str;
	}

});