const host = 'http://localhost:8081/FinalApp';
const prefix = '';

const GETMENUBYROLE = host + '/menu' + '/getMenuByRole';

const SEARCH_SCHOOL = host + '/school' + '/searchSchool';
const FIND_SCHOOL_BY_ID = host + '/school' + '/findSchoolById';
const UPDATE_SCHOOL = host + '/school' + '/updateSchool';
const CREATE_SCHOOL = host + '/school' + '/createSchool';
const DELETE_SCHOOL = host + '/school' + '/deleteSchool';

const SEARCH_CLAZZIDENTITY = host + '/clazzIdentity' + '/searchClazzIdentity';
const FIND_CLAZZIDENTITY_BY_ID = host + '/clazzIdentity' + '/findClazzIdentityById';
const CREATE_CLAZZIDENTITY = host + '/clazzIdentity' + '/createClazzIdentity';
const UPDATE_CLAZZIDENTITY = host + '/clazzIdentity' + '/updateClazzIdentity';
const DELETE_CLAZZIDENTITY = host + '/clazzIdentity' + '/deleteClazzIdentity';

const SEARCH_GRADE = host + '/grade' + '/searchGrade';
const FIND_GRADE_BY_ID = host + '/grade' + '/findGradeById';
const CREATE_GRADE = host + '/grade' + '/createGrade';
const UPDATE_GRADE = host + '/grade' + '/updateGrade';
const DELETE_GRADE = host + '/grade' + '/deleteGrade'

const SEARCH_YEAR = host + '/year' + '/searchYear';
const FIND_YEAR_BY_ID = host + '/year' + '/findYearById';
const CREATE_YEAR = host + '/year' + '/createYear';
const UPDATE_YEAR = host + '/year' + '/updateYear';
const DELETE_YEAR = host + '/year' + '/deleteYear';

const GRADECLAZZIDENTITY = host + '/gradeclazzidentity';
const SEARCH_GRADE_CLAZZIDENTITY = host + '/gradeclazzidentity' + '/searchGradeClazzIdentity';
const CREAT_GRADE_CLAZZIDENTITY = host + '/gradeclazzidentity' + '/createGradeClazzIdentity';

const SEARCH_CLAZZ = host + '/clazz' + '/searchClazz';
const FIND_CLAZZ_BY_ID = host + '/clazz' + '/findClazzById';
const CREATE_Clazz = host + '/clazz' + '/createClazz';
const UPDATE_Clazz = host + '/clazz' + '/updateClazz';
const DELETE_Clazz = host + '/clazz' + '/deleteClazz';

const SEARCH_SUBJECT = host + '/subject' + '/searchSubject';
const FIND_SUBJECT_BY_ID = host + '/subject' + '/findSubjectById';
const CREATE_SUBJECT = host + '/subject' + '/createSubject';
const UPDATE_SUBJECT = host + '/subject' + '/updateSubject';
const DELETE_SUBJECT = host + '/subject' + '/deleteSubject';

const SEARCH_TEACHER = host + '/teacher' + '/searchTeacher';
const FIND_TEACHER_BY_ID = host + '/teacher' + '/findTeacherById';
const CREATE_TEACHER = host + '/teacher' + '/createTeacher';
const UPDATE_TEACHER = host + '/teacher' + '/updateTeacher';
const DELETE_TEACHER = host + '/teacher' + '/deleteTeacher';


// Action
const EDIT = 'EDIT';
const CREATE = 'CREATE';
const DELETE = 'DELETE';
const SEARCH = 'SEARCH';

// Respone Body Code
const ALL_FAIL = 100;
const SOME_FAIL = 200;
const REQUIRED = 300;
const ERROR = 400;
const NOT_FOUND = 404;
const EXIST = 409;
const SERVER_ERROR = 500;

function Pagination(){
	this.page = 1;
	this.size = 40;
	this.numberOfPage = 5;
	this.totalPage = 0;
}
$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function() {
	$('[data-tooltip="tooltip"]').tooltip();
});

/**
 * Xóa trắng form ActionSchool
 * 
 * @returns
 */
function resetForm(formID){
	$('#'+formID+' input').not(':hidden').val('');
	$('#'+formID+' select').val('');
}

/**
 * Hiển thị Message
 * 
 * @param message
 *            thông tin cần hiển thị
 * @returns
 */
