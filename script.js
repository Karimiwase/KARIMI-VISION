/* =========================================
   KARIMI VISION
   Main JavaScript
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");

if (menuButton && mobileNav) {

    menuButton.addEventListener("click", () => {

        const isOpen = mobileNav.classList.toggle("active");

        menuButton.classList.toggle("active", isOpen);

        menuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        document.body.style.overflow =
            isOpen ? "hidden" : "";

    });


    const mobileLinks =
        mobileNav.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("active");

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.style.overflow = "";

        });

    });

}


/* =========================================
   NAVBAR SCROLL
========================================= */

const nav = document.getElementById("nav");

function updateNavbar() {

    if (!nav) {
        return;
    }

    if (window.scrollY > 30) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }

}

window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);

updateNavbar();


/* =========================================
   SMOOTH ANCHOR LINKS
========================================= */

const anchorLinks =
    document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(link => {

    link.addEventListener("click", event => {

        const id =
            link.getAttribute("href");

        if (!id || id === "#") {
            return;
        }

        const target =
            document.querySelector(id);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================
   SCROLL REVEALS
========================================= */

const revealTargets = document.querySelectorAll(
    ".section-top, " +
    ".intro-layout, " +
    ".work-intro, " +
    ".project, " +
    ".statement, " +
    ".service, " +
    ".number-card, " +
    ".process-heading, " +
    ".process-item, " +
    ".contact-layout, " +
    ".footer-main"
);

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "reveal",
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.08
            }
        );


    revealTargets.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    revealTargets.forEach(element => {

        element.classList.add("visible");

    });

}


/* =========================================
   PROJECT HOVER PARALLAX
========================================= */

const projects =
    document.querySelectorAll(".project");

projects.forEach(project => {

    const visual =
        project.querySelector(".project-visual");

    if (!visual) {
        return;
    }


    project.addEventListener("mousemove", event => {

        if (window.innerWidth < 760) {
            return;
        }

        const rect =
            project.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width -
            0.5;

        const y =
            (event.clientY - rect.top) /
            rect.height -
            0.5;

        visual.style.transform =
            `translate(${x * 5}px, ${y * 5}px)`;

    });


    project.addEventListener("mouseleave", () => {

        visual.style.transform =
            "translate(0, 0)";

    });

});


/* =========================================
   NUMBER COUNTERS
========================================= */

const numberElements =
    document.querySelectorAll("[data-number]");


function animateNumber(element) {

    const target =
        Number(element.dataset.number);

    const duration = 1200;

    const start =
        performance.now();


    function frame(now) {

        const progress =
            Math.min(
                (now - start) / duration,
                1
            );


        const eased =
            1 - Math.pow(1 - progress, 3);


        const current =
            Math.floor(target * eased);


        element.textContent =
            String(current).padStart(2, "0");


        if (progress < 1) {

            requestAnimationFrame(frame);

        } else {

            element.textContent =
                String(target).padStart(2, "0");

        }

    }


    requestAnimationFrame(frame);

}


if (
    numberElements.length &&
    "IntersectionObserver" in window
) {

    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    animateNumber(entry.target);

                    counterObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.5
            }
        );


    numberElements.forEach(element => {

        counterObserver.observe(element);

    });

} else {

    numberElements.forEach(element => {

        element.textContent =
            String(
                Number(element.dataset.number)
            ).padStart(2, "0");

    });

}


/* =========================================
   COPY EMAIL
========================================= */

const copyEmail =
    document.getElementById("copyEmail");

if (copyEmail) {

    copyEmail.addEventListener(
        "click",
        async () => {

            const email =
                "wasekarimi10@gmail.com";

            const originalHTML =
                copyEmail.innerHTML;


            try {

                if (
                    navigator.clipboard &&
                    window.isSecureContext
                ) {

                    await navigator.clipboard
                        .writeText(email);

                } else {

                    const temporaryInput =
                        document.createElement("input");

                    temporaryInput.value =
                        email;

                    document.body.appendChild(
                        temporaryInput
                    );

                    temporaryInput.select();

                    document.execCommand("copy");

                    temporaryInput.remove();

                }


                copyEmail.innerHTML =
                    "<span>COPIED TO CLIPBOARD</span><b>✓</b>";


                setTimeout(() => {

                    copyEmail.innerHTML =
                        originalHTML;

                }, 2200);


            } catch (error) {

                window.prompt(
                    "Copy this email:",
                    email
                );

            }

        }
    );

}


