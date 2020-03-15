"use strict";

// 全局js
$(document).ready(function () {
  $.extend($.validator.messages, {
    required: "此字段必填",
    remote: "请修正此字段",
    email: "请输入有效的电子邮件地址",
    url: "请输入有效的网址",
    date: "请输入有效的日期",
    dateISO: "请输入有效的日期 (YYYY-MM-DD)",
    number: "请输入有效的数字",
    digits: "只能输入整数",
    creditcard: "请输入有效的信用卡号码",
    equalTo: "你的输入不相同",
    extension: "请输入有效的后缀",
    maxlength: $.validator.format("最多可以输入 {0} 个字符"),
    minlength: $.validator.format("最少要输入 {0} 个字符"),
    rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
    range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
    max: $.validator.format("请输入不大于 {0} 的数值"),
    min: $.validator.format("请输入不小于 {0} 的数值")
  });

  //滚动条
  var scrollBars = ['goods-publish-form', 'app-nav', 'already-add-goods-list'];
  for (var i = 0; i < scrollBars.length; i++) {
    var el = '.' + scrollBars[i];
    $(el).scrollBar({
      barWidth: 10,
      position: "y",
      wheelDis: 15
    });
  }
  //日期控件
  var laydateArray = ['stratDate', 'stratTime', 'endDate', 'endTime'];

  var _loop = function _loop() {
    var el = "#" + laydateArray[i];
    laydate.render({
      elem: el,
      trigger: 'click',
      done: function done(value, date, endDate) {
        $(el).val(value);
        $("#signupForm").validate().element($(el));
      }
    });
  };

  for (var i = 0; i < 4; i++) {
    _loop();
  }
  /**
   * 有效天数验证
   * 2个input 如果其中一个有值，另一个清空
   */
  $('#digitsint').on('input propertychange', function () {
    $(this).attr('required', 'required');
    $('#validityDate').val('').removeAttr('required');
  });
  laydate.render({
    elem: '#validityDate',
    trigger: 'click',
    done: function done(value, date, endDate) {
      $('#digitsint').val('').removeAttr('required');
      $('#validityDate').attr('required', 'required');

      $("#validityDate").val(value);
      $("#signupForm").validate().element($("#digitsint"));
    }
  });

  //上传图片
  $('#onUploadBtn').click(function () {
    $('#file').trigger("click");
  });
  document.querySelector('#file').onchange = function () {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      document.querySelector('#uploadImage').src = this.result;
    };
    reader.readAsDataURL(file);
    $('#uploadImage').removeAttr('required');
    $('#file-error').text('');
  };
  $('#onDelectImage').click(function () {
    $('#uploadImage').attr('required', 'required').removeAttr("src");
    document.querySelector('#file').value = null;
  });

  //表单验证
  $("#signupForm").validate({
    rules: {
      banner: {
        required: true
      }
    },
    messages: {
      banner: {
        required: "请上传图片"
      }
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbC5qcyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImV4dGVuZCIsInZhbGlkYXRvciIsIm1lc3NhZ2VzIiwicmVxdWlyZWQiLCJyZW1vdGUiLCJlbWFpbCIsInVybCIsImRhdGUiLCJkYXRlSVNPIiwibnVtYmVyIiwiZGlnaXRzIiwiY3JlZGl0Y2FyZCIsImVxdWFsVG8iLCJleHRlbnNpb24iLCJtYXhsZW5ndGgiLCJmb3JtYXQiLCJtaW5sZW5ndGgiLCJyYW5nZWxlbmd0aCIsInJhbmdlIiwibWF4IiwibWluIiwic2Nyb2xsQmFycyIsImkiLCJsZW5ndGgiLCJlbCIsInNjcm9sbEJhciIsImJhcldpZHRoIiwicG9zaXRpb24iLCJ3aGVlbERpcyIsImxheWRhdGVBcnJheSIsImxheWRhdGUiLCJyZW5kZXIiLCJlbGVtIiwidHJpZ2dlciIsImRvbmUiLCJ2YWx1ZSIsImVuZERhdGUiLCJ2YWwiLCJ2YWxpZGF0ZSIsImVsZW1lbnQiLCJvbiIsImF0dHIiLCJyZW1vdmVBdHRyIiwiY2xpY2siLCJxdWVyeVNlbGVjdG9yIiwib25jaGFuZ2UiLCJmaWxlIiwiZmlsZXMiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwic3JjIiwicmVzdWx0IiwicmVhZEFzRGF0YVVSTCIsInRleHQiLCJydWxlcyIsImJhbm5lciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBQSxFQUFFQyxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBVztBQUMzQkYsSUFBRUcsTUFBRixDQUFTSCxFQUFFSSxTQUFGLENBQVlDLFFBQXJCLEVBQStCO0FBQzdCQyxjQUFVLE9BRG1CO0FBRTdCQyxZQUFRLFFBRnFCO0FBRzdCQyxXQUFPLGNBSHNCO0FBSTdCQyxTQUFLLFVBSndCO0FBSzdCQyxVQUFNLFVBTHVCO0FBTTdCQyxhQUFTLHVCQU5vQjtBQU83QkMsWUFBUSxVQVBxQjtBQVE3QkMsWUFBUSxRQVJxQjtBQVM3QkMsZ0JBQVksYUFUaUI7QUFVN0JDLGFBQVMs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MkMsWUFBVztBQUNwRCxRQUFJQyxPQUFPLEtBQUtDLEtBQUwsQ0FBVyxDQUFYLENBQVg7QUFDQSxRQUFJQyxTQUFTLElBQUlDLFVBQUosRUFBYjtBQUNBRCxXQUFPRSxNQUFQLEdBQWdCLFlBQVc7QUFDekJwRCxlQUFTOEMsYUFBVCxDQUF1QixjQUF2QixFQUF1Q08sR0FBdkMsR0FBNkMsS0FBS0MsTUFBbEQ7QUFDRCxLQUZEO0FBR0FKLFdBQU9LLGFBQVAsQ0FBcUJQLElBQXJCO0FBQ0FqRCxNQUFFLGNBQUYsRUFBa0I2QyxVQUFsQixDQUE2QixVQUE3QjtBQUNBN0MsTUFBRSxhQUFGLEVBQWlCeUQsSUFBakIsQ0FBc0IsRUFBdEI7QUFDRCxHQVREO0FBVUF6RCxJQUFFLGdCQUFGLEVBQW9COEMsS0FBcEIsQ0FBMEIsWUFBVztBQUNuQzlDLE1BQUUsY0FBRixFQUFrQjRDLElBQWxCLENBQXVCLFVBQXZCLEVBQW1DLFVBQW5DLEVBQStDQyxVQUEvQyxDQUEwRCxLQUExRDtBQUNBNUMsYUFBUzhDLGFBQVQsQ0FBdUIsT0FBdkIsRUFBZ0NULEtBQWhDLEdBQXdDLElBQXhDO0FBQ0QsR0FIRDs7QUFNQTtBQUNBdEMsSUFBRSxhQUFGLEVBQWlCeUMsUUFBakIsQ0FBMEI7QUFDeEJpQixXQUFPO0FBQ0xDLGNBQVE7QUFDTnJELGtCQUFVO0FBREo7QUFESCxLQURpQjtBQU14QkQsY0FBVTtBQUNSc0QsY0FBUTtBQUNOckQsa0JBQVU7QUFESjtBQURBO0FBTmMsR0FBMUI7QUFjRCxDQW5HRCIsImZpbGUiOiJnbG9iYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDlhajlsYBqc1xyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAkLmV4dGVuZCgkLnZhbGlkYXRvci5tZXNzYWdlcywge1xyXG4gICAgcmVxdWlyZWQ6IFwi5q2k5a2X5q615b+F5aGrXCIsXHJcbiAgICByZW1vdGU6IFwi6K+35L+u5q2j5q2k5a2X5q61XCIsXHJcbiAgICBlbWFpbDogXCLor7fovpPlhaXmnInmlYjnmoTnlLXlrZDpgq7ku7blnLDlnYBcIixcclxuICAgIHVybDogXCLor7fovpPlhaXmnInmlYjnmoTnvZHlnYBcIixcclxuICAgIGRhdGU6IFwi6K+36L6T5YWl5pyJ5pWI55qE5pel5pyfXCIsXHJcbiAgICBkYXRlSVNPOiBcIuivt+i+k+WFpeacieaViOeahOaXpeacnyAoWVlZWS1NTS1ERClcIixcclxuICAgIG51bWJlcjogXCLor7fovpPlhaXmnInmlYjnmoTmlbDlrZdcIixcclxuICAgIGRpZ2l0czogXCLlj6rog73ovpPlhaXmlbTmlbBcIixcclxuICAgIGNyZWRpdGNhcmQ6IFwi6K+36L6T5YWl5pyJ5pWI55qE5L+h55So5Y2h5Y+356CBXCIsXHJcbiAgICBlcXVhbFRvOiBcIuS9oOeahOi+k+WFpeS4jeebuOWQjFwiLFxyXG4gICAgZXh0ZW5zaW9uOiBcIuivt+i+k+WFpeacieaViOeahOWQjue8gFwiLFxyXG4gICAgbWF4bGVuZ3RoOiAkLnZhbGlkYXRvci5mb3JtYXQoXCLmnIDlpJrlj6/ku6XovpPlhaUgezB9IOS4quWtl+esplwiKSxcclxuICAgIG1pbmxlbmd0aDogJC52YWxpZGF0b3IuZm9ybWF0KFwi5pyA5bCR6KaB6L6T5YWlIHswfSDkuKrlrZfnrKZcIiksXHJcbiAgICByYW5nZWxlbmd0aDogJC52YWxpZGF0b3IuZm9ybWF0KFwi6K+36L6T5YWl6ZW/5bqm5ZyoIHswfSDliLAgezF9IOS5i+mXtOeahOWtl+espuS4slwiKSxcclxuICAgIHJhbmdlOiAkLnZhbGlkYXRvci5mb3JtYXQoXCLor7fovpPlhaXojIPlm7TlnKggezB9IOWIsCB7MX0g5LmL6Ze055qE5pWw5YC8XCIpLFxyXG4gICAgbWF4OiAkLnZhbGlkYXRvci5mb3JtYXQoXCLor7fovpPlhaXkuI3lpKfkuo4gezB9IOeahOaVsOWAvFwiKSxcclxuICAgIG1pbjogJC52YWxpZGF0b3IuZm9ybWF0KFwi6K+36L6T5YWl5LiN5bCP5LqOIHswfSDnmoTmlbDlgLxcIilcclxuICB9KTtcclxuXHJcbiAgLy/mu5rliqjmnaFcclxuICB2YXIgc2Nyb2xsQmFycyA9IFsnZ29vZHMtcHVibGlzaC1mb3JtJywgJ2FwcC1uYXYnLCAnYWxyZWFkeS1hZGQtZ29vZHMtbGlzdCddO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2Nyb2xsQmFycy5sZW5ndGg7IGkrKykge1xyXG4gICAgbGV0IGVsID0gJy4nICsgc2Nyb2xsQmFyc1tpXTtcclxuICAgICQoZWwpLnNjcm9sbEJhcih7XHJcbiAgICAgIGJhcldpZHRoOiAxMCxcclxuICAgICAgcG9zaXRpb246IFwieVwiLFxyXG4gICAgICB3aGVlbERpczogMTVcclxuICAgIH0pO1xyXG4gIH1cclxuICAvL+aXpeacn+aOp+S7tlxyXG4gIHZhciBsYXlkYXRlQXJyYXkgPSBbJ3N0cmF0RGF0ZScsICdzdHJhdFRpbWUnLCAnZW5kRGF0ZScsICdlbmRUaW1lJ107XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgIGxldCBlbCA9IFwiI1wiICsgbGF5ZGF0ZUFycmF5W2ldO1xyXG4gICAgbGF5ZGF0ZS5yZW5kZXIoe1xyXG4gICAgICBlbGVtOiBlbCxcclxuICAgICAgdHJpZ2dlcjogJ2NsaWNrJyxcclxuICAgICAgZG9uZTogZnVuY3Rpb24gZG9uZSh2YWx1ZSwgZGF0ZSwgZW5kRGF0ZSkge1xyXG4gICAgICAgICQoZWwpLnZhbCh2YWx1ZSk7XHJcbiAgICAgICAgJChcIiNzaWdudXBGb3JtXCIpLnZhbGlkYXRlKCkuZWxlbWVudCgkKGVsKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICAvKipcclxuICAgKiDmnInmlYjlpKnmlbDpqozor4FcclxuICAgKiAy5LiqaW5wdXQg5aaC5p6c5YW25Lit5LiA5Liq5pyJ5YC877yM5Y+m5LiA5Liq5riF56m6XHJcbiAgICovXHJcbiAgJCgnI2RpZ2l0c2ludCcpLm9uKCdpbnB1dCBwcm9wZXJ0eWNoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCh0aGlzKS5hdHRyKCdyZXF1aXJlZCcsICdyZXF1aXJlZCcpO1xyXG4gICAgJCgnI3ZhbGlkaXR5RGF0ZScpLnZhbCgnJykucmVtb3ZlQXR0cigncmVxdWlyZWQnKVxyXG4gIH0pO1xyXG4gIGxheWRhdGUucmVuZGVyKHtcclxuICAgIGVsZW06ICcjdmFsaWRpdHlEYXRlJyxcclxuICAgIHRyaWdnZXI6ICdjbGljaycsXHJcbiAgICBkb25lOiBmdW5jdGlvbiBkb25lKHZhbHVlLCBkYXRlLCBlbmREYXRlKSB7XHJcbiAgICAgICQoJyNkaWdpdHNpbnQnKS52YWwoJycpLnJlbW92ZUF0dHIoJ3JlcXVpcmVkJyk7XHJcbiAgICAgICQoJyN2YWxpZGl0eURhdGUnKS5hdHRyKCdyZXF1aXJlZCcsICdyZXF1aXJlZCcpO1xyXG5cclxuICAgICAgJChcIiN2YWxpZGl0eURhdGVcIikudmFsKHZhbHVlKTtcclxuICAgICAgJChcIiNzaWdudXBGb3JtXCIpLnZhbGlkYXRlKCkuZWxlbWVudCgkKFwiI2RpZ2l0c2ludFwiKSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8v5LiK5Lyg5Zu+54mHXHJcbiAgJCgnI29uVXBsb2FkQnRuJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcjZmlsZScpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICB9KVxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlJykub25jaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBmaWxlID0gdGhpcy5maWxlc1swXTtcclxuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXBsb2FkSW1hZ2UnKS5zcmMgPSB0aGlzLnJlc3VsdDtcclxuICAgIH07XHJcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuICAgICQoJyN1cGxvYWRJbWFnZScpLnJlbW92ZUF0dHIoJ3JlcXVpcmVkJyk7XHJcbiAgICAkKCcjZmlsZS1lcnJvcicpLnRleHQoJycpO1xyXG4gIH07XHJcbiAgJCgnI29uRGVsZWN0SW1hZ2UnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICQoJyN1cGxvYWRJbWFnZScpLmF0dHIoJ3JlcXVpcmVkJywgJ3JlcXVpcmVkJykucmVtb3ZlQXR0cihcInNyY1wiKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlJykudmFsdWUgPSBudWxsO1xyXG4gIH0pO1xyXG5cclxuXHJcbiAgLy/ooajljZXpqozor4FcclxuICAkKFwiI3NpZ251cEZvcm1cIikudmFsaWRhdGUoe1xyXG4gICAgcnVsZXM6IHtcclxuICAgICAgYmFubmVyOiB7XHJcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1lc3NhZ2VzOiB7XHJcbiAgICAgIGJhbm5lcjoge1xyXG4gICAgICAgIHJlcXVpcmVkOiBcIuivt+S4iuS8oOWbvueJh1wiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcblxyXG59KTtcclxuIl19