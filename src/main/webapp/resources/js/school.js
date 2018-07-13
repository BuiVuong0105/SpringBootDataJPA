
/**
 * Load Dữ liệu trường học lên bảng
 * @returns
 */
$(document).ready(function() {
	searchSchool();
});

/**
 * Hàm Tìm Kiếm Trường Học ( Load Bảng )
 */
function searchSchool(offset, size){
	$(".loader").css("display", "block");
	$('#listSchool table tbody').empty();
	$.ajax({
		url : SEARCH_SCHOOL,
		type : 'GET',
		data:{
			offset: offset,
			size: size
		},
		success: function(data, status, xhr){
			var total = data.total;
			var listSchool = data.data;
			var tableContent = '';
			$.each(listSchool, function(index, school){
				tableContent = tableContent + '<tr class = "clear">';
					tableContent = tableContent + '<td class="col-sm-1">' + (index+1) + '</td>';
					tableContent = tableContent + '<td class="col-sm-3">' + school.name + '</td>';
					tableContent = tableContent + '<td class="col-sm-2">' + school.address + '</td>';
					tableContent = tableContent + '<td class="col-sm-2">' + school.email + '</td>';
					tableContent = tableContent + '<td class="col-sm-2">' + school.phoneNumber + '</td>';
					var type = '';
					var schoolType = '';
					if(school.type == 1){
						type = 'Chính Quy';
					}else{
						type = 'Không Chính Quy';
					}
					if(school.schoolType == 1){
						schoolType = 'Công Lập';
					}else{
						schoolType = 'Dân Lập';
					}
					tableContent = tableContent + '<td class="col-sm-2">';
						tableContent = tableContent + '<span code = "' + school.id + '" style="margin-right: 5px; color: #5d9cec" data-placement="bottom" data-tooltip="tooltip" title="Xem Chi Tiết" class="btn btn-xs btn-default fa fa-eye btn_view_school"></span>';
						tableContent = tableContent + '<span code = "' + school.id + '" style="margin-right: 5px; display: inline-block; color: #5d9cec" class="btn btn-xs btn-default fa fa-pencil btn_edit_school" data-placement="bottom" data-tooltip="tooltip" title="Chỉnh Sửa"></span>';
						tableContent = tableContent + '<span code = "' + school.id + '" class="btn btn-xs btn-default fa fa-trash btn_delete_school" style="color: #5d9cec" data-placement="bottom" data-tooltip="tooltip" title="Xóa"></span>';
					tableContent = tableContent + '</td>';
				tableContent = tableContent + '</tr>';
			});
			$('#listSchool table tbody').html(tableContent);
			$('[data-tooltip="tooltip"]').tooltip();
			$(".loader").css("display", "none");
		},
		error: function(xhr, data){
			showMessage('Có lỗi xảy ra !');
			$(".loader").css("display", "none");
		}
	});
}
$(document).on('click', '.btn_view_school', function(){
	var id = $(this).attr('code');
	$.ajax({
		url : FIND_SCHOOL_BY_ID + '/' + id,
		type : 'GET',
		success: function(data, status, xhr){
			$('#viewSchool').modal('show');
			$('#viewSchool span[name=code]').text(data.code);
			$('#viewSchool span[name=name]').text(data.name);
			$('#viewSchool span[name=address]').text(data.address);
			$('#viewSchool span[name=email]').text(data.email);
			$('#viewSchool span[name=phoneNumber]').text(data.phoneNumber);
			$('#viewSchool span[name=website]').text(data.website);
			$('#viewSchool span[name=principal]').text(data.principal);
			$('#viewSchool span[name=type]').text(data.type);
			$('#viewSchool span[name=schoolType]').text(data.schoolType);
		},
		error: function(xhr, data){
			showMessage('Có lỗi xảy ra !');
		}
	});
});
/**
 * Bắt đầu click tạo mới school
 */
$(document).on('click', '.btn_creat_school', function(){
	$('#formSchoolAction .modal-title').text('Tạo Mới Trường Học');
	$('#formSchoolAction [name=action]').val(CREATE);
	$('#actionSchool').modal('show');
});
/**
 * Bắt đầu click cập nhật School
 * @returns
 */
