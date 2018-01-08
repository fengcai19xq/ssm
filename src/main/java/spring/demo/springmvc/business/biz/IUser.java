package spring.demo.springmvc.business.biz;

import java.util.List;
import java.util.Map;

import spring.demo.springmvc.business.dto.UserDto;
import spring.demo.springmvc.business.model.User;

import com.zhaogang.saturn.dal.mybatis.page.Page;

public interface IUser {

	public List<User> queryList(Map<String, Object> map, Page page) ;
	
	public void addUser(UserDto userDto) ;
	
	public void modifyUser(UserDto userDto) ;
	
	public int queryPageCount(Map<String, Object> map);
	
	void delUser(Long pkid);
}
