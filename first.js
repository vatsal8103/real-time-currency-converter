
const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = parseFloat(amount.value);
  
    if (isNaN(amtVal) || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
  
    const from = fromCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();
  
    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;
  
    try {
      const response = await fetch(URL);
      const data = await response.json();
  
      const rate = data[from][to];
  
      if (!rate) {
        msg.innerText = `Exchange rate not found for ${fromCurr.value} to ${toCurr.value}`;
        return;
      }
  
      const finalAmount = (amtVal * rate).toFixed(2);
      msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
      msg.innerText = "Failed to fetch exchange rate.";
      console.error(error);
    }
  };
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent form submission
    updateExchangeRate();
  });
  