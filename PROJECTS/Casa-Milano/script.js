// ================= MOBILE MENU =================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    if (navLinks.classList.contains("open")) {
        menuToggle.textContent = "✕";
    } else {
        menuToggle.textContent = "☰";
    }
});


// Close mobile menu when clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
    });
});


// ================= MENU TABS =================

const tabButtons = document.querySelectorAll(".tab-button");
const menuItems = document.querySelectorAll(".menu-item");

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        tabButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        menuItems.forEach(item => {

            if (item.dataset.category === category) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }

        });

    });

});


// ================= BOOKING FORM =================

const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const guests = document.getElementById("guests").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!name || !guests || !date || !time) {
        formMessage.textContent = "Please complete all required fields.";
        return;
    }

    formMessage.textContent =
        `Thanks ${name}! Your reservation request for ${guests} at ${time} has been received.`;

    bookingForm.reset();

});


// ================= DATE MINIMUM =================

const dateInput = document.getElementById("date");

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

dateInput.min = `${year}-${month}-${day}`;


// ================= SIMPLE SCROLL ANIMATION =================

const animatedElements = document.querySelectorAll(
    ".about-content, .about-image, .menu-item, .review, .booking-info, .booking-form"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.1
    }
);

animatedElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);

});