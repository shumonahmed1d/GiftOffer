import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const phoneInput = document.querySelector("#phone");

const iti = window.intlTelInput(phoneInput, {
  initialCountry: "auto",
  separateDialCode: true,
  utilsScript:
  "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.10/build/js/utils.js"
});

const sendBtn = document.getElementById("sendBtn");
const verifyBtn = document.getElementById("verifyBtn");
const timerDiv = document.getElementById("timer");
const statusDiv = document.getElementById("status");

window.recaptchaVerifier = new RecaptchaVerifier(auth, sendBtn, {
  size: 'invisible'
});

let countdown;

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

  try {

    const confirmationResult =
    await signInWithPhoneNumber(
      auth,
      phoneNumber,
      window.recaptchaVerifier
    );

    window.confirmationResult = confirmationResult;

    statusDiv.innerText = "OTP Sent Successfully";

    startTimer();

  } catch (error) {

    alert(error.message);
  }
});

verifyBtn.addEventListener("click", async () => {

  const code = document.getElementById("otp").value;

  try {

    const result =
    await window.confirmationResult.confirm(code);

    const user = result.user;

    statusDiv.innerText =
    `Login Success: ${user.phoneNumber}`;

  } catch (error) {

    alert("Invalid OTP");
  }
});
