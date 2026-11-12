// Contact form validation: no empty fields, valid email, digits-only phone
var form = document.getElementById("contactForm");
var success = document.getElementById("successMsg");

function setError(id, msg) {
  var field = document.getElementById(id).closest(".field");
  field.querySelector(".error").textContent = msg;
  field.classList.toggle("invalid", msg !== "");
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

function validate() {
  var ok = true;
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var message = document.getElementById("message").value.trim();

  if (name === "") { setError("name", "Name cannot be empty."); ok = false; } else setError("name", "");

  if (email === "") { setError("email", "Email address cannot be empty."); ok = false; }
  else if (!isValidEmail(email)) { setError("email", "Please enter a valid email address."); ok = false; }
  else setError("email", "");

  if (phone === "") { setError("phone", "Phone number cannot be empty."); ok = false; }
  else if (!/^[0-9]+$/.test(phone)) { setError("phone", "Phone number must contain digits only."); ok = false; }
  else setError("phone", "");

  if (message === "") { setError("message", "Message cannot be empty."); ok = false; } else setError("message", "");

  return ok;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  success.classList.remove("show");
  if (validate()) {
    success.classList.add("show");
    form.reset();
  }
});

["name", "email", "phone", "message"].forEach(function (id) {
  document.getElementById(id).addEventListener("input", function () { setError(id, ""); });
});
