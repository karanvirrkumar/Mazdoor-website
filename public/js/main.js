var checkName = /^[a-zA-Z]+$/;
var checkPhone = /^\d+$/;

$('#give-labour').click(function () {
    var name = $('#full-name').val();
    var phone = $('#labour-phone').val();
    var date = $('#labour-date').val();
    var number = $('#labour-labour').val();
    var checkboxs=document.getElementsByName("choice");
    var checkboxsVal = [];
    var okay=false;
    for(var i=0,l=checkboxs.length;i<l;i++)
    {
        if(checkboxs[i].checked)
        {
            okay=true;
            checkboxsVal.push(checkboxs[i].value);
        }
    }
    console.log(checkboxsVal);
    var location = $('#labour-select').val();
    var address = $('#labour-address').val();
    if(checkName.test(name) && checkPhone.test(phone) && phone.length == 10 && date != 'undefined' && checkPhone.test(number) && okay && location != 'undefined' && address != '') {
        var data = {};
        data.username = name;
        data.phone = phone;
        data.date = date;
        data.number = number;
        data.check = checkboxsVal;
        data.location = location;
        data.address = address;
        $.ajax({
            method : 'POST',
            jsonp: 'callback',
            url : '/labour',
            data : (data),
        }).done(function (msg) {
            // alert(msg);
            console.log(msg);
            $('#labour-list').text('');
            for(var j=0;j<msg.length;j++) {
                var x = msg[j];
                for(var k=0;k<x.length;k++) {
                    // console.log(x[k]['Name'] , x[k]['Phone']);
                    var elem = '<li><a href="#">' + x[k]['Name'] + ' ( ' + x[k]['Phone'] + ' ) ' + '<span style="margin: 10px;" class="message btn pink-btn">SEND MESSAGE</span></a></li>';  
                    $('#labour-list').append(elem);

                }
            }
            $('.message').click(function () {
              console.log($(this) , $(this).parent().html().split(' ')[2]);
              var data = {};
              data.phone = phone;
                $.ajax({
                    method : 'POST',
                    jsonp: 'callback',
                    url : '/message',
                    data : (data),
                }).done(function (msg) {
                    console.log(msg);
                });
            });
            $('html,body').animate({
                scrollTop: $('#business').offset().top},'slow');
        });
    }
    else {
        swal({
            type : 'error',
            title : 'GET LABOURS',
            text : 'Please write correct data in the fields!'
        });
    }
});

$('#submit-btn').click(function () {
	var name = $('#name').val();
	var phone = $('#phone').val();
	var message = $('#message').val();
	if(checkName.test(name) && checkPhone.test(phone) && phone.length === 10 && message.length!=0)  {
		// alert('yes');
    var data = {};
    data.username = name;
    data.phone = phone;
    data.message = message;
    $.ajax({
            method : 'POST',
            jsonp: 'callback',
            url : '/contact',
            data : (data),
        }).done(function (msg) {
            if(msg == 'yes') {
                swal({
                  type: 'success',
                  title: 'Feedback',
                  text: 'Thanks for your message . We will reach out to you soon',
                });
            }
            else {
                swal({
                  type: 'error',
                  title: 'Oops....',
                  text: 'Please check your internet connection or try after sometime',
                });
            }
        });
	}
	else {
		// alert('no');
		swal({
		  type: 'error',
		  title: 'Oops...',
		  text: 'Please write correct data in the fields!',
		});
	}
});


// var today = new Date();
//         var dd = today.getDate();
//         var mm = today.getMonth()+1; 
//         var yyyy = today.getFullYear();
//          if(dd<10){
//                 dd='0'+dd
//             } 
//             if(mm<10){
//                 mm='0'+mm
//             } 

//         today = yyyy+'-'+mm+'-'+dd;
//         document.getElementById("date").setAttribute("min", today);
        

		(function() {
  var magicFocus;

  magicFocus = class magicFocus {
    constructor(parent) {
      var i, input, len, ref;
      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
      this.parent = parent;
      if (!this.parent) {
        return;
      }
      this.focus = document.createElement('div');
      this.focus.classList.add('magic-focus');
      this.parent.classList.add('has-magic-focus');
      this.parent.appendChild(this.focus);
      ref = this.parent.querySelectorAll('input, textarea, select');
      for (i = 0, len = ref.length; i < len; i++) {if (window.CP.shouldStopExecution(1)){break;}
        input = ref[i];
        input.addEventListener('focus', function() {
          return window.magicFocus.show();
        });
        input.addEventListener('blur', function() {
          return window.magicFocus.hide();
        });
      }
window.CP.exitedLoop(1);

    }

    show() {
      var base, base1, el;
      if (!(typeof (base = ['INPUT', 'SELECT', 'TEXTAREA']).includes === "function" ? base.includes((el = document.activeElement).nodeName) : void 0)) {
        return;
      }
      clearTimeout(this.reset);
      if (typeof (base1 = ['checkbox', 'radio']).includes === "function" ? base1.includes(el.type) : void 0) {
        el = document.querySelector(`[for=${el.id}]`);
      }
      this.focus.style.top = `${el.offsetTop || 0}px`;
      this.focus.style.left = `${el.offsetLeft || 0}px`;
      this.focus.style.width = `${el.offsetWidth || 0}px`;
      return this.focus.style.height = `${el.offsetHeight || 0}px`;
    }

    hide() {
      var base, el;
      if (!(typeof (base = ['INPUT', 'SELECT', 'TEXTAREA', 'LABEL']).includes === "function" ? base.includes((el = document.activeElement).nodeName) : void 0)) {
        this.focus.style.width = 0;
      }
      return this.reset = setTimeout(function() {
        return window.magicFocus.focus.removeAttribute('style');
      }, 200);
    }

  };

  // initialize
  window.magicFocus = new magicFocus(document.querySelector('.form'));

  $(function() {
    return $('.select').customSelect();
  });

}).call(this);

