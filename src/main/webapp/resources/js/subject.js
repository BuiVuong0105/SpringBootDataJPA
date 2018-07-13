var pagination = new Pagination();
$(document).ready(function(){
	loadTable();
	search();
	initSelectBox();
	createSubject();
	confirmActionSubject();
	confirmDeleteSubject();
});

function initSelectBox(){
	loadSelectSchool('.schoolSearchInformation');
	loadSelectGrade('.gradeSearchInformation');
	loadSelectSchool('.schoolSelect');
	loadSelectGrade('.gradeSelect');
}

function loadTable(){
	var name = $('.nameSearchInformation').val();
	var code = $('.codeSearchInformation').val();
	var gradeId = $('.gradeSearchInformation').val();
	var schoolId = $('.schoolSearchInformation').val();
	searchSubject(code, name, gradeId, schoolId, pagination);
}

function search(){
	$('.searchClazz').click(function(){
		pagination.page = 1;
		loadTable();
	});
}

function createSubject(){
	$('.btn_creat_subject').click(function(){
		$('#formSubjectAction [name=action]').val(CREATE);
		$('#formSubjectAction .modal-title').text('Tạo Mới Môn Học');
		$(".schoolSelectDisplay").css("display", "block");
		$('#actionSubject').modal('show');
		resetFormSubject();
	});
}

$(document).on('click', '.btn_edit_subject', function(){ 
	$('#formSubjectAction [name=action]').val(EDIT);
	$(".schoolSelectDisplay").css("display", "none");
	$('#formSubjectAction .modal-title').text('Cập Nhật Môn Học');
	$('#actionSubject').modal('show');
	resetFormSubject();
	var id = $(this).attr('code');
	$('#btn_confirm_action_subject').attr('code', id);
	$.ajax({
		url : FIND_SUBJECT_BY_ID + '/' + id,
		type : 'GET',
		success : function (data, status, xhr){
			$('#formSubjectAction input[name=name]').val(data.name);
			$('#formSubjectAction input[name=code]').val(data.code);
			$(".gradeSelect").empty().append('<option value='+ data.grade.id+'>'+ data.grade.name + '</option>').trigger('change');
			$(".schoolSelect").empty().append('<option value='+ data.school.id+'>'+ data.school.name + '</option>').trigger('change');
		},
		error: function(xhr){
			showMessage('Đã có lỗi xảy ra, vui lòng xem lại !');
		}
	});
});

$(document).on('click', '.btn_delete_subject', function(){ 
	var id = $(this).attr('code');
	$.ajax({
		url : FIND_SUBJECT_BY_ID + '/' + id,
		type : 'GET',
		success: function(data, status, xhr){
			$('#actionDeleteSubject p').text('Bạn có muốn xóa Môn Học: '+data.name);
			$('#actionDeleteSubject [name=id]').val(data.id);
			$('#actionDeleteSubject').modal('show');
			
		},
		error: function(xhr, data){
			showMessage('Có lỗi xảy ra !');
		}
	});
});

// Xác Nhận Xóa Subject
function confirmDeleteSubject(){
	$('#btn_confirm_delete_subject').click(function(){
		var id = $('#actionDeleteSubject [name=id]').val();
		$.ajax({
			url : DELETE_SUBJECT + '/' + id,
			type : 'GET',
			success: function(data, status, xhr){
				showMessage('Xóa Thành Công');
				$('#actionDeleteSubject').modal('hide');
				loadTable();
			},
			
			error: function(xhr, data){
				showMessage('Có lỗi xảy ra !');
				$('#actionDeleteClazz').modal('hide');
			}
		});
	});
}

