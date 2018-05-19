//全局js
$(document).ready(function() {
  $(".contact-service li:eq(2)").click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, 500);
  });
});
