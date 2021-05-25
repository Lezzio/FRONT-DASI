$(document).ready(function () {
    $("#signup-button").click(signupButton)
});

function signupButton() {
    console.log("clic sur le bouton d'inscription"); // LOG dans Console Javascript
    $('#notification').html("Inscription..."); // Message pour le paragraphe de notification

    // Récupération de la valeur des champs du formulaire

    var firstName = $('#first-name').val();
    var lastName = $('#last-name').val();
    var birthdate = $('#birthdate').val();
    var civility = $('#civility').val();
    var address = $('#address').val();
    var zipCode = $('#postal').val()
    var city = $('#city').val();
    var phone = $('#phone').val();
    var mail = $('#mail').val();
    var password = $('#password').val();

    if (firstName === "" || lastName === "" || birthdate === "" || civility === "" || address === "" || postal === "" || city === "" || mail === "" || password === "" || zipCode === "") {
        console.log("Remplissez tous les champs svp");
        return;
    }


    // Appel AJAX
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'signUp',
            login: mail,
            password: password,
            firstName: firstName,
            lastName: lastName,
            birthdate: birthdate,
            civility: civility,
            address: address,
            phone: phone,
            city: city,
            zipCode : zipCode
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript
            if (response.signup) {
                var id = response.client.id;
                var lastName = response.client.lastName;
                var firstName = response.client.firstName;
                var mail = response.client.mail;
                console.log("Signup successful");
                $('#notification').html("Incription OK : " + id + " " + firstName + " " + lastName + " " + mail);  // Message pour le paragraphe de notification
                // TODO: afficher les informations du client dans la notification
                // Exemple: Connexion de Ada Lovelace (ID 1)
            } else if (response.exists) {
                console.log("Il existe déjà un client avec cette adresse mail");
                $('#notification').html("Erreur lors de l'inscription"); // Message pour le paragraphe de notification
            } else {
                console.log("Votre inscription a échoué à cause d'un problème sur nos serveurs, veuillez réessayer plus tard");
                $('#notification').html("Erreur lors de l'inscription"); // Message pour le paragraphe de notification
            }
        })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always(function () { // Fonction toujours appelée

        });
}