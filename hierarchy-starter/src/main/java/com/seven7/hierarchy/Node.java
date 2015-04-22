package com.seven7.hierarchy;

import java.util.Collection;

public interface Node {

	static final String ROOT = "root";

	/**
	 * 
	 * @return
	 */
	int getId();

	/**
	 * 
	 * @return
	 */
	String getText();

	/**
	 * 
	 * @return
	 */
	Collection<? extends Node> getChildren();

}
