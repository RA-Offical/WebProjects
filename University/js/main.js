const navToggler = document.querySelector(".nav-toggler");
const nav = document.querySelector(".nav");
const closeBtn = document.querySelector(".close");

[navToggler, closeBtn].forEach((el) => {
	el.addEventListener("click", () => {
		nav.classList.toggle("nav--visible");
	});
});
