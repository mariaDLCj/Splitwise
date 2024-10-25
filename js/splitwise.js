// ESTOS SON USADOS AL VALIDAR DATO ERRONEO
let nombreCampo = document.getElementById("nombres");
let tituloCampo = document.getElementById("titulo");
let importeCampo = document.getElementById("importe");
let fechaCampo = document.getElementById("fecha");

//-------------- INICIO OBJETOS --------------------

// POR DEFECTO VIENEN 3 USUARIOS PRECARGADOS
class Usuario {
    constructor(nombre, pathImg) {
        this.nombre = nombre;
        this.gastos = [];
        this.pathImg = pathImg;
    }

    setGasto(titulo, total, fecha) {
        this.gastos.push(new Gasto(titulo, total, fecha));
    }
    //CALCULA EL TOTAL DE LO QUE HA PAGADO EL USER
    getGastosTotales() {
        let totalGastos = 0.0;
        this.gastos.forEach(gasto => {
            totalGastos += gasto.getTotal();
        });
        return totalGastos;
    }

    getNombre() {
        return this.nombre;
    }

    getFoto() {
        return this.pathImg;
    }
}

class Gasto {
    constructor(titulo, total, fecha) {
        this.titulo = titulo;
        this.total = total;
        this.fecha = fecha;
    }

    getTotal() {
        return this.total;
    }
}

//INSTANCIAMOS A LOS USUARIOS PRECARGADOS Y ASIGNAMOS FOTO
let pepe = new Usuario("Pepe", "../img/avatar_a.png");
let maria = new Usuario("María", "../img/avatar_b.png");
let juan = new Usuario("Juan", "../img/avatar_c.png");

// SE OBTIENE EL BOTON DE ENVIAR DEL FORM POR ID Y EL FORMULARIO
let boton = document.getElementById("enviar");
let formulario = document.getElementById("formulario");

// FUNCIÓN -> LIMPIA EL DIV CUENTAS DEL HTML
function limpiarCuentas() {
    let divCuentas = document.getElementById("cuentas");
    divCuentas.innerHTML = "";
}

// FUNCIÓN -> QUE CAPTURA EL EVENTO 
// ASEGURA LA VALIDACIÓN, AÑADE GASTOS
// LLAMA A FUNCIONES QUE BORRAN  AÑADEN EL DOM
boton.addEventListener("click", function (event) {

    // SI EL FORMULARIO SE ENVÍA SE RECARGA LA PÁGINA Y NO FUNCIONA
    // PREVENIR QUE EL FORMULARIO SE ENVÍE
    event.preventDefault();

    // RECUPERAMOS LOS VALORES DEL FORMULARIO
    let nombre = document.getElementById("nombres").value;
    let titulo = document.getElementById("titulo").value;
    let importe = document.getElementById("importe").value;
    let fecha = document.getElementById("fecha").value;

    limpiarCuentas();
    // LIMPIAMOS EL DIV DE LAS TARJETAS ANTERIORES

    if (validarTitulo(titulo) === true && validarImporte(importe) === true && validarFecha(fecha) === true) {


        let fechaCorrecta = new Date(fecha);
        // ASIGNAR FOTO EN FUNCIÓN DEL NOMBRE
        switch (nombre) {
            case "Juan":
                juan.setGasto(titulo, parseFloat(importe), fechaCorrecta);
                console.log(juan);
                console.log(juan.gastos);
                // ESTA FUNCIÓN COLOCA AL NUEVO USUARIO CON DOM EN RESUMEN
                crearTarjetasResumen(juan, importe, fecha);
                break;
            case "María":
                maria.setGasto(titulo, parseFloat(importe), fechaCorrecta);
                console.log(maria);
                console.log(maria.gastos);
                // ESTA FUNCIÓN COLOCA AL NUEVO USUARIO CON DOM EN RESUMEN
                crearTarjetasResumen(maria, importe, fecha);
                break;
            case "Pepe":
                pepe.setGasto(titulo, parseFloat(importe), fechaCorrecta);
                console.log(pepe);
                console.log(pepe.gastos);
                // ESTA FUNCIÓN COLOCA AL NUEVO USUARIO CON DOM EN RESUMEN
                crearTarjetasResumen(pepe, importe, fecha);
                break;
        }

        // SE CREAN AQUÍ PARA QUE SEA EL CASO QUE SEA ESTÉN ACTUALIZADOS
        crearTarjetasCuenta(juan);
        crearTarjetasCuenta(maria);
        crearTarjetasCuenta(pepe);

        // LIMPIA LOS CAMPOS DEL FORMULARIO
        formulario.reset();



    } else {
        alert("Rellene todos los datos correctamente.");
    }

});
// -------- INICIO FUNCIONES QUE VALIDAN ANTES DE CREAR EL GASTO --------

