/* =========================================
   NORDIC ESTATES
   Interactive real estate demo
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");

    if (mobileMenu.classList.contains("open")) {
        menuBtn.textContent = "×";
    } else {
        menuBtn.textContent = "☰";
    }
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuBtn.textContent = "☰";
    });
});


/* =========================================
   PROPERTY FILTER
========================================= */

const locationFilter = document.getElementById("locationFilter");
const typeFilter = document.getElementById("typeFilter");
const priceFilter = document.getElementById("priceFilter");
const searchBtn = document.getElementById("searchBtn");

const propertyCards = document.querySelectorAll(".property-card");
const noResults = document.getElementById("noResults");

function filterProperties() {

    const selectedLocation = locationFilter.value;
    const selectedType = typeFilter.value;
    const selectedPrice = priceFilter.value;

    let visibleCount = 0;

    propertyCards.forEach(card => {

        const location = card.dataset.location;
        const type = card.dataset.type;
        const price = Number(card.dataset.price);

        const locationMatch =
            selectedLocation === "all" ||
            location === selectedLocation;

        const typeMatch =
            selectedType === "all" ||
            type === selectedType;

        const priceMatch =
            selectedPrice === "all" ||
            price <= Number(selectedPrice);

        if (locationMatch && typeMatch && priceMatch) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    if (visibleCount === 0) {
        noResults.classList.add("show");
    } else {
        noResults.classList.remove("show");
    }
}

searchBtn.addEventListener("click", () => {

    filterProperties();

    document.getElementById("properties").scrollIntoView({
        behavior: "smooth"
    });
});

locationFilter.addEventListener("change", filterProperties);
typeFilter.addEventListener("change", filterProperties);
priceFilter.addEventListener("change", filterProperties);


/* =========================================
   FAVORITES
========================================= */

const savedCount = document.getElementById("savedCount");
const favoriteButtons = document.querySelectorAll(".favorite-btn");

let savedProperties = JSON.parse(
    localStorage.getItem("nordicSavedProperties")
) || [];

function updateFavorites() {

    favoriteButtons.forEach(button => {

        const id = button.dataset.id;

        if (savedProperties.includes(id)) {
            button.classList.add("active");
            button.textContent = "♥";
        } else {
            button.classList.remove("active");
            button.textContent = "♡";
        }
    });

    savedCount.textContent = savedProperties.length;
}

favoriteButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.stopPropagation();

        const id = button.dataset.id;

        if (savedProperties.includes(id)) {

            savedProperties = savedProperties.filter(
                propertyId => propertyId !== id
            );

        } else {

            savedProperties.push(id);

        }

        localStorage.setItem(
            "nordicSavedProperties",
            JSON.stringify(savedProperties)
        );

        updateFavorites();
    });
});

updateFavorites();


/* =========================================
   PROPERTY MODAL
========================================= */

const modal = document.getElementById("propertyModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");
const modalTag = document.getElementById("modalTag");
const modalType = document.getElementById("modalType");
const modalTitle = document.getElementById("modalTitle");
const modalLocation = document.getElementById("modalLocation");
const modalPrice = document.getElementById("modalPrice");
const modalBeds = document.getElementById("modalBeds");
const modalBaths = document.getElementById("modalBaths");
const modalSize = document.getElementById("modalSize");
const modalContact = document.getElementById("modalContact");

const propertyData = {

    "1": {
        title: "Scandinavian Villa",
        type: "VILLA",
        location: "⌖ Limhamn, Malmö",
        price: "€1,250,000",
        beds: "4",
        baths: "3",
        size: "218 m²",
        tag: "FEATURED",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90"
    },

    "2": {
        title: "Skyline Residence",
        type: "PENTHOUSE",
        location: "⌖ Östermalm, Stockholm",
        price: "€2,850,000",
        beds: "3",
        baths: "2",
        size: "164 m²",
        tag: "NEW",
        image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=90"
    },

    "3": {
        title: "Harbour Residence",
        type: "APARTMENT",
        location: "⌖ Haga, Gothenburg",
        price: "€695,000",
        beds: "2",
        baths: "2",
        size: "92 m²",
        tag: "POPULAR",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90"
    },

    "4": {
        title: "The Garden House",
        type: "VILLA",
        location: "⌖ Sankt Lars, Lund",
        price: "€920,000",
        beds: "5",
        baths: "3",
        size: "241 m²",
        tag: "EXCLUSIVE",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=90"
    },

    "5": {
        title: "Nordic Loft",
        type: "APARTMENT",
        location: "⌖ Södermalm, Stockholm",
        price: "€485,000",
        beds: "1",
        baths: "1",
        size: "58 m²",
        tag: "JUST LISTED",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=90"
    },

    "6": {
        title: "Ocean View Penthouse",
        type: "PENTHOUSE",
        location: "⌖ Västra Hamnen, Malmö",
        price: "€1,590,000",
        beds: "3",
        baths: "2",
        size: "143 m²",
        tag: "PREMIUM",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=90"
    }
};

function openProperty(id) {

    const property = propertyData[id];

    if (!property) return;

    modalImage.src = property.image;
    modalTag.textContent = property.tag;
    modalType.textContent = property.type;
    modalTitle.textContent = property.title;
    modalLocation.textContent = property.location;
    modalPrice.textContent = property.price;
    modalBeds.textContent = property.beds;
    modalBaths.textContent = property.baths;
    modalSize.textContent = property.size;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeProperty() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
}

propertyCards.forEach(card => {

    card.addEventListener("click", () => {
        openProperty(card.dataset.id);
    });

});

modalClose.addEventListener("click", closeProperty);
modalBackdrop.addEventListener("click", closeProperty);

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeProperty();
    }

});


/* =========================================
   VIEWING BUTTON
========================================= */

modalContact.addEventListener("click", () => {

    closeProperty();

    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {
        document.getElementById("interest").value = "Buying a property";
    }, 700);
});


/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    formMessage.textContent =
        `Thanks ${name}! Your enquiry has been received. Our team will contact you shortly.`;

    formMessage.classList.add("show");

    contactForm.reset();

    setTimeout(() => {
        formMessage.classList.remove("show");
    }, 6000);
});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================
   NAVBAR SHADOW ON SCROLL
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 8px 30px rgba(0,0,0,0.07)";
    } else {
        navbar.style.boxShadow = "none";
    }

});


/* =========================================
   SMOOTH NAVIGATION
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });
    });

});


/* =========================================
   INITIAL PAGE LOAD
========================================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});