//var clientId = 1;

$(document).ready(function () {
    displayInfos();
    displayMediums();
});

function getId() {

}

function displayInfos() {
    // Appel AJAX
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'getClient'
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

function displayMediums() {

    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'listMediums'
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript
            console.log("List = " + response)
            $.each(response, function (index, medium) {
                switch (medium.type) {
                    case "spirite":
                        $("#tab1").append(
                            `<div id="${medium.id}" class="medium-card" onclick="handleMediumClick(this.id)" >
                            <p id="name" class="big center">${medium.name}</p>
                            <br>
                            <p class="small center">${medium.presentation}</p>
                            <br>
                            <p class="medium">Utilise :</p>
                            <p class="small">${medium.support}</p>
                            </div>
                            `
                        )
                        break;
                    case "cartomancian":
                        $("#tab2").append(
                            `<div id="${medium.id}" class="medium-card" onclick="handleMediumClick(this.id)" >
                            <p id="name" class="big center">${medium.name}</p>
                            <br>
                            <p class="small center">${medium.presentation}</p>
                            </div>
                            `
                        )
                        break;
                    case "astrolog":
                        $("#tab3").append(
                            `<div id="${medium.id}" class="medium-card" onclick="handleMediumClick(this.id)">
                            <p id="name" class="big center">${medium.name}</p>
                            <br>
                            <p id="name" class="small center">${medium.presentation}</p>
                            <br>
                            <p class="medium">Formation :</p>
                            <p class="small">${medium.formation}</p>
                            <br>
                            <p class="medium">Promotion :</p>
                            <p class="small">${medium.promotion}</p>
                            </div>
                            `
                        )
                }
            })
        })
}

function handleMediumClick(id) {
    //First we ask the consultation in ajax
    console.log("MediumId = " + id)

    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'askAppointment',
            medium: id
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript

            //Then we redirect to another page (sent or not available)
            if (response.status === "available") {
                window.location.href = './request-sent.html'
            } else {
                window.location.href = './not-available.html'
            }
        })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always(function () { // Fonction toujours appelée

        });
}