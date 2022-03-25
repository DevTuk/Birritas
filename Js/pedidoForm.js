class ConsultaForm {
    constructor(nombre, apellido, email, textArea) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.textArea = textArea;
    }
}
let formConsultas = document.getElementById('formConsulta');

let arrayConsulta = [];

//eventos 
formConsulta.addEventListener('submit', (e) => {
    e.preventDefault();
    //utilizamos otro método para capturar formulario y guardarlo en el localstorage
    let datForm = new FormData(e.target)
    const consulta = new ConsultaForm(datForm.get('nombre'), datForm.get('apellido'), datForm.get('email'), datForm.get('textArea'));
    arrayConsulta.push(consulta);
    formConsulta.reset();

    swal({
        title: "Gracias por escribirnos!",
        text: "Nos pondremos en contacto a la brevedad",
        icon: "success",
    });

   
});


