//var employeeId = 2;

let consultationState = undefined
let scoreHolder = { "level-love": 0, "level-health": 0, "level-work": 0 }

$(document).ready(function () {
    displayActiveConsultation()
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
                displayActiveMedium(response.medium)
                displayActiveClient(response.client)
                getClientHistory(response.client.id)
                console.log("Startdate = " + response.startDate)
                if(response.startDate !== null && response.startDate !== undefined) {
                    console.log("Got here = " + response.startDate)
                    consultationState = "live"
                } else {
                    consultationState = "pending"
                }
                console.log("Consultation trouvée");
                updateStateButton()
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

function displayActiveMedium(medium) {
    let content = ''
    if (medium.support !== undefined) {
        content += `
        <p class="paragraph-title">Utilise</p>
        <p>${medium.support}</p>
        `
    }
    if (medium.formation !== undefined) {
        content += `
        <p class="paragraph-title">Formation</p>
        <p>${medium.formation}</p>
        `
    }
    if (medium.promotion !== undefined) {
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

function displayActiveClient(client) {
    $('#client-birthdate').text(client.birthDate);
    $('#client-address').text(client.address);
    $('#client-city').text(client.zipCode + " " + client.city);
    $('#client-phone').text(client.phone);
    $('#client-mail').text(client.mail);
    $('#client-name').text(client.firstName + " " + client.lastName);

    //Fill astral profile
    var astralProfile = client.astralProfile;
    $('#zodiac').text(astralProfile.zodiacSign);
    $('#animal').text(astralProfile.totemAnimal);
    $('#color').text(astralProfile.color);
    $('#astro').text(astralProfile.chineeseSign);
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
                        '<p class="history-commentary">' + element.commentary + '</p>' +
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

function startButton() {
    console.log("clic sur le bouton commencement"); // LOG dans Console Javascript
    // Appel AJAX
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'startConsultation'
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript
            if (response.status === "ok") {
                consultationState = "live"
                updateStateButton()
            } else {
                window.alert("Impossible de débuter la consultation");
            }
        })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })

}

function endButton() {
    console.log("clic sur le bouton fin"); // LOG dans Console Javascript
    // Appel AJAX
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'endConsultation'
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript
            if (response.status === "ok") {
                updateStateButton()
                window.location.href = './employee-dashboard.html'
            } else {
                window.alert("Impossible de terminer la consultation");
            }
        })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
}

function updateStateButton() {
    console.log("Consultation state = " + consultationState);
    if(consultationState === "pending") {
        $("#state-button")
            .click(startButton)
            .text("COMMENCER")
            .addClass("start")
            .removeClass("end")
    } else if(consultationState === "live") {
        $("#state-button")
            .click(endButton)
            .text("FIN DE SÉANCE")
            .addClass("end")
            .removeClass("start")
    }
}

function handlePrediction(name, value) {
    //Update holder
    scoreHolder[name] = value

    //Fetch predictions from newly updated holder
    // Appel AJAX
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'getPredicitionForClient',
            loveScore: scoreHolder["level-love"],
            healthScore: scoreHolder["level-health"],
            workScore: scoreHolder["level-work"]
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript
            $("#love").text(response.love)
            $("#health").text(response.health)
            $("#work").text(response.work)
        })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
}