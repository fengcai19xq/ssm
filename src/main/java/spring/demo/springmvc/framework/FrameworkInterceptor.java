package spring.demo.springmvc.framework;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class FrameworkInterceptor implements HandlerInterceptor{


    Logger logger=LoggerFactory.getLogger(FrameworkInterceptor.class);
    

   /* (non-Javadoc)
    * @see org.springframework.web.servlet.HandlerInterceptor#preHandle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object)
    */
   public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
       // TODO Auto-generated method stub
       logger.info("进入FrameworkInterceptor拦截器preHandle方法,当前线程："+Thread.currentThread()+",时间："+System.currentTimeMillis());
       logger.info("请求url路径为："+request.getRequestURL());
       request.setAttribute("css", request.getContextPath()+"/static/css");
       request.setAttribute("js",  request.getContextPath()+"/static/js");
       request.setAttribute("img",  request.getContextPath()+"/static/img");
       request.setAttribute("fonts",  request.getContextPath()+"/static/fonts");
       request.setAttribute("bootstrap", request.getContextPath()+"/static/bootstrap");
       request.setAttribute("projectName", request.getContextPath());
       return true ;
   }
   
   /* (non-Javadoc)
    * @see org.springframework.web.servlet.HandlerInterceptor#postHandle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object, org.springframework.web.servlet.ModelAndView)
    */
   public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
           ModelAndView modelAndView) throws Exception {
       // TODO Auto-generated method stub
       
   }

   /* (non-Javadoc)
    * @see org.springframework.web.servlet.HandlerInterceptor#afterCompletion(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object, java.lang.Exception)
    */
   public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
           throws Exception {
       // TODO Auto-generated method stub
       logger.info("进入FrameworkInterceptor拦截器afterCompletion方法,当前线程："+Thread.currentThread()+",时间："+System.currentTimeMillis());
   }

}
