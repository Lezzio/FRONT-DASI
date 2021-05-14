console.log("Hey!")

//Holds the switch target for log in
let switchSelection = "Client"

$(document).ready(function () {
    $("#switch-selector-client").click(switchClient)
    $("#switch-selector-employee").click(switchEmployee)
    $("#login-button").click(loginButton)
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
        url: './ActionServlet',
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
            console.log('Response',response); // LOG dans Console Javascript
            if (response.connexion) {
                var id = null;
                var lastName = null;
                var firstName = null;
                var mail = null;
                if(response.employee){
                    console.log("Employee");
                    id = response.employee.id;
                    lastName = response.employee.lastName;
                    firstName = response.employee.firstName;
                    mail = response.employee.mail;
                    window.alert("Login successful");
                    $('#notification').html("Connexion Employee OK : " + id + " " + firstName + " " + lastName + " " + mail);  // Message pour le paragraphe de notification
                    // TODO: afficher les informations du client dans la notification
                    // Exemple: Connexion de Ada Lovelace (ID 1)
                }else if (response.client){
                    console.log("Client");
                    id = response.client.id;
                    lastName = response.client.lastName;
                    firstName = response.client.firstName;
                    mail = response.client.mail;
                    window.alert("Login successful");
                    $('#notification').html("Connexion Client OK : " + id + " " + firstName + " " + lastName + " " + mail);  // Message pour le paragraphe de notification
                    // TODO: afficher les informations du client dans la notification
                    // Exemple: Connexion de Ada Lovelace (ID 1)
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
