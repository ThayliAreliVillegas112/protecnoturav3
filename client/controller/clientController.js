const getClientById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/client/' + id
    }).done(res => res);
};

// const blobToBase64 = (blob) => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(blob);
//         reader.onloadend = () => {
//             resolve(reader.result.split(',')[1]);
//         }
//     })
// }

// function encodeImageFileAsURL(element) {
//     var file = element.files[0];
//     var reader = new FileReader();
//     reader.onloadend = function() {
//       console.log('RESULT', reader.result)
//       localStorage.setItem("photo", reader.result);
//     }
//     reader.readAsDataURL(file);
// }
// const getSeguimiento = async id =>{
//   var seg = await getClientById(id);
//   console.log(seg)
//   document.getElementById('id_seg').value = id;
// }
const getInfoClient = async id => {
    var client = await getClientById(id);
    console.log(client);
  
    document.getElementById('name').value = client.listClient[0].name;
    document.getElementById('surname').value = client.listClient[0].surname;
    document.getElementById('lastname').value = client.listClient[0].lastname;
    document.getElementById('email').value = client.listClient[0].email;
    document.getElementById('address').value = client.listClient[0].address;
    document.getElementById('phone').value = client.listClient[0].phone;
    document.getElementById('extension').value = client.listClient[0].extension;
    document.getElementById('age').value = client.listClient[0].age;
    document.getElementById('company').value = client.listClient[0].company;
    document.getElementById('face').value = client.listClient[0].facebook;
    document.getElementById('tiktok').value = client.listClient[0].tiktok;
    document.getElementById('instagram').value = client.listClient[0].instagram;
    console.log(client);
};

const getInfoUpdateClient = async id => {
    let client = await getClientById(id);
    document.getElementById('id_updateC').value = id;
    document.getElementById('name_up').value = client.listClient[0].name;
    document.getElementById('surname_up').value = client.listClient[0].surname;
    document.getElementById('lastname_up').value = client.listClient[0].lastname;
    document.getElementById('email_up').value = client.listClient[0].email;
    document.getElementById('address_up').value = client.listClient[0].address;
    document.getElementById('phone_up').value = client.listClient[0].phone;
    document.getElementById('extension_up').value = client.listClient[0].extension;
    document.getElementById('age_up').value = client.listClient[0].age;
    document.getElementById('company_up').value = client.listClient[0].company;
    document.getElementById('face_up').value = client.listClient[0].facebook;
    document.getElementById('tiktok_up').value = client.listClient[0].tiktok;
    document.getElementById('instagram_up').value = client.listClient[0].instagram;
    console.log(client);

};

const getClient = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/client'
    }).done(res => {
        console.log(res.listClient);
        let listClient = res.listClient;
        let table = $("#tabla");
        for (let i = 0; i < listClient.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + (i+1) + "</td>" + 
                "<td>" + listClient[i].name +" "+ listClient[i].surname+ " "+ listClient[i].lastname+ "</td>" +
                "<td>" + listClient[i].email + "</td>" +
                "<td>" + '<button onclick="getInfoClient(' + listClient[i].id + ');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#details"> <i class="fa fa-info infoBtn" aria-hidden="true"></i></button> </td>' +
                "<td>" + '<button onclick="getInfoUpdateClient(' + listClient[i].id + ');" type="button" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#update"><i class="fa fa-pen" aria-hidden="true"></i></button> </td>' +
                "</tr>")
                
        }
        
    });
};
getClient();

