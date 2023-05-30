// objetos y arrays
class TasasYComisiones {
        constructor(tipoDeCambio, valorCambio, tasaDeCambio, comisionVariableCajero, comisionServicio, comisionGarantia) {
                this.tipoDeCambio = tipoDeCambio;
                this.valorCambio = valorCambio;
                this.tasaDeCambio = tasaDeCambio;
                this.comisionVariableCajero = comisionVariableCajero;
                this.comisionServicio = comisionServicio;
                this.comisionGarantia = comisionGarantia;
        }
}

// variables 
let sourceAmount = document.getElementById("sourceAmount");
let destinationAmount = document.getElementById("destinationAmount");
let formControlInputs = document.getElementsByClassName("form-control-input-container");
let formControlHelpers = document.getElementsByClassName("form-control-helper-span")
let continueBtn = document.getElementById("continueBtn");

// funciones
let fondosRecibirCalculo = (montoAEnviar) => {
        if (montoAEnviar === "0") {
                return 0;
        }
        tasas = new TasasYComisiones("ARS", 0.0021, 0.0021, montoAEnviar * 0.0068, montoAEnviar * 0.014, 0.40);
        return (montoAEnviar / tasas.valorCambio) - (tasas.comisionGarantia - tasas.comisionVariableCajero) / (1 + tasas.comisionServicio);
}

let fondosEnviarCalculo = (fondosARecibir) => {
        if (fondosARecibir === "0") {
                return 0;
        }
        tasas = new TasasYComisiones("ARS", 0.0021, 0.0021, fondosARecibir * 0.0068, fondosARecibir * 0.014, 0.40);
        return ((fondosARecibir * 1 + tasas.comisionServicio) + tasas.comisionGarantia + tasas.comisionVariableCajero) * tasas.tasaDeCambio;
}

// funcion para truncar decimales
let truncFunc = (num, pos) => {
        let n = num.toString();
        return Number(n.slice(0, n.indexOf(".") + pos))
}

// eventos y funciones para realizar el calculo, conversion y que los valores se vean en los inputs
sourceAmount.addEventListener('input', convertCurrency);
destinationAmount.addEventListener('input', updateSourceAmount);
continueBtn.addEventListener('click', saveToLocalStorage);

// agarra el valor que se typea en el input de enviar (soruceAmount), 
// si el valor es diferente que un string vacio usa la funcion fondosEnviar para realizar el calculo de lo que se esta typeando en el input y luego lo muestra en el input de fondos a recibir.
function convertCurrency(e) {
        let sourceValue = e.target.value;
        let convertedAmount = 0;

        if (sourceValue !== "") {
                convertedAmount = truncFunc(fondosEnviarCalculo(sourceValue), 3); 
        }

        destinationAmount.value = convertedAmount;
}

// agarra el valor del input de fondos a recibir (destinationAmount)
// si el valor es diferente a un string vacio hace el calculo usando la funcion fondosRecibir de lo que se esta typeando en el input y luego lo muestra en el input de fondos a enviar.
function updateSourceAmount(e) {
        let destinationValue = e.target.value
        let originalAmount = 0;

        if (destinationValue !== "") {
                originalAmount = truncFunc(fondosRecibirCalculo(destinationValue), 3);
        }

        sourceAmount.value = originalAmount;
}

// checkea si ya existe un valor en el localStorage y lo muestra en balance-monto
let storedConvertedAmount = localStorage.getItem("valorConversionUniUSD");
let parseAmount = JSON.parse(storedConvertedAmount);
let balanceMonto = document.getElementById("balance-monto")
if (parseAmount) {
        balanceMonto.textContent = `$${parseAmount} UniUSD`;
} else {
        balanceMonto.textContent = "$0.00 UniUSD";
}

// si se toca el boton, agarra el valor que hay en el input de fondos a recibir, si el valor es igual a un string vacio arroja un error representado por bordes en color rojo en los inputs y devuelve la funcion antes de tiempo
// sino chequea si hay o no un valor dentro del local storage. si existe un valor, suma el valor que se typeo en el input de recibir con lo que ya existe en el storage y si no existe un valor, guarda el nuevo valor en el storage.
function saveToLocalStorage() {
        let convertedAmount = destinationAmount.value;
        if (convertedAmount === "") {
                for (let i = 0; i < formControlInputs.length; i++) {
                        let formControlInput = formControlInputs[i];
                        formControlInput.classList.add("error-border");
                }
                for (let i = 0; i < formControlHelpers.length; i++) {
                        let formControlHelper = formControlHelpers[i];
                        formControlHelper.classList.add("form-control-helper-error");
                }
                return;
        }
        Array.from(formControlInputs).forEach(function (div) {
                div.classList.remove("error-border")
        })
        Array.from(formControlHelpers).forEach(function (span) {
                span.classList.remove("form-control-helper-error")
        });

        let storedConvertedAmount = localStorage.getItem("valorConversionUniUSD");
        let parseAmount = JSON.parse(storedConvertedAmount);
        let newConvertedAmount = 0;

        if (storedConvertedAmount) {
                newConvertedAmount = truncFunc(parseFloat(parseAmount) + parseFloat(convertedAmount), 3);
                localStorage.setItem("valorConversionUniUSD", newConvertedAmount);
        } else {
                newConvertedAmount = parseFloat(convertedAmount);
                localStorage.setItem("valorConversionUniUSD", JSON.stringify(convertedAmount));
        }

        let balanceMonto = document.getElementById("balance-monto");
        balanceMonto.textContent = `$${newConvertedAmount} UniUSD`;

        location.reload();
}