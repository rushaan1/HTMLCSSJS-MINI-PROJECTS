const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.4.18/v1/currencies";

let selects = document.querySelectorAll(".select-container select");
let convertButton = document.querySelector("form button");
let msg = document.querySelector(".msg");
let amtElement = document.querySelector(".amount input");
let from = document.querySelector(".from select");
let to = document.querySelector(".to select");
let swapElement = document.querySelector(".fa-arrow-right-arrow-left");
let finalExchangeRate;


window.addEventListener("load",()=> {
    updateExchangeRate();
});

for (let select of selects)
{
    for (currCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currCode; 
        newOption.value = currCode;
        if (select.name=="from" && currCode == "USD")
        {
            newOption.selected = "selected";
        }
        else if (select.name=="to" && currCode == "INR")
        {
            newOption.selected = "selected";
        }
        select.append(newOption);
        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    }
}

convertButton.addEventListener("click", (evt)=> {
    evt.preventDefault();
    updateExchangeRate();
});

swapElement.addEventListener("click", ()=> {
    msg.innerText = `${finalExchangeRate} ${to.value} = ${amtElement.value} ${from.value}`;
    let tempAmtVal = amtElement.value
    amtElement.value = finalExchangeRate;  
    finalExchangeRate = tempAmtVal;

    let selectElement = from;
    let desiredOption1 = Array.from(selectElement.options).find(option => option.value === to.value);
    selectElement = to;
    optionValue = to.value;
    let desiredOption2 = Array.from(selectElement.options).find(option => option.value === from.value);

    desiredOption1.selected = true;
    desiredOption2.selected = true;
    updateFlag(desiredOption1.parentElement);
    updateFlag(desiredOption2.parentElement);

});

const updateExchangeRate = async () => {
    let amtVal = amtElement.value;
    if (amtVal=="")
    {
        amtVal = 1;
        amtElement.value = 1;
    }
    const URL = `${BASE_URL}/${from.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(response);
    let rate = data[from.value.toLowerCase()][to.value.toLowerCase()];
    finalExchangeRate = amtVal * rate;
    msg.innerText = `${amtVal} ${from.value} = ${finalExchangeRate} ${to.value}`;
}

const updateFlag = (element) =>
{
    element.parentElement.querySelector("img").src = `https://flagsapi.com/${countryList[element.value]}/flat/64.png`;
};
