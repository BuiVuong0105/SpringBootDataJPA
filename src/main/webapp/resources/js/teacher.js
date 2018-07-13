var pagination = new Pagination();
$(document).ready(() => {
	loadTable();
	search();
	initSelectBox();
	createTeacher();
	confirmActionTeacher();
});

var initSelectBox = () => {
	loadSelectSchool('.schoolSearchInformation');
	loadSelectSchool('.schoolSelect');
}

var search = () => {
	$('.searchTeacher').click(function(){
		pagination.page = 1;
		loadTable();
	});
}

var loadTable = () => {
	let name = $('.nameSearchInformation').val();
	let code = $('.codeSearchInformation').val();
	let schoolId = $('.schoolSearchInformation').val();
	searchTeacher(code, name, schoolId, pagination);
}

var searchTeacher = (code, name, schoolId, pagination) => {
	$(".loader").css("display", "block");
	$('#listTeacher table tbody').empty();
	let offset = 0;
	if(pagination.page > 1) {
		offset= ((pagination.page - 1) * pagination.size)
	}
	$.ajax({
			url : SEARCH_TEACHER,
			type : 'GET',
			data:{
				name: name,
				code: code,
				schoolId: schoolId,
				offset: offset,
				size: pagination.size
			},
			success: (data, status, xhr) => {
				let total = data.total;
				let listClazz = data.data;
				let tableContent = '';
				if(total % pagination.size != 0) {
					pagination.totalPage = Math.floor(total/pagination.size) + 1; 
				}else{
					pagination.totalPage = Math.floor(total/pagination.size);
				}
				let count = offset + 1;
				$.each(listClazz, function(index, teacher){
					var gender = teacher.gender == true ? 'Nam' : 'Nữ';
					tableContent = tableContent + '<tr class = "clear">';
						tableContent = tableContent + '<td class="col-sm-1">' + count++ + '</td>';
						tableContent = tableContent + '<td class="col-sm-2">' + teacher.name + '</td>';
						tableContent = tableContent + '<td class="col-sm-2">' + teacher.dob + '</td>';
						tableContent = tableContent + '<td class="col-sm-2">' + gender + '</td>';
						tableContent = tableContent + '<td class="col-sm-3">' + teacher.school.name + '</td>';
						tableContent = tableContent + '<td class="col-sm-2">';
							tableContent = tableContent + '<span code = "' + teacher.id + '" style="margin-right: 5px; display: inline-block; color: #5d9cec" class="btn btn-xs btn-default fa fa-pencil btn_edit_teacher" data-placement="bottom" data-tooltip="tooltip" title="Chỉnh Sửa"></span>';
							tableContent = tableContent + '<span code = "' + teacher.id + '" class="btn btn-xs btn-default fa fa-trash btn_delete_teacher" style="color: #5d9cec; margin-left:10px;" data-placement="bottom" data-tooltip="tooltip" title="Xóa"></span>';
						tableContent = tableContent + '</td>';
					tableContent = tableContent + '</tr>';
				});
				$('#listTeacher table tbody').html(tableContent);
				$('[data-tooltip="tooltip"]').tooltip();
				setPagination(pagination);
				$(".loader").css("display", "none");
			},
			error: (xhr, data) => {
				showMessage('Có lỗi xảy ra !');
				$(".loader").css("display", "none");
			}
		});
}

var createTeacher = () => {
	$('.btn_creat_teacher').click(() => {
		$(".schoolSelectDisplay").css("display", "block");
		$('#formTeacherAction [name=action]').val(CREATE);
		$('#formTeacherAction .modal-title').text('Tạo Mới Giảng Viên');
		$('#actionTeacher').modal('show');
	});
}

