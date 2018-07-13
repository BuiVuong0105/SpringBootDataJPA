<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Left Bar</title>
</head>
<body>
	<div class="panel-group" id="accordion">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h4 style="display: inline-block; width: 100%;" class="panel-title">
					<a data-toggle="collapse" data-parent="#accordion" href="#common">
						<span class="fa fa-table"
						style="font-size: 14px; margin-right: 5px;"></span>Quản Lý Chung<span class="fa fa-angle-down" style="float: right;"></span>
					</a>
				</h4>
			</div>
			<div id="common" class="panel-collapse collapse ${menuModule.module==1?'in':''}">
				<div class="panel-body">
					<ul class="nav nav-menu">

						<li class="${menuModule.item==1?'active':''}"><a href="${pageContext.request.contextPath}/school">
							<span class="fa fa-university"></span>Trường Học</a></li>

						<li class="${menuModule.item==4?'active':''}"><a href="${pageContext.request.contextPath}/year">
						<span class="fa fa-calendar"></span>Năm Học</a></li>

						<li class="${menuModule.item==2?'active':''}"><a href="${pageContext.request.contextPath}/clazzIdentity">
						<span class="fa fa-microchip"></span>Lớp Định Danh</a></li>
						
						<li class="${menuModule.item==3?'active':''}"><a href="${pageContext.request.contextPath}/grade"><span class="fa fa-home">
						</span>Khối</a></li>

						<li class="${menuModule.item==5?'active':''}"><a href="${pageContext.request.contextPath}/clazz"><span class="fa fa-key">
						</span>Phân Lớp</a></li>
						
						<li class="${menuModule.item==6?'active':''}"><a href="${pageContext.request.contextPath}/subject"><span class="fa fa-book">
						</span>Môn Học</a></li>

					</ul>
				</div>
			</div>
		</div>

		<div class="panel panel-default">
			<div class="panel-heading">
				<h4 class="panel-title">
					<a data-toggle="collapse" data-parent="#accordion" href="#person">
						<span style="font-size: 16px" class="fa fa-bars"
						style="font-size: 14px; margin-right: 5px;"></span>Đội Ngũ<span
						class="fa fa-angle-down" style="float: right;"></span>
					</a>
				</h4>
			</div>
			<div id="person" class="panel-collapse collapse ${menuModule.module==2?'in':''}">
				<div class="panel-body">
					<ul class="nav nav-menu">
						<li class="${menuModule.item==1?'active':''}"><a href="${pageContext.request.contextPath}/teacher"><span class="fa fa-user"></span>Giáo Viên</a></li>
						<li class="${menuModule.item==2?'active':''}"><a><span class="fa fa-graduation-cap"></span>Học Sinh</a></li>
					</ul>
				</div>
			</div>
		</div>

		<div class="panel panel-default">
			
			<div class="panel-heading">
				<h4 class="panel-title">
					<a data-toggle="collapse" data-parent="#accordion" href="#user">
						<span class="fa fa-users"
						style="font-size: 14px; margin-right: 5px;"></span>Tài Khoản<span
						class="fa fa-angle-down" style="float: right;"></span>
					</a>
				</h4>
			</div>

			<div id="user" class="panel-collapse collapse ${menuModule.module==3?'in':''}">
				<div class="panel-body">
					<ul class="nav nav-menu">
						<li class="${menuModule.item==1?'active':''}"><a><span class="fa fa-user"></span>Người Dùng</a></li>
						<li class="${menuModule.item==2?'active':''}"><a><span class="fa fa-user-circle"></span>Phân Quyền</a></li>
					</ul>
				</div>
			</div>
			
		</div>
	</div>
</body>
</html>