$(document).ready(function() {

  $('.notify').css('display', 'none');
 
  $('#contact_form').submit(function(e) {
    e.preventDefault();
    var name = $('#name').val();
    var email = $('#email').val();
    var phone_number = $('#phone_number').val();
    var country = $('#country').val();

    console.log('country: ', country)
 
    $(".error").remove();

    var isValid = true;
 
    if (name.length < 1) {
      $('#name').after('<span class="error">This field is required</span>');
      isValid = false;
    }
    if (phone_number.length < 1) {
      $('#phone_number').after('<span class="error">This field is required</span>');
      isValid = false;
    }
    if (email.length < 1) {
      $('#email').after('<span class="error">This field is required</span>');
      isValid = false;
    } else {
      var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var validEmail = regEx.test(email);
      if (!validEmail) {
        $('#email').after('<span class="error">Enter a valid email</span>');
        isValid = false;
      }
    }
    if (country.length < 1) {
      $('#country').after('<span class="error">This field is required</span>');
      isValid = false;
    }

    if (isValid) {
      console.log(name, '/dd', phone_number, '/', email, '/', country);

      $.post({
        url: 'assets/server/main.php',
        data: JSON.stringify({
          "action": "do_subscribe" ,
          "name" : name,
          "phone_number" : phone_number,
          "email" : email,
          "country" : country
        }),
        dataType: 'json',
        contentType: 'application/json'
      }, function( data ) {
        console.log("ang4 data : " + data.status);
        if (data.status === 200) {
          $('.notify').css('display', 'inherit');
          $('.notify').css('background', '#26bf26a6');
          $('.notify').html(`You're added successfully`);
        } else {
          $('.notify').css('display', 'inherit');
          $('.notify').css('background', '#bf6026a6');
          $('.notify').html(`There is some error occured, Please check your submitted information again.`);
        }

        setTimeout(() => {
          $('.notify').css('display', 'none');

         $('#name').val('');
         $('#email').val('');
         $('#phone_number').val('');
         $('#country').val('');
        }, 5000)
      });

    }

  });
 
});