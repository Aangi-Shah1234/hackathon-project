window.addEventListener("load", async () => {
  await Clerk.load();

  const loginBtn = document.getElementById("login");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      Clerk.openSignIn({
        redirectUrl: window.location.href
      });
    });
  }
});
async function sendData(e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // validation
  if (!firstName || !lastName || !email || !message) {
    alert("Please fill all fields");
    return;
  }

  // 🔥 Get Clerk user (if logged in)
  const user = Clerk.user;

  const data = {
    name: user ? user.fullName : firstName + " " + lastName,
    email: user
      ? user.primaryEmailAddress.emailAddress
      : email,
    message: message
  };

  try {
    const res = await fetch("https://hackathon-project-pql8.onrender.com/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    // success UI
    document.getElementById("contactForm").style.display = "none";
    document.getElementById("successState").classList.add("show");

  } catch (err) {
    alert("Error sending message");
  }
}

// reset form (your UI button)
function resetForm() {
  document.getElementById("contactForm").reset();
  document.getElementById("contactForm").style.display = "block";
  document.getElementById("successState").classList.remove("show");
}
