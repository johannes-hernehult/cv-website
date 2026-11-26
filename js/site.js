const printButton = document.querySelector(".print-button");
printButton?.addEventListener("click", () => window.print());

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
