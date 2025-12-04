// Scroll reveal animation
const sections = document.querySelectorAll(".fade-in");

function revealOnScroll() {
    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 120) {
            sec.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Scroll to buy section
function scrollToBuy() {
    document.getElementById("buy").scrollIntoView({ behavior: "smooth" });
}
