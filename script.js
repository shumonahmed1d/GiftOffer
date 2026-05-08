const API_KEY = "6d76ac090b40ac652d1eff168cd26081593651a4BWQmxviZr0wkzmHEQW6P6mTjf";

const phoneInput = document.querySelector("#phone");

window.intlTelInput(phoneInput, {
  initialCountry: "bd",
  separateDialCode: true,
  preferredCountries: ["bd", "in", "us", "gb"],
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.10/build/js/utils.js"
});

const sendBtn = document.getElementById("sendBtn");
const verifyBtn = document.getElementById("verifyBtn");
const timerDiv = document.getElementById("timer");
const statusDiv = document.getElementById("status");

let generatedOTP = "";
let countdown;

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function startTimer() {

  let timeLeft = 10;

  sendBtn.disabled = true;

  timerDiv.innerText = `Resend available in ${timeLeft}s`;

  countdown = setInterval(() => {

    timeLeft--;

    timerDiv.innerText = `Resend available in ${timeLeft}s`;

    if (timeLeft <= 0) {

      clearInterval(countdown);

      sendBtn.disabled = false;

      timerDiv.innerText = "You can resend OTP now";
    }

  }, 1000);
}

sendBtn.addEventListener("click", async () => {

  const phoneNumber = iti.getNumber();

  generatedOTP = generateOTP();

  statusDiv.innerText = "Sending OTP...";

  try {

    const response = await fetch("https://textbelt.com/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
});
