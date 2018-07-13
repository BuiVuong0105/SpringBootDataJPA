<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags/form"%>
<%@taglib prefix="s" uri="http://www.springframework.org/tags"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript">
	function logOut() {
		$("#formLogOut").submit();
	}
</script>
</head>
<body>
		<form id="formLogOut" action="${pageContext.request.contextPath}/logout" method="post">
			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
		</form>
		<div id="msg" style="float: right; color: #3c763d; position: fixed; z-index: 999; right:2%; display:none;
			box-shadow: 3px 3px 3px #888; margin: 0px 20%; padding-left: 10px; padding-top: 8px; 
			padding-bottom: 8px; padding-right: 30px; border: 1px solid; width: 400px;"
			class="alert alert-success alert-dismissable fade in">
				<a href="#" class="close" style="color: red" data-dismiss="alert" aria-label="close">&times;</a> 
			<strong id="msgTxt"></strong>
		</div>
		
		<div class="clear"></div>
		<div class="col-sm-6">
			<a class="logo_title" href="${pageContext.request.contextPath}/nodo">
				<img alt="Home Page"
				src='<c:url value="resources/images/nodo.png"></c:url>'> <span
				style="float: left; font-weight: 200; font-size: 25px; margin-left: 15px; margin-top: 7px;">Hệ Thống Quản Lý Trường Học</span>
			</a>
		</div>
		<div class="col-sm-6">
			<div class="header-right">
				<div class="header_user">
					<div class="dropdown">
						<button class="btn btn-primary dropdown-toggle" type="button"
							data-toggle="dropdown">
							<span class="fa fa-power-off"></span>
						</button>
						<ul class="dropdown-menu">
							<li><a href="#"><span class="fa fa-undo" style="display: inline-block; margin-right: 5px;"></span>Làm Mới Mật Khẩu</a></li>
							<li><a onclick="logOut()"><span class="fa fa-sign-out" style="display: inline-block; margin-right: 5px;"></span>Đăng Xuất</a></li>
						</ul>
					</div>
				</div>
				<div class="header_user">
					<div class="dropdown">
						<button class="btn btn-primary dropdown-toggle" type="button"
							data-toggle="dropdown">
							<span class="fa fa-user"></span>
						</button>
						<ul class="dropdown-menu">
							<li><a href="#"><span class="fa fa-user"
									style="display: inline-block; margin-right: 5px;"></span>Xem
									Tài Khoản</a></li>
							<li><a href="#"><span class="fa fa-undo"
									style="display: inline-block; margin-right: 5px;"></span>Đổi
									Mật Khẩu</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	<div class="clear"></div>
</body>
</html>