function confirmActionSubject(){
	$('#btn_confirm_action_subject').click(function(){
	$('#formSubjectAction p.msgError').text(''); 
	$('#formSubjectAction .error').text(''); 
		var dataForm = $('#formSubjectAction').serialize();
		var action = $('#formSubjectAction [name=action]').val();
		if(action == EDIT){
			var id = $('#btn_confirm_action_subject').attr('code');
			url = UPDATE_SUBJECT + '/' + id;
		}else if(action == CREATE){
			url = CREATE_SUBJECT;
		}
		$.ajax({
			url : url,
			type : 'POST',
			data : dataForm,
			success: function(data, status, xhr){
				$('#actionSubject').modal('hide');
				showMessage('Cập Nhật Thành Công');
				pagination.page = 1;
				loadTable();
			},
			error: function(xhr){
				if(xhr.status == 400){
					var data = JSON.parse(xhr.responseText);
					if(data instanceof Array){
						$.each(data, function(index, result) {
							var field = result.field;
							switch (field) {
								case 'code':
									$('#formSubjectAction .errorCode').text(errorCode);
									break;
								case 'name':
									$('#formSubjectAction .errorName').text(errorName);
									break;
								case 'grade.id':
									$('#formSubjectAction .errorGrade').text(errorGrade);
									break;
								case 'school.id':
									$('#formSubjectAction .errorSchool').text(errorSchool);
									break;
							}
						});
					}
					else{
						if(data.codeError == EXIST){
							var message = '';
							if(data.message == 'code'){
								message = 'Mã đã tồn tại';
							}else if(data.message == 'name'){
								message = 'Tên đã tồn tại';
							}
							$('#formSubjectAction p.msgError').text(message); 
						}
					}

				}
			}
		});
	});
}


function resetFormSubject(){
	$('#formSubjectAction input[name="code"]').val(''); 
	$('#formSubjectAction input[name="name"]').val(''); 
	$('#formSubjectAction p.msgError').text(''); 
	$('#formSubjectAction .error').text(''); 
}

function searchSubject(code, name, gradeId, schoolId, pagination){
	$(".loader").css("display", "block");
	$('#listSubject table tbody').empty();
	var offset = 0;
	if(pagination.page > 1) {
		offset= ((pagination.page - 1) * pagination.size)
	}
	$.ajax({
			url : SEARCH_SUBJECT,
			type : 'GET',
			data:{
				name: name,
				code: code,
				gradeId: gradeId,
				schoolId: schoolId,
				offset: offset,
				size: pagination.size
			},
			success: function(data, status, xhr){
				var total = data.total;
				var listClazz = data.data;
				var tableContent = '';
				if(total % pagination.size != 0) {
					pagination.totalPage = Math.floor(total/pagination.size) + 1; 
				}else{
					pagination.totalPage = Math.floor(total/pagination.size);
				}
				var count = offset + 1;
				$.each(listClazz, function(index, subject){
					tableContent = tableContent + '<tr class = "clear">';
						tableContent = tableContent + '<td class="col-sm-1">' + count++ + '</td>';
						tableContent = tableContent + '<td class="col-sm-2">' + subject.code + '</td>';
						tableContent = tableContent + '<td class="col-sm-2">' + subject.name + '</td>';
						tableContent = tableContent + '<td class="col-sm-2">' + subject.grade.name + '</td>';
						tableContent = tableContent + '<td class="col-sm-3">' + subject.school.name + '</td>';
						tableContent = tableContent + '<td class="col-sm-2">';
							tableContent = tableContent + '<span code = "' + subject.id + '" style="margin-right: 5px; display: inline-block; color: #5d9cec" class="btn btn-xs btn-default fa fa-pencil btn_edit_subject" data-placement="bottom" data-tooltip="tooltip" title="Chỉnh Sửa"></span>';
							tableContent = tableContent + '<span code = "' + subject.id + '" class="btn btn-xs btn-default fa fa-trash btn_delete_subject" style="color: #5d9cec; margin-left:10px;" data-placement="bottom" data-tooltip="tooltip" title="Xóa"></span>';
						tableContent = tableContent + '</td>';
					tableContent = tableContent + '</tr>';
				});
				$('#listSubject table tbody').html(tableContent);
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
