$(document).ready(function(){
    $("#gclid").val(urlParam('gclid'));
    $("#countryname").change(function(){
        var cd = $(this).val().split('##');
        $("#country").val(cd[0])
        $("#country_code").val(cd[1])
    });
    $("#dg1_first_name").focusout(function(){
       var first_last = $(this).val();
       var first_last_arr = first_last.split(" ");
       $("#modal_firstname").val(first_last_arr[0]);
       $("#modal_lastname").val(first_last_arr[1]);
    });
    
    $("#modal_my_mobile").focusout(function(){
        $("#modal_dg_mobile").val('+'+$("#country_code").val()+$(this).val()); 
    });
    createCaptcha()
   $(".submit-contact").click(function(e){
       //
       $(this).attr("disabled", "disabled");
        doWork();
        
         
    });
});

function doWork(){
   // alert('asdasd');
    var _token = $("input[name='_token']").val();
        var formdata = $("#contactform").serialize();
       // alert(formdata);
        $.ajax({
            headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').val()
        },
            url: "/save-form",
            type:'POST',
            data: {v_status:formdata},
            dataType: "html",
            success: function(html) {
               /// alert(html);
                var arr_spl = html.split('###');
                if(arr_spl[0]==1){
                    $(".print-error-msg").removeClass('hide');
                    $(".ulc").html(arr_spl[1]);
                    setTimeout('$(".submit-contact").removeAttr("disabled")', 1500);
                    setTimeout('$(".print-error-msg").addClass("hide")', 1500);
                    createCaptcha();
                }else{
                   $(".print-error-msg").addClass('hide');
                    $(".print-success-msg").removeClass('hide');
                    $(".ulc").html(arr_spl[1]);
                     window.setTimeout(function() {
              window.location.href = "/thank-you.php";
          }, 2000);
             $('#contactform').submit();
                    $("#contactform").find("input[type=text], textarea, select, email").val("");
                    $("#countryname").val('India##91')
                    $("#country").val('India')
                    $("#country_code").val('91');
                    $("#form").hide();
                    createCaptcha();
                    
                }
                
            }
        });
}


var code;
function createCaptcha() {
    document.getElementById('captcha').innerHTML = "";
    var charsArray ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lengthOtp = 4;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
    //below code will not allow Repetition of Characters
        var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
        if (captcha.indexOf(charsArray[index]) == -1)
            captcha.push(charsArray[index]);
        else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    //canv.className  = "captcha";
    canv.width = 100;
    canv.height = 50;
    var ctx = canv.getContext("2d");
    ctx.font = "25px Georgia";
    ctx.strokeText(captcha.join(""), 0, 30);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    code = captcha.join("");
    $("#code").val(code);
        
    //alert(canv);
    //$(".captcha").html(canv);
    document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}
function validateCaptcha() {
    event.preventDefault();
    if (document.getElementById("cpatchaTextBox").value == code) {
        //alert("Thanku Valid Captcha")
    }else{
        alert("Invalid Captcha. Please try Again");
        createCaptcha();
    }
}
function urlParam(name){
   
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if(results!='null' && results!=null){
	    return results[1] || 0;   
	}
}