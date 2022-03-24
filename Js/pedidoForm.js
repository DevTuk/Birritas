class ConsultaForm {
    constructor(nombre,apellido,teléfono,textArea){

    this.nombre = nombre;
    this.apellido = apellido;
    this.teléfono = teléfono;
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
     const consulta = new ConsultaForm (datForm.get('nombre'),datForm.get('apellido'),datForm.get('teléfono'),datForm.get('textArea'));
     arrayConsulta.push(consulta);
     formConsulta.reset();
     
    });


