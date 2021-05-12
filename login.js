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
            todo: 'connecter',
            login: champLogin,
            password: champPassword,
            type: switchSelection
        },
        dataType: 'json'
    })
        .done( function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response',response); // LOG dans Console Javascript
            if (response.connexion) {
                var id = response.client.id;
                var lastName = response.client.lastName;
                var firstName = response.client.firstName;
                var mail = response.client.mail;
                $('#notification').html("Connexion OK : " + id + " " + firstName + " " + lastName + " " + mail);  // Message pour le paragraphe de notification
                // TODO: afficher les informations du client dans la notification
                // Exemple: Connexion de Ada Lovelace (ID 1)
            }
            else {
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
