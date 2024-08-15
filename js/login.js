$(document).ready(function () {
  // show and hide password when click on eye icon
  $(document).on("click", ".toggle-password", function () {
    $(this).toggleClass("show");

    var input = $(this).prev("input");
    input.attr("type") === "password"
      ? input.attr("type", "text")
      : input.attr("type", "password");
  });

  // reset password => check strength of password
  $("#new-password").keyup(function () {
    var password = $("#new-password").val();
    checkStrength(password);
    console.log(checkStrength(password));
  });

  // function passCondition(this) {
  //   console.log(this);

  //   this.parent("li").addClass("text-success");
  //     this.find('span')
  //       .removeClass("icon-stop_circle")
  //       .addClass("icon-check_circle_outline");
  //     $("#popover-password-top").removeClass("show-error");
  // }

  function checkStrength(password) {
    $("#reset-password-form").find(".password-error").removeClass("show-error");
    //If password contains both lower and uppercase characters, increase strength value.
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      $(".low-upper-case").parent("li").addClass("text-success");
      $(".low-upper-case span").html(`
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="10" fill="#5856D6"/>
          <path d="M7 11L9 13L14.25 7.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `);
      $("#popover-password-top").removeClass("show-error");
    } else {
      $(".low-upper-case").parent("li").removeClass("text-success");
      $(".low-upper-case span").html(
        `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9.5" stroke="#9E9EAB"/>
          <path d="M8 10H12" stroke="#62626B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `
      );
      $("#popover-password-top").addClass("show-error");
    }

    //If it has numbers and characters, increase strength value.
    if (password.match(/([0-9])/)) {
      $(".one-number").parent("li").addClass("text-success");
      $(".one-number span").html(`
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="10" fill="#5856D6"/>
          <path d="M7 11L9 13L14.25 7.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `);
      $("#popover-password-top").removeClass("show-error");
    } else {
      $(".one-number").parent("li").removeClass("text-success");
      $(".one-number span").html(
        `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9.5" stroke="#9E9EAB"/>
          <path d="M8 10H12" stroke="#62626B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `
      );
      $("#popover-password-top").addClass("show-error");
    }

    //If it has one special character, increase strength value.
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      $(".one-special-char").parent("li").addClass("text-success");
      $(".one-special-char span").html(`
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="10" fill="#5856D6"/>
          <path d="M7 11L9 13L14.25 7.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `);
      $("#popover-password-top").removeClass("show-error");
    } else {
      $(".one-special-char").parent("li").removeClass("text-success");
      $(".one-special-char span").html(
        `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9.5" stroke="#9E9EAB"/>
          <path d="M8 10H12" stroke="#62626B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `
      );
      $("#popover-password-top").addClass("show-error");
    }

    // A minimum of 12 characters
    if (password.length > 11) {
      $(".eight-character").parent("li").addClass("text-success");
      $(".eight-character span").html(`
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="10" fill="#5856D6"/>
          <path d="M7 11L9 13L14.25 7.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `);
      $("#popover-password-top").removeClass("show-error");
    } else {
      $(".eight-character").parent("li").removeClass("text-success");
      $(".eight-character span").html(
        `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9.5" stroke="#9E9EAB"/>
          <path d="M8 10H12" stroke="#62626B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `
      );
      $("#popover-password-top").addClass("show-error");
    }
  }

  $("#reset-password-form").on("submit", function (e) {
    e.preventDefault();
    // password
    var passwordValue = $("#new-password").val();
    if (passwordValue != "") {
      $(this).find(".password-error").removeClass("show-error");
    } else {
      $(this)
        .find(".password-error")
        .addClass("show-error")
        .find("span")
        .text(`Password is required`);
      $("#popover-password-top").removeClass("show-error");
      return;
    }

    if ($("#new-password").val() !== $("#confirm-password").val()) {
      $(this)
        .find(".confirm-password-error")
        .addClass("show-error")
        .find("span")
        .text(`confirm password not match the password`);
      return;
    } else {
      $(this).find(".confirm-password-error").removeClass("show-error");
    }

    if (
      !$("#popover-password-top").hasClass("show-error") &&
      passwordValue != ""
    ) {
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
      }, 1500);
    }
  });
});
