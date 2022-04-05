$("#password-error").hide();
$("#password2").blur(() => {
    let password = $("#password1").val();
    let password2 = $("#password2").val();
    if (password != password2) {
        $("#password-error").show();
    } else {
        $("#password-error").hide();
    }
});