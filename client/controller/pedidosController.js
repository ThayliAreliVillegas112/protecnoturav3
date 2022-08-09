const getPedidoById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/pedido/' + id
    }).done(res => res);
};

const getPedidoDetallesById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/pedido/pedidosDetalles/' + id
    }).done(res => res);
};

const getIdPedido = async id => {
    var idPedido = await getPedidoById(id);
    console.log(idPedido);
    document.getElementById("id_pedido").value = id;
    getDetallesPedidos1();
};
getIdPedido()

const getIdPedidoCheck = async id => { //obtengo el id del pedidopara hacer el check (cambiar el status a 2)
    document.getElementById("id_checkPedido").value = id;
    console.log(id_checkPedido);
    console.log(document.getElementById("id_checkPedido").value);
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
        }{
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
                "<td>" + listPedido[i].name + " " + listPedido[i].surname +  " "+ listPedido[i].lastname +"</td>" +
                "<td>" + '<button onclick="getIdPedido(' + listPedido[i].id + ');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#detailsOrder"> <i class="fa fa-info infoBtn" aria-hidden="true"></i></button> </td>' +
                "<td>" + '<button onclick="getIdPedidoCheck(' + listPedido[i].id + ');" type="button" class="btn btn-success iconMargin text-dark" data-bs-toggle="modal" data-bs-target="#confirmOrder"> <i class="fa fa-clipboard-check infoBtn" aria-hidden="true"></i></button> </td>' +
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
            // localStorage.setItem("precioT", precioTotal);
            // let total = 0;
            // total = total + precioTotal;
            // console.log(total);
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


// const getDetallesPedidos2 = (id) => {
//     var id = document.getElementById('id_pedido').value;
//     // console.log("pruebaaaaa")
//     // console.log(id)
//     $.ajax({
//         type: 'GET',
//         headers: { "Accept": "application/json" },
//         url: 'http://localhost:4000/pedido/pedidosDetallesTabla/' + id
//     }).done(res => {
//         console.log(res.listDetallesPedido);

//         let listDetallesPedido = res.listDetallesPedido;
//         // let table = $("#mostrarProductos");
//         for (let i = 0; i < listDetallesPedido.length; i++) {
//             let precioTotal = listDetallesPedido[i].price * listDetallesPedido[i].cantUnidades;
//             // let total = 0;
//             // total = total + precioTotal;
//             // console.log(total);
//         }
//     });
// };


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
        }{
            swalWithBootstrapButtons.fire(
                'El producto ya se encuentra en la lista',
                'Ingrese otro producto',
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