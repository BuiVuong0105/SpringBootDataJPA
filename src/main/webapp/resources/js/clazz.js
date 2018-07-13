let pagination = new Pagination();

// Load Content
$(document).ready(function(){
	//Load Table
	loadTable();
	// click nut search
	search();
	// khoi tao select box
	initSelectBox();
	// Bắt đầu click tạo mới
	createClazz();
	// Thực thi thêm hoặc sửa clazz
	confirmActionClazz();
	// Xoas Clazz
	deleteClazz();
});

function initSelectBox(){
	// load School Select
	loadSelectSchool('.schoolSearchInformation');
	// Load GradeClazzIdentitySelect Search
	loadSelectGrade('.gradeSearchInformation');
	// Load Select Năm Học Để Tìm Kiếm Load Bảng
	loadSelectYear('.yearSearchInformation', '.schoolSearchInformation');
	// Load Select Trường Học Để Tìm Kiếm Load Bảng
	selectSchoolChangeValue('.schoolSearchInformation', '.yearSearchInformation');

	// Load GradeClazzIdentitySelect insert update
	loadSelectGrade('.gradeSearchSelect');
	// load select school dialog insert update
	loadSelectSchool('.schoolSearchSelect');
	// Load Select Năm Học Để Insert
	loadSelectYear('.yearSearchSelect', '.schoolSearchSelect');
	// Load Select Khối Lớp
	loadSelectGradeClazzIdentity('.gradeClazzIdentitySearchSelect', '.schoolSearchSelect');

	
	selectSchoolChangeValue('.schoolSearchSelect', '.yearSearchSelect');
	selectSchoolChangeValue('.schoolSearchSelect', '.gradeClazzIdentitySearchSelect');
}

function search(){
	$('.searchClazz').click(function(){
		loadTable();
	});
}

function loadTable(){
	var name = $('.nameSearchInformation').val();
	var gradeId = $('.gradeSearchInformation').val();
	var schoolId = $('.schoolSearchInformation').val();
	var yearId = $('.yearSearchInformation').val();
    searchClazz(name, gradeId, yearId, schoolId, pagination);
}

function selectSchoolChangeValue(schoolClazzName, yearClazzName){
	$(schoolClazzName).on('select2:selecting', function(){
		$(yearClazzName).empty().trigger('change');
	});
}

