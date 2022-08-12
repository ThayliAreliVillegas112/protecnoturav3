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
    getDetallesPedidos1();
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
                "<td>" + '<button onclick="getIdPedidoCheck(' + listPedido[i].id + ');" type="button" class="btn btn-success text-dark" data-bs-toggle="modal" data-bs-target="#checkPedido"> <i class="fa fa-check infoBtn" aria-hidden="true"></i></button> </td>' +
               "</tr>")
        }
    });
};
getPedidos1G()

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
                url: 'http://localhost:4000/pedido/createDetallesGranelb',
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