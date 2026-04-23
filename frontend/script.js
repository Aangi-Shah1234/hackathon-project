async function sendData(e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // simple validation
  if (!firstName || !lastName || !email || !message) {
    alert("Please fill all fields");
    return;
  }

  const data = {
    name: firstName + " " + lastName,
    email: email,
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

    // hide form, show success UI
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