// ---------- VALIDAR EL TÍTULO ----------

function validarTitulo(titulo) {
    let regex = /^[a-zA-Z\s]{1,20}$/;
    let correcto = false;
    if (regex.test(titulo)) {
        console.log("El título es válido");
        correcto = true;
        tituloCampo.classList.remove("datoErroneo");
    } else {
        // alert("El título no es válido");
        tituloCampo.classList.add("datoErroneo");

    }
    return correcto;
}

// ---------- FIN VALIDAR EL TÍTULO ----------

// ---------- VALIDAR EL IMPORTE ----------

function validarImporte(importe) {
    // | es el operador lógico || es decir, puede ser 1000.00 
    // o puede ser un número de 1 a tres cifras que tengan la parte decimal
    // que en ese caso puede ser de 1 o 2 cifras con lo que el máximo
    // sería 999.99
    let regex = /^(1000\.00|(\d{1,3}\.\d{1,2}))$/;
    let correcto = false;
    if (regex.test(importe)) {
        console.log("El importe es válido");
        correcto = true;
        importeCampo.classList.remove("datoErroneo");

    } else {
        // alert("El importe no es válido");
        importeCampo.classList.add("datoErroneo");
    }
    return correcto;
}

// ---------- FIN VALIDAR EL IMPORTE ----------

// ---------- VALIDAR LA FECHA ----------

function validarFecha(fecha) {
    /*
    ESTE REGEX VALIDA LA FECHA EN FORMATO DD//MM//AAAA
    1º DÍAS- ^(0[1-9]|[12][0-9]|3[01])
    HAY TRES OPCIONES QE EMPIECE POR 0 Y EL 2º NUM SEA DE 1 A 9
    EL | DA LA SIGUIENTE OPCION QUE ES QUE EMPIECE POR 1 O 2, SE PONE
    [12] ASÍ, SIN COMAS, Y QUE LE SIGUE UN NUM DEL 0 AL 9
    LA TERCERA OCPION TAMNN SEPARADA POR | ES QUE EMPIECE POR 3 Y LE SIGA
    1 O 0 REPRESENTADO CON [01]
    */
    let regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
    let correcto = false;

    if (regex.test(fecha)) {
        console.log("La fecha es válida");
        correcto = true;
        fechaCampo.classList.remove("datoErroneo");

    } else {
        fechaCampo.classList.add("datoErroneo");
    }
    return correcto;
}

// ---------- FIN VALIDAR LA FECHA ----------

// -------- INICIO FUNCIONES QUE VALIDAN ANTES DE CREAR EL GASTO --------

// -------- INICIO CREACIÓN DEL DOM --------

function crearTarjetasResumen(usuario, importe, fecha) {
    let divResumen = document.getElementById("divResumen");
    let divCard = document.createElement("div");
    divCard.classList.add("card", "mb-12", "espacio");
    let divRow = document.createElement("div");
    divRow.classList.add("row", "g-0");
    let divCol1 = document.createElement("div");
    divCol1.classList.add("col-md-2");
    let imgAvatar = document.createElement("img");
    imgAvatar.setAttribute("src", usuario.getFoto());
    imgAvatar.classList.add("img-fluid", "rounded-circle", "m-3");
    //CIERRA LA PRIMERA COLUMNA
    let divCol2 = document.createElement("div");
    divCol2.classList.add("col-md-10");
    let cartaBody = document.createElement("div");
    cartaBody.classList.add("card-body", "mt-3");
    let tituloCarta = document.createElement("h5");
    tituloCarta.classList.add("card-title", "mx-3");
    tituloCarta.innerText = usuario.getNombre();
    let pCarta = document.createElement("p");
    pCarta.classList.add("card-text", "mx-3");
    pCarta.innerText = "Pagó " + importe + "€" + " el " + fecha;

    // LOS APPEND
    divCard.appendChild(divRow);
    divRow.append(divCol1, divCol2);
    divCol1.appendChild(imgAvatar);
    divCol2.appendChild(cartaBody);
    cartaBody.append(tituloCarta, pCarta);
    divResumen.appendChild(divCard);
}
/*  ESTRUCTURA QUE HAY QUE SEGUIR
    <div class="card mb-12 espacio">
        <div class="row g-0">

                <div class="col-md-2">
                    <img src="img/avatar_a.png" class="img-fluid rounded-start">
                </div>

                <div class="col-md-10">
                    <div class="cartaBody">
                      <h5 class="card-title">Juan</h5>
                      <p class="card-text">Pagó 20€ el 12/06/2024.</p>
                    </div>
                </div>

        </div>
    </div>
 */


