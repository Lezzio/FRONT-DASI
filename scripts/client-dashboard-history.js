//var clientId = 1;

$(document).ready(function () {
    getInfos();
});

function getInfos() {
    // Appel AJAX
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'getClient',
            //id: clientId
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript
            if (response.client) {
                var lastName = response.client.lastName;
                var firstName = response.client.firstName;
                var mail = response.client.mail;
                var birthDate = response.client.birthDate;
                var address = response.client.address;
                var zipCode = response.client.zipCode;
                var phone = response.client.phone;
                var city = response.client.city;
                var astralProfile = response.client.astralProfile;
                var chineeseSign = astralProfile.chineeseSign;
                var color = astralProfile.color;
                var totem = astralProfile.totemAnimal;
                var zodiac = astralProfile.zodiacSign;

                document.getElementById('first-name').setAttribute('value', firstName);
                document.getElementById('last-name').setAttribute('value', lastName);
                document.getElementById('birthdate').setAttribute('value', birthDate);
                document.getElementById('address').setAttribute('value', address);
                document.getElementById('postal-code').setAttribute('value', zipCode);
                document.getElementById('city').setAttribute('value', city);
                document.getElementById('contact-phone').setAttribute('value', phone);
                document.getElementById('contact-mail').setAttribute('value', mail);


                $('#zodiac').text(zodiac);
                $('#animal').text(totem);
                $('#color').text(color);
                $('#astro').text(chineeseSign);

                console.log(document.getElementById('zodiac'))


            } else {
                window.alert("Les informations n'ont pas pu être récupérées");
                $('#notification').html("Erreur lors de la recherche des informations"); // Message pour le paragraphe de notification
            }
        })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always(function () { // Fonction toujours appelée

        });
}