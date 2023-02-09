$(document).ready(function(){
    $("#gclid1").val(urlParam('gclid'));
    $("#countryname1").change(function(){
        var cd = $(this).val().split('##');
        $("#country1").val(cd[0])
        $("#country_code1").val(cd[1])
    });
    $("#dg1_first_name1").focusout(function(){
       var first_last = $(this).val();
       var first_last_arr = first_last.split(" ");
       $("#modal_firstname1").val(first_last_arr[0]);
       $("#modal_lastname1").val(first_last_arr[1]);
    });
    
    $("#modal_my_mobile1").focusout(function(){
        $("#modal_dg_mobile1").val('+'+$("#country_code2").val()+$(this).val()); 
    });
    createCaptcha1()
   $(".submit-contact1").click(function(e){
       $(this).attr("disabled", "disabled");
       doWork1();
       
    });
});

function doWork1(){
    var _token = $("input[name='_token']").val();
        var formdata1 = $("#contactform1").serialize();
        $("#contactform1").serialize()
        $.ajax({
            headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').val()
        },
            url: "/save-form",
            type:'POST',
            data: {v_status:formdata1},
            dataType: "html",
            success: function(html) {
                var arr_spl = html.split('###');
                if(arr_spl[0]==1){
                    $(".print-error-msg1").removeClass('hide');
                    $(".ulc1").html(arr_spl[1]);
                    setTimeout('$(".submit-contact1").removeAttr("disabled")', 1500);
                    setTimeout('$(".print-error-msg1").addClass("hide")', 1500);
                    createCaptcha1();
                }else{
                    $(".print-error-msg1").addClass('hide');
                    $(".print-success-msg1").removeClass('hide');
                    $(".ulc1").html(arr_spl[1]);                    
                    window.setTimeout(function() {
                      window.location.href = "/thank-you.php";
                      }, 2000);
                     $('#contactform1').submit();
                    $("#contactform1").find("input[type=text], textarea, select, email").val("");
                    $("#countryname1").val('India##91')
                    $("#country1").val('India')
                    $("#country_code1").val('91')
                    createCaptcha1();
                    
                }
                
            }
        });
}

var code;
function createCaptcha1() {
    document.getElementById('captcha1').innerHTML = "";
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
    
    canv.id = "captcha1";
    canv.width = 100;
    canv.height = 50;
    var ctx = canv.getContext("2d");
    ctx.font = "25px Georgia";
    ctx.strokeText(captcha.join(""), 0, 30);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    code = captcha.join("");
    $("#code1").val(code);
    document.getElementById("captcha1").appendChild(canv); // adds the canvas to the body element
}
function validateCaptcha1() {
    event.preventDefault();
    if (document.getElementById("cpatchaTextBox1").value == code) {
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
