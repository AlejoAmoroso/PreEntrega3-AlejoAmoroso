let homeBalancesMonto = document.querySelector("#homeBalancesMonto");
let homeBalancesMontoConversion = document.querySelector("#homeBalancesMontoConversion");
let balanceStorage = JSON.parse(localStorage.getItem("valorConversionUniUSD"));
let homeAccountName = document.querySelector("#homeAccountName");
let homeAccountTransactionNumber = document.querySelector("#homeAccountTransactionNumber");
let logoutBtn = document.querySelector("#logoutBtn")

let userLogin = JSON.parse(localStorage.getItem("login_successful")) || false;

if(!userLogin) {
        window.location.href = "../pages/login.html";
}

logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("login_sucessful");
        localStorage.removeItem("valorConversionUniUSD");
        window.location.href = "../pages/login.html";
})

let convertirAPesos = (monto) => {
        return monto * 486.5136;
}

let truncFunc = (num, pos) => {
        let n = num.toString();
        return Number(n.slice(0, n.indexOf(".") + pos))
}

let balanceStorageConversion = truncFunc(convertirAPesos(balanceStorage), 3);

if (balanceStorage) {
        homeBalancesMonto.textContent = `${balanceStorage}`;
        homeBalancesMontoConversion.textContent = `${balanceStorageConversion} ARS`;
} else {
        homeBalancesMonto.textContent = `0.00`;
        homeBalancesMontoConversion.textContent = `0.00 ARS`;
}

if(userLogin) {
        let transactionAmountSpan = document.querySelector("#homeAccountTransactionNumber");
        homeAccountName.innerHTML = userLogin.username;
        transactionAmountSpan.innerHTML = userLogin.transactionNumber;
}

let err = document.getElementById("err")
let err2 = document.getElementById("err2")
if (balanceStorage < 0) {
        err.classList.add("in-debt")
        err2.style.color="rgb(235, 0, 0)"
        homeBalancesMontoConversion.style.color="rgb(235, 0, 0)"
}

// Tabla de monedas

async function getCoinData() {
        const response = await fetch("./assets/markets.json")
        const coinData = await response.json();
        console.log(coinData)
        coinData.forEach(coin => {
                console.log(coin);
                let tableBody = document.querySelector("#cointable__tbody");
                let tableRow = document.createElement("tr");
                tableRow.className = "cointable__row"
                tableRow.innerHTML = `
                <td>
                        <div class="coin-data">
                        <img src="${coin.image}" alt="${coin.id}" class="coin-image">
                        <div class="coin-text">
                                <span class="coin-title">${coin.name}</span>
                                <span class="coin-small">${coin.symbol}</span>
                        </div>
                </div>
                </td>
                <td>
                        <span class="coin-price">$${coin.current_price} USD</span>
                </td>
                <td>
                        <span class="coin-date">${coin.last_updated}</span>
                </td>
                `
                tableBody.appendChild(tableRow);
        })
}

getCoinData();