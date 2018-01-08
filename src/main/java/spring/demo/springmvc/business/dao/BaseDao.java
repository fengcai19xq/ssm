package spring.demo.springmvc.business.dao;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseDao extends SqlSessionDaoSupport{

	    @Autowired(required = true)
	    public  void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
	           super.setSqlSessionFactory(sqlSessionFactory);
	    }
}
