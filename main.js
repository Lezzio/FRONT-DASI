console.log("Hey!")

//Holds the switch target for log in
let switchSelection = "client"

$(document).ready(function () {
    $("#switch-selector-client").click(switchClient)
    $("#switch-selector-employee").click(switchEmployee)
    $("#login-button").click(loginButton)
});
function switchClient() {
    const target = $("#switch-indicator")
    switchSelection = "client"
    target.addClass("left");
    target.removeClass("right");
}

function switchEmployee() {
    const target = $("#switch-indicator")
    switchSelection = "employee"
    target.addClass("right");
    target.removeClass("left");
}

function loginButton() {
    const mail = $("#mail").val()
    const password = $("#password").val()
    window.alert("WORKING")
}