function showMessage(message){
	$('#msgTxt').text(message);
	$('#msg').css("display","block");
	$('#msg').fadeOut(5000);
}

function isStringNullOrEmpty(val){
	return (val == null ||  val.trim().length === 0) ? true : false;
}

var menu = '';

// $(document).ready(function(){
// 	getMenuByRole();
// });

// function parseMenu(parentMenu){
	
// }

// function getMenuByRole (){
// 	$.ajax({
// 		url : GETMENUBYROLE,
// 		type : 'GET',
// 		success: function(data, status, xhr){
			
// 			$.each(data, function(index, rootMenu){
// 				console.log(rootMenu);

// 			});
// 		},
// 		error: function(xhr, data){
// 			showMessage('Có lỗi xảy ra !');
// 		}
// 	});
// }

function setPagination(pagination){
	var paginationStr = '';
	if(pagination.totalPage < pagination.numberOfPage){
		for(var page = 1; page <= pagination.totalPage; page++) {
			if(page == pagination.page) {
				paginationStr = paginationStr + '<li class = "active"><a class="page">'+page+'</a></li>';
			} else{
				paginationStr = paginationStr + '<li><a class="page">'+page+'</a></li>';
			}
		}
	}

	else{
		var startPage = 1;
		var endPage = pagination.numberOfPage;
		// Nếu trang hiện tại > số lượng trang cần cho phép hiển thị
		if(pagination.page > pagination.numberOfPage) {
			startPage = (pagination.page - pagination.numberOfPage) + 1;
			endPage = pagination.page;
		}
		for(var page = startPage; page <= endPage; page++){
			if(page == pagination.page) {
				paginationStr = paginationStr + '<li class = "active"><a class="page">'+page+'</a></li>';
			}

			else{
				paginationStr = paginationStr + '<li><a class="page">'+page+'</a></li>';
			}
		}
		// Nếu hiện tại trang đang là 1 hiển thị Next
		if(pagination.page == 1) {

			paginationStr =  paginationStr + '<li><a class="next">></a></li>';

			paginationStr =  paginationStr + '<li><a class="tail">&raquo;</a></li>';
		}
		// Nếu đang là trang cuối hiển thị Pre
		else if(pagination.page == pagination.totalPage){

			paginationStr = '<li><a class="previous"><</a></li>' + paginationStr;

			paginationStr = '<li><a class="head">&laquo;</a></li>' + paginationStr;

		}
		// Nêu là giữa thì hiển thị Next và Pre
		else{
			paginationStr = '<li><a class="previous"><</a></li>' + paginationStr;
			paginationStr = '<li><a class="head">&laquo;</a></li>' + paginationStr;
			paginationStr =  paginationStr + '<li><a class="next">></a></li>';
			paginationStr =  paginationStr + '<li><a class="tail">&raquo;</a></li>';
		}
	}
	$('ul.pagination').html(paginationStr);
}

/**
 * Click vào các Trang
 * @returns
 */
$(document).on('click', '.page', function(){
	pagination.page = parseInt(this.text);
	loadTable();
});

/**
 * Click vào next
 * @returns
 */
$(document).on('click', '.next', function(){
	pagination.page = pagination.page + 1;
	loadTable();
});

/**
 * Click vào Previous
 * @returns
 */
$(document).on('click', '.previous', function(){
	pagination.page = pagination.page - 1;
	loadTable();
});

/**
 * Click vào Head
 * @returns
 */
$(document).on('click', '.head', function(){
	pagination.page =  1;
	loadTable();
});

/**
 * Click vào Tail
 * @returns
 */
$(document).on('click', '.tail', function(){
	pagination.page =  pagination.totalPage;
	loadTable();
});

function loadSelectSchool(clazzName){
	$(clazzName).select2({
		ajax: {
			quietMillis: 250,
			url: SEARCH_SCHOOL,
		    dataType: 'json',
		    type: 'GET',
		    data: function (params) {
		        var query = {
		          search: params.term,
		        }
		        return query;
		    },
		    processResults: function (data) {
		    	var listResult = [];
		    	$.each(data.data, function(index, school){
		    		listResult.push({
		    			id: school.id,
		    			text: school.name
		    		});
		    	});
		    	return {
		    		results: listResult
		    	}
			},
		    cache: true
		},
		templateResult: formatRespone,
		templateSelection: formatResponeSelection,
		escapeMarkup: function (markup) { 
			return markup; 
		},
		minimumInputLength: 1,
		placeholder: "Mời Bạn Chọn !"
	});
}

