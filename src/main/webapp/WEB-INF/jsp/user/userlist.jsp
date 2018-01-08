<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Demo</title>
  <link rel="stylesheet" type="text/css" href="${bootstrap}/css/bootstrap.css?v=${v}"/>
    <link rel="stylesheet" href="${css}/53b24d91.public.min.css?v=${v}">
    <link rel="stylesheet" type="text/css" href="${css}/jquery-ui.css?v=${v}"/>
    <link rel="stylesheet" type="text/css" href="${css}/finance.css?v=${v}"/>
    <link rel="stylesheet" type="text/css" href="${css}/dataTables/dataTables.bootstrap.css?v=${v}"/>
    <link rel="stylesheet" type="text/css" href="${bootstrap}/bootstrapvalidator/css/bootstrapValidator.min.css?v=${v}"/>
    <script src="${bootstrap}/js/zquery.js?v=${v}"></script>
	<script src="${js}/92c94a6b.public.min.js?v=${v}"></script>
	<script src="${js}/jquery-ui.js?v=${v}"></script>
	<script src="${js}/layer/layer.js?v=${v}"></script>
    <script src="${js}/layer/extend/layer.ext.js?v=${v}"></script>
    <script src="${js}/dataTables/jquery.dataTables.js?v=${v}"></script>
    <script src="${js}/dataTables/dataTables.bootstrap.js?v=${v}"></script>
    <script src="${js}/dataTables/fnReloadAjax.js?v=${v}"></script>
    <script src="${js}/tablesorter/tablesorter.js?v=${v}"></script>
    <script src="${bootstrap}/js/bootstrap.min.js"></script>
    <script src="${bootstrap}/bootstrapvalidator/js/bootstrapValidator.js"></script>
    <script src="${js}/common.js?v=${v}"></script>
    <script src="${js}/public.js?v=${v}"></script>
    
    <style type="text/css">
		.box{position:absolute;width:600px;left:50%;height:auto;z-index:100;background-color:#fff;border:1px #ddd solid;padding:1px;}
		.box h2{height:25px;font-size:14px;background-color:#aaa;position:relative;padding-left:10px;line-height:25px;color:#fff;}
		.box h2 a{position:absolute;right:5px;font-size:12px;color:#fff;}
		.box .list{padding:10px;}
		.box .list li{height:24px;line-height:24px;}
		.box .list li span{margin:0 5px 0 0;font-family:"宋体";font-size:12px;font-weight:400;color:#ddd;}
		.showbtn {font:bold 24px '微软雅黑';}
		#bg{background-color:#666;position:absolute;z-index:99;left:0;top:0;display:none;width:100%;height:100%;opacity:0.5;filter: alpha(opacity=50);-moz-opacity: 0.5;}
	    .inputred{
	       border-color:red !important;
	    }
	    .divC{
	        width:92%;
	       margin-left:50px;
	       margin-right:0px;
	       margin-bottom:20px;
	      }  
	     .btnBox a{
	        float:left;
	       } 
	</style>
	
</head>
<body>
<div id="mall_header">
    <div class="topbar">
        <div class="w1180">
            <div class="toplink">
                <a href="javascript:" id="btn_quit">Demo</a> 
            </div>
        </div>
    </div>
     <div class="menu">
        <div class="w1180">
            <ul class="subMenu">
                <li><a href="${projectName}/queryList" >用户管理</a></li>
            </ul>
        </div>
    </div>
</div>   
<div class="wrapper">
	<div class="container">
	  <div class="divC">
		<div class="selectbox">
		<div class="row">
			<div class="col-md-1 th"><span class="mall_change_title">用户状态</span></div>
			<div class="col-md-11">
			 <a class="mall_change_one active" name="Status" data="0" value="${params.Status }"><i class="icon"></i>全部</a>
			 <a class="mall_change_one" name="Status" data="10" value="${params.Status }"><i class="icon"></i>正常</a>
			 <a class="mall_change_one" name="Status" data="20" value="${params.Status }"><i class="icon"></i>停用</a>
			</div>
			</div>
		<div class="row">
			<div class="col-md-1 th"><span class="mall_change_title">新增时间</span></div>
			<div class="col-md-11">
				<div class="form-inline noPadding">
					<input type="text" class="form-control input-sm" placeholder="开始" id="starttime">
					<span>-</span>
					<input type="text" class="form-control input-sm" placeholder="结束" id="endtime">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-1 th">
				<span class="mall_change_title">关键字</span>
			</div>
			<div class="col-md-11">
				<div class="form-inline noPadding"> 
					<input type="text" class="form-control keywordclass" name="keyword" id="keyword" placeholder="输入查询信息" aria-describedby="basic-addon2">
					<button class="btn btn-sm btn-primary m-t-n-xs" type="submit" id="query" style="margin-left:20px;">
						<strong>查询</strong>
					</button>
					<button class="btn btn-sm btn-primary m-t-n-xs" type="button" id="reset" style="margin-left:20px;">
						<strong>重置</strong>
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 
  <div class="divC">	 -->
	<div class="btnBox">
				<a class="btn btn-primary btn-sm" code="addUser" href="javascript:void(0);" id="adduser" role="button">添加用户</a>
	</div>
	</div>
	<table class="table table-hover borderT dataTables-example">
				<thead>
					<tr class="bg">
						<th>用户名称</th>
						<th>用户ID</th>
						<th>用户状态</th>
						<th>有限起始日期</th>
						<th>有限截止日期</th>
						<th>操作人</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
			<!-- </div> -->
	</div>
</div>
<div id="bg"></div>
	<div id="win" class="popup_box box" style="width:500px;display: none;">
		<div class="tit">添加用户</div>
		<div class="content">
		<form action="" method="post" id="addUserForm">
			<table class="table table_no">
				<colgroup>
					<col style="width:120px;">
					<col>
				</colgroup>
				<tbody>
				<tr style="display:none;">
					<th>PKID：</th>
					<td><input type="text" style="width:220px;" id="pkid" name="pkid">
					</td>
				</tr>
				<tr>
					<th>用户名：</th>
					<td><input type="text" style="width:220px;" id="userName" name="userName">
					</td>
				</tr>
				<tr>
					<th>用户ID：</th>
					<td><input type="text" style="width:220px;" id="userId" name="userId" >
					</td>
				</tr>
<!-- 				<tr>
					<th>域名ID：</th>
					<td><input type="text" style="width:220px;" id="realmId" name="realmId"></td>
				</tr>
 -->				<tr>
					<th>有限期：</th>
					<td>
						<div class="form-inline noPadding">
							<input type="text" class="form-control input-sm" placeholder="开始" id="starttime3" name="validStart" >						
							<span>-</span>
							<input type="text" class="form-control input-sm" placeholder="结束" id="endtime4" name="validEnd" >
						</div>
					</td>
				</tr>
				</tbody></table>		
		</form>
		</div>
		<div class="btn_box">
			<a class="btn btn-primary btn-sm" href="#" id="btnOk" role="button">保存</a>
			<a class="btn btn-default btn-sm" href="#" id="btnNo" role="button" style="margin-left:20px;">取消</a>
		</div>
	</div>

<script src="${js}/user.js" ></script>
</body>
</html>