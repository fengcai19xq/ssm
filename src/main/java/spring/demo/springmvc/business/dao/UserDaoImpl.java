package spring.demo.springmvc.business.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import spring.demo.springmvc.business.model.User;

import com.zhaogang.saturn.dal.mybatis.page.Page;
@Repository
public class UserDaoImpl extends BaseDao  implements IUserDao{

	private static final String NAMESPACESTR = "spring.demo.springmvc.business.mapper.UserMapper.";
	
	public void addUser(User user) {
		
		getSqlSession().insert(NAMESPACESTR+"insertSelective", user);
		
	}
	
	public List<User> queryList(Map<String, Object> map, Page page) {
		// TODO Auto-generated method stub
		RowBounds rowBounds = new RowBounds(page.getCurrentPage(), page.getPageSize());
		
		List<User> list = getSqlSession().selectList(NAMESPACESTR+"queryList2", map, rowBounds);
		
		return list;
	}
	public int queryPageCount(Map<String, Object> map) {
		// TODO Auto-generated method stub
		
		int count =getSqlSession().selectOne(NAMESPACESTR+"queryPageCount2", map);
		
		return  count ;
		}
	public void delUser(Long pkid) {
		// TODO Auto-generated method stub
		
		getSqlSession().delete(NAMESPACESTR+"deleteByPrimaryKey", pkid);
		
	}

	public void modifyUser(User user) {
		// TODO Auto-generated method stub
		
		getSqlSession().update(NAMESPACESTR+"updateByPrimaryKeySelective", user);
		
	}

}
