Ext.define('App.view.main.SideBar', {
	extend : 'Ext.tree.Panel',
	xtype : 'appSideBar',
	title : i18n.navigation,
	collapsible : true,
	width : 250,
	minWidth : 250,
	maxWidth : 320,
	border : true,
	rootVisible : false,
	animate : false,
	viewConfig : {
		scroll : false
	},
	bind : '{navigationStore}',
	listeners : {
		selectionchange : 'onNavigationTreeSelectionchange'
	},
	icon :'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABa1BMVEUAAAD/fz/iaCXgZibgZyf/fwDgZSjfZyTbZiXYZSffZSb/VQDhZiXfZSaxWixEREBEREDaZinhZSbhZybMZjNEREDdZSWFUzNEREBEREBEREDdYyHhZybfZSREREBEREDdZifIYSrhZiXhZyREREDKYirAXyvgZybdZSfBXyrLYircZibEYSq0XC3dZybiZibaZSWqXC+pZD/gZSbhZyTgZyXfaCTgZSfdZSfQYyfKYipQSDzgZSa8XyvhZybNYimJWijhZSTfZSbOYSfXYSp/f29/eW6FeW6Lc3N3WFe2Xy7MYSnPYynbZiqZZmZ/f3SCfHGId3eBem+Ce27/AAC9XyvcZid/f3+Bem9+d2uBeW6Aem+Ce29/em1xbmJhYVlOTkt/f3+EenGAe2+Bem59dWx4cmqBeG57dmx9dmx+d2yCe2+BenCAe2+Ce2+Cem+Bem6AeW5vb2bgZybcZifRYynhZybfZybOYynyzNVcAAAAc3RSTlMABFiYVAIZy9/dyQPMzjoUEi7QzwUB7i4fGgMX8FoCCZ+knZsKtZCFqJy8vJNe/khPWQfi+Yc4Oo374BxkcMbNBSPx9CkQLhcLCF/9/lgFGC8PbrQBdXgCuW5Fzq5kQykVBDZlsdBJGlBziZWYmZWFbEognWqqBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAANlJREFUGNNjYAABRiZmZhZWBjhgYy/m4CzhYoPxuXl4+fgFBIWERRgYREECTGLiEpJSDNIysgxy8iABBUUQn4FBSVlKQAVIy6mqgfkM6hqS/EAVogKaWmA+g7aOhADQDHl+XT19EN+g1FBSDkirCBgZm5iamVtYWlmDVcrLMdiUlZWVl1bYQnQCdbHagfj2DginOjqVVji7QDmubu4enl7ePr5+Hv4BgaIMQcEhDFKSEqFhIMnwiEiGqOiY2Lj4BDmGRPek5JTUNKBwekZmVnZObl5+QWGRijwAeEQkjf0hPYcAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMDUtMjlUMDE6MDk6MzAtMDU6MDBfnjnvAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTA1LTI5VDAxOjA5OjMwLTA1OjAwLsOBUwAAAABJRU5ErkJggg=='
});