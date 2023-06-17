let balanceStorage = JSON.parse(localStorage.getItem("valorConversionUniUSD"));

let storedConvertedAmount = localStorage.getItem("valorConversionUniUSD");
let parseAmount = JSON.parse(storedConvertedAmount);
let balanceMonto = document.getElementById("balance-monto")
if (parseAmount) {
        balanceMonto.textContent = `$${parseAmount} UniUSD`;
} else {
        balanceMonto.textContent = "$0.00 UniUSD";
}