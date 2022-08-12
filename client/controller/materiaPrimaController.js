const getMpById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/materiaP/' + id
    }).done(res => res);
}; // Busca en la tabla materiaPrima por id y ayuda a mostrar la información en los modales de detalles

const getInfoRegisterById = async id => {  
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/materiaP/registerC/' + id
    }).done(res => res);
}; //Busca por id los registros de compra de los productos y este en especial sirve para mostrar solo los detalles de cada  registro de compra

const getMpRegisterById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/materiaP/registros/'
    }).done(res => res);
}; //Este ayuda para regresar los registros de compra por id, muestra los datos de la tabla del historial, este en especial sirve para poder mostrar en la tabla el nombre del producto ya que en el servicio la consulta tiene un inner join

const getIdMP = async id => {
    document.getElementById("id_nombreMP").value = id;
    console.log(id_nombreMP);
    console.log(document.getElementById("id_nombreMP").value);
};


const getInfoMP = async id => { //Este sirve para obtener la información del nombre y precio para mostrarlo en el modal para registrar una compra
    var materiaPrima = await getMpById(id);
    console.log(materiaPrima);
    document.getElementById('id_nombreMP').value = id;
    document.getElementById('nameM').value = materiaPrima.listMateria[0].nameM;
    document.getElementById('priceClient').value = materiaPrima.listMateria[0].pricePublic;
    console.log(materiaPrima);
    console.log("si esta entrando");
};

const getInfoRegisterCompra = async id => { //Este sirve para obtener los detalles de cada registro de compra
    var registros = await getInfoRegisterById(id);
    console.log(registros);
    // document.getElementById('id_historyC').value = id;
    document.getElementById('lote').value = registros.listMateria[0].lote;
    document.getElementById('cantidad').value = registros.listMateria[0].cantidad;
    document.getElementById('namePro').value = registros.listMateria[0].nameProveedor;
    document.getElementById('clavePro').value = registros.listMateria[0].claveProductor;
    document.getElementById('dateCompra').value = registros.listMateria[0].dateCompra;
    document.getElementById('costales').value = registros.listMateria[0].costales;
    document.getElementById('claveCostales').value = registros.listMateria[0].claveCostales;
    document.getElementById('quienE').value = registros.listMateria[0].quienEntrego;
    document.getElementById('quienR').value = registros.listMateria[0].quienRecibio;
    console.log(registros);
    console.log("si esta entrando");
};

const getInfoUpdateMP = async id => { //Obtiene la información para el modal de actualizar solo el nombre y precio al publico de la materia prima
    let materiaPrima = await getMpById(id);

    document.getElementById('id_updateNP').value = id;
    document.getElementById('nameM_up').value = materiaPrima.listMateria[0].nameM;
    document.getElementById('pricePublic_up').value = materiaPrima.listMateria[0].pricePublic;
    
    console.log(materiaPrima);

};
const getRegisterCompra = () => {  //Obtiene todos los registros de compra 
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/materiaP/registros'
    }).done(res => {
        console.log(res.listMateria);

        let listMateria = res.listMateria;
        let table = $("#registrosCompra");
        
        for (let i = 0; i < listMateria.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" +
                "<td>" + listMateria[i].dateCompra + "</td>" +
                "<td>" + listMateria[i].nameM + "</td>" +
                "<td>" + listMateria[i].nameProveedor+ "</td>" +
                "<td>" + '<button onclick="getInfoRegisterCompra(' + listMateria[i].id + ');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#addCompraDetails"> <i class="fa fa-info infoBtn" aria-hidden="true"></i></button> </td>' +
               "</tr>")
        }
    });
};
getRegisterCompra();

const getMateriaPrima = () => {  //Obtiene todos los registros que se tienen de las materias primas (nombe y precio)
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/materiaP'
    }).done(res => {
        console.log(res.listMateria);

        let listMateria = res.listMateria;
        let table = $("#materiaPrimaTable");
        
        for (let i = 0; i < listMateria.length; i++) {
            stock = registerStock()
            console.log(stock)
            console.log("este de arriba es el stock")
            if(stock == null){
                stock = "0"
            }
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" +
                "<td>" + listMateria[i].nameM + "</td>" +
                "<td>" + stock + "</td>" +
                "<td>" + listMateria[i].pricePublic+ "</td>" +
                "<td>" + '<button onclick="getInfoMP(' + listMateria[i].id + ');" type="button" class="btn btn-success text-dark" data-bs-toggle="modal" data-bs-target="#addCompra"> <i class="fa fa-folder-plus" aria-hidden="true"></i></button> </td>' +
                "<td>" + '<button onclick="getInfoUpdateMP(' + listMateria[i].id + ');" type="button" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#modify"><i class="fa fa-pen" aria-hidden="true"></i></button> </td>' +
                // "<td>" + '<a href="historyCompra.html" class="btn btn-info" role="button" ><i class="fa fa-list" aria-hidden="true"></i></a> </td>' +
                "</tr>")
        }
    });
};
getMateriaPrima();

