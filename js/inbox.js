$(function () {
  const tabContainer = document.querySelector(".search__tab-parent");
  const tabsBtn = document.querySelectorAll(".search__tab");
  const tabsContent = document.querySelectorAll(".search__content");
  const emailSearch = document.querySelector("#email-search");
  const telInput = document.querySelector("#mobile_code");

  // validation for tel number in search service
  var iti = intlTelInput(telInput, {
    separateDialCode: true,
    preventInvalidNumbers: true,
    initialCountry: "eg",
    preferredCountries: ["eg"],
    geoIpLookup: function (callback) {
      callback(getCountryCode());
    },
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
  });

  // validate the email
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  tabContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".search__tab");

    // emailSearch.value = "";
    // telInput.value = "";

    // Guard clause
    if (!clicked) return;

    // Remove active classes
    tabsBtn.forEach((t) => t.classList.remove("search__tab--active"));
    tabsContent.forEach((c) => c.classList.remove("search__content--active"));
    $("div .error").addClass("hidden");
    // Add Active class
    clicked.classList.add("search__tab--active");
    document
      .querySelectorAll(`.search__content--${clicked.dataset.tab}`)
      .forEach((item) => {
        item.classList.add("search__content--active");
      });
  });

  // Tabs in inbox page
  $("#tabs-nav li").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(".tab-content").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });

  // clicking on more button to show delete button
  $(".messages").on("click", ".more-btn", function (e) {
    e.stopPropagation();
    $(this).toggleClass("active");
    $(this).next().fadeToggle();
  });

  // delete message
  $(".messages").on("click", ".delete-btn", function (e) {
    e.stopPropagation();
    $(this).parents(".message").remove();
  });

  // share message 11-11-2023
  // $(".share-btn").click(function (event) {
  //   event.stopPropagation();
  //   $(".share-btn button").removeClass("active");
  //   $(".social-box").hide();
  //   $(this).find("button").toggleClass("active");
  //   $(this).children(".social-box").fadeToggle();
  // });

  // $(".social-box").click(function (event) {
  //   event.stopPropagation();
  // });

  $(document).click(function () {
    $(".social-box").hide();
    $(".share-btn button ,.more-btn").removeClass("active");
  });

  // submit the message
  $(".message-content").on("submit", function (e) {
    e.preventDefault();

    if ($(".search-email").is(":visible")) {
      // validate the email value
      if (!validateEmail(emailSearch.value)) {
        $("form .email-error").removeClass("hidden");
      } else {
        $("form .email-error").addClass("hidden");
        $(".send-message-modal").hide();
        $(".message-sent-success").fadeIn();
        $("#sent-person").text(emailSearch.value);
      }
    }

    if ($(".search-phone").is(":visible")) {
      var inputvalue = iti.getNumber();
      if (inputvalue == "" || !iti.isValidNumber()) {
        $(".search-phone .phone-error").removeClass("hidden");
      } else {
        $(".search-phone .phone-error").addClass("hidden");
        $(".send-message-modal").hide();
        $(".message-sent-success").fadeIn();
        $("#sent-person").text(inputvalue);
      }
    }
  });

  $(".send-box .send-btn").on("click", function () {
    emailSearch.value = "";
    telInput.value = "";
    $("#message").val("");
    $("#current").text("0");
    $("#send-message-btn").attr("disabled", true);
    $(".send-message-modal").show();
    $(".message-sent-success").hide();
  });

  // clicking on load more for received messages
  $("#loadMoreReceivedMessages").on("click", function () {
    $(this)
      .prop("disabled", true)
      .addClass("loading")
      .html("<span class='spinner'></span><span>Load More</span>");

    $(".received-messages-skeleton").show();

    setTimeout(() => {
      $(this)
        .prop("disabled", false)
        .removeClass("loading")
        .html(`<span>Load More</span>`);
      $(".received-messages-skeleton").hide();

      var messages = $(".received-messages");
      messages.append(`
              <div class="message mt-2 mt-lg-3">
                <div class="d-flex justify-content-between align-items-start gap-16">
                  <div class="d-flex gap-16">
                    <div class="icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M18.0001 14.2002C17.2566 14.2002 16.5247 14.3848 15.8702 14.7374C15.2157 15.0901 14.659 15.5998 14.2501 16.2207C13.5493 15.8787 12.7798 15.701 12.0001 15.701C11.2203 15.701 10.4508 15.8787 9.75009 16.2207C9.17345 15.3393 8.30643 14.6875 7.29945 14.3785C6.29248 14.0696 5.20911 14.1229 4.23733 14.5292C3.26555 14.9355 2.46669 15.6693 1.97937 16.6031C1.49206 17.5369 1.34703 18.6118 1.56947 19.6414C1.7919 20.6709 2.36776 21.5901 3.19711 22.2395C4.02647 22.8888 5.05698 23.2273 6.10983 23.1962C7.16268 23.1651 8.17143 22.7664 8.96104 22.0693C9.75064 21.3722 10.2713 20.4206 10.4326 19.3797C10.8565 18.9786 11.418 18.7551 12.0016 18.7551C12.5852 18.7551 13.1466 18.9786 13.5706 19.3797C13.7007 20.2316 14.0727 21.0283 14.6424 21.6749C15.2121 22.3215 15.9555 22.791 16.7842 23.0275C17.6129 23.2639 18.4921 23.2575 19.3173 23.0088C20.1424 22.7602 20.8788 22.2799 21.4389 21.6249C21.999 20.97 22.3593 20.168 22.4769 19.3142C22.5945 18.4605 22.4645 17.591 22.1023 16.809C21.7401 16.027 21.161 15.3654 20.4338 14.903C19.7066 14.4405 18.8619 14.1966 18.0001 14.2002Z"
                          fill="#014CFF" />
                        <path
                          d="M19.9998 7.19922L18.8 1.8002C18.7616 1.63079 18.6593 1.47854 18.5105 1.3692C18.3617 1.25986 18.1754 1.20016 17.9833 1.2002H6.01667C5.82456 1.20016 5.63833 1.25986 5.48952 1.3692C5.3407 1.47854 5.23842 1.63079 5.2 1.8002L4 7.2002L0.640481 10.5597C0.58825 10.6118 0.55254 10.6781 0.537818 10.7504C0.523097 10.8227 0.530018 10.8977 0.557716 10.966C0.585414 11.0344 0.632658 11.0931 0.693537 11.1347C0.754417 11.1764 0.826227 11.1992 0.899981 11.2002H23.1C23.1742 11.2003 23.2469 11.1784 23.3087 11.1372C23.3705 11.096 23.4186 11.0374 23.4471 10.9688C23.4755 10.9002 23.4829 10.8247 23.4684 10.7519C23.4539 10.679 23.4181 10.6121 23.3655 10.5597L19.9998 7.19922Z"
                          fill="#014CFF" />
                      </svg>
                    </div>
                    <div class="info">
                      <p class="user">Anonymous</p>
                      <p class="date">Yesterday</p>
                    </div>
                  </div>
                  <div class="position-relative">
                    <button class="d-flex more-btn">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9.99998 11.6668C10.9205 11.6668 11.6666 10.9206 11.6666 10.0002C11.6666 9.07969 10.9205 8.3335 9.99998 8.3335C9.07951 8.3335 8.33331 9.07969 8.33331 10.0002C8.33331 10.9206 9.07951 11.6668 9.99998 11.6668Z"
                          fill="#7D7D7D" />
                        <path
                          d="M2.49998 11.6668C3.42045 11.6668 4.16665 10.9206 4.16665 10.0002C4.16665 9.07969 3.42045 8.3335 2.49998 8.3335C1.57951 8.3335 0.833313 9.07969 0.833313 10.0002C0.833313 10.9206 1.57951 11.6668 2.49998 11.6668Z"
                          fill="#7D7D7D" />
                        <path
                          d="M17.5 11.6668C18.4205 11.6668 19.1666 10.9206 19.1666 10.0002C19.1666 9.07969 18.4205 8.3335 17.5 8.3335C16.5795 8.3335 15.8333 9.07969 15.8333 10.0002C15.8333 10.9206 16.5795 11.6668 17.5 11.6668Z"
                          fill="#7D7D7D" />
                      </svg>
                    </button>
                    <div class="delete">
                      <button class="delete-btn d-flex gap-16 align-items-center">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M7.5 2.5H12.5M2.5 5H17.5M15.8333 5L15.2489 13.7661C15.1612 15.0813 15.1174 15.7389 14.8333 16.2375C14.5833 16.6765 14.206 17.0294 13.7514 17.2497C13.235 17.5 12.5759 17.5 11.2578 17.5H8.74221C7.42409 17.5 6.76503 17.5 6.24861 17.2497C5.79396 17.0294 5.41674 16.6765 5.16665 16.2375C4.88259 15.7389 4.83875 15.0813 4.75107 13.7661L4.16667 5M8.33333 8.75V12.9167M11.6667 8.75V12.9167"
                            stroke="black" stroke-width="1.66667" stroke-linecap="round"
                            stroke-linejoin="round" />
                        </svg>
          
                        <span>Delete message</span>
                      </button>
                    </div>
                  </div>
                </div>
          
                <p class="desc my-3 text-dark">
                  You’re great. Stay awesome ♥💪
                </p>
          
                <div class="share-btn d-flex">
                  <a href="#" class="d-flex gap-8 align-items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20.7914 12.6072C21.0355 12.398 21.1575 12.2933 21.2023 12.1688C21.2415 12.0596 21.2415 11.94 21.2023 11.8308C21.1575 11.7063 21.0355 11.6016 20.7914 11.3924L12.3206 4.13178C11.9004 3.77158 11.6903 3.59148 11.5124 3.58707C11.3578 3.58323 11.2101 3.65115 11.1124 3.77103C11 3.90897 11 4.18571 11 4.73918V9.03444C8.86532 9.40789 6.91159 10.4896 5.45971 12.1137C3.87682 13.8843 3.00123 16.1757 3 18.5508V19.1628C4.04934 17.8987 5.35951 16.8763 6.84076 16.1657C8.1467 15.5392 9.55842 15.1681 11 15.0703V19.2604C11 19.8139 11 20.0906 11.1124 20.2286C11.2101 20.3485 11.3578 20.4164 11.5124 20.4125C11.6903 20.4081 11.9004 20.228 12.3206 19.8678L20.7914 12.6072Z"
                        stroke="#2C2FFE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
          
                    <span>Share on social media</span>
                  </a>
                </div>
              </div>
              `);
    }, 2000);
  });

  // clicking on load more for sent messages
  $("#loadMoreSentMessages").on("click", function () {
    $(this)
      .prop("disabled", true)
      .addClass("loading")
      .html("<span class='spinner'></span><span>Load More</span>");

    $(".sent-messages-skeleton").show();

    setTimeout(() => {
      $(this)
        .prop("disabled", false)
        .removeClass("loading")
        .html(`<span>Load More</span>`);
      $(".sent-messages-skeleton").hide();

      var messages = $(".sent-messages");
      messages.append(`
      <div class="message mt-2 mt-lg-3">
      <div class="d-flex justify-content-between align-items-start gap-16">
        <div class="d-flex gap-16">
          <div class="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V13.2C21 14.8802 21 15.7202 20.673 16.362C20.3854 16.9265 19.9265 17.3854 19.362 17.673C18.7202 18 17.8802 18 16.2 18H9.68375C9.0597 18 8.74767 18 8.44921 18.0613C8.18443 18.1156 7.9282 18.2055 7.68749 18.3285C7.41617 18.4671 7.17252 18.662 6.68521 19.0518L4.29976 20.9602C3.88367 21.2931 3.67563 21.4595 3.50054 21.4597C3.34827 21.4599 3.20422 21.3906 3.10923 21.2716C3 21.1348 3 20.8684 3 20.3355V7.8Z"
                stroke="#014CFF" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M12.5698 7L16.0698 10.5M16.0698 10.5L12.5698 14M16.0698 10.5H8.06982"
                stroke="#014CFF" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
          <div class="info">
            <p class="user">+20 100 019 3896</p>
            <p class="date">Apr 24, 2023</p>
          </div>
        </div>
        <div class="position-relative">
          <button class="d-flex more-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.99998 11.6668C10.9205 11.6668 11.6666 10.9206 11.6666 10.0002C11.6666 9.07969 10.9205 8.3335 9.99998 8.3335C9.07951 8.3335 8.33331 9.07969 8.33331 10.0002C8.33331 10.9206 9.07951 11.6668 9.99998 11.6668Z"
                fill="#7D7D7D" />
              <path
                d="M2.49998 11.6668C3.42045 11.6668 4.16665 10.9206 4.16665 10.0002C4.16665 9.07969 3.42045 8.3335 2.49998 8.3335C1.57951 8.3335 0.833313 9.07969 0.833313 10.0002C0.833313 10.9206 1.57951 11.6668 2.49998 11.6668Z"
                fill="#7D7D7D" />
              <path
                d="M17.5 11.6668C18.4205 11.6668 19.1666 10.9206 19.1666 10.0002C19.1666 9.07969 18.4205 8.3335 17.5 8.3335C16.5795 8.3335 15.8333 9.07969 15.8333 10.0002C15.8333 10.9206 16.5795 11.6668 17.5 11.6668Z"
                fill="#7D7D7D" />
            </svg>
          </button>
          <div class="delete">
            <button class="delete-btn d-flex gap-16 align-items-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.5 2.5H12.5M2.5 5H17.5M15.8333 5L15.2489 13.7661C15.1612 15.0813 15.1174 15.7389 14.8333 16.2375C14.5833 16.6765 14.206 17.0294 13.7514 17.2497C13.235 17.5 12.5759 17.5 11.2578 17.5H8.74221C7.42409 17.5 6.76503 17.5 6.24861 17.2497C5.79396 17.0294 5.41674 16.6765 5.16665 16.2375C4.88259 15.7389 4.83875 15.0813 4.75107 13.7661L4.16667 5M8.33333 8.75V12.9167M11.6667 8.75V12.9167"
                  stroke="black" stroke-width="1.66667" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>

              <span>Delete message</span>
            </button>
          </div>
        </div>
      </div>

      <p class="desc my-3 text-dark">
        It has been pleasure working with such a great
        person like yourself. You were so kind,
        professional and respectful to me and to the
        whole team. Thank you from the bottom of my
        heart ♥🥰
      </p>

      <div class="message-status d-flex">
        <p class="d-flex gap-4 align-items-center">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.00025 19.4995C8.73525 19.4995 8.48025 19.3945 8.29325 19.2065L4.29325 15.2065C3.90225 14.8155 3.90225 14.1835 4.29325 13.7925C4.68425 13.4015 5.31625 13.4015 5.70725 13.7925L8.93325 17.0185L18.2312 5.8595C18.5852 5.4355 19.2142 5.3785 19.6402 5.7315C20.0642 6.0855 20.1213 6.7155 19.7682 7.1395L9.76925 19.1395C9.58825 19.3555 9.32725 19.4855 9.04525 19.4985C9.03025 19.4985 9.01525 19.4995 9.00025 19.4995Z"
              fill="#7D7D7D" />
          </svg>

          <span>Not seen</span>
        </p>
      </div>
    </div>
              `);
    }, 2000);
  });
});
