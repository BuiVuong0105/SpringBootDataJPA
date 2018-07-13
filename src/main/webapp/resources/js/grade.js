
/**
 * Load Dữ liệu khối lên bảng
 * @returns
 */
$(document).ready(function() {
	searchGrade();
});

/**
 * Tìm kiếm khối
 * @param offset
 * @param size
 * @returns
 */
function searchGrade(offset, size){
	$(".loader").css("display", "block");
	$('#listGrade table tbody').empty();
	$.ajax({
		url : SEARCH_GRADE,
		type : 'GET',
		data:{
			offset: offset,
			size: size
		},
		success: function(data, status, xhr){
			var total = data.total;
			var listGrade = data.data;
			var tableContent = '';
			$.each(listGrade, function(index, grade){
				tableContent = tableContent + '<tr class = "clear">';
					tableContent = tableContent + '<td class="col-sm-1">' + (offset + index+1) + '</td>';
					tableContent = tableContent + '<td class="col-sm-4">' + grade.code + '</td>';
					tableContent = tableContent + '<td class="col-sm-4">' + grade.name + '</td>';
					tableContent = tableContent + '<td class="col-sm-3">';
						tableContent = tableContent + '<span code = "' + grade.id + '" style="margin-right: 5px; display: inline-block; color: #5d9cec" class="btn btn-xs btn-default fa fa-pencil btn_edit_grade" data-placement="bottom" data-tooltip="tooltip" title="Chỉnh Sửa"></span>';
						tableContent = tableContent + '<span code = "' + grade.id + '" class="btn btn-xs btn-default fa fa-trash btn_delete_grade" style="color: #5d9cec; margin-left:10px;" data-placement="bottom" data-tooltip="tooltip" title="Xóa"></span>';
						tableContent = tableContent + '<span code = "' + grade.id + '" name="'+ grade.name +'" class="btn btn-xs btn-default fa fa-plus btn_gradeClazzIdentity" style="color: #5d9cec; margin-left:10px;" data-placement="bottom" data-tooltip="tooltip" title="Khối Lớp"></span>';
						// tableContent = tableContent + '<span code = "' + grade.id + '" name="'+ grade.name +'" class="btn btn-xs btn-default fa fa-book btn_gradeSubject" style="color: #5d9cec; margin-left:10px;" data-placement="bottom" data-tooltip="tooltip" title="Phân Môn Học Cho Khối"></span>';
					tableContent = tableContent + '</td>';
				tableContent = tableContent + '</tr>';
			});
			$('#listGrade table tbody').html(tableContent);
			$('[data-tooltip="tooltip"]').tooltip();
			$(".loader").css("display", "none");
		},
		error: function(xhr, data){
			showMessage('Có lỗi xảy ra !');
			$(".loader").css("display", "none");
		}
	});
}

/**
 * Bắt đầu click tạo mới
 */
$(document).on('click', '.btn_creat_grade', function(){
	$('#formGradeAction .modal-title').text('Tạo Mới Khối');
	$('#formGradeAction [name=action]').val(CREATE);
	$('#actionGrade').modal('show');
});

/**
 * Bắt đầu click cập nhật Grade
 * @returns
 */
$(document).on('click', '.btn_edit_grade', function(){
	$('#formGradeAction .modal-title').text('Cập Nhật Khối');
	resetForm('formGradeAction');
	var id = $(this).attr('code');
	$('#btn_confirm_action_grade').attr('code', id);
	$.ajax({
		url : FIND_GRADE_BY_ID + '/' + id,
		type : 'GET',
		success: function(data, status, xhr){
			$('#actionGrade').modal('show');
			setEditGrade(data);
		},
		error: function(xhr, data){
			showMessage('Có lỗi xảy ra !');
		}
	});
});

/**
 * Hủy Action Grade
 * @returns
 */
$(document).ready(function() {
	$('#cancel_confirm_action_grade').click(function(){
		resetForm('formGradeAction');
		$('#formGradeAction p').text(''); 
	});
});


/**
 * Hàm Xác Nhận Update Hoặc Insert Grade
 * @returns
 */
