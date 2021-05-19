//var employeeId = 2;
var consultationId = 0;


$(document).ready(function () {
    getActiveConsultation()
    $("#start-button").click(startbutton)
    $("").click(startbutton)
});

function getActiveConsultation() {
    // Appel AJAX
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'fetchActiveConsultation',
            //employeeId : employeeId
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript
            if (response.consultation) {
                window.alert("Consultation Trouvée");
                consultationId = response.consultation.id
                getActiveClient(response.consultation)
                getActiveMedium(response.consultation)
            } else {
                window.alert("Impossible de trouver une consultation");
                $('#notification').html("Erreur de consultation"); // Message pour le paragraphe de notification
            }

        })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
}

function getActiveMedium(consultation) {
    if (consultation.medium) {
        let medium = consultation.medium
        $('.section-title').html(medium.name)
        $('#medium-description').html(medium.descripion)
        if (medium.formation) {
            $('.main-content').append(
                '<p class="paragraph-title">' + Formation + '</p>' +
                '<p>' + medium.formation + '</p>' +
                '<br/>' +
                '<p class="paragraph-title">' + Promotion + '</p>' +
                '<p>' + medium.promotion + '</p>'
            )
        } else if (medium.support) {
            $('.main-content').append(
                '<p class="paragraph-title">' + Support + '</p>' +
                '<p>' + medium.support + '</p>' +
                '<br/>'
            )
        }
    } else {
        window.alert("Impossible de trouver un médium pour la consultation")
    }
}

function getClientHistory(clientId) {
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'getClientHistory',
            clientId: clientId
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript
            if (response.history) {
                window.alert("Historique trouvé");
                $.each(response.history, function (index, element) {

                    $('#main-content').append(
                        '<div class="history-box">' +
                        '<p class="history-date">' + element.endDate + '</p>' +
                        '<p class="history-medium">' + element.mediumName + '</p>' +
                        '<p class="history-commentary">' + element.commmentary + '</p>' +
                        '</div>'
                    )
                })
            } else {
                window.alert("Impossible de trouver une consultation");
                $('#notification').html("Erreur de consultation"); // Message pour le paragraphe de notification
            }

        })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
}

function getActiveClient(consultation) {
    if (consultation.client) {
        var lastName = consultation.client.lastName;
        var firstName = consultation.client.firstName;
        var mail = consultation.client.mail;
        var birthDate = consultation.client.birthDate;
        var address = consultation.client.address;
        var zipCode = consultation.client.zipCode;
        var phone = consultation.client.phone;
        var city = consultation.client.city;
        $('#client-birthdate').text(birthDate);
        $('#client-address').text(address);
        $('#client-city').text(zipCode + " " + city);
        $('#client-phone').text(phone);
        $('#client-mail').text(mail);
        $('#client-name').text(firstName + " " + lastName);


        //Fill astral profile
        var astralProfile = consultation.client.astralProfile;
        var chineeseSign = astralProfile.chineeseSign;
        var color = astralProfile.color;
        var totem = astralProfile.totemAnimal;
        var zodiac = astralProfile.zodiacSign;

        $('#zodiac').text(zodiac);
        $('#animal').text(totem);
        $('#color').text(color);
        $('#astro').text(chineeseSign);

        getClientHistory(consultation.client.id)

    } else {
        window.alert("Imposssible de trouver un client pour la consultation")
    }
}

function startbutton() {
    console.log("clic sur le bouton commencement"); // LOG dans Console Javascript
    $('#notification').html("Commencer..."); // Message pour le paragraphe de notification
    if (consultationId === 0) {
        window.alert("No id for this consultation thus you cannot start it")
        return
    }
    // Appel AJAX
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'startConsultation',
            consultationId: consultationId
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript
            if (response.start) {
                window.alert("Debut de la consultation");

            } else {
                window.alert("Impossible de débuter la consultation");
                $('#notification').html("Erreur de consultation"); // Message pour le paragraphe de notification
            }

        })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })

}
