const getHarinaById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/harina/' + id
    }).done(res => res);
};

const getMaterialProcesadoById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/harina/materialProcesado' + id
    }).done(res => res);
};

const getInfoUpdateHarina = async id => {
    let harina = await getHarinaById(id);

    document.getElementById('id_updateHarina').value = id;
    document.getElementById('nameHarina_up').value = harina.listHarina[0].nameH;
    console.log(harina);
};

const getInfoRegisterMaterialProcesado = async id => { //Este sirve para obtener el nombre de la harina para poder realiar el registro de material procesado
    var nameMP = await getHarinaById(id);
    console.log(nameMP);
    document.getElementById('id_nameMP').value = id;
    document.getElementById('nameMateriap').value = nameMP.listHarina[0].nameH;
    console.log(nameMP);
    console.log("si esta entrando");
};

const getInfoHistorialMaterialProcesado = async id => { //Este sirve para obtener el nombre de la harina para poder realiar el registro de material procesado
    var matPro = await getMaterialProcesadoById(id);
    // document.getElementById('id_matPro').value = id;
    console.log(matPro);
    document.getElementById('canMatPrima').value = matPro.listHarina[0].cantidad;
    document.getElementById('cantHarina').value = matPro.listHarina[0].cantidadHarina;
    document.getElementById('dateRegister').value = matPro.listHarina[0].dateRegistro;
    console.log(matPro);
    console.log("si esta entrando");
};

const getHarina = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/harina'
    }).done(res => {
        console.log(res.listHarina);

        let listHarina = res.listHarina;
        let table = $("#harinas");
        
        for (let i = 0; i < listHarina.length; i++) {
            let stock;
            stock = 10;
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" + 
                "<td>" + listHarina[i].nameH +"</td>" +
                "<td>" + stock +"</td>" +
                "<td>" + '<button onclick="getInfoRegisterMaterialProcesado(' + listHarina[i].id + ');" type="button" class="btn btn-success text-dark iconMargin" data-bs-toggle="modal" data-bs-target="#addHarinaRegister"> <i class="fa fa-folder-plus infoBtn" aria-hidden="true"></i></button> </td>' +
                "<td>" + '<button onclick="getInfoUpdateHarina(' + listHarina[i].id + ');" type="button" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#updateNameH"> <i class="fa fa-pen infoBtn" aria-hidden="true"></i></button> </td>' +  
                "</tr>"
            )                
        }        
    });
};
getHarina();


const getHistorialMaterialProcesado = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/harina/materialProcesado2'
    }).done(res => {
        console.log(res.listHarina);

        let listHarina = res.listHarina;
        let table = $("#hiatorialMaterialPro");
        
        for (let i = 0; i < listHarina.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" + 
                "<td>" + listHarina[i].dateRegistro +"</td>" +
                "<td>" + listHarina[i].nameH +"</td>" +
                "<td>" + listHarina[i].cantidadHarina +"</td>" +
                "<td>" + listHarina[i].nameM +"</td>" +
                "<td>" + listHarina[i].cantidad +"</td>" +
                // "<td>" + '<button onclick="getInfoHistorialMaterialProcesado(' + listHarina[i].id + ');" type="button" class="btn btn-primary text-dark " data-bs-toggle="modal" data-bs-target="#detailsharina"> <i class="fa fa-info infoBtn" aria-hidden="true"></i></button> </td>' +
                "</tr>"
            )                
        }        
    });
};
getHistorialMaterialProcesado();

function registerHarina (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    let nameH = document.getElementById('nameHarinaRe').value;
if (nameH == "") {
    Swal.fire({
        title: "Completa el campo NOMBRE",
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
                url: 'http://localhost:4000/harina/create',
                data: { nameH}
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Registro exitoso',
                        'Se ha registrado el nombre de la materia prima',
                        'success'
                    )
                    // let formulario = document.getElementById('formu'); 
                    // formulario.reset()
                    setTimeout(function() {
                        let refresh = document.getElementById('addHarina');
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

function updateNameHarina (){
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
    var id = document.getElementById('id_updateHarina').value;
    let nameH = document.getElementById('nameHarina_up').value;
    console.log(id);

if (nameH == "") {
    Swal.fire({
        title: "Completa el campo NOMBRE",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else{
    swalWithBootstrapButtons.fire({
        title: 'Estás seguro de realizar los cambios?',
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
                url: 'http://localhost:4000/harina/update/' + id,
                data: {nameH}
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Modificación exitosa',
                        'Se ha modificado al cliente exitosamente',
                        'success'
                    )
                    $('#updateNameH'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
                    setTimeout(function() {
                        let refresh = document.getElementById('updateNameH');
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
        }{
            swalWithBootstrapButtons.fire(
                'Acción cancelada',
                'No se ha realizado la modificación',
                'error'
            )
        }
    })
}};

function registerMaterialProcesado (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({ //Registra el material procesado de cada harina que ya se encuentre registrada
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    console.log("si entra para el llenado")
    let cantidad = document.getElementById('cantMP').value;
    let cantidadHarina = document.getElementById('cantHarina').value;
    let dateRegistro = document.getElementById('dateRe').value;
    let harina_id = document.getElementById('id_nameMP').value;
    let materiaPrima_id = document.getElementById('mySelect2').value;
        
if (cantidad == "") {
    Swal.fire({
        title: "Completa el campo CANTIDAD DE MATERIA PRIMA",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
} else if (cantidadHarina == ""){
    Swal.fire({
        title: "Completa el campo CANTIDAD HARINA HECHA",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(dateRegistro == ""){
    Swal.fire({
        title: "Completa el campo FECHA REGISTRO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if (materiaPrima_id == ""){
    Swal.fire({
        title: "Elija una MATERIA PRIMA",
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
                url: 'http://localhost:4000/harina/createMaterialProcesado/',
                data: { cantidad, cantidadHarina, dateRegistro, harina_id, materiaPrima_id }
            }).done(res => {
                console.log(res)
                console.log("Si registra")
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Registro exitoso',
                        'Se ha registrado el material procesado exitosamente',
                        'success'
                    )
                    let formulario = document.getElementById('formuMaterialPro');
                    formulario.reset();
                    $('#addHarinaRegister'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
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
            $('#addHarinaRegister'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
        }
    })
}};



const getSelectMateriaPrima = () => { //Muestra todas las materias primas registradas en el select para poder registrar un material procesado
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/materiaP'
    }).done(res => {
        console.log(res.listMateria);
        let listMateria = res.listMateria;        
        $.each(listMateria, function (i, item) {
            $('#mySelect2').append($('<option>', { 
                value: item.id,  //con esta linea guarda en el campo client_id el id y no el nombre como cadena
                text : item.nameM
            }));
        });
        console.log("si esta regresando")
    });
};
    getSelectMateriaPrima();

function doSearch()
    {
        const tableReg = document.getElementById('harinas');
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


function doSearchMaterialProcesado()
    {
        const tableReg = document.getElementById('hiatorialMaterialPro');
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
