package spring.demo.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HelloWorldController {

	/**
	 * 1、@RequestMapping除了修饰方法，还可以修饰类
	 * 2、
	 * ①类定义处：提供初步的请求映射信息，相当于WEB应用的根目录
	 * ②方法处：提供进一步的细分映射信息，相当于类定义出的URL。若类定义处未标注@RequestMapping，则方法处标记的URL相当于WEB应用的根目录
	 * 使用Method 属性来指定请求方式
	 * @return
	 */
	@RequestMapping(value="/helloworld",method =RequestMethod.GET)
	public ModelAndView helloWorld(){
		ModelAndView modelandview = new ModelAndView();
		modelandview.addObject("message", "这是我第一个SpringMVC例子");
		modelandview.setViewName("helloworld");
		return modelandview ;
	}
}
