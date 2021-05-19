
//var employeeId = 2;

$(document).ready(function () {
    getInfos();
    getTopFive();
});
function getTopFive(){
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'topFiveMediums'
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript
            if (response.statsTopFiveMediumNonVide) {
                $('#listTopFive').empty();
                $.each(response.listeMedium, function(index, medium){
                    let rank = index + 1;
                    $('#listTopFive').append(
                        '<li>'+
                        rank + " - " + medium.Nom +
                        '</li>'
                    )
                })

                window.alert("Top5 fetched");

            } else {
                window.alert("Le top5 est vide");
                $('#notification').html("Erreur lors de la recherche des informations"); // Message pour le paragraphe de notification
            }
        })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        });
}
function getInfos() {
    // Appel AJAX
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'getEmployee',
            //id: employeeId
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript
            if (response.employee) {
                var lastName = response.employee.lastName;
                var firstName = response.employee.firstName;
                var mail = response.employee.mail;
                $('#employee-name').text(firstName + " " + lastName);
                $('#employee-mail').text(mail);
                window.alert("Informations fetched");

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