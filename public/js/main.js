$(document).ready(function () {
  // Student event
  $("#updateBtn").click(function (e) { // Update info student
    e.preventDefault();
    const inputArr = $(".stutdent-update-input");
    const data = {
      name: inputArr[0].value === "" ? undefined : inputArr[0].value,
      birthdate: inputArr[1].value === "" ? undefined : inputArr[1].value,
      phone_number: inputArr[2].value === "" ? undefined : inputArr[2].value,
      address: inputArr[3].value === "" ? undefined : inputArr[3].value,
    };

    const part = location.pathname.split("/");
    const id = part[2];
    $.ajax({
      type: "PUT",
      url: "/students/" + id,
      data: data,
      dataType: "html",
      success: function (response) {
        location.reload();
      },
    });
  });

  $("#editStudent-btn").click(function (e) {
    $(".update-student-form").toggle();
  });

  $("#delStudent-btn").click(function (e) { // Delete Student
    e.preventDefault();
    const part = location.pathname.split("/");
    const id = part[2];
    $.ajax({
      type: "DELETE",
      url: "/students/" + id,
      dataType: "html",
      success: function (response) {
        location.replace("/students");
      },
    });
  });

  // Class event
  $("#classUpdateBtn").click(function (e) { // Update class
    e.preventDefault();
    const inputArr = $(".class-update-input");
    const data = {
      name: inputArr[0].value === "" ? undefined : inputArr[0].value,
      phone_number: inputArr[1].value === "" ? undefined : inputArr[1].value,
    };
    const part = location.pathname.split("/");
    const id = part[2];
    $.ajax({
      type: "PUT",
      url: "/class/" + id,
      data: data,
      dataType: "html",
      success: function (response) {
        location.reload();
      },
    });
  });

  $("#editClass-btn").click(function (e) {
    $(".update-class-form").toggle();
  });

  $("#delClass-btn").click(function (e) { // Delete class
    e.preventDefault();
    const part = location.pathname.split("/");
    const id = part[2];
    $.ajax({
      type: "DELETE",
      url: "/class/" + id,
      dataType: "html",
      success: function (response) {
        location.replace("/class");
      },
    });
  });

  // User event
  $("#updateUserBtn").click((e) => { // Update user
    e.preventDefault();
    const inputArr = $(".stutdent-update-input");
    const data = {
      name: inputArr[0].value === "" ? undefined : inputArr[0].value,
      birthdate: inputArr[1].value === "" ? undefined : inputArr[1].value,
      phone_number: inputArr[2].value === "" ? undefined : inputArr[2].value,
      address: inputArr[3].value === "" ? undefined : inputArr[3].value,
    };
    const part = location.pathname.split("/");
    const id = part[2];
    $.ajax({
      type: "PUT",
      url: "/users/" + id,
      data: data,
      dataType: "html",
      success: function (response) {
        location.reload();
      },
    });
  });

  $("#change-pass").click((e) => { // Change Password
    e.preventDefault();
    const inputArr = $(".change-pass-input");
    const data = {
      username: inputArr[0].value,
      password: inputArr[1].value,
    };
    $.ajax({
      type: "PUT",
      url: "/users",
      data: data,
      dataType: "html",
      success: function (response) {
        location.replace("/auth");
      },
    });
  });
});
