$(document).ready(function () {
  // show and hide password when click on eye icon
  $(document).on("click", ".toggle-password", function () {
    $(this).toggleClass("show");
    var input = $(this).prev().prev();

    input.attr("type") === "password"
      ? input.attr("type", "text")
      : input.attr("type", "password");
  });

  $("#new-password").on("keyup paste change", getPassword);

  // check password strength
  function getPassword() {
    var text = $("#new-password").val();

    var length = $("#length");
    var uppercase = $("#uppercase");
    var number = $("#number");
    var special = $("#special");
    checkIfEightChar(text)
      ? length.addClass("list-group-item-success")
      : length.removeClass("list-group-item-success");

    checkIfOneUppercase(text)
      ? uppercase.addClass("list-group-item-success")
      : uppercase.removeClass("list-group-item-success");
    checkIfOneDigit(text)
      ? number.addClass("list-group-item-success")
      : number.removeClass("list-group-item-success");
    checkIfOneSpecialChar(text)
      ? special.addClass("list-group-item-success")
      : special.removeClass("list-group-item-success");

    if (
      checkIfEightChar(text) &&
      checkIfOneUppercase(text) &&
      checkIfOneDigit(text) &&
      checkIfOneSpecialChar(text)
    ) {
      $("#reset-password-btn").prop("disabled", false);
      // $("#reset-password-form").submit();
    }
  }

  function checkIfEightChar(text) {
    return text.length >= 10;
  }

  function checkIfOneUppercase(text) {
    return /[A-Z]/.test(text);
  }

  function checkIfOneDigit(text) {
    return /[0-9]/.test(text);
  }

  function checkIfOneSpecialChar(text) {
    return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(text);
  }

  // submit form
  $("#reset-password-form").on("submit", function (e) {
    e.preventDefault();
    // password
    var passwordValue = $("#new-password").val();

    if ($("#new-password").val() !== $("#confirm-password").val()) {
      $(this)
        .find(".confirm-password-error")
        .addClass("show-error")
        .find("span")
        .text(`Passwords do NOT match`);
      return;
    } else {
      $(this).find(".confirm-password-error").removeClass("show-error");
    }
    if (!$("#popover-password-top").hasClass("show-error")) {
      $(this)
        .find("#reset-password-btn")
        .addClass("loading")
        .html(
          "<span class='spinner mx-2'></span><span>resetting password</span>"
        );
      setTimeout(() => {
        $(this)
          .find("#reset-password-btn")
          .removeClass("loading")
          .html("<span>Reset Password</span>");
        $(".reset-content").hide();
        $(".password-reset-success").show();
      }, 1500);
    }
  });
});
