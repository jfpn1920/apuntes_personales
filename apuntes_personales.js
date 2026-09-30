//--------------------------------------//
//--|funcionalidad_apuntes_personales|--//
//--------------------------------------//
const campoApunte = document.getElementById("campoApunte");
const botonGuardar = document.getElementById("botonGuardar");
const botonLimpiar = document.getElementById("botonLimpiar");
const botonRestaurar = document.getElementById("botonRestaurar");
const botonRestablecer = document.getElementById("botonRestablecer");
const apunteGuardado = document.getElementById("apunteGuardado");
const contadorCaracteres = document.getElementById("contadorCaracteres");
const mensaje = document.getElementById("mensaje");
//--------------------------------------------------//
//--|obtener_clave_de_apuntes_usando_localstorage|--//
//--------------------------------------------------//
const claveApunte = "apuntes_personales";
function obtenerApunte() {
    const apunte = localStorage.getItem(claveApunte);
    if (apunte) {
        return apunte;
    }
    return "";
}
//--------------------------------------//
//--|mostrar_los_apunte_y_los_mensaje|--//
//--------------------------------------//
function mostrarApunte() {
    const apunte = obtenerApunte();
    if (apunte !== "") {
        apunteGuardado.innerHTML = `<p>${apunte}</p>`;
    } else {
        apunteGuardado.innerHTML = `<p class="sin_apunte">Todavía no hay ningún apunte guardado.</p>`;
    }
}
function mostrarMensaje(texto) {
    mensaje.textContent = texto;
    setTimeout(() => {
        mensaje.textContent = "";
    }, 2500);
}
//----------------------------//
//--|actualizar_el_contador|--//
//----------------------------//
function actualizarContador() {
    const cantidad = campoApunte.value.length;
    contadorCaracteres.textContent = `${cantidad} caracteres`;
}
//--------------------------------------------//
//--|guardar_los_apunte_usando_localstorage|--//
//--------------------------------------------//
function guardarApunte() {
    const contenido = campoApunte.value.trim();
    if (contenido === "") {
        mostrarMensaje("Escribe un apunte antes de guardar.");
        return;
    }
    localStorage.setItem(claveApunte, contenido);
    mostrarApunte();
    mostrarMensaje("Apunte guardado correctamente.");
}
//-----------------------//
//--|limpiar_los_campo|--//
//-----------------------//
function limpiarCampo() {
    campoApunte.value = "";
    actualizarContador();
    campoApunte.focus();
    mostrarMensaje("Área de escritura limpiada.");
}
//-----------------------//
//--|restaurar_apuntes|--//
//-----------------------//
function restaurarApunte() {
    const apunte = obtenerApunte();
    if (apunte === "") {
        mostrarMensaje("No existe ningún apunte guardado.");
        return;
    }
    campoApunte.value = apunte;
    actualizarContador();
    campoApunte.focus();
    mostrarMensaje("Apunte restaurado en el área de escritura.");
}
//---------------------------------------//
//--|restablecer_todo_con_localstorage|--//
//---------------------------------------//
function restablecerTodo() {
    const confirmar = confirm(
        "¿Estás seguro de eliminar el apunte guardado?"
    );
    if (!confirmar) {
        return;
    }
    localStorage.removeItem(claveApunte);
    campoApunte.value = "";
    actualizarContador();
    mostrarApunte();
    mostrarMensaje("Todos los datos fueron eliminados.");
}
//---------------------------------------//
//--|eventos_de_los_botones_y_textarea|--//
//---------------------------------------//
botonGuardar.addEventListener("click", guardarApunte);
botonLimpiar.addEventListener("click", limpiarCampo);
botonRestaurar.addEventListener("click", restaurarApunte);
botonRestablecer.addEventListener("click", restablecerTodo);
campoApunte.addEventListener("input", actualizarContador);
//----------------------------//
//--|cargar_datos_iniciales|--//
//----------------------------//
function cargarDatos() {
    const apunte = obtenerApunte();
    if (apunte !== "") {
        mostrarApunte();
    }
    actualizarContador();
}
cargarDatos();