function registerClient (){
    event.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    let name = document.getElementById('nameRe').value;
    let surname = document.getElementById('surnameRe').value;
    let lastname = document.getElementById('lastnameRe').value;
    var age = document.getElementById('ageRe').value;
    let address = document.getElementById('addressRe').value
    let phone = document.getElementById('phoneRe').value;
    let extension = document.getElementById('extensionRe').value;
    let email = document.getElementById('emailRe').value;
    let company = document.getElementById('companyRe').value;
    let facebook = document.getElementById('faceRe').value;
    let tiktok = document.getElementById('tiktokRe').value;
    let instagram = document.getElementById('instagramRe').value;

if (name == "") {
    Swal.fire({
        title: "Completa el campo NOMBRE",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
} else if (surname == ""){
    Swal.fire({
        title: "Completa el campo APELLIDO MATERNO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(lastname == ""){
    Swal.fire({
        title: "Completa el campo APELLIDO PATERNO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(address == ""){
    Swal.fire({
        title: "Completa el campo DIRECCIÓN",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(phone == ""){
    Swal.fire({
        title: "Completa el campo TELÉFONO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(email == ""){
    Swal.fire({
        title: "Completa el campo CORREO",
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
                url: 'http://localhost:4000/client/create',
                data: { name, surname, lastname, age, address, phone, extension, email, company, facebook, tiktok, instagram}
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Registro exitoso',
                        'Se ha registrado al cliente exitosamente',
                        'success'
                    )
                    let formulario = document.getElementById('formu'); 
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
}};

function updateClient (){
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
    var id = document.getElementById('id_updateC').value;
    let name = document.getElementById('name_up').value;
    let surname = document.getElementById('surname_up').value;
    let lastname = document.getElementById('lastname_up').value;
    let age = document.getElementById('age_up').value;
    let address = document.getElementById('address_up').value;
    let phone = document.getElementById('phone_up').value;
    let extension = document.getElementById('extension_up').value;
    let email = document.getElementById('email_up').value;
    let company = document.getElementById('company_up').value;
    let facebook = document.getElementById('face_up').value;
    let tiktok = document.getElementById('tiktok_up').value;
    let instagram = document.getElementById('instagram_up').value;
    // let photo = document.getElementById('photo_up').value;

    console.log(id);

if (name == "") {
    Swal.fire({
        title: "Completa el campo NOMBRE",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
} else if (surname == ""){
    Swal.fire({
        title: "Completa el campo APELLIDO MATERNO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(lastname == ""){
    Swal.fire({
        title: "Completa el campo APELLIDO PATERNO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(address == ""){
    Swal.fire({
        title: "Completa el campo DIRECCIÓN",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(phone == ""){
    Swal.fire({
        title: "Completa el campo TELÉFONO",
        confirmButtonText: "Aceptar",
        icon: "error",
    })
}else if(email == ""){
    Swal.fire({
        title: "Completa el campo CORREO",
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
                url: 'http://localhost:4000/client/update/' + id,
                data: { name, surname, lastname, age, address, phone, extension, email, company, facebook, tiktok, instagram }
            }).done(res => {
                console.log(res)
                if (res.status === 200) {
                    swalWithBootstrapButtons.fire(
                        'Modificación exitosa',
                        'Se ha modificado al cliente exitosamente',
                        'success'
                    )
                    $('#update'). modal('hide');  //Sirve para cerrar el modal despues de aceptar la eliminación
                    setTimeout(function() {
                        let refresh = document.getElementById('tabla');
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


function doSearch()
    {
        const tableReg = document.getElementById('tabla');
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



// VALIDACIÓN DE FORMULARIO

function soloLetras(e) {
 
    var key = e.keyCode || e.which,
    tecla = String.fromCharCode(key).toLowerCase(),
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ",
    especiales = [8, 37, 39, 46],
    tecla_especial = false;
 
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
            }
        }
 
    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}
 
// // -- Función para aceptar espacios -- //
// function valeft(){
 
//     var val = document.getElementById("nombreLeft").value;
//     var tam = val.length;
 
//         for(i=0;i<tam;i++){
//             if(!isNaN(val[i]) && val[i] != " ")
//             document.getElementById("nombreLeft").value='';
//             }
// }

// VALIDACIÓN SOLO NUMEROS


function esNum(ev, el) {
    /* ev: evento; el: elemento; */
    tecla = (document.all) ? ev.keyCode : ev.which;

    // Permite un solo punto decimal
    if (el.value.indexOf('.') == -1 ? tecla == 46 : false) { return true; }

    // Permite números negativos (después de escribir un número)
    if (tecla == 45 && el.value !== '') { el.value = (-1) * el.value; }

    // Permite tecla de retroceso (borrar)
    if (tecla == 8) { return true; }

    // Permite tecla Tab
    if (tecla == 9) { return true; }

    // Patrón de entrada: solo acepta numeros positivos
    patron = /[0-9]/;
    tecla_fin = String.fromCharCode(tecla);
    return patron.test(tecla_fin);
}


