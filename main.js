console.log("Hey!")

$(document).ready(function () {

    $("#switch-indicator").click(switchToggle)

});

function switchToggle(event) {
    const target = event.target;
    if (target.className === "right") {
        target.className = "left";
    } else {
        target.className = "right";
    }
}