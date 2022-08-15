const getPedidoById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/pedido/' + id
    }).done(res => res);
};

const getPedidoL2ById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/pedido/pedidoL2/' + id
    }).done(res => res);
};

const getPedidoDetallesById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/pedido/pedidosDetalles/' + id
    }).done(res => res);
};

const getPedidoDetallesLista2 = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/pedido/pedidoL2Detalles/' + id
    }).done(res => res);
};

const getPedidoDetallesConfirmados = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/pedido/pedidoDetallesConfirmados/' + id
    }).done(res => res);
};

const getPedidoDetallesLista3 = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/pedido/pedidoL3Detalles/' + id
    }).done(res => res);
};

const getIdPedido = async id => {
    var idPedido = await getPedidoById(id);
    console.log(idPedido);
    document.getElementById("id_pedido").value = id;
    getDetallesPedidos1();
};
getIdPedido()

const getDeatllesPedidoProductosMatePrimaIdPedido = async id => {
    var idPedido = await getPedidoById(id);
    console.log(idPedido);
    document.getElementById("id_pedidoDetails").value = id;
    getDetallesPedidos1VistaOrders();
};
const getIdPedidoCheck = async id => { //obtengo el id del pedidopara hacer el check (cambiar el status a 2)
    document.getElementById("id_checkPedido").value = id;
    console.log(id_checkPedido);
    console.log(document.getElementById("id_checkPedido").value);
};

const getIdPedidoConfirmar = async id => { //obtengo el id del pedidopara hacer el check (cambiar el status a 2)
    var idPedido = await getPedidoById(id);
    console.log(idPedido);
    document.getElementById("id_confirmar").value = id;
    console.log(id_confirmar);
    console.log(document.getElementById("id_confirmar").value);
};

const getIdPedidoConfirmado = async id => { //obtengo el id del pedidopara hacer el check (cambiar el status a 2)
    var idPedido = await getPedidoById(id);
    console.log(idPedido);
    document.getElementById("id_confirmado").value = id;
    console.log(id_confirmado);
    console.log(document.getElementById("id_confirmado").value);
};

const getInfoLista2 = async id => {
    var list2 = await getPedidoDetallesLista2(id);
    console.log(list2);
    document.getElementById('nameCliente').value = list2.listPedido[0].name+ " " + list2.listPedido[0].surname + " " + list2.listPedido[0].lastname;
    document.getElementById('email').value = list2.listPedido[0].email;
    document.getElementById('telefono').value = list2.listPedido[0].phone;
    document.getElementById('empresa').value = list2.listPedido[0].company;
    document.getElementById('quien').value = list2.listPedido[0].elaboro;
    document.getElementById('pedido').value = list2.listPedido[0].pedido;

    console.log(list2);
    console.log("si esta entrando");
};

const getInfoListaConfirmados = async id => {
    var listC = await getPedidoDetallesConfirmados(id);
    console.log(listC);
    document.getElementById('nameClienteyf').value = listC.listPedido[0].name+ " " + listC.listPedido[0].surname + " " + listC.listPedido[0].lastname;
    document.getElementById('emaily').value = listC.listPedido[0].email;
    document.getElementById('telefonoy').value = listC.listPedido[0].phone;
    document.getElementById('empresay').value = listC.listPedido[0].company;
    document.getElementById('quieny').value = listC.listPedido[0].elaboro;
    document.getElementById('pedidoy').value = listC.listPedido[0].pedido;
    document.getElementById('fechaPago').value = listC.listPedido[0].datePago;
    console.log(listC);
    console.log("si esta entrando");
};

const getInfoLista3 = async id => {
    var list3 = await getPedidoDetallesLista3(id);
    console.log(list3);
    document.getElementById('nameClienteP').value = list3.listPedido[0].name + " "+ list3.listPedido[0].surname + " " + list3.listPedido[0].lastname;
    document.getElementById('fechaEntrega').value = list3.listPedido[0].dateEntrega;
    document.getElementById('hora').value = list3.listPedido[0].timeLlegada;
    document.getElementById('empresaT').value = list3.listPedido[0].companyTransporte;
    document.getElementById('operador').value = list3.listPedido[0].nameOperador;
    document.getElementById('identifico').value = list3.listPedido[0].seIdentifico;
    document.getElementById('placasNum').value = list3.listPedido[0].numPlacas;
    document.getElementById('transporteTipo').value = list3.listPedido[0].tipoTransporte;
    document.getElementById('descripcionCarga').value = list3.listPedido[0].descripCarga;
    document.getElementById('observacionesss').value = list3.listPedido[0].observations;
    document.getElementById('registro').value = list3.listPedido[0].dateSalida;

    console.log(list3);
    console.log("si esta entrando");
};


