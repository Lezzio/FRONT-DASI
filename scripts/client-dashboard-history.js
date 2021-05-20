//var clientId = 1;

$(document).ready(function () {
    getInfos()
    getHistory()
});

function getHistory(){
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'getClientOwnHistory'
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript
            if (response.history.length !== 0) {
                window.alert("History found");
                $('.medium-container').empty()
                $.each(response.history, function (index, element) {
                    let currentClass;
                    switch (element.mediumType){
                        case "astrolog":
                            currentClass = "session-row blue"
                            break
                        case "cartomancian":
                            currentClass = "session-row green"
                            break
                        case "spirite":
                            currentClass = "session-row orange"
                            break
                        default:
                            window.alert("Bad medium type")
                            console.log(element.mediumType)
                            break
                    }

                    $('.medium-container').append(`
                        <div class="${currentClass}">
                            <p class="field">${element.day}</p>
                            <p class="field">${element.mediumName}</p>
                            <p class="field">${element.minutes} minutes</p>
                        </div>
                    `)
                })
            } else {
                window.alert("Empty History");
                $('#notification').html("Erreur de consultation"); // Message pour le paragraphe de notification
            }

        })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
}

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
            document.getElementById('first-name').setAttribute('value', response.firstName);
            document.getElementById('last-name').setAttribute('value', response.lastName);
            document.getElementById('birthdate').setAttribute('value', response.birthDate);
            document.getElementById('address').setAttribute('value', response.address);
            document.getElementById('postal-code').setAttribute('value', response.zipCode);
            document.getElementById('city').setAttribute('value', response.city);
            document.getElementById('contact-phone').setAttribute('value', response.phone);
            document.getElementById('contact-mail').setAttribute('value', response.mail);

            var astralProfile = response.astralProfile;
            $('#zodiac').text(astralProfile.zodiacSign);
            $('#animal').text(astralProfile.totemAnimal);
            $('#color').text(astralProfile.color);
            $('#astro').text(astralProfile.chineeseSign);
        })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always(function () { // Fonction toujours appelée

        });
}