/* =========================================
   WEB3FORMS CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");


if (contactForm) {

    const submitButton =
        contactForm.querySelector(
            ".submit-button"
        );


    const submitText =
        submitButton
            ? submitButton.querySelector(
                ".submit-text"
            )
            : null;


    const submitArrow =
        submitButton
            ? submitButton.querySelector(
                ".submit-arrow"
            )
            : null;


    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            if (!submitButton) {
                return;
            }


            /* -------------------------
               SAVE ORIGINAL STATE
            -------------------------- */

            const originalText =
                submitText
                    ? submitText.textContent
                    : "SEND INQUIRY";

            const originalArrow =
                submitArrow
                    ? submitArrow.textContent
                    : "↗";


            /* -------------------------
               LOADING STATE
            -------------------------- */

            submitButton.disabled = true;

            if (submitText) {
                submitText.textContent =
                    "SENDING...";
            }

            if (submitArrow) {
                submitArrow.textContent =
                    "…";
            }

            if (formStatus) {

                formStatus.className =
                    "form-status";

                formStatus.textContent =
                    "Sending your inquiry...";

            }


            try {

                /*
                    FormData automatically collects:
                    name
                    business
                    email
                    service
                    message
                    access_key
                    subject
                    etc.
                */

                const formData =
                    new FormData(contactForm);


                /*
                    Send to Web3Forms
                */

                const response =
                    await fetch(
                        "https://api.web3forms.com/submit",
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                const data =
                    await response.json();


                /* -------------------------
                   SUCCESS
                -------------------------- */

                if (
                    response.ok &&
                    data.success
                ) {

                    if (submitText) {
                        submitText.textContent =
                            "INQUIRY SENT";
                    }

                    if (submitArrow) {
                        submitArrow.textContent =
                            "✓";
                    }


                    if (formStatus) {

                        formStatus.className =
                            "form-status success";

                        formStatus.textContent =
                            "Your inquiry was sent successfully. I'll get back to you by email.";

                    }


                    contactForm.reset();


                    /*
                        Return button to normal
                        after a few seconds.
                    */

                    setTimeout(() => {

                        if (submitText) {
                            submitText.textContent =
                                originalText;
                        }

                        if (submitArrow) {
                            submitArrow.textContent =
                                originalArrow;
                        }

                        submitButton.disabled =
                            false;

                    }, 4000);


                } else {

                    throw new Error(
                        data.message ||
                        "Web3Forms could not process the request."
                    );

                }


            } catch (error) {

                console.error(
                    "KARIMI VISION form error:",
                    error
                );


                /* -------------------------
                   ERROR STATE
                -------------------------- */

                if (submitText) {
                    submitText.textContent =
                        "TRY AGAIN";
                }

                if (submitArrow) {
                    submitArrow.textContent =
                        "↗";
                }


                if (formStatus) {

                    formStatus.className =
                        "form-status error";

                    formStatus.textContent =
                        "Something went wrong. Please try again or email wasekarimi95@gmail.com directly.";

                }


                submitButton.disabled =
                    false;


                setTimeout(() => {

                    if (submitText) {
                        submitText.textContent =
                            originalText;
                    }

                    if (submitArrow) {
                        submitArrow.textContent =
                            originalArrow;
                    }

                }, 3000);

            }

        }
    );

}


/* =========================================
   ESCAPE KEY — CLOSE MOBILE MENU
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            mobileNav &&
            mobileNav.classList.contains("active")
        ) {

            mobileNav.classList.remove(
                "active"
            );

            if (menuButton) {

                menuButton.classList.remove(
                    "active"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

            document.body.style.overflow = "";

        }

    }
);