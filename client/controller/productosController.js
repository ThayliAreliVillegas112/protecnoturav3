const getProductById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/product/' + id
    }).done(res => res);
};
const getIdProduct = async id => {
    document.getElementById("id_deleteProduct").value = id;
    console.log(id_deleteProduct);
    console.log(document.getElementById("id_deleteProduct").value);
};


const getInfoProduct = async id => {
    var product = await getProductById(id);
    console.log(product);
    var dateRegisterr = new Date(product.listProduct[0].dateRegister).toLocaleDateString(); // Esta linea sirve para que solo muestre la fecha sin el tiempo
    document.getElementById('nameProduct').value = product.listProduct[0].name;
    document.getElementById('codeBarras').value = product.listProduct[0].codeBarras;
    document.getElementById('gramaje').value = product.listProduct[0].gramaje;
    document.getElementById('stock').value = product.listProduct[0].stock;
    document.getElementById('price').value = product.listProduct[0].price;
    document.getElementById('dateRegister').value = dateRegisterr;
    document.getElementById('description').value = product.listProduct[0].description;
    // document.getElementById('photoProduct').value = product.listProduct[0].photoProduct;
    console.log(product);
    console.log("si esta entrando");


};

const getInfoUpdateProduct = async id => {
    let product = await getProductById(id);

    document.getElementById('id_updateProduct').value = id;
    document.getElementById('nameProduct_up').value = product.listProduct[0].name;
    document.getElementById('codeBarras_up').value = product.listProduct[0].codeBarras;
    document.getElementById('gramaje_up').value = product.listProduct[0].gramaje;
    document.getElementById('stock_up').value = product.listProduct[0].stock;
    document.getElementById('price_up').value = product.listProduct[0].price;
    // document.getElementById('dateRegister_up').value = product.listProduct[0].dateRegister;
    document.getElementById('description_up').value = product.listProduct[0].description;
    // document.getElementById('photo_up').value = product.listProduct[0].photoProduct;
    console.log(product);

};

const getProduct = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/product'
    }).done(res => {
        console.log(res.listProduct);

        let listProduct = res.listProduct;
        let table = $("#tablaProductos");
        
        for (let i = 0; i < listProduct.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" +
                "<td>" + listProduct[i].name + "</td>" +
                "<td>" + listProduct[i].stock + "</td>" +
                "<td>" + '<button onclick="getInfoProduct(' + listProduct[i].id + ');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#detailsProduct"> <i class="fa fa-info infoBtn" aria-hidden="true"></i></button> </td>' +
                "<td>" + '<button onclick="getInfoUpdateProduct(' + listProduct[i].id + ');" type="button" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#updateProduct"><i class="fa fa-pen" aria-hidden="true"></i></button> </td>' +
                "<td>" + '<button onclick="getIdProduct(' + listProduct[i].id + ');" type="button" class="btn btn-danger text-dark" data-bs-toggle="modal" data-bs-target="#deleteProduct"><i class="fa fa-trash" aria-hidden="true"></i></button> </td>' +
                "</tr>")
        }
    });
};

function registerProduct (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    console.log("si entra para el llenado")
    let name = document.getElementById('nameProductRe').value;
    let codeBarras = document.getElementById('codeBarrasRe').value;
    let gramaje = document.getElementById('gramajeRe').value;
    var stock = document.getElementById('stockRe').value;
    let price = document.getElementById('priceRe').value
    let dateRegister = document.getElementById('dateRegisterRe').value;
    let description = document.getElementById('descriptionRe').value;
    // let photoProduct = document.getElementById('photoProductRe').value;

if (name == "") {
    Swal.fire({
        title: "Completa el campo NOMBRE",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
} else if (codeBarras == ""){
    Swal.fire({
        title: "Completa el campo CÓDIGO DE BARRAS",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(gramaje == ""){
    Swal.fire({
        title: "Completa el campo GRAMAJE",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(stock == ""){
    Swal.fire({
        title: "Completa el campo STOCK",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(price == ""){
    Swal.fire({
        title: "Completa el campo PRECIO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(dateRegister == ""){
    Swal.fire({
        title: "Completa el campo FECHA",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(description == ""){
    Swal.fire({
        title: "Completa el campo DESCRIPCIÓN",
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
                url: 'http://localhost:4000/product/create',
                data: { name, codeBarras, gramaje, stock, price, dateRegister, description }
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Registro exitoso',
                        'Se ha registrado producto exitosamente',
                        'success'
                    )
                    let formulario = document.getElementById('formuProduct'); 
                    formulario.reset()
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


function updateProduct (){
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
    var id = document.getElementById('id_updateProduct').value;
    let name = document.getElementById('nameProduct_up').value;
    let codeBarras = document.getElementById('codeBarras_up').value;
    let gramaje = document.getElementById('gramaje_up').value;
    let stock = document.getElementById('stock_up').value;
    let price = document.getElementById('price_up').value;
    let description = document.getElementById('description_up').value;
    // let photoProduct = document.getElementById('photo_up').value;
    console.log(id);

if (name == "") {
    Swal.fire({
        title: "Completa el campo NOMBRE",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
} else if (codeBarras == ""){
    Swal.fire({
        title: "Completa el campo CÓDIGO DE BARRAS",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(gramaje == ""){
    Swal.fire({
        title: "Completa el campo GRAMAJE",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(stock == ""){
    Swal.fire({
        title: "Completa el campo STOCK",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(price == ""){
    Swal.fire({
        title: "Completa el campo PRECIO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(dateRegister == ""){
    Swal.fire({
        title: "Completa el campo FECHA",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(description == ""){
    Swal.fire({
        title: "Completa el campo DESCRIPCIÓN",
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
                url: 'http://localhost:4000/product/update/' + id,
                data: { name, codeBarras, gramaje, stock, price, description}
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Modificación exitosa',
                        'Se ha registrado producto exitosamente',
                        'success'
                    )
                    $('#updateProduct'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
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
                'No se ha realizado el registro',
                'error'
            )
        }
    })
}
    
};

function doSearchProduct()
    {
        const tableReg = document.getElementById('tablaProductos');
        const searchText = document.getElementById('search-focusProduct').value.toLowerCase();
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

    
    function deleteProduct(){
        event.preventDefault();
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
              
        swalWithBootstrapButtons.fire({
            title: 'Estás seguro de eliminar este producto?',
            text: "Te sugerimos que te asegures de querer eliminar el producto, ya que no se puede recuperar información eliminada ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
        if (result.value) { //value
            //aquí estaria el codigo del registro
            
            console.log("Si entra para eliminar");
            let id = document.getElementById("id_deleteProduct").value;
        $.ajax({
            type: 'POST',
            url: 'http://localhost:4000/product/delete/' + id,
        }).done(function (res) {
            console.log(res);

            $('#deleteProduct'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
        });
            swalWithBootstrapButtons.fire(
                'Modificación exitosa',
                'Se ha eliminado el producto exitosamente',
                'success'
            )
            
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                'Acción cancelada',
                'No se ha realizado la eliminación',
                'error'
                )
                $('#deleteProduct'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
                }
            }).catch((error)=>{
                swalWithBootstrapButtons.fire(
                    '¡Error al modificar!',
                    'Ha ocurrido un error al eliminar el producto',
                    'error'
                  )
                  console.log(error)
              })
    };
    
    // const deleteProduct = async () => {
    //     let id = document.getElementById("id_deleteProduct").value;
    //     await $.ajax({
    //         type: 'POST',
    //         url: 'http://localhost:4000/product/delete/' + id
    //     }).done(res => {
    //         console.log(res);
    //         //getoffice();
    //     });
    // };
getProduct();