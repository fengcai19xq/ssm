package spring.demo.springmvc.business.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import spring.demo.springmvc.business.model.User;

import com.zhaogang.saturn.dal.mybatis.page.Page;

public interface UserMapper {
    int deleteByPrimaryKey(Long pkid);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Long pkid);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
    
    List<User> queryList(@Param("map")Map<String, Object> map, @Param("page")Page page) ;
	
	int queryPageCount(@Param("map")Map<String, Object> map);
	
	
}