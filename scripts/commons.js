function logout() {
    // Appel AJAX
    $.ajax({
        url: 'http://localhost:8080/DASI/ActionServlet',
        method: 'POST',
        data: {
            todo: 'signOut',
        },
        dataType: 'json'
    })
        .done(function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript
            if (response.logout) {
                window.location.href = './login.html'
            }
        })
        .fail(function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error', error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
        .always(function () { // Fonction toujours appelée

        });
}