
$(document).ready(function () {
    drawNumberConsultationsByMediumChart();
});

function drawNumberConsultationsByMediumChart() {
    $.ajax({
        url: './ActionServlet',
        method: 'POST',
        data: {
            todo: 'numberConsultationsByMedium'
        },
        dataType: 'json'
    })
        .done( function (response) { // Fonction appelée en cas d'appel AJAX réussi
            console.log('Response', response); // LOG dans Console Javascript
            buildBarChart('left-chart', response, 'Nombre de consultations par medium', '', 'Nombre')
        })
        .fail( function (error) { // Fonction appelée en cas d'erreur lors de l'appel AJAX
            console.log('Error',error); // LOG dans Console Javascript
            alert("Erreur lors de l'appel AJAX");
        })
}

function buildBarChart(container, graphData, title, subtitle, yAxis) {

    Highcharts.chart(container, {

        chart: {
            type: 'column'
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        xAxis: {
            categories: graphData.labels
        },
        yAxis: {
            title: {
                text: yAxis
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        series: [{name: 'Données', data: graphData.data}]
    });
}