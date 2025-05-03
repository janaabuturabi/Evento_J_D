
    function animateCountUp(el, target, duration = 1500) {
    let start = 0;
    const isDecimal = target % 1 !== 0;
    const end = parseFloat(target);
    const stepTime = Math.max(Math.floor(duration / end), 15);
    const increment = end / (duration / stepTime);

    const counter = setInterval(() => {
    start += increment;
    if (start >= end) {
    el.textContent = isDecimal ? end.toFixed(1) : Math.round(end);
    clearInterval(counter);
} else {
    el.textContent = isDecimal ? start.toFixed(1) : Math.round(start);
}
}, stepTime);
}

    document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".count-up");
    const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
    const el = entry.target;
    const target = el.getAttribute("data-target");
    animateCountUp(el, target);
    observer.unobserve(el); // Animate once only
}
});
}, { threshold: 0.6 });

    counters.forEach(counter => observer.observe(counter));
});
    document.addEventListener('DOMContentLoaded', function() {
// Reveal on scroll
        function reveal() {
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }
        window.addEventListener('scroll', reveal);
        reveal();
// Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    });
