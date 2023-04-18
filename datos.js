let registroUsuarios = [];

let formulario = document.getElementById('formulario');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    let datos = {
        id: document.getElementById('id').value,
        nombre: document.getElementById('nombre').value,
        apellidos: document.getElementById('apellidos').value,
        cedula: document.getElementById('cedula').value,
        edad: document.getElementById('edad').value,
        email: document.getElementById('email').value,
        direccion: document.getElementById('direccion').value,
        ciudad: document.getElementById('ciudad').value,
        departamento: document.getElementById('departamento').value
    };

    let registrosJSON = localStorage.getItem('registroUsuarios');

    if (registrosJSON) {
        registroUsuarios = JSON.parse(registrosJSON);
    }

    registroUsuarios.push(datos);
    localStorage.setItem('registroUsuarios', JSON.stringify(registroUsuarios));
    alert('Registro guardado exitosamente');
});

function validarEmail(email) {
    const expresionRegular = /^\S+@\S+\.\S+$/;
    return expresionRegular.test(email);
}

function registrar() {
    let nombre = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellidos').value;
    let cedula = document.getElementById('cedula').value;
    let edad = parseInt(document.getElementById('edad').value);
    let email = document.getElementById('email').value;
    let direccion = document.getElementById('direccion').value;
    let ciudad = document.getElementById('ciudad').value;
    let departamento = document.getElementById('departamento').value;

    // Validar que los campos no estén vacíos
    if (!nombre || !apellidos || !cedula || !edad || !email || !direccion || !ciudad || !departamento) {
        alert("Por favor, complete todos los campos requeridos del formulario.");
        return;
    }

    // Validar que la edad esté entre 18 y 75 años
    if (edad < 18 || edad > 75) {
        alert("La edad debe estar entre 18 y 75 años para poder registrarte.");
        return;
    }

    // Validar que el email tenga el formato correcto
    if (!validarEmail(email)) {
        alert("El email no tiene el formato correcto.");
        return;
    }

    let registrosJSON = localStorage.getItem('registroUsuarios');
    let registroUsuarios = [];

    if (registrosJSON) {
        registroUsuarios = JSON.parse(registrosJSON);
    } else {
        registroUsuarios = [];
    }

    let correoDuplicado = registroUsuarios.some(function(registro) {
        return registro.email === email;
      });
    
      if (correoDuplicado) {
        alert("El correo electrónico ingresado ya existe. Por favor verifique");
        return;
      }
    // Obtener el último ID guardado
    let ultimoID = 0;
    if (registroUsuarios && registroUsuarios.length > 0) {
    ultimoID = registroUsuarios[registroUsuarios.length - 1].id;
    }

    let datos = {
        id: ultimoID + 1, //Incrementamos el campo ID
        nombre: nombre,
        apellidos: apellidos,
        cedula: cedula,
        email: email,
        edad: edad,
        direccion: direccion,
        ciudad: ciudad,
        departamento: departamento
    };

    // Validar que la cédula no esté duplicada
    if (registroUsuarios.some(registroUsuarios => registroUsuarios.cedula === cedula)) {
        alert('Ya existe un registro con este numero de cédula');
        return;
  }

    registroUsuarios.push(datos);
    localStorage.setItem('registroUsuarios', JSON.stringify(registroUsuarios));
    alert('Registro guardado correctamente');

    // Limpiar los campos del formulario
    document.getElementById('nombre').value = "";
    document.getElementById('apellidos').value = "";
    document.getElementById('cedula').value = "";
    document.getElementById('edad').value = "";
    document.getElementById('email').value = "";
    document.getElementById('direccion').value = "";
    document.getElementById('ciudad').value = "";
    document.getElementById('departamento').value = "";

}

    function mostrarRegistros() {
        let registrosJSON = localStorage.getItem('registroUsuarios');
        let registroUsuarios = JSON.parse(registrosJSON);

        let tabla = document.createElement('table');
        tabla.className = "table table-striped table-hover";
        let encabezado = tabla.insertRow();
        encabezado.innerHTML = '<th>ID</th><th>Nombre</th><th>Apellidos</th><th>Cédula</th><th>Edad</th><th>Email</th><th>Dirección</th><th>Ciudad</th><th>Departamento</th>';

        for (let i = 0; i < registroUsuarios.length; i++) {
        let registro = registroUsuarios[i];
        let fila = tabla.insertRow();
        fila.innerHTML = `<td>${registroUsuarios.id}</td><td>${registroUsuarios.nombre}</td><td>${registroUsuarios.apellidos}</td><td>${registroUsuarios.cedula}</td><td>${registroUsuarios.edad}</td><td>${registroUsuarios.email}</td><td>${registroUsuarios.direccion}</td><td>${registroUsuarios.ciudad}</td><td>${registroUsuarios.departamento}</td>`;
    }

    let contenedorTabla = document.getElementById('tablaUsuarios');
    contenedorTabla.innerHTML = '';
    contenedorTabla.appendChild(tabla);
    }
