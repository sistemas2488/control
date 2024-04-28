// Llama a la función initClient() cuando la API de Google esté cargada
gapi.load('client', initClient);

function initClient() {
    // Inicializa la API de Google cliente con tus credenciales
    gapi.client.init({
        apiKey: 'AIzaSyAXmN0Fkn1R7vrXtuSAz5TqmVmmjA0koN8',
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    }).then(function() {
        // Llama a la función para obtener los datos
        getData();
    });
}

function getData() {
    // ID del archivo de Google Sheets
    var spreadsheetId = '1T9eSt284VQeaqACbzk2K3-dnHjkiC2BtldBmUWuElmw';
    // Rango de celdas que quieres obtener
    var range = 'Registro!A1:F24';

    // Hace una solicitud a la API de Google Sheets
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range,
    }).then(function(response) {
        var values = response.result.values;
        var table = document.getElementById('datos');

        // Itera sobre los datos y crea filas de tabla
        if (values.length > 0) {
            for (var i = 0; i < values.length; i++) {
                var row = table.insertRow(i);
                for (var j = 0; j < values[i].length; j++) {
                    var cell = row.insertCell(j);
                    cell.innerText = values[i][j];
                    // Aplicar estilo de fuente negrita a las celdas de la primera fila
                    if (i === 0) {
                        cell.style.fontWeight = 'bold';
                    }
                    // Cambiar el color de fondo y el color del texto en función del contenido de la columna C
                    if (j === 2 && values[i][j] === 'N') { // Columna C
                        cell.style.backgroundColor = 'red';
                        cell.style.color = 'white';
                    }
                }
            }
        } else {
            console.log('No data found.');
        }
    }, function(response) {
        console.log('Error: ' + response.result.error.message);
    });

    getCeldaE25();
}


function getCeldaE25() {
    // ID del archivo de Google Sheets
    var spreadsheetId = '1T9eSt284VQeaqACbzk2K3-dnHjkiC2BtldBmUWuElmw';
    // Rango de la celda E25
    var range = 'Registro!E25';

    // Hace una solicitud a la API de Google Sheets para obtener el valor de la celda E25
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range,
    }).then(function(response) {
        var value = response.result.values[0][0];
        console.log('Valor de la celda E25:', value);
        document.getElementById("total").innerHTML="Total ingresos:  "+value;
    }, function(response) {
        console.log('Error al obtener el valor de la celda E25:', response.result.error.message);
    });
}