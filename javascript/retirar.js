let balanceStorage = JSON.parse(localStorage.getItem("valorConversionUniUSD"));

let storedConvertedAmount = localStorage.getItem("valorConversionUniUSD");
let parseAmount = JSON.parse(storedConvertedAmount);
let balanceMonto = document.getElementById("balance-monto")
let balanceMontoSmall = document.getElementById("balance-monto-small")
if (parseAmount) {
        balanceMonto.textContent = `$${parseAmount} UniUSD`;
        balanceMontoSmall.textContent = `$${parseAmount} UniUSD`
} else {
        balanceMonto.textContent = "$0.00 UniUSD";
        balanceMontoSmall.textContent = "$0.00 UniUSD";
}

