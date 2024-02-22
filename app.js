"use strict";

const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const upperCaseEl = document.getElementById("uppercase");
const lowerCaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const getRandomLower = function () {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getRandomUpper = function () {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getRandomNumber = function () {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

const getRandomSymbol = function () {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

const generatePassword = function (lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  // const typesArr = [{ lower }, { upper }, { number }, { symbol }];
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const [funcName] = Object.keys(type);
      generatedPassword += randomFunc[funcName]();
    });
  }
  console.log(generatedPassword);
  const resultPassword = generatedPassword.slice(0, length);

  return resultPassword;
};

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasUpper = upperCaseEl.checked;
  const hasLower = lowerCaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.textContent = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

// clipboardEl.addEventListener("click", () => {
//   const textarea = document.createElement("textarea");
//   const password = resultEl.innerText;

//   if (!password) {
//     return;
//   }

//   textarea.value = password;
//   document.body.appendChild(textarea);
//   textarea.select();
//   document.execCommand("copy");
//   textarea.remove();
//   alert("Password copied to clipboard!");
// });

// Ref:
// https://ithelp.ithome.com.tw/articles/10271977?sc=iThomeR
clipboardEl.addEventListener("click", async () => {
  try {
    const password = resultEl.innerText;
    await navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  } catch (err) {
    console.log(err);
  }
});
