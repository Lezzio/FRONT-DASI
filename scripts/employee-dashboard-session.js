var employeeId = 2;
var consultationId = 0;

$(document).ready(function () {
    getActiveConsultation()
    $("#start-button").click(startbutton)
});

function getActiveConsultation(){
    // Appel AJAX
    $.ajax({
        url: './ActionServlet',
        method: 'POST',
        data: {
            todo: 'fetchActiveConsultation',
            employeeId : employeeId
        },
        dataType: 'json'
    })
        .done( function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response',response); // LOG dans Console Javascript
            if (response.consultation) {
                window.alert("Consultation Trouvée");
                consultationId = response.consultation.id
                getActiveClient(response.consultation)
                getActiveMedium(response.consultation)
            }else{
                window.alert("Impossible de trouver une consultation");
                $('#notification').html("Erreur de consultation"); // Message pour le paragraphe de notification
            }

        })
        .fail( function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error',error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
}

function getActiveMedium(consultation){
    if(consultation.medium){
        // TODO : afficher le medium dans le bandeau pour mediums
    }else{
        window.alert("Imposssible de trouver un médium pour la consultation")
    }
}

function getActiveClient(consultation){
    if(consultation.client){
        // TODO : afficher le client dans le bandeau pour clients
    }else{
        window.alert("Imposssible de trouver un client pour la consultation")
    }
}
function startbutton() {
    console.log("clic sur le bouton commencement"); // LOG dans Console Javascript
    $('#notification').html("Commencer..."); // Message pour le paragraphe de notification
    if (consultationId === 0){
        window.alert("No id for this consultation thus you cannot start it")
        return
    }
    // Appel AJAX
    $.ajax({
        url: './ActionServlet',
        method: 'POST',
        data: {
            todo: 'startConsultation',
            consultationId : consultationId
        },
        dataType: 'json'
    })
        .done( function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response',response); // LOG dans Console Javascript
            if (response.start) {
                window.alert("Debut de la consultation");

            }else{
                window.alert("Impossible de débuter la consultation");
                $('#notification').html("Erreur de consultation"); // Message pour le paragraphe de notification
            }

        })
        .fail( function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error',error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })

}