var pagination = new Pagination();
/**
Tìm Kiếm Khi click nut Tìm Kiếm
*/
$(document).ready(function(){
	loadTable();
	search();
});

function search(){
	$(".searchClazzIdentity").click(function(){
		loadTable();
	});
}

function loadTable(){
	var code = $(".codeSearchInformation").val();
	var name = $(".nameSearchInformation").val();
	var schoolId = $(".schoolSearchInformation").val();
	searchClazzIdentity(schoolId, code, name, pagination);
}

/**
 * Tìm kiếm lớp
 * @param offset
 * @param size
 * @returns
 */
function searchClazzIdentity(schoolId, code, name, pagination){
	$(".loader").css("display", "block");
	$('#listClazzIdentity table tbody').empty();
	var offset = 0;
	if(pagination.page > 1) {
		offset= ((pagination.page - 1) * pagination.size)
	}
	$.ajax({
		url : SEARCH_CLAZZIDENTITY,
		type : 'GET',
		data:{
			schoolId: schoolId,
			code: code,
			name: name,
			offset: offset,
			size: pagination.size
		},
		success: function(data, status, xhr){
			var total = data.total;
			var listClazzIdentity = data.data;
			var tableContent = '';
			if(total % pagination.size != 0) {
				pagination.totalPage = Math.floor(total/pagination.size) + 1; 
			}else{
				pagination.totalPage = Math.floor(total/pagination.size);
			}
			$.each(listClazzIdentity, function(index, clazzIdentity){
				tableContent = tableContent + '<tr class = "clear">';
					tableContent = tableContent + '<td class="col-sm-1">' + (offset + index+1) + '</td>';
					tableContent = tableContent + '<td class="col-sm-3">' + clazzIdentity.code + '</td>';
					tableContent = tableContent + '<td class="col-sm-3">' + clazzIdentity.name + '</td>';
					tableContent = tableContent + '<td class="col-sm-3">' + clazzIdentity.school.name + '</td>';
					tableContent = tableContent + '<td class="col-sm-2">';
						tableContent = tableContent + '<span code = "' + clazzIdentity.id + '" style="margin-right: 5px; display: inline-block; color: #5d9cec" class="btn btn-xs btn-default fa fa-pencil btn_edit_clazzIdentity" data-placement="bottom" data-tooltip="tooltip" title="Chỉnh Sửa"></span>';
						tableContent = tableContent + '<span code = "' + clazzIdentity.id + '" class="btn btn-xs btn-default fa fa-trash btn_delete_clazzIdentity" style="color: #5d9cec; margin-left:10px;" data-placement="bottom" data-tooltip="tooltip" title="Xóa"></span>';
					tableContent = tableContent + '</td>';
				tableContent = tableContent + '</tr>';
			});
			$('#listClazzIdentity table tbody').html(tableContent);
			$('[data-tooltip="tooltip"]').tooltip();
			setPagination(pagination);
			$(".loader").css("display", "none");
		},
		error: function(xhr, data){
			showMessage('Có lỗi xảy ra !');
			$(".loader").css("display", "none");
		}
	});
}


/**
 * Click vào nut tạo mới lớp thì hiện ra dialog
 * @returns
 */
$(document).on('click', '.btn_creat_clazzIdentity', function(){
	$(".schoolSelectDisplay").css("display", "block");
	$('#formClazzIdentityAction .modal-title').text('Tạo Mới Lớp Định Danh');
	$('#formClazzIdentityAction [name=action]').val(CREATE);
	$('#actionClazzIdentity').modal('show');
});

/**
 * Hủy Action
 * @returns
 */
$(document).ready(function() {
	$('#cancel_confirm_action_clazzIdentity').click(function(){
		resetSchoolForm();
	});
});

/**
 * Click vào nút xác nhận Thêm hoặc Cập Nhật
 */
$(document).ready(function(){
	$('#btn_confirm_action_clazzIdentity').click(function(){
		var dataForm = $('#formClazzIdentityAction').serialize();
		var action = $('#formClazzIdentityAction [name=action]').val();
		var url = '';
		if(action == EDIT){
			var id = $('#btn_confirm_action_clazzIdentity').attr('code');
			url = UPDATE_CLAZZIDENTITY + '/' + id;
		}else if(action == CREATE){
			url = CREATE_CLAZZIDENTITY;
		}
		$.ajax({
			url : url,
			type : 'POST',
			data : dataForm,
			success: function(data, status, xhr){
				$('#actionClazzIdentity').modal('hide');
				resetSchoolForm();
				showMessage('Cập Nhật Thành Công');
				loadTable();
			},
			error: function(xhr){
				if(xhr.status == 400){
					var data = JSON.parse(xhr.responseText);
					$('#formClazzIdentityAction p.error').text(''); 
					if(data instanceof Array){
						$.each(data, function(index, result) {
							var field = result.field;
							switch (field) {
								case 'code':
									$('#formClazzIdentityAction .errorCode').text(clazzIdentityCodeRequired);
									break;
								case 'name':
									$('#formClazzIdentityAction .errorName').text(clazzIdentityNameRequired);
									break;
								case 'school.id':
									$('#formClazzIdentityAction .errorSchool').text(clazzIdentitySchoolRequired);
								default:
									break;
							}
						});
					}else{
						if(data.codeError == EXIST){
							$('#formClazzIdentityAction p.msgError').text(data.message+' đã tồn tại'); 
						}else if(data.codeError == NOT_FOUND){
							$('#actionClazzIdentity').modal('hide');
							resetSchoolForm();
							showMessage('Sai Mã Lớp');
						}else if(data.codeError == SERVER_ERROR){
							$('#actionClazzIdentity').modal('hide');
							resetSchoolForm();
							showMessage('Đã Có lỗi xảy ra, Vui Lòng Kiểm Tra Lại !');
						}
					}
				}else{
					$('#actionClazzIdentity').modal('hide');
					resetSchoolForm();
					showMessage('Đã Có lỗi xảy ra, Vui Lòng Kiểm Tra Lại !');
				}
			}
		});
	});
});


