<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags/form"%>
<%@taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		
		<title><tiles:getAsString name="title" /></title>
		
		<link href='<c:url value="/resources/css/bootstrap 3.3.7.min.css"></c:url>' type="text/css" rel="stylesheet" />
		
		<link href="<c:url value="/resources/font-awesome-4.7.0/css/font-awesome.min.css"/>" type="text/css" rel="stylesheet" />
		
		<link href="<c:url value="/resources/css/main.css"/>" rel="stylesheet" type="text/css" />
		
		<link href="<c:url value="/resources/css/jquery-ui.css"/>"type="text/css" rel="stylesheet" />
		
		<link href='<c:url value="/resources/css/select2.min.css"/>'type="text/css" rel="stylesheet" />
		
		<script src="<c:url value="/resources/js/jquery-1.12.4.js"/>"type="text/javascript"></script>
		
		<script src="<c:url value="/resources/js/jquery-3.2.1.min.js"/>"type="text/javascript"></script>
		
		<script src="<c:url value="/resources/js/jquery-ui.js"/>"type="text/javascript"></script>
		
		<script src="<c:url value="/resources/js/bootstrap 3.3.7.min.js"/>"type="text/javascript"></script>
		
		<script src="<c:url value="/resources/js/select2.min.js"/>"type="text/javascript"></script>
		
		<script src="<c:url value="/resources/js/main.js"/>"type="text/javascript"></script>
		
		<script type="text/javascript">
			/* $(document).ready(function(){
				if($("#msg").length>0){
					$("#msg").fadeOut(6000);
				}
			}); */
			
		  $(function(){
		    $( "#datepicker" ).datepicker({
		    	changeMonth: true,
		        changeYear: true
		    });
		    $( "#datepicker" ).datepicker( "option", "dateFormat", "dd/mm/yy");
		  });
		
		function logOut() {
			$("#formLogOut").submit();
		}
			
			var actionMSG = '<s:message code="action" />'
			var actionSearchMSG = '<s:message code="action.search" />'
			var actionADDMSG = '<s:message code="action.add" />'	
			var actionUpdateMSG = '<s:message code="action.update" />'
			var actionDeleteMSG = '<s:message code="action.delete" />'
			
		</script>
	</head>
	<body>
		<div id="header">
			 <tiles:insertAttribute name="header" />
		</div>
		<div id="content">
			<div id="left_bar">
				<tiles:insertAttribute name="menu" />
			</div>
			<div class="center_content">
				<tiles:insertAttribute name="content" />
			</div>
		</div>
		<div id="footer">
			 <tiles:insertAttribute name="footer" />
		</div>
	</body>
</html>