function registerPedido (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    let pedido = document.getElementById('pedidoRe').value;
    let elaboro = document.getElementById('elaboroRe').value;
    var dateSolicitud = document.getElementById('datePedidoRe').value;
    var status = 1;
    let client_id = document.getElementById('clienteSelect').value;

    console.log("si llena el seguimiento");


if (pedido == "") {
    Swal.fire({
        title: "Completa el campo PEDIDO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
} else if (client_id == ""){
    Swal.fire({
        title: "Completa el campo CLIENTE",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(elaboro == ""){
    Swal.fire({
        title: "Completa el campo ELABORÓ",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(dateSolicitud == ""){
    Swal.fire({
        title: "Completa el campo FECHA DE SOLICITUD",
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
                url: 'http://localhost:4000/pedido/create',
                data: { pedido, elaboro, dateSolicitud, status, client_id }
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Registro exitoso',
                        'Se ha registrado el pedido exitosamente',
                        'success'
                    )
                    // let formulario = document.getElementById('formu2'); 
                    // formulario.reset()
                    setTimeout(function() {
                        let refresh = document.getElementById('tablaPedidos1');
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
}
    
};

const getPedidos1 = () => { //MUESTRA LA TABLA QUE ESTA EN LA VISTA DE REGISTRAR PEDIDO, ES LA TABLA DONDE SE VAN AGREGANDO LOS PRODUCTOS
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/pedido'
    }).done(res => {
        console.log(res.listPedido);

        let listPedido = res.listPedido;
        let table = $("#tablaPedidos1");
        
        for (let i = 0; i < listPedido.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" +
                "<td>" + listPedido[i].dateSolicitud + "</td>" +
                "<td>" + listPedido[i].pedido + "</td>" +
                "<td>" + '<button onclick="getIdPedido(' + listPedido[i].id + ');" type="button" class="btn btn-info text-dark" data-bs-toggle="modal" data-bs-target="#detallesPedido"> <i class="fa fa-plus infoBtn" aria-hidden="true"></i></button> </td>' +
                "<td>" + '<button onclick="getIdPedidoCheck(' + listPedido[i].id + ');" type="button" class="btn btn-success text-dark" data-bs-toggle="modal" data-bs-target="#checkPedido"> <i class="fa fa-check infoBtn" aria-hidden="true"></i></button> </td>' +
               "</tr>")
        }
    });
};
getPedidos1()

const getPedidos2 = () => { //MUESTRA LA PRIMERA TABLA DE LA VISTA ORDERS, ES DECIR; SE ENCARGA DE MOSTRAR LOS PEDIDOS CON STATUS 2 PARA QUE PUEDAN SER CONFIRMADOS
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/pedido/lista2'
    }).done(res => {
        console.log(res.listPedido);

        let listPedido = res.listPedido;
        let table = $("#tablaPedidos2");
        
        for (let i = 0; i < listPedido.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" +
                "<td>" + listPedido[i].dateSolicitud + "</td>" +
                "<td>" + listPedido[i].pedido + "</td>" +
                "<td>" + listPedido[i].elaboro +"</td>" +
                "<td>" + '<button onclick="getInfoLista2(' + listPedido[i].id + ');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#detailsOrder"> <i class="fa fa-info infoBtn" aria-hidden="true"></i></button> </td>' +
                // "<td>" + '<button onclick="getDeatllesPedidoProductosMatePrimaIdPedido(' + listPedido[i].id + ');" type="button" class="btn btn-info text-dark" data-bs-toggle="modal" data-bs-target="#detallesPedidoLista"> <i class="fa fa-cart-plus infoBtn" aria-hidden="true"></i></button> </td>' +
                "<td>" + '<button onclick="getIdPedidoConfirmar(' + listPedido[i].id + ');" type="button" class="btn btn-success iconMargin text-dark" data-bs-toggle="modal" data-bs-target="#confirmOrder"> <i class="fa fa-clipboard-check infoBtn" aria-hidden="true"></i></button> </td>' +
               "</tr>")
        }
    });
};
getPedidos2()


const getDetallesPedidos1 = (id) => { // SIRVE PARA MOSTRAR LA TABLA DENTRO DEL MODAL; ES DECIR, ES LA TABLA QUE MUESTRA LOS PRODUCTOS AGREGADOS
    var id = document.getElementById('id_pedido').value;
    console.log("pruebaaaaa")
    console.log(id)
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/pedido/pedidosDetallesTabla/' + id
    }).done(res => {
        console.log(res.listDetallesPedido);

        let listDetallesPedido = res.listDetallesPedido;
        let table = $("#mostrarProductos");
        
        for (let i = 0; i < listDetallesPedido.length; i++) {
            let precioTotal = listDetallesPedido[i].price * listDetallesPedido[i].cantUnidades;

            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" +
                "<td>" + listDetallesPedido[i].name + "</td>" +
                "<td>" + listDetallesPedido[i].cantUnidades + "</td>" +
                "<td>" + listDetallesPedido[i].price + "</td>" +
                "<td>" +  precioTotal + "</td>" +
                // "<td>" + '<button onclick="getIdPedido(' + listDetallesPedido[i].id + ');" type="button" class="btn btn-success text-dark" data-bs-toggle="modal" data-bs-target="#detallesPedido"> <i class="fa fa-plus infoBtn" aria-hidden="true"></i></button> </td>' +
               "</tr>")
        }
    });
};

const getDetallesPedidos1VistaOrders = (id) => { // SIRVE PARA MOSTRAR LA TABLA DENTRO DEL MODAL; ES DECIR, ES LA TABLA QUE MUESTRA LOS PRODUCTOS AGREGADOS
    var id = document.getElementById('id_pedidoDetails').value;
    console.log("pruebaaaaa")
    console.log(id)
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/pedido/pedidosDetallesTabla/' + id
    }).done(res => {
        console.log(res.listDetallesPedido);

        let listDetallesPedido = res.listDetallesPedido;
        let table = $("#mostrarProductosLista");
        
        for (let i = 0; i < listDetallesPedido.length; i++) {
            let precioTotal = listDetallesPedido[i].price * listDetallesPedido[i].cantUnidades;

            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" +
                "<td>" + listDetallesPedido[i].name + "</td>" +
                "<td>" + listDetallesPedido[i].cantUnidades + "</td>" +
                "<td>" + listDetallesPedido[i].price + "</td>" +
                "<td>" +  precioTotal + "</td>" +
                // "<td>" + '<button onclick="getIdPedido(' + listDetallesPedido[i].id + ');" type="button" class="btn btn-success text-dark" data-bs-toggle="modal" data-bs-target="#detallesPedido"> <i class="fa fa-plus infoBtn" aria-hidden="true"></i></button> </td>' +
               "</tr>")
        }
    });
};