/**
 * Click vào nút edit trên từng row thì select từ DB rồi fill vào Dialog
 * @returns
 */
$(document).on('click', '.btn_edit_clazzIdentity', function(){
	$('#formClazzIdentityAction .modal-title').text('Cập Nhật Lớp Định Danh');
	$(".schoolSelectDisplay").css("display", "none");
	resetForm('formClazzIdentityAction');
	var id = $(this).attr('code');
	$('#btn_confirm_action_clazzIdentity').attr('code', id);
	$.ajax({
		url : FIND_CLAZZIDENTITY_BY_ID + '/' + id,
		type : 'GET',
		success: function(data, status, xhr){
			$('#actionClazzIdentity').modal('show');
			setEditClazzIdentity(data);
		},
		error: function(xhr, data){
			showMessage('Có lỗi xảy ra !');
		}
	});
});

/**
 * Thiết lập thông tin của Data lên dialog
 * @param clazzIdentity
 * @returns
 */
function setEditClazzIdentity(clazzIdentity){
	$('#formClazzIdentityAction [name=action]').val(EDIT);
	$('#formClazzIdentityAction [name=code]').val(clazzIdentity.code);
	$('#formClazzIdentityAction [name=name]').val(clazzIdentity.name);
	$(".schoolSearchSelect").empty().append('<option value='+clazzIdentity.school.id+'>'+clazzIdentity.school.name+'</option>').trigger('change');
}

function validateFormActionClazzIdentity(){
	$('#formClazzIdentityAction p.error').text('');
	var code = $('#formClazzIdentityAction [name=code]').val();
	var result = false;
	if(isStringNullOrEmpty(code)){
		$('#formClazzIdentityAction .errorCode').text(clazzIdentityCodeRequired);
		result = true;
	}
	var name = $('#formClazzIdentityAction [name=name]').val();
	if(isStringNullOrEmpty(name)){
		$('#formClazzIdentityAction .errorName').text(clazzIdentityNameRequired);
		result = true;
	}
	var school = $('#formClazzIdentityAction [name="school.id"]').val();
	if(isStringNullOrEmpty(school)){
		$('#formClazzIdentityAction .errorSchool').text(clazzIdentitySchoolRequired);
		result = true;
	}
	return result;
}
/**
 * Load lên selectbox
 * @returns
 */
$(document).ready(function() { 
	loadSelectSchool('.schoolSearchSelect');
	loadSelectSchool('.schoolSearchInformation');
});

function resetSchoolForm(){
	resetForm('formClazzIdentityAction');
	$('#formClazzIdentityAction p').text('');
	$(".schoolSearchSelect").empty().trigger('change');
}

/**
* Bắt đầu click Xóa
* @returns
*/
$(document).on('click', '.btn_delete_clazzIdentity', function(){
		var id = $(this).attr('code');
		$.ajax({
			url : FIND_CLAZZIDENTITY_BY_ID + '/' + id,
			type : 'GET',
			success: function(data, status, xhr){
				$('#actionDeleteClazzIdentity p').text('Bạn có muốn xóa lớp định danh: '+data.name);
				$('#actionDeleteClazzIdentity [name=id]').val(data.id);
				$('#actionDeleteClazzIdentity').modal('show');
				
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
	$('#cancel_confirm_delete_clazzIdentity').click(function(){
		$('#actionDeleteClazzIdentity p').text(''); 
		$('#actionDeleteClazzIdentity [name=id]').val('');
	});
});

/**
 * Xác Nhận Xóa 
 */
$(document).ready(function() {
	$('#btn_confirm_delete_clazzIdentity').click(function(){
		var id = $('#actionDeleteClazzIdentity [name=id]').val();
		$.ajax({
			url : DELETE_CLAZZIDENTITY + '/' + id,
			type : 'GET',
			
			success: function(data, status, xhr){
				showMessage('Xóa Thành Công');
				$('#actionDeleteClazzIdentity').modal('hide');
				$('#actionDeleteClazzIdentity p').text(''); 
				$('#actionDeleteClazzIdentity [name=id]').val('');
				searchClazzIdentity('', '', '',  pagination);
			},
			
			error: function(xhr, data){
				showMessage('Có lỗi xảy ra !');
				$('#actionDeleteClazzIdentity').modal('hide');
				$('#actionDeleteClazzIdentity p').text(''); 
				$('#actionDeleteClazzIdentity [name=id]').val('');
			}
		});
	});
});

