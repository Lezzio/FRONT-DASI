//var employeeId = 2;
var consultationId = 0;


$(document).ready(function () {
    displayActiveConsultation()
    $("#start-button").click(startButton)
    $("").click(startButton)
});

function displayActiveConsultation() {
    // Appel AJAX
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'fetchActiveConsultation'
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript
            if (response !== null) {
                displayActiveMedium(response)
                displayActiveClient(response)
                console.log("Medium" + response.medium)
                window.alert("Consultation trouvée");
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

function displayActiveMedium(consultation) {
    console.log(consultation.medium)
    let medium = consultation.medium

    let content = ''
    if(medium.support !== undefined) {
        content += `
        <p class="paragraph-title">Utilise</p>
        <p>${medium.support}</p>
        `
    }
    if(medium.formation !== undefined) {
        content += `
        <p class="paragraph-title">Formation</p>
        <p>${medium.formation}</p>
        `
    }
    if(medium.promotion !== undefined) {
        content += `
        <p class="paragraph-title">Promotion</p>
        <p>${medium.promotion}</p>
        `
    }
    $('#medium-info-container').append(`
            <p class="section-title">${medium.name}</p>
            <p id = "medium-description">${medium.presentation}</p>
            <br/>
            ${content}
    `)
}

function displayActiveClient(consultation) {
    if (consultation.client !== "null") {
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

function getClientHistory(clientId) {
    /*
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
     */
}

function startButton() {
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
