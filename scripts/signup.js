$(document).ready(function () {
    $("#signup-button").click(signupButton)
});

function signupButton() {
    console.log("clic sur le bouton d'inscription"); // LOG dans Console Javascript

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
        window.alert("Remplissez tous les champs svp");
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
                let id = response.client.id;
                let lastName = response.client.lastName;
                let firstName = response.client.firstName;
                let mail = response.client.mail;
                window.location.href = "./login.html"
                console.log("Signup successful");
            } else if (response.exists) {
                window.alert("Il existe déjà un client avec cette adresse mail");
            } else {
                console.log("Votre inscription a échoué à cause d'un problème sur nos serveurs, veuillez réessayer plus tard");
            }
        })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always(function () { // Fonction toujours appelée

        });
}