$(document).on('click', '.btn_edit_school', function(){
	$('#formSchoolAction .modal-title').text('Cập Nhật Trường Học');
	resetForm('formSchoolAction');
	var id = $(this).attr('code');
	$('#btn_confirm_action_school').attr('code',id);
	$.ajax({
		url : FIND_SCHOOL_BY_ID + '/' + id,
		type : 'GET',
		success: function(data, status, xhr){
			$('#actionSchool').modal('show');
			setEditSchool(data);
		},
		error: function(xhr, data){
			showMessage('Có lỗi xảy ra !');
		}
	});
});

/**
 * Hủy Updateschool
 * @returns
 */
$(document).ready(function() {
	$('#cancel_confirm_action_school').click(function(){
		console.log(this);
		// Reset Form Action
		resetForm('formSchoolAction');
		$('#formSchoolAction p').text(''); 
	});
});

/**
 * Hàm Xác Nhận Update Hoặc Insert School
 * @returns
 */
$(document).ready(function() {
	$('#btn_confirm_action_school').click(function(){
		if(validateFormActionSchool()){
			return;
		};
		var dataForm = $('#formSchoolAction').serialize();
		var action = $('#formSchoolAction [name=action]').val();
		var url = host;
		if(action == EDIT){
			var id = $('#btn_confirm_action_school').attr('code');
			url = UPDATE_SCHOOL + '/' + id;
		}else if(action == CREATE){
			url = CREATE_SCHOOL;
		}
		$.ajax({
			url : url,
			type : 'POST',
			data : dataForm,
			success: function(data, status, xhr){
				$('#actionSchool').modal('hide');
				resetForm('formSchoolAction');
				$('#formSchoolAction p').text(''); 
				showMessage('Cập Nhật Thành Công');
				searchSchool();
			},
			error: function(xhr){
				if(xhr.status == 400){
					var data = JSON.parse(xhr.responseText);
					$('#formSchoolAction p.error').text(''); 
					if(data instanceof Array){
						$.each(data, function(index, result) {
							var field = result.field;
							switch (field) {
								case 'code':
									$('#formSchoolAction .errorCode').text(schoolCodeRequired);
									break;
								case 'name':
									$('#formSchoolAction .errorName').text(schoolNameRequired);
									break;
								case 'address':
									$('#formSchoolAction .errorAddress').text(schoolAddressRequired);
									break;
								case 'email':
									$('#formSchoolAction .errorEmail').text(schoolEmailRequired);
									break;
								case 'phoneNumber':
									$('#formSchoolAction .errorPhoneNumber').text(schoolPhoneNumberRequired);
									break;
								case 'principal':
									$('#formSchoolAction .errorPrincipal').text(schoolPrincipaleRequired);
									break;
								case 'type':
									$('#formSchoolAction .errorType').text(schoolTypeRequired);
									break;
								case 'schoolType':
									$('#formSchoolAction .errorSchoolType').text(schoolSchoolTypeRequired);
									break;
								default:
									break;
							}
						});
					}else{
						if(data.codeError == EXIST){
							$('#formSchoolAction p.msgError').text(data.message+' đã tồn tại'); 
						}else if(data.codeError == NOT_FOUND){
							$('#actionSchool').modal('hide');
							resetForm('formSchoolAction');
							$('#formSchoolAction p').text(''); 
							showMessage('Sai Mã Trường');
						}else if(data.codeError == SERVER_ERROR){
							$('#actionSchool').modal('hide');
							resetForm('formSchoolAction');
							$('#formSchoolAction p').text(''); 
							showMessage('Đã Có lỗi xảy ra, Vui Lòng Kiểm Tra Lại !');
						}
					}
				}else{
					$('#actionSchool').modal('hide');
					resetForm('formSchoolAction');
					$('#formSchoolAction p').text(''); 
					showMessage('Đã Có lỗi xảy ra, Vui Lòng Kiểm Tra Lại !');
				}
			}
		});
	});
});

