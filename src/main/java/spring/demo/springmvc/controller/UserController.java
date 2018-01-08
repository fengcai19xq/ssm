package spring.demo.springmvc.controller;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import oracle.net.aso.p;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import spring.demo.springmvc.business.biz.IUser;
import spring.demo.springmvc.business.dto.ResponseDto;
import spring.demo.springmvc.business.dto.UserDto;
import spring.demo.springmvc.business.model.User;

import com.zhaogang.saturn.dal.mybatis.page.Page;
/**
 * 用户管理
 * @author qian.xu
 *
 */
@Controller
@RequestMapping("/user")
public class UserController {

    Logger logger=LoggerFactory.getLogger(UserController.class);

	@Resource(name="userMapperBiz")
	IUser userBiz ;
	
	@RequestMapping("/query")
    public ModelAndView queryPageEnterpriseList(HttpServletRequest request) {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("user/userlist");
        return mv;
    }
	/**
	 * 查询列表
	 * @return
	 */
	@RequestMapping("/queryList")
	@ResponseBody
	public Map<String, Object> queryList(HttpServletRequest request,Page page){
		Map<String, Object> responseMap = new HashMap<String, Object>() ;
		Map<String,Object> params = getParameterMap(request);	
		Object Status = params.get("Status");
		params.put("Status",
				Status==null || "".equals(Status)  || "0".equals(Status) ? null : String.valueOf(Status).split(","));
		int count = userBiz.queryPageCount(params);//总记录数
		page.setTotalCount(count);
		List<User> list = userBiz.queryList(params,page);
		responseMap.put("data", list);
		responseMap.put("recordsTotal", count);
		responseMap.put("recordsFiltered", count);
		responseMap.putAll(params);
		return responseMap ;
	}
	
	/**
	 * 新增用户
	 * @param user
	 * @return
	 */
	@RequestMapping(value="/addUser",method=RequestMethod.POST)
	@ResponseBody
	public ResponseDto addUser(UserDto user){		
		ResponseDto response = new ResponseDto();
		try{			
			 userBiz.addUser(user);
			 response.setResCode(ResponseDto.SUCCESS);
		}catch(Exception e){
			 logger.error("新增用户异常",e);  
			 response.setResCode(ResponseDto.ERROR);
			 response.setResMsg(e.getMessage());
		}
		return response;
	}
	
	/**
	 * 修改用户
	 * @param user
	 * @return
	 */
	@RequestMapping(value="/modifyUser",method=RequestMethod.POST)
	@ResponseBody
	public ResponseDto modifyUser(UserDto user) {
		ResponseDto response = new ResponseDto();
		try{			
			 userBiz.modifyUser(user);
			 response.setResCode(ResponseDto.SUCCESS);
		}catch(Exception e){
			 logger.error("修改用户异常",e);  
			 response.setResCode(ResponseDto.ERROR);
			 response.setResMsg(e.getMessage());
		}
		return response;
	}
	
	@RequestMapping("/delUser")
	@ResponseBody
	public ResponseDto delUser(Long pkid){
		ResponseDto response = new ResponseDto();
		try{			
			 userBiz.delUser(pkid);
			 response.setResCode(ResponseDto.SUCCESS);
		}catch(Exception e){
			 logger.error("删除用户异常",e);  
			 response.setResCode(ResponseDto.ERROR);
			 response.setResMsg(e.getMessage());
		}
		return response ;
	}
	
	
	 /**
		 * 从request中获得参数Map，并返回可读的Map
		 * 
		 * @param request
		 * @return
		 */
		@SuppressWarnings("unchecked")
		public  Map getParameterMap(HttpServletRequest request) {
			// 参数Map
			Map properties = request.getParameterMap();
			// 返回值Map
			Map returnMap = new HashMap();
			Iterator entries = properties.entrySet().iterator();
			Map.Entry entry;
			String name = "";
			String value = "";
			while (entries.hasNext()) {
				entry = (Map.Entry) entries.next();
				name = (String) entry.getKey();
				Object valueObj = entry.getValue();
				if (null == valueObj) {
					value = "";
				} else if (valueObj instanceof String[]) {
					String[] values = (String[]) valueObj;
					for (int i = 0; i < values.length; i++) {
						value = StringUtils.trim(values[i]) + ",";
					}
					value = value.substring(0, value.length() - 1);
				} else {
					value = StringUtils.trim(valueObj.toString());
				}
				returnMap.put(name, value);
			}
			return returnMap;
		}
}