function loadSelectGrade(clazzName){
	$(clazzName).select2({
		ajax: {
			quietMillis: 250,
			url: SEARCH_GRADE,
		    dataType: 'json',
		    type: 'GET',
		    data: function (params) {
		        var query = {
		          name: params.term,
		        }
		        return query;
		    },
		    processResults: function (data) {
		    	var listResult = [];
		    	$.each(data.data, function(index, grade){
		    		listResult.push({
		    			id: grade.id,
		    			text: grade.name
		    		});
		    	});
		    	return {
		    		results: listResult
		    	}
			},
		    cache: true
		},
		templateResult: formatRespone,
		templateSelection: formatResponeSelection,
		escapeMarkup: function (markup) { 
			return markup; 
		},
		minimumInputLength: 1,
		placeholder: "Mời Bạn Chọn !"
	});
}



function loadSelectClazzIdentity(clazzName){
	$(clazzName).select2({
		ajax: {
			quietMillis: 250,
			url: SEARCH_CLAZZIDENTITY,
		    dataType: 'json',
		    type: 'GET',
		    data: function (params) {
		        var query = {
		          name: params.term,
		          schoolId: schoolId,
		        }
		        return query;
		    },
		    processResults: function (data) {
		    	var listResult = [];
		    	$.each(data.data, function(index, clazzIdentity){
		    		listResult.push({
		    			id: clazzIdentity.id,
		    			text: clazzIdentity.name
		    		});
		    	});
		    	return {
		    		results: listResult
		    	}
			},
		    cache: true
		},
		templateResult: formatRespone,
		templateSelection: formatResponeSelection,
		escapeMarkup: function (markup) { 
			return markup; 
		},
		minimumInputLength: 1,
		placeholder: "Mời Bạn Chọn !"
	});
}

// Load Danh Sách Khóa Học
function loadSelectYear(clazzName, schoolClazzName){
	$(clazzName).select2({
		ajax: {
			quietMillis: 250,
			url: SEARCH_YEAR,
		    dataType: 'json',
		    type: 'GET',
		    data: function (params) {
		        var query = {
		          name: params.term,
		          schoolId: $(schoolClazzName).val(),
		        }
		        return query;
		    },
		    processResults: function (data) {
		    	var listResult = [];
		    	$.each(data.data, function(index, year){
		    		var school = year.school.code;
		    		var semester = year.semester == 1 ? 'Học Kỳ I' : 'Học Kỳ II';
		    		var text = school + ' '+ year.name + ' - ' + semester;
		    		listResult.push({
		    			id: year.id,
		    			text: text,
		    		});
		    	});
		    	return {
		    		results: listResult
		    	}
			},
		    cache: true
		},
		templateResult: formatRespone,
		templateSelection: formatResponeSelection,
		escapeMarkup: function (markup) { 
			return markup; 
		},
		minimumInputLength: 1,
		placeholder: "Mời Bạn Chọn !"
	});
}

// Load Danh Sách Khối Lớp
function loadSelectGradeClazzIdentity(clazzName, schoolClazzName){
	$(clazzName).select2({
		ajax: {
			quietMillis: 250,
			url: SEARCH_GRADE_CLAZZIDENTITY,
		    dataType: 'json',
		    type: 'GET',
		    data: function (params) {
		        var query = {
		          name: params.term,
		          schoolId: $(schoolClazzName).val(),
		        }
		        return query;
		    },
		    processResults: function (data) {
		    	var listResult = [];
		    	$.each(data.data, function(index, gradeClazzIdentity){
		    		var school = gradeClazzIdentity.clazzIdentity.school.code;
		    		listResult.push({
		    			id: gradeClazzIdentity.id,
		    			text: school + ' ' + gradeClazzIdentity.name,
		    		});
		    	});
		    	return {
		    		results: listResult
		    	}
			},
		    cache: true
		},
		templateResult: formatRespone,
		templateSelection: formatResponeSelection,
		escapeMarkup: function (markup) { 
			return markup; 
		},
		minimumInputLength: 1,
		placeholder: "Mời Bạn Chọn !"
	});
}


function formatRespone(data){
	if (data.loading) {
	    return data.text;
	  }
  	return data.text;
}

function formatResponeSelection(data){
	return data.text;
}
