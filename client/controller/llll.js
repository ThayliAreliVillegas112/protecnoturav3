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
        let photo = document.getElementById('photoRe').value;

    if (name == "" || surname == "" || lastname == "" || address == "" || phone == "" || email == "") {
        Swal.fire({
            title: "Rellena los campos faltantes",
            confirmButtonText: "Aceptar",
            icon: "error",
        })
    } else {
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
                    data: { name, surname, lastname, age, address, phone, extension, email, company, facebook, tiktok, instagram, photo }
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
        
    }
};