$(document).ready(function() {
	$('#btn_confirm_action_grade').click(function(){
		if(validateFormActionGrade()){
			return;
		};
		var dataForm = $('#formGradeAction').serialize();
		var action = $('#formGradeAction [name=action]').val();
		var url = '';
		if(action == EDIT){
			var id = $('#btn_confirm_action_grade').attr('code');
			url = UPDATE_GRADE + '/' + id;
		}else if(action == CREATE){
			url = CREATE_GRADE;
		}
		$.ajax({
			url : url,
			type : 'POST',
			data : dataForm,
			success: function(data, status, xhr){
				$('#actionGrade').modal('hide');
				resetForm('formSchoolAction');
				$('#formGradeAction p').text(''); 
				showMessage('Cập Nhật Thành Công');
				searchGrade();
			},
			error: function(xhr){
				if(xhr.status == 400){
					var data = JSON.parse(xhr.responseText);
					$('#formGradeAction p.error').text(''); 
					if(data instanceof Array){
						$.each(data, function(index, result) {
							var field = result.field;
							switch (field) {
								case 'code':
									$('#formGradeAction .errorCode').text(schoolCodeRequired);
									break;
								case 'name':
									$('#formGradeAction .errorName').text(schoolNameRequired);
									break;
								default:
									break;
							}
						});
					}else{
						if(data.codeError == EXIST){
							$('#formGradeAction p.msgError').text(data.message+' đã tồn tại'); 
						}else if(data.codeError == NOT_FOUND){
							$('#actionGrade').modal('hide');
							resetForm('formGradeAction');
							$('#formGradeAction p').text(''); 
							showMessage('Sai Mã Khối');
						}else if(data.codeError == SERVER_ERROR){
							$('#actionGrade').modal('hide');
							resetForm('formGradeAction');
							$('#formGradeAction p').text(''); 
							showMessage('Đã Có lỗi xảy ra, Vui Lòng Kiểm Tra Lại !');
						}
					}
				}else{
					$('#actionGrade').modal('hide');
					resetForm('formGradeAction');
					$('#formGradeAction p').text(''); 
					showMessage('Đã Có lỗi xảy ra, Vui Lòng Kiểm Tra Lại !');
				}
			}
		});
	});
});

/**
* Bắt đầu click Xóa Grade
* @returns
*/
$(document).on('click', '.btn_delete_grade', function(){
		var id = $(this).attr('code');
		$.ajax({
			url : FIND_GRADE_BY_ID + '/' + id,
			type : 'GET',
			success: function(data, status, xhr){
				$('#actionDeleteGrade p').text('Bạn có muốn xóa khối: '+data.name);
				$('#actionDeleteGrade [name=id]').val(data.id);
				$('#actionDeleteGrade').modal('show');
				
			},
			error: function(xhr, data){
				showMessage('Có lỗi xảy ra !');
			}
		});
});

/**
 * Hủy Xóa
 */
$(document).ready(function() {
	$('#cancel_confirm_delete_grade').click(function(){
		$('#actionDeleteGrade p').text(''); 
		$('#actionDeleteGrade [name=id]').val('');
	});
});

/**
 * Xác Nhận Xóa 
 */
$(document).ready(function() {
	$('#btn_confirm_delete_grade').click(function(){
		var id = $('#actionDeleteGrade [name=id]').val();
		$.ajax({
			url : DELETE_GRADE + '/' + id,
			type : 'GET',
			
			success: function(data, status, xhr){
				showMessage('Xóa Thành Công');
				$('#actionDeleteSchool').modal('hide');
				$('#actionDeleteSchool p').text(''); 
				$('#actionDeleteSchool [name=id]').val('');
				searchGrade();
			},
			
			error: function(xhr, data){
				showMessage('Có lỗi xảy ra !');
				$('#actionDeleteSchool').modal('hide');
				$('#actionDeleteSchool p').text(''); 
				$('#actionDeleteSchool [name=id]').val('');
			}
		});
	});
});

/**
 * Thiết lập thông tin của Grade lên các ô text khi user ấn sửa
 */
function setEditGrade(grade){
	$('#formGradeAction [name=action]').val(EDIT);
	$('#formGradeAction [name=code]').val(grade.code);
	$('#formGradeAction [name=name]').val(grade.name);
}

/**
 * Kiểm tra lại thông tin form nhập 
 */
