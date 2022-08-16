const getMezclaById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/mezcla/' + id
    }).done(res => res);
};

const getMezclaUsadoById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/mezcla/usadoM2/' + id
    }).done(res => res);
};

const getStockById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/mezcla/stockM/' + id
    }).done(res => res);
};

const getInfoMezcla = async id => {
    var mezcla = await getMezclaById(id);
    console.log(mezcla);
    document.getElementById('cantChia').value = mezcla.listMezcla[0].cantChia;
    document.getElementById('cantAmaranto').value = mezcla.listMezcla[0].cantAmaranto;
    document.getElementById('cantAjonjoli').value = mezcla.listMezcla[0].cantAjonjoli;
    document.getElementById('totalMezcla').value = mezcla.listMezcla[0].mezclaTotal;
    console.log(mezcla);
    console.log("si esta entrando");
};

const getInfoMezclaUsado = async id => {
    var usado = await getMezclaUsadoById(id);
    console.log(usado);
    document.getElementById('mezcla').value = usado.listUsado[0].cantidadMezcla;
    document.getElementById('fecha').value = usado.listUsado[0].dateRegistro;
    console.log(usado);
    console.log("si esta entrando");
};

const getInfoUpdateStockM = async id => {
    let stockM = await getStockById(id);

    document.getElementById('id_updateStockMezcla').value = id;
    document.getElementById('stockMezcla_up').value = stockM.listMezcla[0].stockMezcla;
    console.log(stockM);
};

const getRegistrosMezcla = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/mezcla'
    }).done(res => {
        console.log(res.listMezcla);

        let listMezcla = res.listMezcla;
        let table = $("#tablaMezcla");
        
        for (let i = 0; i < listMezcla.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" + 
                "<td>" + listMezcla[i].dateElaboracion +"</td>" +
                "<td>" + '<button onclick="getInfoMezcla(' + listMezcla[i].id + ');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#detailsMezcla"> <i class="fa fa-info infoBtn" aria-hidden="true"></i></button> </td>' +
                "</tr>")
                
        }
        
    });
};
getRegistrosMezcla();

const getNameStockM = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/mezcla/vistaM'
    }).done(res => {
        console.log(res.listMezcla);

        let listMezcla = res.listMezcla;
        let table = $("#tablaVistaMezcla");
        let stock;
        for (let i = 0; i < listMezcla.length; i++) {
            if(listMezcla[i].stockMezcla == null){
                stock = 0
            }else{
                stock = listMezcla[i].stockMezcla
            }
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" + 
                "<td>" + listMezcla[i].nameMezcla +"</td>" +
                "<td>" + stock +"</td>" +
                "<td>" + '<button onclick="getInfoUpdateStockM(' + listMezcla[i].id + ');" type="button" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#updateStockMezcla"><i class="fa fa-pen" aria-hidden="true"></i></button> </td>' +
                "<td>" + '<a href="historyMezcla.html" class="btn btn-info" role="button" ><i class="fa fa-list" aria-hidden="true"></i></a> </td>' +
                "</tr>")
                
        }
        
    });
};

getNameStockM()

const getRegistrosMezclaUsado = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/mezcla/usadoM'
    }).done(res => {
        console.log(res.listUsado);

        let listUsado = res.listUsado;
        let table = $("#tablaMezclaUsado");
        
        for (let i = 0; i < listUsado.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" + 
                "<td>" + listUsado[i].dateRegistro +"</td>" +
                "<td>" + '<button onclick="getInfoMezclaUsado(' + listUsado[i].id + ');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#detailsMezclaMenos"> <i class="fa fa-info infoBtn" aria-hidden="true"></i></button> </td>' +
                "</tr>")
                
        }
        
    });
};

getRegistrosMezclaUsado();

function registerSegMezcla (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    let cantChia = document.getElementById('chia').value;
    let cantAmaranto = document.getElementById('amaranto').value;
    let cantAjonjoli = document.getElementById('ajonjoli').value;
    let mezclaTotal = document.getElementById('mezclaTotal').value;
    let dateElaboracion = document.getElementById('fechaElaboración').value;

    if (cantChia == "") {
    Swal.fire({
        title: "Completa el campo CANTIDADA DE CHÍA",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
} else if (cantAmaranto == ""){
    Swal.fire({
        title: "Completa el campo CANTIDAD DE AMARANTO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(cantAjonjoli == ""){
    Swal.fire({
        title: "Completa el campo CANTIDAD DE AJONJOLÍ",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(mezclaTotal == ""){
    Swal.fire({
        title: "Completa el campo MEZCLA TOTAL",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(dateElaboracion == ""){
    Swal.fire({
        title: "Completa el campo FECHA DE ELABORACIÓN DE MEZCLA",
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
                url: 'http://localhost:4000/mezcla/create',
                data: { cantChia, cantAmaranto, cantAjonjoli, mezclaTotal, dateElaboracion}
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Registro exitoso',
                        'Se ha registrado el seguimiento de la mezcla',
                        'success'
                    )
                    $('#mezclaRegister'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
                    setTimeout(function() {
                        let refresh = document.getElementById('tablaMezcla');
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
        }else{
            swalWithBootstrapButtons.fire(
                'Acción cancelada',
                'No se ha realizado el registro',
                'error'
            )
        }
    })
}};


function registerSegMezclaUsar (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    let cantidadMezcla = document.getElementById('mezclaU').value;
    let dateRegistro = document.getElementById('fechaa').value;
if (cantidadMezcla == ""){
    Swal.fire({
        title: "Completa el campo CANTIDAD DE MEZCLA USADA",
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
                url: 'http://localhost:4000/mezcla/createUsadoM',
                data: { cantidadMezcla, dateRegistro}
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Registro exitoso',
                        'Se ha registrado el seguimiento de salida de amaranto reventado',
                        'success'
                    )
                    $('#dismiurStock').modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
                    setTimeout(function() {
                        let refresh = document.getElementById('tablaMezclaUsado');
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
        }else{
            swalWithBootstrapButtons.fire(
                'Acción cancelada',
                'No se ha realizado el registro',
                'error'
            )
        }
    })
}};


function updateStockM (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    console.log(id);
    console.log("Si entra para hacer los cambios");
    var id = document.getElementById('id_updateStockMezcla').value;
    let stockMezcla = document.getElementById('stockMezcla_up').value;
    console.log(id);

if (stockMezcla == "") {
    Swal.fire({
        title: "Completa el campo STOCK",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else{
    swalWithBootstrapButtons.fire({
        title: 'Estás seguro de actualizar el stock?',
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
                url: 'http://localhost:4000/mezcla/updateM/' + id,
                data: {stockMezcla}
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Modificación exitosa',
                        'Se ha modificado el stock exitosamente',
                        'success'
                    )
                    $('#updateStockMezcla'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
                    setTimeout(function() {
                        let refresh = document.getElementById('tablaVistaMezcla');
                        refresh= location.reload();
                         location.reload(true);
                    }, 2000);
                } else {
                    Swal.fire({
                        title: "Hubo un problema al modificar",
                        confirmButtonText: "Aceptar",
                        icon: "error",
                    });
                }
            });
        }else{
            swalWithBootstrapButtons.fire(
                'Acción cancelada',
                'No se ha realizado la modificación',
                'error'
            )
        }
    })
}};

function doSearch()
    {
        const tableReg = document.getElementById('tablaMezcla');
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


function doSearchMezcla()
    {
        const tableReg = document.getElementById('tablaMezclaUsado');
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
