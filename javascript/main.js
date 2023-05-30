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

function convertCurrency(event) {
        let sourceValue = event.target.value;
        let convertedAmount = 0;

        if (sourceValue !== "") {
                convertedAmount = truncFunc(fondosEnviarCalculo(sourceValue), 3);
        }

        destinationAmount.value = convertedAmount;
}

function updateSourceAmount(event) {
        let destinationValue = event.target.value
        let originalAmount = 0;

        if (destinationValue !== "") {
                originalAmount = truncFunc(fondosRecibirCalculo(destinationValue), 3);
        }

        sourceAmount.value = originalAmount;
}

// checkea si ya existe un valor en el localStorage y lo muestra en balance-monto
let storedConvertedAmount = localStorage.getItem("valorConversionUniUSD");
let balanceMonto = document.getElementById("balance-monto")
if (storedConvertedAmount) {
        balanceMonto.textContent = `$${storedConvertedAmount} UniUSD`;
} else {
        balanceMonto.textContent = "$0.00 UniUSD";
}

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
        let newConvertedAmount = 0;

        if (storedConvertedAmount) {
                newConvertedAmount = parseFloat(storedConvertedAmount) + parseFloat(convertedAmount);
                localStorage.setItem("valorConversionUniUSD", newConvertedAmount);
        } else {
                newConvertedAmount = parseFloat(convertedAmount);
                localStorage.setItem("valorConversionUniUSD", convertedAmount)
        }

        let balanceMonto = document.getElementById("balance-monto");
        balanceMonto.textContent = `$${newConvertedAmount} UniUSD`;

        location.reload();
}