const getPedidoById2 = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/pedido/' + id
    }).done(res => res);
};
const getIdPedido2 = async id => {
    var idPedido = await getPedidoById2(id);
    console.log(idPedido);
    document.getElementById("id_pedido2").value = id;
    getDetallesPedidos1G();
};

const getIdPedidoCheckGranel = async id => { //obtengo el id del pedidopara hacer el check (cambiar el status a 2)
    document.getElementById("id_checkPedidoGranel").value = id;
    console.log(id_checkPedidoGranel);
    console.log(document.getElementById("id_checkPedidoGranel").value);
};

const getPedidos1G = () => { //MUESTRA LA TABLA QUE ESTA EN LA VISTA DE REGISTRAR PEDIDO, ES LA TABLA DONDE SE VAN AGREGANDO LOS PRODUCTOS
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/pedido'
    }).done(res => {
        console.log(res.listPedido);

        let listPedido = res.listPedido;
        let table = $("#tablaPedidos1G");
        
        for (let i = 0; i < listPedido.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" +
                "<td>" + listPedido[i].dateSolicitud + "</td>" +
                "<td>" + listPedido[i].pedido + "</td>" +
                "<td>" + '<button onclick="getIdPedido2(' + listPedido[i].id + ');" type="button" class="btn btn-info text-dark" data-bs-toggle="modal" data-bs-target="#detallesPedido"> <i class="fa fa-plus infoBtn" aria-hidden="true"></i></button> </td>' +
                "<td>" + '<button onclick="getIdPedidoCheckGranel(' + listPedido[i].id + ');" type="button" class="btn btn-success text-dark" data-bs-toggle="modal" data-bs-target="#checkPedidoGranel"> <i class="fa fa-check infoBtn" aria-hidden="true"></i></button> </td>' +
               "</tr>")
        }
    });
};
getPedidos1G()

const getDetallesPedidos1G = (id) => { // SIRVE PARA MOSTRAR LA TABLA DENTRO DEL MODAL; ES DECIR, ES LA TABLA QUE MUESTRA LOS PRODUCTOS DE MATERI APRIMA AGREGADOS
    var id = document.getElementById('id_pedido2').value;
    console.log("pruebaaaaa")
    console.log(id)
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/pedidoGranel/pedidosDetallesTablaG/' + id
    }).done(res => {
        console.log(res.listDetallesPedido);

        let listDetallesPedido = res.listDetallesPedido;
        let table = $("#mostrarProductosG");
        
        for (let i = 0; i < listDetallesPedido.length; i++) {
            let precioTotal = listDetallesPedido[i].pricePublic * listDetallesPedido[i].cantidad;

            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" +
                "<td>" + listDetallesPedido[i].nameM + "</td>" +
                "<td>" + listDetallesPedido[i].cantidad + "</td>" +
                "<td>" + listDetallesPedido[i].pricePublic + "</td>" +
                "<td>" +  precioTotal + "</td>" +
                // "<td>" + '<button onclick="getIdPedido(' + listDetallesPedido[i].id + ');" type="button" class="btn btn-success text-dark" data-bs-toggle="modal" data-bs-target="#detallesPedido"> <i class="fa fa-plus infoBtn" aria-hidden="true"></i></button> </td>' +
               "</tr>")
        }
    });
};

function registerPedidoGranel (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    let pedido = document.getElementById('pedidoReg').value;
    let elaboro = document.getElementById('elaboroReg').value;
    var dateSolicitud = document.getElementById('datePedidoReg').value;
    var status = 1;
    let client_id = document.getElementById('clienteSelect2').value;

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

const registerDetallesPedidoGranel  = async id =>{ // Registra los productos en el pedido

    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    let materiaPrima_id = document.getElementById('MPSelect').value;
    var pedido_id = document.getElementById('id_pedido2').value;
    let cantidad = document.getElementById('cantidadd').value;
    // let precioTotal = localStorage.getItem("precioT");;
    var total = 1200;
    
    console.log("si llena los detalles del pedido");

if (materiaPrima_id == "") {
    Swal.fire({
        title: "Completa el campo SELECCIONA UNA MATERIA PRIMA",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
} else if (cantidad == ""){
    Swal.fire({
        title: "Completa el campo CANTIDAD",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else{
    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro de realizar el registro?',
        text: "Una vez que se agregue la materia prima debe tener cuidado de no duplicarlo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then ((result) => {
        if(result.isConfirmed){
            $.ajax({
                type: 'POST',
                url: 'http://localhost:4000/pedidoGranel/createDetallesGranel',
                data: { cantidad, total,  materiaPrima_id, pedido_id }
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Registro exitoso',
                        'Se ha registrado el detalle del pedido exitosamente',
                        'success'
                    )
                    let formulario = document.getElementById('addProduct'); 
                    formulario.reset()
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

function checkPedidoGranel(){ // SIRVE PARA CAMBIAR EL ESTADO DEL PEDIDO Y PASE A "LISTA DE PEDIDOS"
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
          
    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro de que terminaste de agregar todos los productos en el pedido?',
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
        let id = document.getElementById("id_checkPedidoGranel").value;
    $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/pedido/delete/' + id,
    }).done(function (res) {
        console.log(res);

        $('#checkPedidoGranel'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
    });
        swalWithBootstrapButtons.fire(
            'Check exitoso',
            'El pedido se ha puesto en lista',
            'success'
        )
        setTimeout(function() {
            let refresh = document.getElementById('tablaPedidos1G');
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
            $('#checkPedidoGranel'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
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

const getSelectClientGranel = () => { //OBTIENE LOS CLIENTES EN EL SELECT 
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/client'
    }).done(res => {
        console.log(res.listClient);

        let listClient = res.listClient;
        
        $.each(listClient, function (i, item) {
            $('#clienteSelect2').append($('<option>', { 
                value: item.id,  //con esta linea guarda en el campo client_id el id y no el nombre como cadena
                text : item.name +" "+ item.surname +" "+ item.lastname
                
            }));
        });

        console.log("si esta regresando")
    });
};
getSelectClientGranel()

const getSelectMateriaPrima = () => { // OBTIENE LOS PEDIDOS EN EL SELECT
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/materiaP'
    }).done(res => {
        console.log(res.listMateria);

        let listMateria = res.listMateria;
        
        $.each(listMateria, function (i, item) {
            $('#MPSelect').append($('<option>', { 
                value: item.id,  //con esta linea guarda en el campo client_id el id y no el nombre como cadena
                text : item.nameM
                
            }));
        });

        console.log("si esta regresando")
    });
};

getSelectMateriaPrima()