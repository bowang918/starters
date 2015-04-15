/**
 * 
 */
package com.seven7.nav;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.concurrent.atomic.AtomicInteger;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.Builder;

import com.seven7.hierarchy.Node;

/**
 * @author FANFAN
 *
 */
public final class Menu implements Node {

	private final static AtomicInteger ID_GENERATOR = new AtomicInteger(0);

	private final int id = ID_GENERATOR.getAndIncrement();

	private final String text;

	private final String view;
	
	private final String icon;

	private final boolean leaf;

	//always expand
	private final boolean expanded = true;
	
	private final Collection<Menu> children;

	private Menu(String text, Collection<Menu> children) {
		super();
		this.text = text;
		@SuppressWarnings("unchecked")
		Collection<Menu> temp = CollectionUtils.unmodifiableCollection(new HashSet<Menu>(children));
		this.children = temp;
		this.view = StringUtils.EMPTY;
		this.icon = StringUtils.EMPTY;
		this.leaf = false;
	}

	private Menu(String text, String view) {
		super();
		this.text = text;
		this.view = view;
		this.leaf = true;
		this.icon = StringUtils.EMPTY;
		this.children = Collections.emptyList();
	}

	public Menu(MenuBuilder builder) {
		this.text = builder.getText();
		this.icon = builder.getIcon();
		@SuppressWarnings("unchecked")
		Collection<Menu> children = CollectionUtils.unmodifiableCollection(builder.getChildren());
		this.children = children;
		this.leaf = CollectionUtils.isEmpty(getChildren());
		this.view = builder.getView();
	}

	@Override
	public int getId() {
		return this.id;
	}

	@Override
	public String getText() {
		return this.text;
	}

	@Override
	public Collection<? extends Node> getChildren() {
		return this.children;
	}

	/**
	 * @return the view
	 */
	public String getView() {
		return view;
	}

	public String getIcon() {
		return icon;
	}

	/**
	 * @return the leaf
	 */
	public boolean isLeaf() {
		return leaf;
	}

	/**
	 * @return the expanded
	 */
	public boolean isExpanded() {
		return expanded;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((children == null) ? 0 : children.hashCode());
		result = prime * result + (expanded ? 1231 : 1237);
		result = prime * result + id;
		result = prime * result + (leaf ? 1231 : 1237);
		result = prime * result + ((text == null) ? 0 : text.hashCode());
		result = prime * result + ((view == null) ? 0 : view.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (!(obj instanceof Menu)) {
			return false;
		}
		Menu other = (Menu) obj;
		if (children == null) {
			if (other.children != null) {
				return false;
			}
		} else if (!children.equals(other.children)) {
			return false;
		}
		if (expanded != other.expanded) {
			return false;
		}
		if (id != other.id) {
			return false;
		}
		if (leaf != other.leaf) {
			return false;
		}
		if (text == null) {
			if (other.text != null) {
				return false;
			}
		} else if (!text.equals(other.text)) {
			return false;
		}
		if (view == null) {
			if (other.view != null) {
				return false;
			}
		} else if (!view.equals(other.view)) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "Menu [id=" + id + ", text=" + text + ", view=" + view
				+ ", leaf=" + leaf + ", expanded=" + expanded + ", children="
				+ StringUtils.join(children, ",") + "]";
	}

	public static Menu newInstance(String text, String view) {
		return new Menu(text, view);
	}
	
	public static Menu newInstance(String text, Menu first) {
		return new Menu(text, Arrays.asList(first));
	}
	
	public static Menu newInstance(String text, Menu first, Menu second) {
		return new Menu(text, Arrays.asList(first, second));
	}
	
	public static Menu newInstance(String text, Menu first, Menu... rest) {
		Collection<Menu> menus = new HashSet<Menu>(Arrays.asList(first));
		menus.addAll(Arrays.asList(rest));
		return new Menu(text, menus);
	}
	
	public static class MenuBuilder implements Builder<Menu>{
		
		private String text;
		
		private String view;
		
		private String icon;
		
		private Collection<Menu> children = new HashSet<>();
		
		@Override
		public Menu build() {
			return new Menu(this);
		}

		public MenuBuilder text(String text) {
			this.text = text;
			return this;
		}

		public MenuBuilder view(String view) {
			this.view = view;
			return this;
		}

		public MenuBuilder icon(String icon) {
			this.icon = icon;
			return this;
		}
		
		public MenuBuilder addChild(Menu first) {
			this.children.add(first);
			return this;
		}
		
		public MenuBuilder addChildren(Menu first, Menu... rest) {
			this.children.add(first);
			this.children.addAll(Arrays.asList(rest));
			return this;
		}

		public String getText() {
			return text;
		}

		public String getView() {
			return view;
		}

		public String getIcon() {
			return icon;
		}

		public Collection<Menu> getChildren() {
			return children;
		}
		
	}

}