const getPedidos3 = () => { //MUESTRA LA PRIMERA TABLA DE LA VISTA ORDERS, ES DECIR; SE ENCARGA DE MOSTRAR LOS PEDIDOS CON STATUS 2 PARA QUE PUEDAN SER CONFIRMADOS
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/pedido/lista3'
    }).done(res => {
        console.log(res.listPedido);

        let listPedido = res.listPedido;
        let table = $("#tablaPedidos3");
        
        for (let i = 0; i < listPedido.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" +
                "<td>" + listPedido[i].dateSolicitud + "</td>" +
                "<td>" + listPedido[i].pedido + "</td>" +
                "<td>" + listPedido[i].elaboro +"</td>" +
                "<td>" + listPedido[i].datePago + "</td>" +
                "<td>" + '<button onclick="getInfoListaConfirmados(' + listPedido[i].id + ');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#detailsConfirmados"> <i class="fa fa-info infoBtn" aria-hidden="true"></i></button> </td>' +
                "<td>" + '<button onclick="getIdPedidoConfirmado(' + listPedido[i].id + ');" type="button" class="btn btn-warning iconMargin text-dark" data-bs-toggle="modal" data-bs-target="#salida"> <i class="fa fa-car-side infoBtn" aria-hidden="true"></i></button> </td>' +
               "</tr>")
        }
    });
};

