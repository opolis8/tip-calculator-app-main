let selectedButton = null;
let fixedTipValue = 0;
let inputValue = 0;
let numberPeople = 0;
let bill = 0;
let tipPercentage = "";

const numberofPeople = document.getElementById("people");
const numberInput = document.querySelector(".custom");
const output = document.querySelector(".output");
const resetBtn = document.querySelector(".reset");
const billValue = document.getElementById("bill");
const notZero = document.querySelector(".not-zero");
const billError = document.querySelector(".bill-error");
const buttonSelect = document.getElementsByClassName("select-button");
const selectError = document.querySelector(".select-error");
const tipAmount = document.querySelector(".output-tip");
const totalAmount = document.querySelector(".output-total");

function selectButton(buttonNumber, buttonValue) {
  if (selectedButton !== null) {
    selectedButton.classList.remove("selected");
  }
  const button = document.querySelector(
    `.select-button:nth-child(${buttonNumber})`
  );
  button.classList.add("selected");
  fixedTipValue = parseInt(button.dataset.selected, 10);

  selectedButton = button;

  tipPercentage = buttonValue;
  outputTotal(bill, tipPercentage, numberPeople);
}

function resetTips(value) {
  Array.from(value).map((button) => {
    if (button.classList.contains("selected")) {
      button.classList.remove("selected");
    }
  });
}
billValue.addEventListener("input", () => {
  bill = parseFloat(billValue.value, 10);

  outputTotal(bill, tipPercentage, numberPeople);
});
numberInput.addEventListener("input", (custom) => {
  inputValue = parseFloat(numberInput.value, 10);

  tipPercentage = parseFloat(numberInput.value, 10);
  outputTotal(bill, tipPercentage, numberPeople);
  resetTips(buttonSelect);
});

numberofPeople.addEventListener("input", (input) => {
  numberPeople = parseInt(numberofPeople.value, 10);

  if (numberPeople !== 0) {
    notZero.style.display = "none";
    outputTotal(bill, tipPercentage, numberPeople);
  } else if (numberofPeople.value === "") {
    notZero.style.display = "none";
  } else {
    notZero.style.display = "block";
  }
});

function outputTotal(billValue, tips, people) {
  billShowError(billValue);
  selectTipError(tips);
  if (billValue !== 0 && tips !== "" && people !== 0) {
    const totalTip = bill * (tips / 100);
    const tipCalculation = totalTip / people;
    const totalAmountCalculation = (billValue + totalTip) / people;

    if (!isNaN(tipCalculation)) {
      tipAmount.innerHTML = `<p>$${tipCalculation.toFixed(2)}</p>`;
      totalAmount.innerHTML = `<p>$${totalAmountCalculation.toFixed(2)}</p>`;
    } else {
      tipAmount.innerHTML = `<p>$0.00</p>`;
      totalAmount.innerHTML = `<p>$0.00</p>`;
    }
  } else if (
    billValue !== 0 ||
    tips !== "" ||
    people !== 0 ||
    billValue !== ""
  ) {
    resetBtn.style.opacity = "1";
  } else {
    resetBtn.style.opacity = ".5";
  }
}

function billShowError(value) {
  if (value === 0) {
    return (billError.style.display = "block");
  } else if (isNaN(value)) {
    return (billError.style.display = "block");
  } else {
    return (billError.style.display = "none");
  }
}

function selectTipError(value) {
  if (value === "") {
    return (selectError.style.display = "block");
  } else {
    return (selectError.style.display = "none");
  }
}

resetBtn.addEventListener("click", () => {
  resetTips(buttonSelect);
  billValue.value = "";
  billError.style.display = "none";
  tipPercentage = numberInput.value = "";
  selectError.style.display = "none";
  resetBtn.style.opacity = ".5";
  tipAmount.innerHTML = `<p>$0.00</p>`;
  totalAmount.innerHTML = `<p>$0.00</p>`;
  numberofPeople.value = "";
});
