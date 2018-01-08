package spring.demo.springmvc.business.dao;

import java.util.List;
import java.util.Map;

import spring.demo.springmvc.business.model.User;

import com.zhaogang.saturn.dal.mybatis.page.Page;

public interface IUserDao { 

	public List<User> queryList(Map<String, Object> map, Page page);
	public void addUser(User user) ;
	public void modifyUser(User user) ;
	public int queryPageCount(Map<String, Object> map);
	public void delUser(Long pkid);
}
