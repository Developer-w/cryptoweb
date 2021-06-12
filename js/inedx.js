'use strict'
const cryptomonedaSelect = document.querySelector("#criptomonedas");
const formulario = document.querySelector('#formulario')
const objBusqueda = {
    criptomoneda : ''
}

const obtenerCriptomonedas = criptomonedas => new Promise( resolve => {
    resolve(criptomonedas);
}); 

document.addEventListener("DOMContentLoaded", () => {
    consultaCripto();

    formulario.addEventListener('submit', submitFormulario);
    cryptomonedaSelect.addEventListener('change', leerValor);
});

//Lista de Criptomoneda

const consultaCripto = () => {    

    fetch(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD`)
    .then( respuesta => respuesta.json() )
    .then( resultado => obtenerCriptomonedas(resultado.Data) )
    .then( criptomonedas => selectCriptomonedas(criptomonedas) ) 

   
};

function selectCriptomonedas(criptomonedas) {
    
    criptomonedas.forEach( cripto => {
        const { FullName, Name } = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        cryptomonedaSelect.appendChild(option);
   })


};


//leer valor Criptomoneda
function leerValor(e){
    objBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e) {
    e.preventDefault();

    const { criptomoneda } = objBusqueda;
    if(criptomoneda === '') {
        mostrarAlerta('Este Campo es Obligatorio');
        return;
    }

    //consultarAPI();
}

// function mostrarAlerta(msg) {

// }


//Consultando API
function consultarAPI() {
    const { criptomoneda } = objBusqueda;

    fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=REP,${criptomoneda}&tsyms=USD`)
    .then( respuesta => respuesta.json() )
    .then( cotizacion  => {
          mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda])
    })   

};

function mostrarCotizacionHTML(cotizacion) {

    const { PRICE, MKTCAP } = cotizacion.USD;

    const valor1 = PRICE
    const valor2 = MKTCAP

    console.log(cotizacion.USD);
    console.log(valor1)
    console.log(valor2)

    $('#price').text(valor1)
    $('#mktcp').text(valor2)  

}

$('#revisar').on('click', consultarAPI);


//section Card

const invInicial = $('#inputCapital');
const aprAnual = $('#inputApr');
const irDias = $('#inputIr')
const botonIr = $('#buttonAnalisis');

botonIr.on('click', function() {
    //event.preventDefault()

    const valorUno = invInicial.val()
    const valorDos = aprAnual.val()
    const valorDPR = valorDos/365
    const valorFactor = valorDPR* (0.01)
    const valorDiaria = valorUno*valorFactor
    const ir = valorUno/valorDiaria

    if (valorUno.length >= 1,  valorDos.length >= 1) {

        console.table({valorUno, valorDos, valorDPR, valorFactor, ir});
        $('#inputIr').text(new Intl.NumberFormat("en-IN", {maximumSignificantDigits: 3}).format(ir) + ' dias')
    }
    console.log(new Intl.NumberFormat("en-IN", {maximumSignificantDigits: 5}).format(ir))
});