function validateFormActionGrade(){
	$('#formGradeAction p.error').text('');
	var code = $('#formGradeAction [name=code]').val();
	var result = false;
	if(isStringNullOrEmpty(code)){
		var errorCode='<spring:message code="grade.field.required.code"/>';
		$('#formGradeAction .errorCode').text(gradeCodeRequired);
		result = true;
	}
	var name = $('#formGradeAction [name=name]').val();
	if(isStringNullOrEmpty(name)){
		$('#formGradeAction .errorName').text(gradeNameRequired);
		result = true;
	}
	return result;
}


// Biến lưu trữ số lượng của GradeClazzIdentity
var sizeGradeClazzIdentity = 0;

// GradeID Select, schoolID
var gradeIdSelect = -1, schoolId = -1;

// Load Select Search School GradeClazzIdentity
$(document).ready(function(){
	loadSelectSchool('.schoolSearchSelect');
});

$(document).on('change', '.schoolSearchSelect', function(){
	schoolId = $(this).val();
	renderBodyGradeClazzIdentityUpdate(gradeIdSelect, schoolId);
});

/** 
 * Click hiển thị dialog thông tin của Khối Lớp
 */
$(document).on('click', '.btn_gradeClazzIdentity', function(){
	var id = $(this).attr('code');
	gradeIdSelect = id;
	renderBodyGradeClazzIdentityUpdate(gradeIdSelect, schoolId);
	var name = $(this).attr('name');
	$('#actionGradeClazzIdentity .modal-title').text('Phân Nhóm Cho Khối: '+ name);
	$('#actionGradeClazzIdentity').modal('show');
});

function renderBodyGradeClazzIdentityUpdate(gradeId, schoolId){
	$(".itemInsert").remove();
	$('#formGradeClazzIdentityAction p.msgError').text('');
	$.ajax({
		url : SEARCH_GRADE_CLAZZIDENTITY,
		type : 'GET',
		data:{
			gradeId: gradeId,
			schoolId: schoolId
		},
		success: function(data, status, xhr){

			sizeGradeClazzIdentity = data.data.length - 1;

			var listGradeClazzIdentity = data.data;

			var content = '';

			content = content + '<input class = "itemInsert" type = "hidden" value="'+gradeId+'" name="grade.id"/>';

			$.each(listGradeClazzIdentity, function(index, gradeClazzIdentity){
				
				content = content + '<div class = "clear itemInsert itemInsert' + index + '"></div>';
				
				content = content + '<div class = "itemInsert itemInsert' + index + '">';
				
					content = content + '<div class="form-group" style="float: left; width: 100%;">';
				
						content = content + '<div class="col-sm-3">';
				
							content = content + '<input class="form-control" required = "true" value = "'+gradeClazzIdentity.code+'"" placeholder="Nhập Chữ" name="listGradeClazzIdentity['+index+'].code"/>';
				
							content = content + '<p class="errorCode error" style="color: red"></p>';
				
						content = content + '</div>';

						content = content + '<div class="col-sm-3">';
				
							content = content + '<input class="form-control" required = "true" value = "'+gradeClazzIdentity.name+'"" placeholder="Nhập Chữ" name="listGradeClazzIdentity['+index+'].name"/>';
				
							content = content + '<p class="errorName error" style="color: red"></p>';
				
						content = content + '</div>';

						content = content + '<div class="col-sm-3">';
				
							content = content + '<select required="true" style="width: 100%" class = "clazzIdentitySearchSelect form-control" name="listGradeClazzIdentity['+index+'].clazzIdentity.id">'
				
								content = content + '<option value="'+gradeClazzIdentity.clazzIdentity.id+'"">'+gradeClazzIdentity.clazzIdentity.name+'</option>';
				
							content = content + '</select>';
				
							content = content + '<p class="errorClazzIdentity error" style="color: red"></p>';
				
						content = content + '</div>';

						content = content + '<div class="col-sm-3">';
				
							content = content + '<span index="'+index+'" style="display: inline-block; float: left; margin-left: 35px; font-weight: bold; font-size: 18px; color: #5d9cec"  data-placement="bottom" data-tooltip="tooltip" title="Xóa" class="btn btn-xs btn-default fa fa-trash delete_gradeClazzIdentity"></span>';
				
						content = content + '</div>';

					content = content + '</div>';
				
				content = content + '</div>';
			});
			$("#listGradeClazzIdentityInsert").append(content);
		    $('[data-tooltip="tooltip"]').tooltip();
		    loadSelectClazzIdentity('.clazzIdentitySearchSelect');
		}
	});
}