function searchClazz(name, gradeId, yearId, schoolId, pagination){
	$(".loader").css("display", "block");
	$('#listClazz table tbody').empty();
	var offset = 0;
	if(pagination.page > 1) {
		offset= ((pagination.page - 1) * pagination.size)
	}
	$.ajax({
			url : SEARCH_CLAZZ,
			type : 'GET',
			data:{
				name: name,
				gradeId: gradeId,
				yearId: yearId,
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
				$.each(listClazz, function(index, clazz){
					tableContent = tableContent + '<tr class="clear">';
						tableContent = tableContent + '<td class="col-sm-1">' + (offset + index+1) + '</td>';
						tableContent = tableContent + '<td class="col-sm-2">' + clazz.gradeClazzIdentity.name + '</td>';
						tableContent = tableContent + '<td class="col-sm-2">' + clazz.year.name + '</td>';
						tableContent = tableContent + '<td class="col-sm-2">' + clazz.year.semester + '</td>';
						tableContent = tableContent + '<td class="col-sm-3">' + clazz.gradeClazzIdentity.clazzIdentity.school.name + '</td>';
						tableContent = tableContent + '<td class="col-sm-2">';
							tableContent = tableContent + '<span code = "' + clazz.id + '" style="margin-right: 5px; display: inline-block; color: #5d9cec" class="btn btn-xs btn-default fa fa-pencil btn_edit_clazz" data-placement="bottom" data-tooltip="tooltip" title="Chỉnh Sửa"></span>';
							tableContent = tableContent + '<span code = "' + clazz.id + '" class="btn btn-xs btn-default fa fa-trash btn_delete_clazz" style="color: #5d9cec; margin-left:10px;" data-placement="bottom" data-tooltip="tooltip" title="Xóa"></span>';
						tableContent = tableContent + '</td>';
					tableContent = tableContent + '</tr>';
				});
				$('#listClazz table tbody').html(tableContent);
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

// click tạo mới
function createClazz(){
	$('.btn_creat_clazz').click(function(){
		$('#formClazzAction p.msgError').text(''); 
		$('#formClazzAction [name=action]').val(CREATE);
		$('#formClazzAction .modal-title').text('Tạo Mới Lớp Cho Khối Trong Trường Học');

		$('.gradeClazzIdentitySearchSelect').attr("disabled", true);
		$('.gradeClazzIdentity').css("display", 'none');

		$('.gradeSearchSelect').attr("disabled", false);
		$('.grade').css("display", 'block');

		$(".schoolSelectDisplay").css("display", "block");

		$('#actionClazz').modal('show');


	});
}

// click cập nhật
$(document).on('click', '.btn_edit_clazz', function(){
	$('#formClazzAction p.msgError').text(''); 
	$('#formClazzAction [name=action]').val(EDIT);
	$('#formClazzAction .modal-title').text('Cập Nhật Khóa Học');

	$('.gradeClazzIdentitySearchSelect').attr("disabled", false);
	$('.gradeClazzIdentity').css("display", 'block');

	$('.gradeSearchSelect').attr("disabled", true);
	$('.grade').css("display", 'none');

	$(".schoolSelectDisplay").css("display", "none");

	$('#actionClazz').modal('show');



	var id = $(this).attr('code');
	$('#btn_confirm_action_clazz').attr('code', id);
	$.ajax({
		url : FIND_CLAZZ_BY_ID + '/' + id,
		type : 'GET',
		success : function (data, status, xhr){
			$(".schoolSearchSelect").empty().append('<option value='+ data.gradeClazzIdentity.clazzIdentity.school.id+'>'+ data.gradeClazzIdentity.clazzIdentity.school.name + '</option>').trigger('change');
			$(".gradeClazzIdentitySearchSelect").empty().append('<option value='+ data.gradeClazzIdentity.id+'>'+ data.gradeClazzIdentity.name + '</option>').trigger('change');
			var semester = data.year.semester == 1 ? ' - Học Kỳ I' : ' - Học Kỳ II';
			$(".yearSearchSelect").empty().append('<option value='+ data.year.id+'>'+ data.year.name + semester +  '</option>').trigger('change');
		},
		error: function(xhr){
			showMessage('Đã có lỗi xảy ra, vui lòng xem lại !');
		}
	});
});



// xác nhận cập nhật
function confirmActionClazz(){
	$('#btn_confirm_action_clazz').click(function(){
		var dataForm = $('#formClazzAction').serialize();
		var action = $('#formClazzAction [name=action]').val();
		if(action == EDIT){
			var id = $('#btn_confirm_action_clazz').attr('code');
			url = UPDATE_Clazz + '/' + id;
			if(validateFormUpdateClazz()){
				return;
			}

		}else if(action == CREATE){
			url = CREATE_Clazz;
		}
		$.ajax({
			url : url,
			type : 'POST',
			data : dataForm,
			success: function(data, status, xhr){
				$('#actionClazz').modal('hide');
				showMessage('Cập Nhật Thành Công');
				pagination.page = 1;
				loadTable();
			},
			error: function(xhr){
				if(xhr.status == 400){
					var data = JSON.parse(xhr.responseText);
					if(data.codeError == REQUIRED){
						$('#formClazzAction p.msgError').text(data.message); 
					}
					else if(data.codeError == EXIST){
						$('#formClazzAction p.msgError').text(data.message); 
					}
				}
			}
		});
	});
}
// Validate form update Clazz
function validateFormUpdateClazz(){

	var result = false;
	var gradeClazzIdentityId = $('.gradeClazzIdentitySearchSelect').val();
	var yearId = $('.yearSearchSelect').val();

	if(isStringNullOrEmpty(gradeClazzIdentityId)){
		$('#formClazzAction .errorGradeClazzIdentity').text(errorGradeClazzIdentity);
		result = true;
	}

	if(isStringNullOrEmpty(yearId)){
		$('#formClazzAction .errorYear').text(errorYear);
		result = true;
	}

	return result;
}
// Hỏi Xóa Clazz
$(document).on('click', '.btn_delete_clazz', function(){
	var id = $(this).attr('code');
	$.ajax({
		url : FIND_CLAZZ_BY_ID + '/' + id,
		type : 'GET',
		success: function(data, status, xhr){
			$('#actionDeleteClazz p').text('Bạn có muốn xóa Lớp: '+data.gradeClazzIdentity.name);
			$('#actionDeleteClazz [name=id]').val(data.id);
			$('#actionDeleteClazz').modal('show');
			
		},
		error: function(xhr, data){
			showMessage('Có lỗi xảy ra !');
		}
		});
});

// Xác Nhận Xóa Clazz
function deleteClazz(){
	$('#btn_confirm_delete_clazz').click(function(){
		var id = $('#actionDeleteClazz [name=id]').val();
		$.ajax({
			url : DELETE_Clazz + '/' + id,
			type : 'GET',
			success: function(data, status, xhr){
				showMessage('Xóa Thành Công');
				$('#actionDeleteClazz').modal('hide');
				$('#actionDeleteClazz p').text(''); 
				$('#actionDeleteClazz [name=id]').val('');
				loadTable();
			},
			
			error: function(xhr, data){
				showMessage('Có lỗi xảy ra !');
				$('#actionDeleteClazz').modal('hide');
				$('#actionDeleteClazz p').text(''); 
				$('#actionDeleteClazz [name=id]').val('');
			}
		});
	});
}
