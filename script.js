import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgaX-52rSZYOxXVH5yS9c3zvpqVJKE8r4",
  authDomain: "mart-view.firebaseapp.com",
  projectId: "mart-view",
  storageBucket: "mart-view.firebasestorage.app",
  messagingSenderId: "1020057054383",
  appId: "1:1020057054383:web:16b12340808cd01129f85a",
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

});
