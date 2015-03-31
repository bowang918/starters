Ext.define('App.StringUtils', {
	singleton : true,
	isBlank : function(value){
		return Ext.isEmpty(value ? (Ext.isString(value) ? Ext.String.trim(value) : Ext.String.trim(Ext.toString(value))):value);
	},
	isNotBlank : function(value){
		return !this.isBlank(value);
	}
});