// 全局js
$(document).ready(function() {
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
    let el = '.' + scrollBars[i];
    $(el).scrollBar({
      barWidth: 10,
      position: "y",
      wheelDis: 15
    });
  }
  //日期控件
  var laydateArray = ['stratDate', 'stratTime', 'endDate', 'endTime'];
  for (var i = 0; i < 4; i++) {
    let el = "#" + laydateArray[i];
    laydate.render({
      elem: el,
      trigger: 'click',
      done: function done(value, date, endDate) {
        $(el).val(value);
        $("#signupForm").validate().element($(el));
      }
    });
  }
  /**
   * 有效天数验证
   * 2个input 如果其中一个有值，另一个清空
   */
  $('#digitsint').on('input propertychange', function() {
    $(this).attr('required', 'required');
    $('#validityDate').val('').removeAttr('required')
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
  $('#onUploadBtn').click(function() {
    $('#file').trigger("click");
  })
  document.querySelector('#file').onchange = function() {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function() {
      document.querySelector('#uploadImage').src = this.result;
    };
    reader.readAsDataURL(file);
    $('#uploadImage').removeAttr('required');
    $('#file-error').text('');
  };
  $('#onDelectImage').click(function() {
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
