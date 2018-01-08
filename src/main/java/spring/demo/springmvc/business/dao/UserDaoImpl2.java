package spring.demo.springmvc.business.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import spring.demo.springmvc.business.model.User;

import com.zhaogang.saturn.dal.mybatis.page.Page;
@Repository("userDaoImpl2")
public class UserDaoImpl2 implements IUserDao {

private static final String NAMESPACESTR = "spring.demo.springmvc.business.mapper.UserMapper.";
	
	@Autowired
	 private SqlSessionFactory sqlSessionFactory; 
	
	public void addUser(User user) {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.insert(NAMESPACESTR+"insertSelective", user);
		sqlSession.commit();
		sqlSession.close();
	}
	
	public List<User> queryList(Map<String, Object> map, Page page) {
		// TODO Auto-generated method stub
		RowBounds rowBounds = new RowBounds(page.getCurrentPage(), page.getPageSize());
		SqlSession sqlSession = sqlSessionFactory.openSession();
		List<User> list = sqlSession.selectList(NAMESPACESTR+"queryList2", map, rowBounds);
		sqlSession.close();
		return list;
	}
	public int queryPageCount(Map<String, Object> map) {
		// TODO Auto-generated method stub
		SqlSession sqlSession = sqlSessionFactory.openSession();
		int count =sqlSession.selectOne(NAMESPACESTR+"queryPageCount2", map);
		sqlSession.close();
		return  count ;
		}
	public void delUser(Long pkid) {
		// TODO Auto-generated method stub
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.delete(NAMESPACESTR+"deleteByPrimaryKey", pkid);
		sqlSession.close();
	}

	public void modifyUser(User user) {
		// TODO Auto-generated method stub
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.update(NAMESPACESTR+"updateByPrimaryKeySelective", user);
		sqlSession.close();
	}
}
