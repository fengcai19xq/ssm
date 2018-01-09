package spring.demo.springmvc.business.biz;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhaogang.saturn.dal.mybatis.page.Page;

import spring.demo.springmvc.business.dto.UserDto;
import spring.demo.springmvc.business.mapper.UserMapper;
import spring.demo.springmvc.business.model.User;

@Service("userMapperBiz")
public class UserBiz implements IUser{

	@Autowired
	UserMapper userMapper ;
	
	public void addUser(UserDto userDto) {
		// TODO Auto-generated method stub
		User user = new User() ;
		user.setUserId(userDto.getUserId());
		user.setUserName(userDto.getUserName());
		user.setAddedBy(999999L);
		user.setAddedName("管理员");
		String validStart = userDto.getValidStart();
		String validEnd = userDto.getValidEnd();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			if(StringUtils.isNotBlank(validStart)){
				user.setValidStart(sdf.parse(validStart));
			}
			if(StringUtils.isNotBlank(validEnd)){
				user.setValidEnd(sdf.parse(validEnd));
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		userMapper.insertSelective(user) ;
	}

	public List<User> queryList(Map<String, Object> map, Page page) {
		// TODO Auto-generated method stub
		List<User> list = null ;
		try {
			list = userMapper.queryList(map,page);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list ;
	}

	public int queryPageCount(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return userMapper.queryPageCount(map);
	}

	public void delUser(Long pkid) {
		// TODO Auto-generated method stub
		userMapper.deleteByPrimaryKey(pkid) ;
	}

	public void modifyUser(UserDto userDto) {
		// TODO Auto-generated method stub
		User user = new User() ;
		user.setPkid(userDto.getPkid());
		user.setUserName(userDto.getUserName());
		user.setLastModifiedBy(999999L);
		user.setLastModifiedName("管理员");
		String validStart = userDto.getValidStart();
		String validEnd = userDto.getValidEnd();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			if(StringUtils.isNotBlank(validStart)){
				user.setValidStart(sdf.parse(validStart));
			}
			if(StringUtils.isNotBlank(validEnd)){
				user.setValidEnd(sdf.parse(validEnd));
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		userMapper.updateByPrimaryKeySelective(user) ;
	}

	
}
