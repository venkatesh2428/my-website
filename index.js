javascript
/* =========================================================
   I-WIN STUDENT SUCCESS PROGRAMME
   index.js
   ========================================================= */


/* =========================
   DOM ELEMENTS
========================= */

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const currentYear = document.getElementById("currentYear");


/* =========================
   MOBILE MENU
========================= */

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navbar.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

            menuToggle.setAttribute(
                "aria-label",
                "Close Menu"
            );

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            menuToggle.setAttribute(
                "aria-label",
                "Open Menu"
            );

        }

    });

}


/* =========================
   CLOSE MOBILE MENU
   AFTER CLICKING LINK
========================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (navbar.classList.contains("active")) {

            navbar.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            menuToggle.setAttribute(
                "aria-label",
                "Open Menu"
            );

        }

    });

});


/* =========================
   HEADER SCROLL EFFECT
========================= */

function handleHeaderScroll() {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    handleHeaderScroll
);

handleHeaderScroll();


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll(
    "main section[id]"
);

function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 150;

    let currentSection = "home";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {

            currentSection = section.id;

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}


/* =========================
   SCROLL EVENT
========================= */

window.addEventListener(
    "scroll",
    updateActiveNavigation
);

window.addEventListener(
    "load",
    updateActiveNavigation
);


/* =========================
   SMOOTH SCROLL
========================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((anchor) => {

        anchor.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    header.offsetHeight;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


/* =========================
   CONTACT FORM
========================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const message =
                document.getElementById("message").value.trim();


            /* Basic Validation */

            if (!name || !email || !message) {

                showFormMessage(
                    "Please fill in all required fields.",
                    "error"
                );

                return;

            }


            /* Email Validation */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;

            }


            /* Success */

            showFormMessage(
                `Thank you, ${name}! Your message has been received.`,
                "success"
            );


            /* Clear Form */

            contactForm.reset();

        }
    );

}


/* =========================
   FORM MESSAGE
========================= */

function showFormMessage(
    message,
    type
) {

    if (!formMessage) {
        return;
    }

    formMessage.textContent = message;


    if (type === "success") {

        formMessage.style.color =
            "#0B9B91";

    } else {

        formMessage.style.color =
            "#D64545";

    }


    setTimeout(() => {

        formMessage.textContent = "";

    }, 5000);

}


/* =========================
   CURRENT YEAR
========================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================
   SCROLL REVEAL
========================= */

const animatedElements =
    document.querySelectorAll(
        ".pillar-card, " +
        ".journey-step, " +
        ".process-card, " +
        ".exam-card, " +
        ".trait, " +
        ".service-content, " +
        ".service-visual"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


animatedElements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform =
        "translateY(25px)";
    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    revealObserver.observe(element);

});


/* =========================
   REVEAL CLASS
========================= */

const revealStyle =
    document.createElement("style");

revealStyle.textContent = `

    .pillar-card.show,
    .journey-step.show,
    .process-card.show,
    .exam-card.show,
    .trait.show,
    .service-content.show,
    .service-visual.show {

        opacity: 1 !important;

        transform: translateY(0) !important;

    }

`;

document.head.appendChild(
    revealStyle
);


/* =========================
   STAGGER CARD ANIMATION
========================= */

const cardGroups = [
    ".pillar-card",
    ".process-card",
    ".exam-card",
    ".trait"
];


cardGroups.forEach((selector) => {

    const cards =
        document.querySelectorAll(selector);

    cards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 0.08}s`;

    });

});


/* =========================
   ESCAPE KEY
   CLOSE MOBILE MENU
========================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            navbar.classList.contains("active")
        ) {

            navbar.classList.remove("active");

            const icon =
                menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    }
);


/* =========================
   RESIZE HANDLER
========================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 850 &&
            navbar.classList.contains("active")
        ) {

            navbar.classList.remove("active");

            const icon =
                menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    }
);


/* =========================
   PAGE LOADED
========================= */

console.log(
    "I-WIN Student Success Programme loaded successfully."
);

