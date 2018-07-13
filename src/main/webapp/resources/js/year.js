var pagination = new Pagination();
/**
Tìm Kiếm Khi click nut Tìm Kiếm
*/
$(document).ready(function(){
	loadTable();
	search();
	initSelect();
});

function loadTable(){
	var code = $(".codeSearchInformation").val();
	var name = $(".nameSearchInformation").val();
	var semester = $(".semesterSearchInformation").val();
	var schoolId = $(".schoolSearchInformation").val();
	searchYear(code, name, semester, schoolId, pagination);
}

function search(){
	$(".searchYear").click(function(){
		pagination.page = 1;
		loadTable();
	});
}
function initSelect(){
	loadSelectSchool('.schoolSearchSelect');
	loadSelectSchool('.schoolSearchInformation');
}
/**
 * Hàm Tìm Kiếm Năm Học
 */
function searchYear(code, name, semester, schoolId, pagination){
	$(".loader").css("display", "block");
	$('#listYear table tbody').empty();
	var offset = 0;
	if(pagination.page > 1) {
		offset= ((pagination.page - 1) * pagination.size)
	}
	$.ajax({
		url : SEARCH_YEAR,
		type : 'GET',
		data:{
			code: code,
			name: name,
			semester: semester,
			schoolId: schoolId,
			offset: offset,
			size: pagination.size
		},
		success: function(data, status, xhr){
			var total = data.total;
			var listYear = data.data;
			var tableContent = '';
			if(total % pagination.size != 0) {
				pagination.totalPage = Math.floor(total/pagination.size) + 1; 
			}else{
				pagination.totalPage = Math.floor(total/pagination.size);
			}
			$.each(listYear, function(index, year){
				tableContent = tableContent + '<tr class = "clear">';
					tableContent = tableContent + '<td class="col-sm-1">' + (offset + index+1) + '</td>';
					tableContent = tableContent + '<td class="col-sm-2">' + year.code + '</td>';
					tableContent = tableContent + '<td class="col-sm-2">' + year.name + '</td>';
					var semester = '';
					if(year.semester == 1){
						semester = 'Học Kỳ I';
					}

					else if(year.semester == 2){
						semester = 'Học Kỳ II';
					}
					tableContent = tableContent + '<td class="col-sm-2">' + semester + '</td>';
					tableContent = tableContent + '<td class="col-sm-3">' + year.school.name + '</td>';
					tableContent = tableContent + '<td class="col-sm-2">';
						tableContent = tableContent + '<span code = "' + year.id + '" style="margin-right: 5px; display: inline-block; color: #5d9cec" class="btn btn-xs btn-default fa fa-pencil btn_edit_year" data-placement="bottom" data-tooltip="tooltip" title="Chỉnh Sửa"></span>';
						tableContent = tableContent + '<span code = "' + year.id + '" class="btn btn-xs btn-default fa fa-trash btn_delete_year" style="color: #5d9cec; margin-left:10px;" data-placement="bottom" data-tooltip="tooltip" title="Xóa"></span>';
					tableContent = tableContent + '</td>';
				tableContent = tableContent + '</tr>';
			});
			$('#listYear table tbody').html(tableContent);
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
 * CLick vao tạo mới
 */
$(document).on('click', '.btn_creat_year', function(){
	$(".schoolSelectDisplay").css("display", "block");
	$('#formYearAction .modal-title').text('Tạo Mới Lớp Năm Học');
	$('#formYearAction [name=action]').val(CREATE);
	$('#actionYear').modal('show');
});

/**
 * Click Edit
 */
 $(document).on('click', '.btn_edit_year', function(){
 	$('#formYearAction .modal-title').text('Cập Nhật Năm Học');
 	$(".schoolSelectDisplay").css("display", "none");
	resetFormYear();
	var id = $(this).attr('code');
	$('#btn_confirm_action_year').attr('code', id);
	$.ajax({
		url : FIND_YEAR_BY_ID + '/' + id,
		type : 'GET',
		success: function(data, status, xhr){
			$('#actionYear').modal('show');
			setYear(data);
		},
		error: function(xhr, data){
			showMessage('Có lỗi xảy ra !');
		}
	});
 });

 function setYear(year){
 	$('#formYearAction [name=action]').val(EDIT);
	$('#formYearAction [name=code]').val(year.code);
	$('#formYearAction [name=name]').val(year.name);
	$('#formYearAction [name=semester]').val(year.semester);
	$(".schoolSearchSelect").empty().append('<option value='+year.school.id+'>'+year.school.name+'</option>').trigger('change');
 }

/**
 * Hủy Tạo mới hoặc cập nhật
 */
$(document).ready(function(){
	$("#btn_cancel_confirm_action_year").click(function(){
		resetFormYear();
	});
});

/**
 * Xác Nhận tạo mới hoặc cập nhật
 */
$(document).ready(function(){
	$("#btn_confirm_action_year").click(function(){
		var dataForm = $('#formYearAction').serialize();
		console.log("----------------------------");
		console.log(dataForm);
		var action = $('#formYearAction [name=action]').val();
		var url = '';
		if(action == EDIT){
			var id = $('#btn_confirm_action_year').attr('code');
			url = UPDATE_YEAR + '/' + id;
		}
		else if(action == CREATE){
			url = CREATE_YEAR;
		}
		$.ajax({
			url : url,
			type : 'POST',
			data : dataForm,
			success: function(data, status, xhr){
				$('#actionYear').modal('hide');
				resetFormYear();
				showMessage('Cập Nhật Thành Công');
				loadTable();
			},
			error: function(xhr){
				if(xhr.status == 400){
					var data = JSON.parse(xhr.responseText);
					console.log(data);
					$('#formYearAction p.error').text(''); 
					if(data instanceof Array){
						$.each(data, function(index, result) {
							var field = result.field;
							switch (field) {
								
								case 'code':
									$('#formYearAction .errorCode').text(yearCodeRequired);
									break;
								
								case 'name':
									$('#formYearAction .errorName').text(yearNameRequired);
									break;
								
								case 'semester':
									$('#formYearAction .errorSemester').text(yearSemesterRequired);
									break;
								
								case 'school.id':
									$('#formYearAction .errorSchool').text(yearSchoolRequired);
									break;
								default:
									break;
							}
						});
					}
					else{
						if(data.codeError == EXIST){
							$('#formYearAction p.msgError').text(data.message+' đã tồn tại'); 
						}
						else if(data.codeError == NOT_FOUND){
							$('#actionYear').modal('hide');
							resetFormYear();
							showMessage('Sai Mã Lớp');
						}
						else if(data.codeError == SERVER_ERROR){
							$('#actionYear').modal('hide');
							resetFormYear();
							showMessage('Đã Có lỗi xảy ra, Vui Lòng Kiểm Tra Lại !');
						}
					}
				}
				else{
					$('#actionYear').modal('hide');
					resetFormYear();
					showMessage('Đã Có lỗi xảy ra, Vui Lòng Kiểm Tra Lại !');
				}
			}			
		});
	});
});


/**
 * Reset Form Year
 */
 function resetFormYear(){
 	resetForm('formYearAction');
 	$('#formYearAction p').text('');
	$(".schoolSearchSelect").empty().trigger('change');
 }

 /**
  * Validate form
  */
  function validateFormYear(){
  	$("#formYearAction p.error").text('');
  	var result = false;
  	var code = $('#formYearAction [name=code]').val();
  	if(isStringNullOrEmpty(code)){
		$('#formYearAction .errorCode').text(yearCodeRequired);
		result = true;
	}
	var name = $('#formYearAction [name=name]').val();
	if(isStringNullOrEmpty(name)){
		$('#formYearAction .errorName').text(yearNameRequired);
		result = true;
	}
	var semester = $('#formYearAction [name=semester]').val();
	if(isStringNullOrEmpty(semester)){
		$('#formYearAction .errorName').text(yearSemesterRequired);
		result = true;
	}
	var school = $('#formYearAction [name="school.id"]').val();
	if(isStringNullOrEmpty(school)){
		$('#formYearAction .errorSchool').text(yearSchoolRequired);
		result = true;
	}
  }

  $(document).on('click', '.btn_delete_year', function(){
  	var id = $(this).attr('code');
	$.ajax({
		url : FIND_YEAR_BY_ID + '/' + id,
		type : 'GET',
		success: function(data, status, xhr){
			$('#actionDeleteYear p').text('Bạn có muốn xóa năm học: '+data.code);
			$('#actionDeleteYear [name=id]').val(data.id);
			$('#actionDeleteYear').modal('show');		
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
	$('#cancel_confirm_delete_year').click(function(){
		$('#actionDeleteYear p').text(''); 
		$('#actionDeleteYear [name=id]').val('');
	});
});
/**
 * Xác Nhận Xóa 
 */
$(document).ready(function() {
	$('#btn_confirm_delete_year').click(function(){
		var id = $('#actionDeleteYear [name=id]').val();
		$.ajax({
			url : DELETE_YEAR + '/' + id,
			type : 'GET',
			success: function(data, status, xhr){
				showMessage('Xóa Thành Công');
				$('#actionDeleteYear').modal('hide');
				$('#actionDeleteYear p').text(''); 
				$('#actionDeleteYear [name=id]').val('');
				loadTable();
			},
			error: function(xhr, data){
				showMessage('Có lỗi xảy ra !');
				$('#actionDeleteYear').modal('hide');
				$('#actionDeleteYear p').text(''); 
				$('#actionDeleteYear [name=id]').val('');
			}
		});
	});
});
