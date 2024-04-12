//error button
const inputFields = document.querySelectorAll(".inputField");

function checkInput(event) {
  const input = event.target;
  let content = "";
  const errorBtnId = "error" + input.id.slice(-1);
  const isError = input.value.trim() === " " || /\D/.test(input.value);

  const errorBtn = document.getElementById(errorBtnId);
  if (isError) {
    errorBtn.style.display = "inline-block";
    content = "please enter the number only";
    errorBtn.setAttribute("error", content);
  } else {
    errorBtn.style.display = "none";
  }
}
inputFields.forEach((inputField) => {
  inputField.addEventListener("input", checkInput);
});
  
const queMarks = document.querySelectorAll(".queMark");
function setToolTipData(element, content) {
  element.setAttribute("que-data", content);
}

queMarks.forEach((queMark) => {
  queMark.addEventListener("mouseover", () => {
    const queMarkId = queMark.id;
    let tooltipContent;
    switch (queMarkId) {
      case "queMark1":
        tooltipContent =
          "Gross annual is your total salary in a year before any deductions";
        break;
      case "queMark2":
        tooltipContent =
          "Extra income is the income earned in addition to regular paycheck";
        break;
      case "queMark3":
        tooltipContent = "Age group";
        break;
      case "queMark4":
        tooltipContent =
          "Applicable Deductions are the expenses subracted from taxable income";
        break;
      default:
        tooltipContent = " ";
    }
    setToolTipData(queMark, tooltipContent);
  });
});

const submitBtn = document.getElementById("submitBtn");
const white = document.querySelector(".white");

const checkFields = () => {
  let isValid = true;
  const inputValues = [];

  inputFields.forEach((inputField) => {
    const inputValue = inputField.value;

    try {
      if (inputValue.trim() === "") {
        alert("Field(s) should not be empty.");
        isValid = false;
        throw BreakException;
      } else if(!(/\D/.test(inputValue))) {
        inputValues.push(inputValue);
      }
      if (isValid) {
        getIncome(inputValues);
      } 
    } catch (error) {
      if(error !== BreakException) throw error;
    }
   
  });
};

const ageGrp = document.getElementById("inputField3");
const overallIncomeElement = document.getElementById("overallIncome");
const outputModal = document.querySelector(".outputModal");

function getIncome(inputValues) {
  let tax = 0;
  const grossIncome = parseInt(inputValues[0]);
  const extraIncome = parseInt(inputValues[1]);
  const applicableDeductions = parseInt(inputValues[3]);

  const income = grossIncome + extraIncome - applicableDeductions;
  if (income > 800000) {
    const taxableIncome = Math.max(income - 800000, 0);
    if (ageGrp.value === "<40") {
      tax = 0.3 * taxableIncome;
    } else if (ageGrp.value === ">=40&<60") {
      tax = 0.4 * taxableIncome;
    } else {
      tax = 0.1 * taxableIncome;
    }
  }
  outputModal.style.display = "block";
  const overallIncome = income - tax;

  function formatOutput(number) {
    const parts = number.toString().split('.');
    let integerPart = parseInt(parts[0]);
    let formattedIntegerPart = integerPart.toLocaleString('en-IN');
    if (parts.length > 1) {
        formattedIntegerPart += '.' + parts[1];
    }

    return formattedIntegerPart;
}
const outputString = formatOutput(overallIncome);

console.log("outputString ==>",outputString)
  overallIncomeElement.innerHTML = `${outputString}`;
}

submitBtn.addEventListener("click", checkFields);

const closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", () => {
  outputModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === outputModal) {
    outputModal.style.display = "none";
  }
});
