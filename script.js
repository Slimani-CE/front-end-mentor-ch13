// ******** Global Variables ********
let rangeInput = document.querySelector(
  ".container .body .char-length-div input"
);
let checkList = document.querySelectorAll(
  ".container .body .include-list li input[type='checkbox']"
);
let charLengthSpan = document.querySelector(
  ".container .body .char-length-div .char-length-header .result"
);
let password = document.querySelector(".container .header input");
let copiedSpan = document.querySelector(".container .header > div span");
let levelDiv = document.querySelector(".container .body .strength-div .level");

const PASSWORD_MAP = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  symbols: "!@#$%^&*()_+-={}[]|\\:;\"'<> ,.?/`~",
  numbers: "0123456789",
};

const LEVEL_MAP = {
  0: "",
  1: "too weak!",
  2: "weak",
  3: "medium",
  4: "strong",
};

// ******** EVENT LISTENERS ********
// Event listener for the range input
rangeInput.addEventListener("mousemove", checkRange);
rangeInput.addEventListener("mouseup", checkRange);
rangeInput.addEventListener("change", checkRange);

// Event listener for generate button
let genBtn = document.querySelector(".container .body .generate-btn");
genBtn.addEventListener("click", generatePassword);

// Event listener for copy button
let copyBtn = document.querySelector(".container .header svg");
copyBtn.addEventListener("click", saveOnClipboard);

// ******** VIEW FUNCTIONS ******** //
// A function to toggle a checkbox
function toggleCheckbox(el) {
  el.firstChild.classList.toggle("checked");
}

// A function to change the style of the range input
// And display the selected value
function checkRange(event) {
  let value = event.target.value;
  event.target.style.background = `linear-gradient(to right, var(--neon-green) ${value}%, var(--very-dark-grey) ${value}%)`;
  charLengthSpan.innerHTML = value;
}

// ******** Logic Functons ******** //
function generatePassword() {
  // Collect user inputs
  let charLength = rangeInput.value;

  // pool will contain shuffled array of included chars, symbols...etc
  let pool = shuffle(
    Array.from(checkList)
      .reduce((acc, checkbox) => {
        if (checkbox.checked)
          return acc.concat(PASSWORD_MAP[checkbox.dataset["type"]]);
        return acc;
      }, "")
      .split("")
  ).join("");

  // Generate password
  let result = "";
  for (let i = 0; i < charLength && pool.length != 0; i++) {
    result += pool[getRandomInt(0, pool.length)];
  }

  // Calculate strength level
  let level = Array.from(checkList).reduce((acc, checkbox) => {
    if (checkbox.checked) return acc + 1;
    return acc;
  }, 0);
  console.log(levelDiv.firstChild);
  levelDiv.firstElementChild.innerHTML = LEVEL_MAP[level];
  levelDiv.querySelector(".level-amount").dataset.level = "level-" + level;
  // Display result
  password.value = result;
}

// A function to copy the password on clipboard
function saveOnClipboard() {
  // Select the text field
  password.select();
  password.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(password.value);

  // Display info message
  copiedSpan.classList.remove("hidden");
  setTimeout((_) => {
    copiedSpan.classList.add("hidden");
  }, 5000);
}

// ******** Utils Functions ******** //
// A function to shuffle arrays
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// A function that return a random number between min and max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
