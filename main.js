console.log("Hey!")

//Holds the switch target for log in
let switchSelection = "Client"

$(document).ready(function () {
    $("#switch-selector-client").click(switchClient)
    $("#switch-selector-employee").click(switchEmployee)
});
function switchClient() {
    const target = $("#switch-indicator")
    switchSelection = "Client"
    target.addClass("left");
    target.removeClass("right");
}

function switchEmployee() {
    const target = $("#switch-indicator")
    switchSelection = "Employee"
    target.addClass("right");
    target.removeClass("left");
}