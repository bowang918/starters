package com.seven7.starter.controller;

import java.util.Collection;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;
import ch.ralscha.extdirectspring.annotation.ExtDirectMethodType;

@Controller
public class SecurityController {
	
	@ExtDirectMethod
	public String getLoggedOnUser(){
		return SecurityContextHolder.getContext().getAuthentication().getName();
	}
	
	@ExtDirectMethod(value=ExtDirectMethodType.FORM_LOAD)
	public Collection<String> getUserRoles(){
		@SuppressWarnings("unchecked")
		Collection<String> roleNames = CollectionUtils.EMPTY_COLLECTION;
		return roleNames;
	}
}
