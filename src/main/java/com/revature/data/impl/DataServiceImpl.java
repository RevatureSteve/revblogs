package com.revature.data.impl;

import java.util.List;

import org.hibernate.Session;
import org.springframework.stereotype.Service;

import com.revature.beans.Blog;
import com.revature.beans.Evidence;
import com.revature.beans.Tags;
import com.revature.beans.User;
import com.revature.beans.UserRoles;
import com.revature.data.DAO;
import com.revature.data.DataService;

@Service
public class DataServiceImpl implements DataService{

	private DAO dao;

	public void setDao(DAO dao) {
		this.dao = dao;
	}
	public Session grabSession(){
		return dao.getSession();
	}
	
	// Push
	public void makeRecord(Object _obj){
		dao.insertRecord(_obj);
	}
	
	// Pull
	public User grabUsers(String _username){
		return dao.getUsers(_username);
	}
	
	public List<User> grabUsers(){
		return dao.getUsers();
	}
	public List<Blog> grabBlogs(){
		return dao.getBlogs();
	}
	public List<Tags> grabTags(){
		return dao.getTags();
	}
	public List<UserRoles> grabRoles(){
		return dao.getRoles();
	}
	public List<Evidence> grabEvidence(){
		return dao.getEvidence();
	}
}
