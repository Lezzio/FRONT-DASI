var clientId = 1;

$(document).ready(function () {
    displayInfos();
    displayMediums();
});

function displayInfos() {
    // Appel AJAX
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'getClient',
            id: clientId
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
                switch(medium.type) {
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
    window.alert(id)

    //Then we redirect to another page (sent or not available)
    window.location.href = './request-sent.html'

    window.location.href = './not-available.html'
}