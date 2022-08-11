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