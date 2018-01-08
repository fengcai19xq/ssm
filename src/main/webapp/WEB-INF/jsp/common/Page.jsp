<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%--
 分页格式
   首页 <<   1   2   3   4   5   6   7   8   9   10  11>  >> 尾页
   首页 <<   1   2   3   4   5   6   7   8   9   ... 11  12 >  >> 尾页
   首页 <<   1   2  ...  4   5   6   7   8   9   10 ... 12  13 >  >> 尾页
   首页 <<   1   2  ...  5   6   7   8   9   10  11  12  13 >  >> 尾页
   首页 <<   1   2  ...  5   6   7   8   9   10  11  ... 13  14 >  >> 尾页
   首页 <<   1   2  ...  5   6   7   8   9   10  11  ...   21  22 >  >> 尾页
--%>
<nav class="clearfix">
	<c:if test="${empty page}">
		<c:set var="pageSize" value="${page.pageSize}" />
	</c:if>

	<c:set var="displaySize" value="2" />
	<c:set var="current" value="${page.currentPage}" />

	<c:set var="begin" value="${current - displaySize}" />
	<c:if test="${begin <= displaySize}">
		<c:set var="begin" value="${1}" />
	</c:if>
	<c:set var="end" value="${current + displaySize}" />
	<c:if test="${end > page.totalPage - displaySize}">
		<c:set var="end" value="${page.totalPage - displaySize}" />
	</c:if>
	<c:if test="${end < 0 or page.totalPage < displaySize * 4}">
		<c:set var="end" value="${page.totalPage}" />
	</c:if>
	<div class="row">
		<div class="col-md-6">
			<form id="page" name="page" role="form" class="form-inline" style="padding-left: -50px;">
				<div class="form-group">
					第 &nbsp;<input name="currentPage" id="pagenumber" type="text" class="form-control input-sm" style="width: 50px;"
						value="${current}" onblur="$.table.turnPage('${pageSize}', $(this).val(), this);"
					/>&nbsp;页
				</div>
				&nbsp;
				<div class="form-group">
					<select class="form-control input-sm" style="width: 50px;" name="pageSize" id="pagesize">
						<option <c:if test="${page.pageSize==10 }">selected="selected"</c:if> value="10">10</option>
						<option <c:if test="${page.pageSize==20 }">selected="selected"</c:if> value="20">20</option>
						<option <c:if test="${page.pageSize==30 }">selected="selected"</c:if> value="30">30</option>
						<option <c:if test="${page.pageSize==50 }">selected="selected"</c:if> value="50">50</option>
					</select>
				</div>
				<div class="form-group">
					<span class="page-info">共 &nbsp;${page.totalPage}页/${page.totalCount} &nbsp;条</span>
					<input type="hidden" id="totalCount" value="${page.totalCount}">
					<input type="hidden" id="totalPage" value="${page.totalPage}">
				</div>
			</form>
		</div>
		<div class="col-md-6">
 
			<ul class="pagination pull-right">
				<c:choose>
					<c:when test="${current<1}">
						<li class="disabled"><a title="首页">首页</a></li>
						<li class="disabled"><a href="javascript:void(0);" aria-label="Previous"> <span aria-hidden="true">&lt;&lt;</span>
						</a></li>
					</c:when>
					<c:otherwise>
						<li><a title="首页" data="1">首页</a></li>
						<li><a href="javascript:void(0);" aria-label="Previous"  <c:if test="${current==1 }">data="${current }"</c:if>  <c:if test="${current>1 }">data="${current-1 }"</c:if>> <span aria-hidden="true">&lt;&lt;</span>
						</a></li>
					</c:otherwise>
				</c:choose>

				<c:forEach begin="1" end="${begin == 1 ? 0 : 2}" var="i">
					<li <c:if test="${current == i}"> class="active"</c:if>><a href="javascript:void(0);" onclick="" data="${i}"
						title="第${i}页"
					>${i}</a></li>
				</c:forEach>

				<c:if test="${begin > displaySize + 1}">
					<li><a>...</a></li>
				</c:if>

				<c:forEach begin="${begin}" end="${end}" var="i">
					<li <c:if test="${current == i}"> class="active"</c:if>><a href="javascript:void(0);" onclick="" data="${i}"
						title="第${i}页"
					>${i}</a></li>
				</c:forEach>


				<c:if test="${end < page.totalPage - displaySize}">
					<li><a>...</a></li>
				</c:if>

				<c:forEach begin="${end < page.totalPage ? page.totalPage - 1 : page.totalPage + 1}" end="${page.totalPage}" var="i">
					<li <c:if test="${current == i}"> class="active"</c:if>><a href="javascript:void(0);" onclick="" data="${i}"
						title="第${i}页">${i}</a></li>
				</c:forEach>

				<c:choose>
					<c:when test="${current>=page.totalPage}">
						<li class="disabled"><a title="下一页">&gt;&gt;</a></li>
						<li class="disabled"><a title="尾页">尾页</a></li>
					</c:when>
					<c:otherwise>
						<li><a href="javascript:void(0);" onclick="" title="下一页"  data="${current+1}">&gt;&gt;</a></li>
						<li><a href="javascript:void(0);" onclick="" title="尾页" data="${page.totalPage }">尾页</a></li>
					</c:otherwise>
				</c:choose>

			</ul>
		</div>
	</div>
</nav>
