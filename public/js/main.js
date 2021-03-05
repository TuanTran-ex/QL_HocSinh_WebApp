$(document).ready(function () {
  $('#changeTeacherForm').css({"display": "none"});
  $('#addStudentForm').css({"display": "none"});
  
  // Student event
  $('#createStudent-btn').click((e) => {
    e.preventDefault();
    const inputArr = $(
      '#creatStudent-form > input, #creatStudent-form > select'
    );
    const data = {
      class_id: inputArr[0].value,
      student_name: inputArr[1].value,
      phone_number: inputArr[2].value,
      birthdate: inputArr[3].value,
      address: inputArr[4].value,
      role: "student",
    };
    $.ajax({
      type: 'POST',
      url: '/students/create',
      data: data,
      dataType: 'json',
      success: function (response) {
        location.replace('/students');
      },
      error: function (err) {
        if (err.responseJSON.code === 10) Output('Username or StudentName đã tồn tại. Mời nhập lại')
        else Output('Dữ liệu nhập bị sai. Mời nhập lại');
      },
    });
  });

  $('#updateStudentBtn').click(function (e) {
    e.preventDefault();
    const inputArr = $('#update-student-form > input');
    const data = {
      name: inputArr[0].value === '' ? undefined : inputArr[0].value,
      birthdate: inputArr[1].value === '' ? undefined : inputArr[1].value,
      phone_number: inputArr[2].value === '' ? undefined : inputArr[2].value,
      address: inputArr[3].value === '' ? undefined : inputArr[3].value,
    };

    const part = location.pathname.split('/');
    const id = part[2];
    $.ajax({
      type: 'PUT',
      url: '/students/' + id,
      data: data,
      dataType: 'html',
      success: function (response) {
        location.reload();
      },
      error: function (err) {
        Output('Dữ liệu nhập bị sai. Mời nhập lại');
      },
    });
  });

  $('#editBtn').click(function (e) {
    $('#update-student-form').toggle();
  });

  $('#delStudent-btn').click(function (e) {
    e.preventDefault();
    const part = location.pathname.split('/');
    const id = part[2];
    $.ajax({
      type: 'DELETE',
      url: '/students/' + id,
      dataType: 'html',
      success: function (response) {
        location.replace('/students');
      },
      error: function (error) {
        alert('Không thể xóa student');
      },
    });
  });

  // Teacher event
  $('#createTeacher-btn').click((e) => {
    e.preventDefault();
    const inputArr = $(
      '#creatTeacher-form > input, #creatTeacher-form > select'
    );
    const data = {
      teacher_name: inputArr[0].value,
      phone_number: inputArr[1].value,
      birthdate: inputArr[2].value,
      address: inputArr[3].value,
      role: 'teacher',
    };
    $.ajax({
      type: 'POST',
      url: '/teachers/create',
      data: data,
      dataType: 'json',
      success: function (response) {
        location.replace('/teachers');
      },
      error: function (err) {
        if (err.responseJSON.code === 10) Output('Username or TeacherName đã tồn tại. Mời nhập lại')
        else Output('Dữ liệu nhập bị sai. Mời nhập lại');
      },
    });
  });

  $('#updateTeacherBtn').click(function (e) {
    e.preventDefault();
    const inputArr = $('#update-teacher-form > input');
    const data = {
      name: inputArr[0].value === '' ? undefined : inputArr[0].value,
      birthdate: inputArr[1].value === '' ? undefined : inputArr[1].value,
      phone_number: inputArr[2].value === '' ? undefined : inputArr[2].value,
      address: inputArr[3].value === '' ? undefined : inputArr[3].value,
    };

    const part = location.pathname.split('/');
    const id = part[2];
    $.ajax({
      type: 'PUT',
      url: '/teachers/' + id,
      data: data,
      dataType: 'html',
      success: function (response) {
        location.reload();
      },
      error: function (err) {
        Output('Dữ liệu nhập bị sai. Mời nhập lại');
      },
    });
  });

  $('#editBtn').click(function (e) {
    $('#update-teacher-form').toggle();
  });

  $('#delTeacher-btn').click(function (e) {
    e.preventDefault();
    const part = location.pathname.split('/');
    const id = part[2];
    $.ajax({
      type: 'DELETE',
      url: '/teachers/' + id,
      dataType: 'html',
      success: function (response) {
        location.replace('/teachers');
      },
      error: function (error) {
        alert('Không thể xóa student');
      },
    });
  });

  // Class event
  $('#createClass-btn').click((e) => {
    e.preventDefault();
    const input = $('#createClass-form > input');
    data = {
      class_name: input[0].value,
      phone_number: input[1].value,
    };
    $.ajax({
      type: 'POST',
      url: '/class/create',
      data: data,
      dataType: 'json',
      success: function (response) {
        location.replace('/class');
      },
      error: function (err) {
        Output('Dữ liệu nhập bị sai. Mời nhập lại');
      },
    });
  });

  $('#delClass-btn').click(function (e) {
    e.preventDefault();
    const part = location.pathname.split('/');
    const id = part[2];
    $.ajax({
      type: 'DELETE',
      url: '/class/' + id,
      dataType: 'html',
      success: function (response) {
        location.replace('/class');
      },
      error: function (err) {
        alert('Khong the xoa class');
      },
    });
  });

  $('#updateClassBtn').click(function (e) {
    e.preventDefault();
    const inputArr = $('.class-update-input');
    const data = {
      name: inputArr[0].value === '' ? undefined : inputArr[0].value,
      phone_number: inputArr[1].value === '' ? undefined : inputArr[1].value,
    };
    const part = location.pathname.split('/');
    const id = part[2];
    $.ajax({
      type: 'PUT',
      url: '/class/' + id,
      data: data,
      dataType: 'html',
      success: function (response) {
        location.reload();
      },
      error: function (err) {
        Output('Dữ liệu nhập sai. Mời nhập lại');
      },
    });
  });

  $('#editBtn').click(function (e) {
    $('#update-class-form').toggle();
  });
  
  $('#changeTeacherBtn').click(function (e) {
    $('#changeTeacherForm').toggle();
  })
  
  $('#changeTeacherSubmit').click(function (e) {
    e.preventDefault();
    const input = $('#changeTeacherForm > select');
    const data = {
      teacherID: input[0].value,
    };
    const part = location.pathname.split('/');
    const id = part[2];
    $.ajax({
      type: "PUT",
      url: "/class/" + id,
      data: data,
      dataType: 'html',
      success: function (response) {
        location.reload();
      }
    });
  })

  $('#addStudentBtn').click(function (e) {
    $('#addStudentForm').toggle();
  })

  $('#addStudentSubmit').click(function (e) { 
    e.preventDefault();
    const input = $('#addStudentForm > select');
    const part = location.pathname.split('/');
    const id = part[2];
    const data = {
      classID: id,
    }
    $.ajax({
      type: "PUT",
      url: "/students/" + input[0].value,
      data: data,
      dataType: "html",
      success: function (response) {
        location.reload();
      }
    });
  });

  $('.removeStudent').click(function (e) { 
    e.preventDefault();
    const data = {
      classID: null,
    }
    const studentID = $(this).val();
    $.ajax({
      type: "PUT",
      url: "/students/" + studentID,
      data: data,
      dataType: "html",
      success: function (response) {
        location.reload();
      },
      error: function (err) {
        alert('Không thể xóa student');
      },
    });
  })

  // User event
  $('#updateUserBtn').click((e) => {
    e.preventDefault();
    const inputArr = $('.stutdent-update-input');
    const data = {
      name: inputArr[0].value === '' ? undefined : inputArr[0].value,
      birthdate: inputArr[1].value === '' ? undefined : inputArr[1].value,
      phone_number: inputArr[2].value === '' ? undefined : inputArr[2].value,
      address: inputArr[3].value === '' ? undefined : inputArr[3].value,
    };
    const part = location.pathname.split('/');
    const id = part[2];
    $.ajax({
      type: 'PUT',
      url: '/users/' + id,
      data: data,
      dataType: 'json',
      success: function (response) {
        location.reload();
      },
      error: function (error) {
        Output('Dữ liệu nhập bị sai. Mời nhập lại');
      },
    });
  });

  $('#change-pass').click((e) => {
    e.preventDefault();
    const inputArr = $('.change-pass-input');
    if (inputArr[1].value != inputArr[2].value) 
      Output('Mật khẩu xác nhận không đúng. Mời nhập lại')
    else {
      const data = {
        oldPass: inputArr[0].value,
        newPass: inputArr[1].value,
      };
      $.ajax({
        type: 'PUT',
        url: '/users',
        data: data,
        dataType: 'json',
        success: function (response) {
          location.replace('/auth');
        },
        error: function (err) {
          if (err.responseJSON.code === 10)
            Output('Old password không chính xác. Mời nhập lại');
          else if (err.responseJSON.code === 8)
            Output('Nhập dữ liệu không đúng định dạng. Mời nhập lại')
          else Output('Lỗi chưa xác định');
        },
      });
    }
  });

  // Login event
  $('#loginBtn').click((e) => {
    e.preventDefault();
    const inputArr = $('#login-form > input');
    const data = {
      username: inputArr[0].value,
      password: inputArr[1].value,
    };
    $.ajax({
      type: 'POST',
      url: '/auth/login',
      data: data,
      dataType: 'json',
      success: function (response) {
        if (response.code == 5) {
          alert('Bạn đăng nhập lần đầu. Mời thay đổi password');
          location.replace('/users/changepass');
        } 
        else if (response.data.user.role === 'admin') location.replace('/admin');
        else location.replace(`/users/${response.data.user._id}`);
      },
      error: function (error) {
        Output('Sai username hoặc password. Mời nhập lại');
      },
    });
  });

  $('#registerBtn').click((e) => {
    e.preventDefault();
    const inputArr = $('#register-form > input, #register-form > select');
    const data = {
      username: inputArr[0].value,
      password: inputArr[1].value,
      id: inputArr[2].value,
      role: inputArr[3].value,
    };
    $.ajax({
      type: 'POST',
      url: '/auth',
      data: data,
      dataType: 'json',
      success: function (response) {
        location.replace('/auth');
      },
      error: function (error) {
        const res = error.responseJSON;
        if (res.code === 10) Output('Username đã tồn tại. Mời nhập lại');
        else Output('Dữ liệu không đúng điều kiện. Mời nhập lại');
      },
    });
  });

  $('#forgotPass-btn').click((e) => {
    e.preventDefault();
    const inputArr = $('#forgotPass-form > input');
    const data = {
      username: inputArr[0].value,
      newpass: inputArr[1].value,
    };
    $.ajax({
      type: 'POST',
      url: '/auth/forgotpass',
      data: data,
      dataType: 'json',
      success: function (response) {
        location.replace('/auth');
      },
      error: function (error) {
        Output('Dữ liệu không đúng điều kiện. Mời nhập lại');
      },
    });
  });
});

function Output(err) {
  $('#alert').css('display', 'block');
  $('#alert').html(err);
  $('input').focus(function () {
    $('#alert').css('display', 'none');
  })
}