/**
 * Thêm mới 1 row khi click insert
 */
$(document).ready(function(){
	$(".btn_creat_gradeClazzIdentity").click(function(){

		sizeGradeClazzIdentity++;

		var content = '';

		content = content + '<div class = "clear itemInsert itemInsert'+sizeGradeClazzIdentity+'"></div>';

		content = content + '<div class = "itemInsert itemInsert'+sizeGradeClazzIdentity+'">';

			content = content + '<div class="form-group" style="float: left; width: 100%;">';

				content = content + '<input type = "hidden" value = "'+gradeIdSelect+'"" name="listGradeClazzIdentity['+sizeGradeClazzIdentity+'].grade.id"/>';

				content = content + '<div class="col-sm-3">';

					content = content + '<input class="form-control" required = "true"  placeholder="Nhập Chữ" name="listGradeClazzIdentity['+sizeGradeClazzIdentity+'].code"/>';

				content = content + '</div>';

				content = content + '<div class="col-sm-3">';

					content = content + '<input class="form-control" required = "true"  placeholder="Nhập Chữ" name="listGradeClazzIdentity['+sizeGradeClazzIdentity+'].name"/>';

				content = content + '</div>';

				content = content + '<div class="col-sm-3">';

					content = content + '<select required="true" style="width: 100%" class="clazzIdentitySearchSelect form-control" name="listGradeClazzIdentity['+sizeGradeClazzIdentity+'].clazzIdentity.id"></select>';
				
				content = content + '</div>';

				content = content + '<div class="col-sm-3">';
				
					content = content + '<span index="'+sizeGradeClazzIdentity+'" style="display: inline-block; float: left; margin-left: 35px; font-weight: bold; font-size: 18px; color: #5d9cec"  data-placement="bottom" data-tooltip="tooltip" title="Xóa" class="btn btn-xs btn-default fa fa-trash delete_gradeClazzIdentity"></span>';
				
				content = content + '</div>';

			content = content + '</div>';
		
		content = content + '</div>';
		
		$("#listGradeClazzIdentityInsert").append(content);
		$('[data-tooltip="tooltip"]').tooltip();
		loadSelectClazzIdentity('.clazzIdentitySearchSelect');

	});
});

/**
 * Xóa Từng Row của GradeClazzIdentity
 */

 $(document).on('click', '.delete_gradeClazzIdentity', function(){
 	var index = $(this).attr('index');
 	$(".itemInsert"+index).remove();
 });

/*
 * Xác Nhận Insert Hoặc Update GradeClazzIdentity
 */
 $(document).ready(function(){
 	$("#btn_confirm_action_gradeClazzIdentity").click(function(){
 		$('#formGradeClazzIdentityAction p.msgError').text('');
 		var dataForm = $('#formGradeClazzIdentityAction').serialize();
 		$.ajax({
 			url : CREAT_GRADE_CLAZZIDENTITY,
			type : 'POST',
			data : dataForm,
			success: function(data, status, xhr){
				$('#actionGradeClazzIdentity').modal('hide');
				showMessage('Phân Nhóm Khối Lớp Thành Công !');
				
			},
			error: function(xhr){
				if(xhr.status == 400){
					var data = JSON.parse(xhr.responseText);
					if(data.codeError == EXIST){
						$('#formGradeClazzIdentityAction p.msgError').text(data.message); 
					}
					else if (data.codeError == REQUIRED){
						$('#formGradeClazzIdentityAction p.msgError').text(data.message); 
					}else if(data.codeError == SERVER_ERROR) {
						$('#formGradeClazzIdentityAction p.msgError').text(data.message); 
					}
				}else{
					$('#actionGradeClazzIdentity').modal('hide');
				   showMessage('Phân Nhóm Khối Lớp Thất Bại !');
				}
			}
 		});
 	});
 });
/**
 * Xac Nhan hủy cập nhật khối lớp
 */
 $(document).ready(function(){
 	$("#cancel_confirm_action_gradeClazzIdentity").click(function(){
 		$('.schoolSearchSelect').empty().trigger('change');
 	});
 });