$(document).on('click', '.btn_edit_teacher', function(){
	$(".schoolSelectDisplay").css("display", "none");
	$('#formTeacherAction [name=action]').val(EDIT);
	$('#formTeacherAction .modal-title').text('Cập Nhật Thông Tin Giảng Viên');
	$('#actionTeacher').modal('show');
	let id = $(this).attr('code');
	$('#btn_confirm_action_teacher').attr('code', id);
	$.ajax({
		url : FIND_TEACHER_BY_ID + '/' + id,
		type : 'GET',
		success :(data, status, xhr) => {
			$('#formTeacherAction input[name=code]').val(data.code);
			$('#formTeacherAction input[name=name]').val(data.name);
			$('#formTeacherAction input[name=dob]').val(data.dob);
			$('#formTeacherAction input[name=address]').val(data.address);
			$('#formTeacherAction input[name=phonenumber]').val(data.phonenumber);
			if(data.gender == true) {
				$('input:radio[name="gender"]').filter('[value="1"]').attr('checked', true);
			}else if(data.gender == false){
				$('input:radio[name="gender"]').filter('[value="0"]').attr('checked', true);
			}

			$('#formTeacherAction input[name=email]').val(data.email);
			$('#formTeacherAction input[name=yearProfession]').val(data.yearProfession);
			$('#formTeacherAction input[name=position]').val(data.position);
			$('#formTeacherAction input[name=level]').val(data.level);
			if(data.partyMember == true) {
				$('input:radio[name="partyMember"]').filter('[value="1"]').attr('checked', true);
			}else if(data.partyMember == false){
				$('input:radio[name="partyMember"]').filter('[value="0"]').attr('checked', true);
			}
			$(".schoolSelect").empty().append('<option value='+ data.school.id+'>'+ data.school.name + '</option>').trigger('change');
		},
		error: (xhr) =>{
			showMessage('Đã có lỗi xảy ra, vui lòng xem lại !');
		}
	});
});

var confirmActionTeacher = () => {
	$("#btn_confirm_action_teacher").click(() =>{
		$('#formTeacherAction p.msgError').text(''); 
		$('#formTeacherAction .error').text(''); 
		let dataForm = $('#formTeacherAction').serialize();
		console.log(dataForm);
		let action = $('#formTeacherAction [name=action]').val();
		if(action == EDIT){
			let id = $('#btn_confirm_action_teacher').attr('code');
			url = UPDATE_TEACHER + '/' + id;
		}else if(action == CREATE){
			url = CREATE_TEACHER;
		}
		$.ajax({
			url : url,
			type : 'POST',
			data : dataForm,
			success: (data, status, xhr) => {
				$('#actionTeacher').modal('hide');
				showMessage('Cập Nhật Thành Công');
				pagination.page = 1;
				loadTable();
			},
			error: (xhr) => {
				if(xhr.status == 400){
					let data = JSON.parse(xhr.responseText);
					if(data instanceof Array){
						$.each(data, (index, result) => {
							let field = result.field;
							switch (field) {
								case 'code':
									$('#formTeacherAction .errorCode').text(errorCode);
									break;
								case 'name':
									$('#formTeacherAction .errorName').text(errorName);
									break;
								case 'dob':
									$('#formTeacherAction .errorDOB').text(errorDOB);
									break;
								case 'gender':
									$('#formTeacherAction .errorGender').text(errorGender);
									break;
								case 'address':
									$('#formTeacherAction .errorAddress').text(errorAddress);
									break;							
								case 'school.id':
									$('#formTeacherAction .errorSchool').text(errorSchool);
									break;
							}
						});
					}
					else if(data.codeError == EXIST){
						let message = '';
						if(data.message == 'code'){
							message = 'Mã đã tồn tại';
						}
						$('#formTeacherAction p.msgError').text(message); 
					}
					else if (data.codeError == SERVER_ERROR) {
						$('#actionTeacher').modal('hide');
						showMessage('Lỗi Hệ Thống');
					}
				}else{
					$('#actionTeacher').modal('hide');
					showMessage('Lỗi Hệ Thống');
				}
			}
		});
	});
}