// --------- INICIO FUNCIÓN CUENTAS DOM ---------------------
function crearTarjetasCuenta(usuario) {
    let diCcuentas = document.getElementById("cuentas");
    let divCard = document.createElement("div");
    divCard.classList.add("card", "mb-12", "espacio");
    let divRow = document.createElement("div");
    divRow.classList.add("row", "g-0");
    let divCol1 = document.createElement("div");
    divCol1.classList.add("col-md-2");
    let imgAvatar = document.createElement("img");
    imgAvatar.setAttribute("src", usuario.getFoto());
    imgAvatar.classList.add("img-fluid", "rounded-circle", "m-3");
    //CIERRA LA PRIMERA COLUMNA
    let divCol2 = document.createElement("div");
    divCol2.classList.add("col-md-10");
    let cartaBody = document.createElement("div");
    cartaBody.classList.add("card-body", "mt-3");
    let tituloCarta = document.createElement("h5");
    tituloCarta.classList.add("card-title", "mx-3");
    tituloCarta.innerText = usuario.getNombre();
    let pCarta = document.createElement("p");
    pCarta.classList.add("card-text", "mx-3");
    pCarta.innerText = comprobarDeudor(usuario);

    // LOS APPEND
    divCard.appendChild(divRow);
    divRow.append(divCol1, divCol2);
    divCol1.appendChild(imgAvatar);
    divCol2.appendChild(cartaBody);
    cartaBody.append(tituloCarta, pCarta);
    diCcuentas.appendChild(divCard);
}
// --------- INICIO FUNCIÓN CUENTAS DOM ---------------------

// -------- FIN INICIO CREACIÓN DEL DOM --------

//ESTA FUNCIÓN CALCULA SI UN USUARIO ES DEUDOR O SI LE DEBEN DINERO
// PERO, EL DINERO SE REPARTE SIEMPRE EQUITATIVAMENTE ENTRE LOS TRES
// USUARIOS PRECARGADOS, POR TANTO SIMPLEMENTE SE CALCULA EL TOTAL 
// DE LOS GASTOS DE LOS 3 USUARIOS Y SE DIVIDE ENTRE EL Nº DE USERS
// ESTO REPRESENTA LO QUE DEBE CADA USUARIO QUE SE RESTA AL TOTAL DEL
// GRUPO, EN FUNCIÓN DE LA DIFERENCIA, DEBE, SE LE DEBE O ESTÁ LIMPIO
function comprobarDeudor(usuario) {

    // CALCULAMOS EL TOTAL PAGADO POR CADA UNO 
    let totJuan = juan.getGastosTotales();
    let totMaria = maria.getGastosTotales();
    let totPepe = pepe.getGastosTotales();

    //CALCULAMOS LA SUMA TOTAL PAGADA ENTRE TODOS 
    // Y LA DIVIDIMOS ENTRE LOS 3 PARA VER QUÉ SE 
    // DEBE POR USUARIO;
    let totPorUsuario = (totJuan + totMaria + totPepe) / 3;
    let totalUsuario = usuario.getGastosTotales();
    let diferencia = totalUsuario - totPorUsuario;
    let resultado = "";
    if (diferencia > 0) {
        resultado = `Ha pagado: ${totalUsuario} €. Le deben: ${diferencia.toFixed(2)} €.`;
    } else if (diferencia < 0) {
        // TO FIXED -> CONVIERTE UN NÚM EN UN STRING Y LO DEJA CON 2 DECIMALES
        // REPLACE -> EVITAR QUE EL SIGNO NEGATIVO APAREZCA
        let difSinSigno = diferencia.toFixed(2).replace("-", "");
        resultado = `Ha pagado: ${totalUsuario} €. Debe: ${difSinSigno} €.`;
    } else {
        resultado = `Ha pagado: ${totalUsuario} €. Está en paz.`;
    }
    return resultado;
}
