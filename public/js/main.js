$(document).ready(function () {
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
        console.log(err);
        Output('Dữ liệu nhập bị sai. Mời nhập lại');
      },
    });
  });

  $('#updateBtn').click(function (e) {
    e.preventDefault();
    const inputArr = $('.student-update-input');
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

  $('#editStudent-btn').click(function (e) {
    $('.update-student-form').toggle();
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

  $('#classUpdateBtn').click(function (e) {
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

  $('#editClass-btn').click(function (e) {
    $('.update-class-form').toggle();
  });

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
        console.log(error);
        Output('Dữ liệu nhập bị sai. Mời nhập lại');
      },
    });
  });

  $('#change-pass').click((e) => {
    e.preventDefault();
    const inputArr = $('.change-pass-input');
    const data = {
      username: inputArr[0].value,
      password: inputArr[1].value,
    };
    $.ajax({
      type: 'PUT',
      url: '/users',
      data: data,
      dataType: 'html',
      success: function (response) {
        location.replace('/auth');
      },
      error: function (error) {
        Output('Sai username hoặc password. Mời nhập lại');
      },
    });
  });

  // Login event
  $('#loginBtn').click((e) => {
    e.preventDefault();
    const inputArr = $('#login-form > input');
    const data = {
      username: inputArr[0].value,
      password: inputArr[1].value,
    };
    const cookie = document.cookie;
    console.log(cookie);
    $.ajax({
      type: 'POST',
      url: '/auth/login',
      data: data,
      dataType: 'json',
      success: function (response) {
        if (response.admin) location.replace('/admin');
        else location.replace(`/users/${response.data.user._id}`);
      },
      error: function (error) {
        Output('Sai username hoặc password. Mời nhập lại');
      },
    });
  });

  $('#registerBtn').click((e) => {
    e.preventDefault();
    const inputArr = $('#register-form > input');
    const data = {
      username: inputArr[0].value,
      password: inputArr[1].value,
      studentID: inputArr[2].value,
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
        if (res.code === 409) Output('Username đã tồn tại. Mời nhập lại');
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
}
