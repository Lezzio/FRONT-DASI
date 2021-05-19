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
    console.log("clic sur le bouton de connexion"); // LOG dans Console Javascript
    $('#notification').html("Connexion..."); // Message pour le paragraphe de notification

    // Récupération de la valeur des champs du formulaire
    var champLogin = $('#mail').val();
    var champPassword = $('#password').val();

    console.log(champLogin);
    console.log(champPassword);
    // Appel AJAX
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'signIn',
            login: champLogin,
            password: champPassword,
            userType: switchSelection
        },
        dataType: 'json'
    })
        .done( function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript
            if (response.connexion) {
                if(response.userType === "employee"){
                    console.log("Employee");
                    window.alert("Login successful");
                    document.location.href = "./employee-dashboard.html";
                    $('#notification').html("Connexion Employee OK : " + id + " " + firstName + " " + lastName + " " + mail);  // Message pour le paragraphe de notification
                } else if (response.userType === "client"){
                    console.log("Client");
                    window.alert("Login successful");
                    document.location.href = "./client-dashboard.html"
                    $('#notification').html("Connexion Client OK : " + id + " " + firstName + " " + lastName + " " + mail);  // Message pour le paragraphe de notification
                }else{
                    window.alert("Neither employee or client");
                }
            }
            else {
                window.alert("Wrong login or password");
                $('#notification').html("Erreur de Connexion"); // Message pour le paragraphe de notification
            }
        })
        .fail( function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error',error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always( function () { // Fonction toujours appelée

        });
}
