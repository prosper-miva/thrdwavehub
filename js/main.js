// Shared behaviour: mobile menu toggle + footer year
document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("menuBtn");
  var nav = document.getElementById("navLinks");
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  document.getElementById("year").textContent = new Date().getFullYear();
});
