// Array para guardar los pacientes
const pacientes = [];

// Al cargar la página, pedir cédula
window.onload = function() {
    const cedula = prompt("Ingrese su cédula o número de identificación:");
    if (cedula) {
        mostrarMenu();
    } else {
        alert("Debe ingresar su número de identificación para continuar.");
        location.reload();
    }
};

function mostrarMenu() {
    let opcion = 0;
    do {
        opcion = parseInt(prompt(
            "=== MENÚ ===\n" +
            "1. Agregar Paciente\n" +
            "2. Mostrar Reportes\n" +
            "3. Salir\n" +
            "Seleccione una opción:"
        ));

        switch (opcion) {
            case 1:
                agregarPaciente();
                break;
            case 2:
                mostrarReportes();
                break;
            case 3:
                alert("Gracias por usar la Calculadora de Pacientes.");
                break;
            default:
                alert("Opción inválida. Intente de nuevo.");
        }
    } while (opcion !== 3);
}

function agregarPaciente() {
    const id = prompt("Ingrese ID del paciente:");
    const nombre = prompt("Ingrese nombre del paciente:");
    const edad = parseInt(prompt("Ingrese edad del paciente:"));
    const genero = prompt("Ingrese género del paciente (M para masculino, F para femenino):");
    const peso = parseFloat(prompt("Ingrese peso (kg):"));
    const estatura = parseFloat(prompt("Ingrese estatura (m):"));

    const imc = peso / (estatura * estatura);

    pacientes.push({ id, nombre, edad, genero, peso, estatura, imc });
    alert("Paciente agregado exitosamente.");
}

function mostrarReportes() {
    let totalHombres = 0;
    let totalMujeres = 0;
    let totalMenores = 0;
    let sumaEdadHombres = 0;
    let sumaEdadMujeres = 0;
    let hombresSobrepeso = 0;
    let mujeresSobrepeso = 0;
    let pacienteIMCBajo = null;

    for (let paciente of pacientes) {
        if (paciente.genero.toUpperCase() === "M") {
            totalHombres++;
            sumaEdadHombres += paciente.edad;
            if (paciente.imc >= 25) {
                hombresSobrepeso++;
            }
        } else if (paciente.genero.toUpperCase() === "F") {
            totalMujeres++;
            sumaEdadMujeres += paciente.edad;
            if (paciente.imc >= 25) {
                mujeresSobrepeso++;
            }
        }

        if (paciente.edad < 18) {
            totalMenores++;
        }

        if (!pacienteIMCBajo || paciente.imc < pacienteIMCBajo.imc) {
            pacienteIMCBajo = paciente;
        }
    }

    const promedioEdadHombres = totalHombres ? (sumaEdadHombres / totalHombres).toFixed(2) : 0;
    const promedioEdadMujeres = totalMujeres ? (sumaEdadMujeres / totalMujeres).toFixed(2) : 0;

    let reporte = "=== REPORTES ===\n";
    reporte += `Total Hombres: ${totalHombres}\n`;
    reporte += `Total Mujeres: ${totalMujeres}\n`;
    reporte += `Promedio Edad Hombres: ${promedioEdadHombres}\n`;
    reporte += `Promedio Edad Mujeres: ${promedioEdadMujeres}\n`;
    reporte += `Total Menores de Edad: ${totalMenores}\n`;
    reporte += `Hombres con Sobrepeso: ${hombresSobrepeso}\n`;
    reporte += `Mujeres con Sobrepeso: ${mujeresSobrepeso}\n`;

    if (pacienteIMCBajo) {
        reporte += `Paciente con IMC más bajo: ${pacienteIMCBajo.nombre} (IMC: ${pacienteIMCBajo.imc.toFixed(2)})\n`;
    }

    alert(reporte);
}