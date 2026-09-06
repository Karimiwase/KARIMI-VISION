// ================================
// MOBILE MENU
// ================================

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

    if (mobileMenu.classList.contains("open")) {
        menuButton.textContent = "✕";
    } else {
        menuButton.textContent = "☰";
    }

});


// Close mobile menu after clicking a link

const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

        menuButton.textContent = "☰";

    });

});


// ================================
// QUOTE FORM
// ================================

const quoteForm = document.getElementById("quoteForm");
const formMessage = document.getElementById("formMessage");

quoteForm.addEventListener("submit", function (event) {

    event.preventDefault();

    formMessage.classList.add("show");

    quoteForm.reset();

    formMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// ================================
// SCROLL ANIMATIONS
// ================================

const animatedElements = document.querySelectorAll(
    ".service-card, .project-card, .process-step, .review"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


animatedElements.forEach(element => {

    observer.observe(element);

});


// ================================
// SMOOTH NAVIGATION
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});