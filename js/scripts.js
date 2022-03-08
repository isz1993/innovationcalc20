var myElem = document.getElementById("ElemID");
var mybuton = document.getElementById("ElemIDen");
var bpdf = document.getElementById("generatepdf");

/**Variables de List Form 1 */
const vtipsol = document.querySelector('#tipsol');
const vpri = document.querySelector('#priosol');
const vestra = document.querySelector('#estrategia');
const vinv = document.querySelector('#inversion');
const vimp = document.querySelector('#impacto');


/** Selector de Elementos  */
var cadena ="MDN"
const selectElementl=document.querySelector('#tipsol');
selectElementl.addEventListener('change', (event) =>{
  if ( parseInt (event.target.value) !=1 ){
    console.log(event.target.value);
    /**Ejemplo de Sweet alerts */
    Swal.fire({
      title: 'Servicio o Modelo de negocio',
      text:'Si tu idea es un servicio o modelo de negocio dirgete hacia la calculadora basica de innovación',
      icon: 'question',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Sí ',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        window.location.href="https://bit.ly/calbasic2022";
      } else if (result.isDenied) {
        /**Aquí es no  */
      }
    })
  }

});


/** Variables de List Form 2*/
const vcomp = document.querySelector('#complorg');
const vsupl = document.querySelector('#provee');
const vmer = document.querySelector('#mercado');
const vcomer = document.querySelector('#comercial');
const vmadu = document.querySelector('#madutec');
const vcap = document.querySelector('#capacidad');


/** Etiquetas del modal */
const vini = document.getElementById('ini');
const vtip = document.getElementById('tipo');
const vrie = document.getElementById('riesgo');
const vinc = document.getElementById('incertidumbre');
const vnom = document.getElementById('nom');
const vres = document.getElementById('resultados');


/**Función Diccionario */
function getUserById(users, userId) {
  for (let index = 0; index <= users.length; index++) {
    if (users[index].id === userId) {
      return users[index];
    }
  }
}




