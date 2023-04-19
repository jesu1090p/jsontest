const registros = [
    {
        "id": 1,
        "nombre": "Juan",
        "apellidos": "Soto Ortega",
        "cedula": "1103216800",
        "edad": "26",
        "email": "jsoto@test.com",
        "direccion": "Calle 50A",
        "ciudad": "Barranquilla",
        "departamento": "Atlantico"
    },
    {
        "id": 2,
        "nombre": "Jose",
        "apellidos": "Arrieta",
        "cedula": "1143444616",
        "edad": "29",
        "email": "jarrieta@test.com",
        "direccion": "Diagonal 65 No. 28-37",
        "ciudad": "Ponedera",
        "departamento": "Atlantico"
    },
    {
        "id": 3,
        "nombre": "Maria",
        "apellidos": "Gonzalez",
        "cedula": "1044657689",
        "edad": "31",
        "email": "mgonzalez@test.com",
        "direccion": "Calle 47 44-50",
        "ciudad": "Barranquilla",
        "departamento": "Atlantico"
    }
];

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

    let registrosJSON = localStorage.getItem('registros');
    let registros = [];

    if (registrosJSON) {
        registros = JSON.parse(registrosJSON);
    }

    registros.push(datos);
    localStorage.setItem('registros', JSON.stringify(registros));
    alert('Registro guardado exitosamente');
});

    function validarEmail(email) {
        const expresionRegular = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
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

    // Validar que los campos no estén vacíos ni sean nulos
    if (nombre === "" || apellidos === "" || cedula === "" || edad === "" || email === "" || direccion === "" || ciudad === "") {
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

    let registrosJSON = localStorage.getItem('registros');
    let registros = [];

    if (registrosJSON) {
        registros = JSON.parse(registrosJSON);
    } else {
        registroUsuarios = [];
    }

    let correoDuplicado = registros.some(function(registro) {
        return registro.email === email;
      });
    
      if (correoDuplicado) {
        alert("El correo electrónico ingresado ya existe. Por favor verifique");
        return;
      }

    // Obtener el último ID guardado
    let ultimoID = 0;
    if (registros && registros.length > 0) {
    ultimoID = registros[registros.length - 1].id;
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
    if (registros.some(registro => registro.cedula === cedula)) {
        alert(`El usuarios con cedula No. ${cedula} ya esta registrado.\nPor favor verifique.`);
        return;
    }

    registros.push(datos);
    localStorage.setItem('registros', JSON.stringify(registros));
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
        //llamamos los datos predefinidos desde el local storage
        let registrosJSON = localStorage.getItem('registros');
        let registros = JSON.parse(registrosJSON);

        let tabla = document.createElement('table');
        tabla.className = "table table-striped table-hover";
        let encabezado = tabla.insertRow();
        encabezado.innerHTML = '<th>ID</th><th>Nombre</th><th>Apellidos</th><th>Cédula</th><th>Edad</th><th>Email</th><th>Dirección</th><th>Ciudad</th><th>Departamento</th>';

        for (let i = 0; i < registros.length; i++) {
        let registro = registros[i];
        let fila = tabla.insertRow();
        fila.innerHTML = `<td>${registro.id}</td><td>${registro.nombre}</td><td>${registro.apellidos}</td><td>${registro.cedula}</td><td>${registro.edad}</td><td>${registro.email}</td><td>${registro.direccion}</td><td>${registro.ciudad}</td><td>${registro.departamento}</td>`;
    }

    let contenedorTabla = document.getElementById('tablaUsuarios');
    contenedorTabla.innerHTML = '';
    contenedorTabla.appendChild(tabla);
    }
