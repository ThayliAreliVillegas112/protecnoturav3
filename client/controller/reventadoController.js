const getReventadoById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/reventado/' + id
    }).done(res => res);
};

const getReventadoUsadoById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/reventado/usado2/' + id
    }).done(res => res);
};


const getInfoReventado = async id => {
    var reventado = await getReventadoById(id);
    console.log(reventado);
  
    document.getElementById('cantMPrima').value = reventado.listReventado[0].cantMateriaPrima;
    document.getElementById('cantAmaReve').value = reventado.listReventado[0].cantidadAmarantoRev;
    document.getElementById('fechaRe').value = reventado.listReventado[0].dateElaboracion;
    console.log(reventado);
    console.log("si esta entrando");
};

const getInfoReventadoUsado = async id => {
    var usado = await getReventadoUsadoById(id);
    console.log(usado);
  
    document.getElementById('amarantoUsar').value = usado.listUsado[0].cantidadAmaranto;
    // document.getElementById('dateRegistro').value = usado.listUsado[0].dateRegistro;
    console.log(usado);
    console.log("si esta entrando");
};


const getRegistrosAmaranto = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/reventado'
    }).done(res => {
        console.log(res.listReventado);

        let listReventado = res.listReventado;
        let table = $("#tablaReventado");
        
        for (let i = 0; i < listReventado.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" + 
                "<td>" + listReventado[i].dateElaboracion +"</td>" +
                "<td>" + '<button onclick="getInfoReventado(' + listReventado[i].id + ');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#detailsReventado"> <i class="fa fa-info infoBtn" aria-hidden="true"></i></button> </td>' +
                "</tr>")
                
        }
        
    });
};
getRegistrosAmaranto();

const getRegistrosAmarantoUsado = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/reventado/usado'
    }).done(res => {
        console.log(res.listUsado);

        let listUsado = res.listUsado;
        let table = $("#tablaReventadoUsado");
        
        for (let i = 0; i < listUsado.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" + 
                "<td>" + listUsado[i].dateRegistro +"</td>" +
                "<td>" + '<button onclick="getInfoReventadoUsado(' + listUsado[i].id + ');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#detailsReventadoUsar"> <i class="fa fa-info infoBtn" aria-hidden="true"></i></button> </td>' +
                "</tr>")
                
        }
        
    });
};

getRegistrosAmarantoUsado();

function registerSegReventado (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    var materiaPrima_id = 3;
    let cantMateriaPrima = document.getElementById('cantM').value;
    let cantidadAmarantoRev = document.getElementById('cantAmaReventado').value;
    let dateElaboracion = document.getElementById('dateElaboracion').value;
if (cantMateriaPrima == "") {
    Swal.fire({
        title: "Completa el campo CANTIDADA DE MATERIA PRIMA",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
} else if (cantidadAmarantoRev == ""){
    Swal.fire({
        title: "Completa el campo CANTIDAD DE AMARANTO REVENTADO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(dateElaboracion == ""){
    Swal.fire({
        title: "Completa el campo FECHA DE ELABORACIÓN",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else{
    swalWithBootstrapButtons.fire({
        title: 'Estás seguro de realizar el registro?',
        text: "Te sugerimos que revises la información antes de registrar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then ((result) => {
        if(result.isConfirmed){
            $.ajax({
                type: 'POST',
                url: 'http://localhost:4000/reventado/create',
                data: { cantMateriaPrima, cantidadAmarantoRev, dateElaboracion, materiaPrima_id}
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Registro exitoso',
                        'Se ha registrado el seguimiento de reventado',
                        'success'
                    )
                    $('#reventadoRegister'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
                    setTimeout(function() {
                        let refresh = document.getElementById('tablaReventado');
                         refresh= location.reload();
                        location.reload(true);
                    }, 3000);
                } else {
                    Swal.fire({
                        title: "Hubo un problema al registrar",
                        confirmButtonText: "Aceptar",
                        icon: "error",
                    });
                }
            });
        }{
            swalWithBootstrapButtons.fire(
                'Acción cancelada',
                'No se ha realizado el registro',
                'error'
            )
        }
    })
}};


function registerSegReventadoUsar (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    let cantidadAmaranto = document.getElementById('amarantoUsar2').value;
    let dateRegistro = document.getElementById('date').value;
if (cantidadAmaranto == ""){
    Swal.fire({
        title: "Completa el campo CANTIDAD DE AMARANTO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(dateRegistro == ""){
    Swal.fire({
        title: "Completa el campo FECHA",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else{
    swalWithBootstrapButtons.fire({
        title: 'Estás seguro de realizar el registro?',
        text: "Te sugerimos que revises la información antes de registrar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then ((result) => {
        if(result.isConfirmed){
            $.ajax({
                type: 'POST',
                url: 'http://localhost:4000/reventado/createUsado',
                data: { cantidadAmaranto, dateRegistro}
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Registro exitoso',
                        'Se ha registrado el seguimiento de salida de amaranto reventado',
                        'success'
                    )
                    $('#dismiurStock2'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
                    setTimeout(function() {
                        let refresh = document.getElementById('tablaReventadoUsado');
                         refresh= location.reload();
                        location.reload(true);
                    }, 3000);
                } else {
                    Swal.fire({
                        title: "Hubo un problema al registrar",
                        confirmButtonText: "Aceptar",
                        icon: "error",
                    });
                }
            });
        }{
            swalWithBootstrapButtons.fire(
                'Acción cancelada',
                'No se ha realizado el registro',
                'error'
            )
        }
    })
}};




function doSearch()
    {
        const tableReg = document.getElementById('tablaReventado');
        const searchText = document.getElementById('search-focus').value.toLowerCase();
        let total = 0;

        // Recorremos todas las filas con contenido de la tabla

        for (let i = 1; i < tableReg.rows.length; i++) {
            // Si el td tiene la clase "noSearch" no se busca en su cntenido

            if (tableReg.rows[i].classList.contains("noSearch")) {
                continue;
            }

            let found = false;
            const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
            // Recorremos todas las celdas
            for (let j = 0; j < cellsOfRow.length && !found; j++) {
                const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                // Buscamos el texto en el contenido de la celda
                if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                    found = true;
                    total++;
                }
            }
            if (found) {
                tableReg.rows[i].style.display = '';
            } else {
                // si no ha encontrado ninguna coincidencia, esconde la
                // fila de la tabla
                tableReg.rows[i].style.display = 'none';

            }

        }
}


function doSearchUsado2()
    {
        const tableReg = document.getElementById('tablaReventadoUsado');
        const searchText = document.getElementById('search-focus2').value.toLowerCase();
        let total = 0;

        // Recorremos todas las filas con contenido de la tabla

        for (let i = 1; i < tableReg.rows.length; i++) {
            // Si el td tiene la clase "noSearch" no se busca en su cntenido

            if (tableReg.rows[i].classList.contains("noSearch")) {
                continue;
            }

            let found = false;
            const cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
            // Recorremos todas las celdas
            for (let j = 0; j < cellsOfRow.length && !found; j++) {
                const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                // Buscamos el texto en el contenido de la celda
                if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                    found = true;
                    total++;
                }
            }
            if (found) {
                tableReg.rows[i].style.display = '';
            } else {
                // si no ha encontrado ninguna coincidencia, esconde la
                // fila de la tabla
                tableReg.rows[i].style.display = 'none';

            }

        }
}