function registerMateriaPrima (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({ //Solo va a registrar el nombre y precio
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    console.log("si entra para el llenado")
    let nameM = document.getElementById('nameMRe').value;
    let pricePublic = document.getElementById('pricePublicRe').value;
        
if (nameM == "") {
    Swal.fire({
        title: "Completa el campo NOMBRE",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
} else if (pricePublic == ""){
    Swal.fire({
        title: "Completa el campo PRECIO",
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
                url: 'http://localhost:4000/materiaP/create',
                data: { nameM, pricePublic}
                }).done(res => {
                console.log(res)
                console.log("Si registra")
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Registro exitoso',
                        'Se ha registrado al cliente exitosamente',
                        'success'
                    )
                    let formulario = document.getElementById('materiaPrimaN');
                    formulario.reset();
                    $('#addMateria'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
                    setTimeout(function() {
                        let refresh = document.getElementById('materiaPrimaN');
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

const registerStock = async id =>{
    
    // console.log("si entra para el llenado")
    // document.getElementById("id_nombreMP").value = id;
    // // let stock = document.getElementById('cantidad').value;
    // console.log("*******")
    //     console.log(id)
    //     console.log(".......")
    //         $.ajax({
    //             type: 'GET',
    //             url: 'http://localhost:4000/materiaP/stock' + id,
    //             }).done(res => {
    //             console.log(res)
    //             console.log("Si muestra")
    //             if (res.status === 200) {
    //                 console.log("si muestra el stock")
    //             } else {
    //                 console.log("No esta registrando ni madres")
    //             }
        
    // })
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/materiaP/stock/' + id
    }).done(res => res);
};

registerStock()


function registerCompra (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({ //Solo va a registrar el nombre y precio
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    console.log("si entra para el llenado")
    let lote = document.getElementById('lote').value;
    let cantidad = document.getElementById('cantidad').value;
    let nameProveedor = document.getElementById('nameProveedor').value;
    let claveProductor = document.getElementById('claveProductor').value;
    let dateCompra = document.getElementById('dateCompra').value;
    let costales = document.getElementById('costales').value;
    let claveCostales = document.getElementById('claveCostales').value;
    let quienEntrego = document.getElementById('quienEntrego').value;
    let quienRecibio = document.getElementById('quienRecibio').value;
    let materiaPrima_id = document.getElementById('id_nombreMP').value;
    registerStock();
if (lote == "") {
    Swal.fire({
        title: "Completa el campo LOTE",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
} else if (cantidad == ""){
    Swal.fire({
        title: "Completa el campo CANTIDAD",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(nameProveedor == ""){
    Swal.fire({
        title: "Completa el campo NOMBRE DEL PROVEEDOR",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if (claveProductor == ""){
    Swal.fire({
        title: "Completa el campo CLAVE DEL PRODUCTOR",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(dateCompra == ""){
    Swal.fire({
        title: "Completa el campo FECHA DE COMPRA",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(costales == ""){
    Swal.fire({
        title: "Completa el campo COSTALES",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(claveCostales == ""){
    Swal.fire({
        title: "Completa el campo CLAVE COSTALES",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(quienEntrego == ""){
    Swal.fire({
        title: "Completa el campo QUIEN ENTREGÓ",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(quienRecibio == ""){
    Swal.fire({
        title: "Completa el campo QUIEN RECIBIÓ",
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
                url: 'http://localhost:4000/materiaP/regCompra/',
                data: { lote, cantidad, nameProveedor, claveProductor, dateCompra, costales, claveCostales, quienEntrego, quienRecibio, materiaPrima_id}
            }).done(res => {
                console.log(res)
                console.log("Si registra")
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Registro exitoso',
                        'Se ha registrado la compra exitosamente',
                        'success'
                    )
                    $('#addCompra'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
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


function updateNamePrice (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({ //Solo va a registrar el nombre y precio
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    console.log(id);
    console.log("Si entra para hacer los cambios");
    var id = document.getElementById('id_updateNP').value;
    let nameM = document.getElementById('nameM_up').value;
    let pricePublic = document.getElementById('pricePublic_up').value;
    console.log(id);
if (nameM == "") {
    Swal.fire({
        title: "Completa el campo NOMBRE",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
} else if (pricePublic == ""){
    Swal.fire({
        title: "Completa el campo APELLIDO MATERNO",
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
                url: 'http://localhost:4000/materiaP/update/' + id,
                data: { nameM, pricePublic}
                }).done(res => {
                console.log(res)
                console.log("Si registra")
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Registro exitoso',
                        'Se ha modificado la materia prima exitosamente',
                        'success'
                    )
                    $('#modify'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
                    setTimeout(function() {
                        let refresh = document.getElementById('materiaPrimaTable');
                        refresh= location.reload();
                        location.reload(true);
                    }, 2000);
                } else {
                    Swal.fire({
                        title: "Hubo un problema al modificara",
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

function doSearchMateriaPrima(){ //BUSCADR DE LA TABLA DE LOS NOMBRES DE LA MATERIA PRIMA
    const tableReg = document.getElementById('materiaPrimaTable');
    const searchText = document.getElementById('search-focusMateriaPrima').value.toLowerCase();
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
        } else{
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = 'none';

        }
    }
}


function doSearchRegisterCompra(){ //BUSCADR DE LA TABLA DE LOS REGISTROS DE COMPRA DE CADA MATERIA PRIMA
    const tableReg = document.getElementById('registrosCompra');
    const searchText = document.getElementById('search-focusMateriaPrima').value.toLowerCase();
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
        } else{
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = 'none';

        }
    }
}
