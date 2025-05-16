
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
    const bars = document.querySelector(".bar"),
        close = document.querySelector(".close"),
        menu = document.querySelector(".menu");

    bars.addEventListener("click", () => {
        menu.classList.add("active");
        gsap.from(".menu", {
            opacity: 0,
            duration: .3
        })

        gsap.from(".menu ul", {
            opacity: 0,
            x: -300
        })
    });

    close.addEventListener("click", () => {
        menu.classList.remove("active")
    });

    function animateContent(selector) {
        selector.forEach((selector) => {
            gsap.to(selector, {
                y: 30,
                duration: 0.1,
                opacity: 1,
                delay: 0.2,
                stagger: 0.2,
                ease: "power2.out",
            });
        });
    }

    function scrollTirggerAnimation(triggerSelector, boxSelectors) {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: triggerSelector,
                start: "top 50%",
                end: "top 80%",
                scrub: 1,
            },
        });

        boxSelectors.forEach((boxSelector) => {
            timeline.to(boxSelector, {
                y: 0,
                duration: 1,
                opacity: 1,
            });
        })
    }

    function swipeAnimation(triggerSelector, boxSelectors) {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: triggerSelector,
                start: "top 50%",
                end: "top 100%",
                scrub: 3,
            },
        });

        boxSelectors.forEach((boxSelector) => {
            timeline.to(boxSelector, {
                x: 0,
                duration: 1,
                opacity:1,
            });
        });
    }

    function galleryAnimation(triggerSelector, boxSelectors) {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: triggerSelector,
                start: "top 100%",
                end: "bottom 100%",
                scrub: 1,
            },
        });

        boxSelectors.forEach((boxSelector) => {
            timeline.to(boxSelector, {
                y: 0,
                opacity: 1,
                duration: 1,
            });
        });
    }




    animateContent([".home .content h5, .home .content h1, .home .content p, .home .content .search"]);

    scrollTirggerAnimation(".travel", [".travel .box1", ".travel .box2", ".travel .box3"]);

    scrollTirggerAnimation(".feedback .container", [".feedback .label", ".feedback .heading", ".feedback .paragraph"]);

    scrollTirggerAnimation(".article", [".article .label", ".article .heading"]);

    swipeAnimation(".destinations", [".destinations .heading", ".destinations .content"])

    swipeAnimation(".article", [".article .latest-article", ".article .box1", ".article .box2", ".article .box3", ".article .box4"])

    galleryAnimation(".destinations .gallery", [".destinations .gallery .box1",".destinations .gallery .box2",".destinations .gallery .box3",".destinations .gallery .box4",".destinations .gallery .box5"])

    galleryAnimation(".featured .gallery", [".featured .gallery .box1",".featured .gallery .box2",".featured .gallery .box3",".featured .gallery .box4"])

    galleryAnimation(".feedback .voices", [".feedback .voices .box1",".feedback .voices .box2",".feedback .voices .box3",".feedback .voices .box4",".feedback .voices .box5",".feedback .voices .box6"])

    function updateStatus(id, status) {
        fetch('update_status.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `id=${id}&status=${status}`
        })
            .then(resp => resp.json())
            .then(json => {
                if (json.success) {
                    alert(`Event ${status}`);
                    loadEvents();
                } else {
                    alert('Error: ' + json.error);
                }
            });
    }