/**
* Bắt đầu click Xóa School
* @returns
*/
$(document).on('click', '.btn_delete_school', function(){
	// Lấy ra id của school cần sửa
	var id = $(this).attr('code');
	// Tìm school cần sửa
	$.ajax({
		url : FIND_SCHOOL_BY_ID + '/' + id,
		type : 'GET',
		success: function(data, status, xhr){
			$('#actionDeleteSchool p').text('Bạn có muốn xóa trường học: '+data.name);
			$('#actionDeleteSchool [name=id]').val(data.id);
			$('#actionDeleteSchool').modal('show');
			
		},
		error: function(xhr, data){
			showMessage('Có lỗi xảy ra !');
		}
	});
});

/**
 * Hủy Xóa trường Học
 */
$(document).ready(function() {
	$('#cancel_confirm_delete_school').click(function(){
		$('#actionDeleteSchool p').text(''); 
		$('#actionDeleteSchool [name=id]').val('');
	});
});

/**
 * Xác Nhận Xóa Trường Học
 */
$(document).ready(function() {
	$('#btn_confirm_delete_school').click(function(){
		var id = $('#actionDeleteSchool [name=id]').val();
		// Xóa trường
		$.ajax({
			url : DELETE_SCHOOL + '/' + id,
			type : 'GET',
			
			success: function(data, status, xhr){
				showMessage('Xóa Thành Công');
				$('#actionDeleteSchool').modal('hide');
				$('#actionDeleteSchool p').text(''); 
				$('#actionDeleteSchool [name=id]').val('');
				searchSchool();
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
 * thiết lập data lên Form Action School
 * @param data dữ liệu được set vào Input Form
 * @returns
 */
function setEditSchool(data){
	$('#formSchoolAction [name=action]').val(EDIT);
	$('#formSchoolAction [name=code]').val(data.code);
	$('#formSchoolAction [name=name]').val(data.name);
	$('#formSchoolAction [name=address]').val(data.address);
	$('#formSchoolAction [name=email]').val(data.email);
	$('#formSchoolAction [name=phoneNumber]').val(data.phoneNumber);
	$('#formSchoolAction [name=website]').val(data.website);
	$('#formSchoolAction [name=principal]').val(data.principal);
	$('#formSchoolAction [name=type]').val(data.type);
	$('#formSchoolAction [name=schoolType]').val(data.schoolType);
}

/**
 * Validate Form
 * @returns
 */
function validateFormActionSchool(){
	$('#formSchoolAction p.error').text('');
	var code = $('#formSchoolAction [name=code]').val();
	var result = false;
	if(isStringNullOrEmpty(code)){
		$('#formSchoolAction .errorCode').text(schoolCodeRequired);
		result = true;
	}
	
	var name = $('#formSchoolAction [name=name]').val();
	if(isStringNullOrEmpty(name)){
		$('#formSchoolAction .errorName').text(schoolNameRequired);
		result = true;
	}
	
	var address =$('#formSchoolAction [name=address]').val();
	if(isStringNullOrEmpty(address)){
		$('#formSchoolAction .errorAddress').text(schoolAddressRequired);
		result = true;
	}
	
	var email =$('#formSchoolAction [name=email]').val();
	if(isStringNullOrEmpty(email)){
		$('#formSchoolAction .errorEmail').text(schoolEmailRequired);
		result = true;
	}
	
	var phoneNumber =$('#formSchoolAction [name=phoneNumber]').val();
	if(isStringNullOrEmpty(phoneNumber)){
		$('#formSchoolAction .errorPhoneNumber').text(schoolPhoneNumberRequired);
		result = true;
	}
	
	var principal =$('#formSchoolAction [name=principal]').val();
	if(isStringNullOrEmpty(principal)){
		$('#formSchoolAction .errorPrincipal').text(schoolPrincipaleRequired);
		result = true;
	}
	
	var type =$('#formSchoolAction [name=type]').val();
	if(isStringNullOrEmpty(type)){
		$('#formSchoolAction .errorType').text(schoolTypeRequired);
		result = true;
	}
	
	var schoolType =$('#formSchoolAction [name=schoolType]').val();
	if(isStringNullOrEmpty(schoolType)){
		$('#formSchoolAction .errorSchoolType').text(schoolSchoolTypeRequired);
		result = true;
	}
	return result;
}