getPedidos3()

const getPedidos4 = () => { //MUESTRA LA PRIMERA TABLA DE LA VISTA ORDERS, ES DECIR; SE ENCARGA DE MOSTRAR LOS PEDIDOS CON STATUS 2 PARA QUE PUEDAN SER CONFIRMADOS
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/pedido/lista4'
    }).done(res => {
        console.log(res.listPedido);

        let listPedido = res.listPedido;
        let table = $("#tablaPedidos4");
        
        for (let i = 0; i < listPedido.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" +
                "<td>" + listPedido[i].dateSalida + "</td>" +
                "<td>" + listPedido[i].pedido + "</td>" +
                "<td>" + '<button onclick="getInfoLista3(' + listPedido[i].id + ');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#salidaDetails"> <i class="fa fa-info infoBtn" aria-hidden="true"></i></button> </td>' +
                // "<td>" + '<button onclick="getIdPedidoConfirmado(' + listPedido[i].id + ');" type="button" class="btn btn-warning iconMargin text-dark" data-bs-toggle="modal" data-bs-target="#salida"> <i class="fa fa-car-side infoBtn" aria-hidden="true"></i></button> </td>' +
               "</tr>")
        }
    });
};

getPedidos4()
const registerDetallesPedido  = async id =>{ // Registra los productos en el pedido

    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    let product_id = document.getElementById('ProductSelect').value;
    var pedido_id = document.getElementById('id_pedido').value;
    let cantUnidades = document.getElementById('unidades').value;
    // let precioTotal = localStorage.getItem("precioT");;
    var total = 1200;
    
    console.log("si llena los detalles del pedido");

if (product_id == "") {
    Swal.fire({
        title: "Completa el campo SELECCIONA UN PRODUCTO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
} else if (cantUnidades == ""){
    Swal.fire({
        title: "Completa el campo CANTIDAD DE UNIDADES",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else{
    swalWithBootstrapButtons.fire({
        title: 'Estás seguro de realizar el registro?',
        text: "Una vez que se agregue el producto debe tener cuidado de no duplicarlo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then ((result) => {
        if(result.isConfirmed){
            $.ajax({
                type: 'POST',
                url: 'http://localhost:4000/pedido/createDetalles',
                data: { cantUnidades, total, pedido_id, product_id }
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Registro exitoso',
                        'Se ha registrado el detalle del pedido exitosamente',
                        'success'
                    )
                    // getDetallesPedidos1()
                    // localStorage.removeItem("precioT");
                    let formulario = document.getElementById('addProduct'); 
                    formulario.reset()
                    // setTimeout(function() {
                    //     localStorage.removeItem("precioT");
                    //     let refresh = document.getElementById('addProduct');
                    //      refresh= location.reload();
                         
                    //     location.reload(true);
                    // }, 3000);
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
                'El producto ya se encuentra en la lista',
                'Ingrese otro producto',
                'error'
            )
        }
    })
}
};

function registerConfirmarPedido (){

    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    // var id = document.getElementById('id_pedidoConfirmar').value;
    var id = document.getElementById('id_confirmar').value;
    let datePago = document.getElementById('fechaDePago').value;
    var status = 3;
    console.log("si llena el seguimiento");
if (datePago == "") {
    Swal.fire({
        title: "Completa el campo FECHA DE PAGO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else{
    swalWithBootstrapButtons.fire({
        title: 'Estás seguro de confirmar el registro?',
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
                url: 'http://localhost:4000/pedido/confirmar/' + id,
                data: { datePago, status }
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Se ha registrado el pago exitosamente',
                        'Ahora deberás registrar la salida del pedido',
                        'success'
                    )
                    $('#confirmOrder'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
                    setTimeout(function() {
                        let refresh = document.getElementById('tablaPedidos2');
                         refresh= location.reload();
                        location.reload(true);
                    }, 2000);
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
}
    
}; 

function registerSalidaPedido (){

    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    var id = document.getElementById('id_confirmado').value;
    let dateEntrega = document.getElementById('dateEntrega').value;
    let timeLlegada = document.getElementById('horaLlegada').value;
    let companyTransporte = document.getElementById('transporte').value;
    let nameOperador = document.getElementById('nombreOperador').value;
    let seIdentifico = document.getElementById('seindentifico').value;
    let numPlacas = document.getElementById('placas').value;
    let tipoTransporte = document.getElementById('tipoTransporte').value;
    let descripCarga = document.getElementById('descripcion').value;
    let observations = document.getElementById('observaciones').value;
    let dateSalida = document.getElementById('fechaRegistroo').value;
    var status = 4;
    console.log("si llena el seguimiento");
if (dateEntrega == "") {
    Swal.fire({
        title: "Completa el campo FECHA DE ENTREGA",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(nameOperador == ""){
    Swal.fire({
        title: "Completa el campo NOMBRE DEL OPERADOR",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(numPlacas == ""){
    Swal.fire({
        title: "Completa el campo NUMERO DE PLACAS",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(dateSalida == ""){
    Swal.fire({
        title: "Completa el campo FECHA DE REGISTRO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else{
    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro de registrar la orden de salida?',
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
                url: 'http://localhost:4000/pedido/regOrdenSalida/' + id,
                data: { dateEntrega, timeLlegada, companyTransporte, nameOperador, seIdentifico, numPlacas, tipoTransporte, descripCarga, observations, dateSalida, status }
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Se ha registrado la salida exitosamente',
                        'Ahora deberás mandar el pedido a su destino',
                        'success'
                    )
                    $('#salida'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
                    setTimeout(function() {
                        let refresh2 = document.getElementById('tablaPedidos3');
                         refresh2= location.reload();
                        location.reload(true);
                    }, 2000);
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
}
    
};

const getSelectClient = () => { //OBTIENE LOS CLIENTES EN EL SELECT 
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/client'
    }).done(res => {
        console.log(res.listClient);

        let listClient = res.listClient;
        
        $.each(listClient, function (i, item) {
            $('#clienteSelect').append($('<option>', { 
                value: item.id,  //con esta linea guarda en el campo client_id el id y no el nombre como cadena
                text : item.name +" "+ item.surname +" "+ item.lastname
                
            }));
        });

        console.log("si esta regresando")
    });
};
getSelectClient()

const getSelectProductos = () => { // OBTIENE LOS PEDIDOS EN EL SELECT
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/product'
    }).done(res => {
        console.log(res.listProduct);

        let listProduct = res.listProduct;
        
        $.each(listProduct, function (i, item) {
            $('#ProductSelect').append($('<option>', { 
                value: item.id,  //con esta linea guarda en el campo client_id el id y no el nombre como cadena
                text : item.name
                
            }));
        });

        console.log("si esta regresando")
    });
};
getSelectProductos();

function checkPedido(){ // SIRVE PARA CAMBIAR EL ESTADO DEL PEDIDO Y PASE A "LISTA DE PEDIDOS"
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
          
    swalWithBootstrapButtons.fire({
        title: 'Estás seguro de que terminaste de agregar todos los productos en el pedido?',
        text: "Te sugerimos que revises la información, ya que no hay modificaciones posteriores ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
    if (result.value) { //value
        //aquí estaria el codigo del registro
        
        console.log("Si entra para eliminar");
        let id = document.getElementById("id_checkPedido").value;
    $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/pedido/delete/' + id,
    }).done(function (res) {
        console.log(res);

        $('#checkPedido'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
    });
        swalWithBootstrapButtons.fire(
            'Check exitoso',
            'El pedido se ha puesto en lista',
            'success'
        )
        setTimeout(function() {
            let refresh = document.getElementById('tablaPedidos1');
             refresh= location.reload();
            location.reload(true);
        }, 2000);
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
            'Acción cancelada',
            'No se ha realizado el check',
            'error'
            )
            $('#checkPedido'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
            }
        }).catch((error)=>{
            swalWithBootstrapButtons.fire(
                '¡Error al hacer check!',
                'Ha ocurrido un error al hacer check',
                'error'
              )
              console.log(error)
          })
};



function doSearch()
    {
        const tableReg = document.getElementById('tablaPedidos2');
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


function doSearch2()
    {
        const tableReg = document.getElementById('tablaPedidos3');
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

function doSearch3()
    {
        const tableReg = document.getElementById('tablaPedidos4');
        const searchText = document.getElementById('search-focus3').value.toLowerCase();
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