/**Decisiones del boton */
myElem.onclick = function () {

  /**Switches */
  var switch1 = document.getElementById("flex1").checked;
  var switch2 = document.getElementById("flex2").checked;
  var switch3 = document.getElementById("flex3").checked;
  var switch4 = document.getElementById("flex4").checked;
  var switch5 = document.getElementById("flex5").checked;
  var switch6 = document.getElementById("flex6").checked;
  var switch7 = document.getElementById("flex7").checked;
  var switch8 = document.getElementById("flex8").checked;
  let dicswitch = [switch1, switch2, switch3, switch4, switch5, switch6, switch7, switch8];
  var acumswitch = 0;

  for (let vald of dicswitch) {
    if (vald == true) {
      acumswitch += 1;
    }
  }
  if (acumswitch == 8) { acumswitch = 0; } else if (acumswitch >= 5 && acumswitch <= 7) { acumswitch = 1.5; } else if (acumswitch <= 4) { acumswitch = 3 } else { acumswitch = 3 }

  /**Definición de la complejidad*/
  var temp = parseFloat(vinv.value) + parseFloat(vcomp.value) + parseFloat(vsupl.value) + parseFloat(vmer.value) + parseFloat(vcomer.value) + parseFloat(vmadu.value) + parseFloat(vcap.value);
  /**console.log(acumswitch);*/

  var complejidad = "";

  if (temp >= 66) {
    complejidad = 3;
  } else if (temp >= 34) {
    complejidad = 2;
  } else {
    complejidad = 1;
  }

  var labelcomp = "";
  if (complejidad == 1) { labelcomp = "Baja" } else if (complejidad == 2) { labelcomp = "Complejidad Moderada" } else { labelcomp = "Complejidad Alta" }

  /**Diccionario de Time To MKT */
  const dic_inc = [{ id: 1, valor: 7 }, { id: 2, valor: 7 }, { id: 3, valor: 12 }];
  const dic_ady = [{ id: 1, valor: 4 }, { id: 2, valor: 9 }, { id: 3, valor: 16 }];
  const dic_tran = [{ id: 1, valor: 6 }, { id: 2, valor: 12 }, { id: 3, valor: 24 }];
  var timemkt = 0;


/**Decision de sí portafolio o no*/
  if (vtipsol.selectedOptions[0].text1 != "Productos" &&  parseInt(vpri.value)>2 && parseInt(vestra.value)>0 &&parseInt(vimp.value)>=2.5) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Comunicate con el PMO para poder alinear esta iniciativa ',
    })
  } 
  console.log(complejidad);

  /**Seleccion de tipo de innovación */
  if (vmer.selectedIndex == 0 || vcap.selectedIndex == 0) {
  } else if (vmer.selectedIndex <= 2 && vcap.selectedIndex <= 2 && vinv.selectedIndex == 3) {
    var decisión = parseFloat(getUserById(dic_tran, complejidad)["valor"]) + acumswitch;
    vini.innerHTML = "<b>" + vnom.value + "</b>";
    vtip.innerHTML = "<b>Innovación Tranformacional</b> <br> <br>Complejidad <br> <b>" + labelcomp + "</b> <br> <br>Time to Market <br> <b>" + decisión + " meses</b>";
    vrie.innerHTML = "<b>Riesgo alto.</b> El desarrollo e implementación de esta iniciativa puede tener impactos importantes  en la organización: inverisón alta, tiempos de desarrollo largos, iteraciones continuas, equipos altamente enfocados.";
    vinc.innerHTML = "<b>Incertidumbre Alta.</b> La información con la que se cuenta es muy limitada, la organización no cuenta con experiencia, es importante dimensionar el mercado, el tipo de usuario y el tipo de capacidad /tecnologías necesarias para el desarrollo y ejecución de la iniciativa.";
    //vres.innerHTML = vmer.selectedOptions[0].text + "; " + vcap.selectedOptions[0].text + "; " + vinv.selectedOptions[0].text + "; " + vimp.selectedOptions[0].text;

  } else if (vmer.selectedIndex == 1 && vcap.selectedIndex == 1) {
    var decisión = parseFloat(getUserById(dic_inc, complejidad)["valor"]) + acumswitch;
    vini.innerHTML = "<b>" + vnom.value + "</b>";
    vtip.innerHTML = "<b>Innovación Incremental</b> <br> <br>Complejidad <br> <b>" + labelcomp + "</b> <br> <br>Time to Market <br> <b>" + decisión + " meses</b>";
    vrie.innerHTML = "<b>Riesgo Bajo.</b> El impacto de esta iniciativa es muy limitado y la organización puede controlar los impactos negativos. No se compromete el recurso humano y financiero.";
    vinc.innerHTML = "<b>Incertidumbre Baja.</b> Se cuenta con la información de mercado, capacidades de comerciales, entendimiento del usuario y tecnología para su desarrollo.";
    //vres.innerHTML = vmer.selectedOptions[0].text + "; " + vcap.selectedOptions[0].text + "; " + vinv.selectedOptions[0].text + "; " + vimp.selectedOptions[0].text;

  } else if (vmer.selectedIndex <= 2 && vcap.selectedIndex != 3) {
    var decisión = parseFloat(getUserById(dic_ady, complejidad)["valor"]) + acumswitch;
    vini.innerHTML = "<b>" + vnom.value + "</b>";
    vtip.innerHTML = "<b>Innovación Adyacente</b>  <br> <br>Complejidad <br> <b>" + labelcomp + "</b> <br> <br>Time to Market <br> <b>" + decisión + " meses</b>";
    vrie.innerHTML = "<b>Riesgo medio. </b> Esta iniciativa impacta altamente en un canal y categoría de la organización, el enfoque comercial y usuario son primordiales para asegurar el éxito de la iniciativa.";
    vinc.innerHTML = "<b>Incertidumbre Moderada. </b>  Se cuenta con gran parte de las capacidades necesarias para el desarrollo de la iniciativa. Existe información limitada de mercado y usuario.";
    //vres.innerHTML = vmer.selectedOptions[0].text + "; " + vcap.selectedOptions[0].text + "; " + vinv.selectedOptions[0].text + "; " + vimp.selectedOptions[0].text;  
  } else {
    var decisión = parseFloat(getUserById(dic_tran, complejidad)["valor"]) + acumswitch;
    vini.innerHTML = "<b>" + vnom.value + "</b>";
    vtip.innerHTML = "<b>Innovación Tranformacional</b> <br> <br>Complejidad <br> <b>" + labelcomp + "</b> <br> <br>Time to Market <br> <b>" + decisión + " meses</b>";
    vrie.innerHTML = "<b>Riesgo alto.</b> El desarrollo e implementación de esta iniciativa puede tener impactos importantes  en la organización: inverisón alta, tiempos de desarrollo largos, iteraciones continuas, equipos altamente enfocados.";
    vinc.innerHTML = "<b>Incertidumbre Alta.</b> La información con la que se cuenta es muy limitada, la organización no cuenta con experiencia, es importante dimensionar el mercado, el tipo de usuario y el tipo de capacidad /tecnologías necesarias para el desarrollo y ejecución de la iniciativa.";
    //vres.innerHTML = vmer.selectedOptions[0].text + "; " + vcap.selectedOptions[0].text + "; " + vinv.selectedOptions[0].text + "; " + vimp.selectedOptions[0].text;
  }
}




/** Generador de Imagen */
bpdf.onclick = function () {
  const $objetivo = document.querySelector("#staticBackdrop");
  html2canvas($objetivo) // Llamar a html2canvas y pasarle el elemento
    .then(canvas => {
      // Cuando se resuelva la promesa traerá el canvas
      // Crear un elemento <a>
      let enlace = document.createElement('a');
      enlace.download = "Captura -CalInn";
      // Convertir la imagen a Base64
      enlace.href = canvas.toDataURL();
      // Hacer click en él
      enlace.click();
    });
}




