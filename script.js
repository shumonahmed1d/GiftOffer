import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

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
