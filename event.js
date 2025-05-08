
    document.addEventListener("DOMContentLoaded", function () {
    // Toggle filter sections
    const toggleSections = ["audience", "type", "time", "location", "price"];
    toggleSections.forEach((section) => {
    const toggleBtn = document.getElementById(`${section}-toggle`);
    const filterSection = document.getElementById(`${section}-filters`);
    toggleBtn.addEventListener("click", function () {
    const icon = this.querySelector("i");
    if (filterSection.style.display === "none") {
    filterSection.style.display = "block";
    icon.classList.remove("ri-arrow-right-s-line");
    icon.classList.add("ri-arrow-down-s-line");
} else {
    filterSection.style.display = "none";
    icon.classList.remove("ri-arrow-down-s-line");
    icon.classList.add("ri-arrow-right-s-line");
}
});
});
    // Handle filter selection and active filters display
    const activeFiltersContainer = document.getElementById(
    "active-filters-container",
    );
    const activeFilters = document.getElementById("active-filters");
    const clearAllBtn = document.getElementById("clear-all");
    // Track selected filters
    let selectedFilters = {
    audience: [],
    type: [],
    time: null,
    location: [],
    price: [],
};
    // Function to update active filters display
    function updateActiveFilters() {
    // Clear current filters
    activeFilters.innerHTML = "";
    // Count total active filters
    let totalFilters = 0;
    // Add audience filters
    selectedFilters.audience.forEach((filter) => {
    addFilterTag("audience", filter);
    totalFilters++;
});
    // Add type filters
    selectedFilters.type.forEach((filter) => {
    addFilterTag("type", filter);
    totalFilters++;
});
    // Add time filter
    if (selectedFilters.time) {
    addFilterTag("time", selectedFilters.time);
    totalFilters++;
}
    // Add location filters
    selectedFilters.location.forEach((filter) => {
    addFilterTag("location", filter);
    totalFilters++;
});
    // Add price filters
    selectedFilters.price.forEach((filter) => {
    addFilterTag("price", filter);
    totalFilters++;
});
    // Show/hide active filters container
    if (totalFilters > 0) {
    activeFiltersContainer.classList.remove("hidden");
} else {
    activeFiltersContainer.classList.add("hidden");
}
    // Update visible events based on filters
    updateVisibleEvents();
}
        function updateVisibleEvents() {
            const eventCards = document.querySelectorAll(".event-card");
            let filteredEvents = [];

            const now = new Date();
            const thisWeek = new Date(now);
            thisWeek.setDate(now.getDate() + 7);

            eventCards.forEach((card) => {
                let shouldShow = true;

                const type = card.dataset.type?.trim();
                const audience = card.dataset.audience?.split(',').map(a => a.trim()) || [];
                const location = card.dataset.location?.trim();
                const price = card.dataset.price?.trim();
                const eventDate = card.dataset.date ? new Date(card.dataset.date) : null;

                // ✅ تحديث عرض التاريخ والساعة داخل البطاقة
                const dateElement = card.querySelector(".event-date");
                if (eventDate && dateElement) {
                    const options = { dateStyle: "medium", timeStyle: "short" };
                    dateElement.textContent = eventDate.toLocaleString("en-US", options);
                }

                const { type: fType, audience: fAudience, location: fLocation, price: fPrice, time: fTime } = selectedFilters;

                // فلتر النوع
                if (fType.length > 0 && !fType.includes(type)) shouldShow = false;

                // فلتر الجمهور
                if (fAudience.length > 0) {
                    const match = fAudience.some(a => audience.includes(a));
                    if (!match) shouldShow = false;
                }

                // فلتر الموقع
                if (fLocation.length > 0 && !fLocation.includes(location)) shouldShow = false;

                // فلتر السعر
                if (fPrice.length > 0 && !fPrice.includes(price)) shouldShow = false;

                // فلتر الوقت
                if (fTime && eventDate) {
                    const sameDay = eventDate.getDate() === now.getDate()
                        && eventDate.getMonth() === now.getMonth()
                        && eventDate.getFullYear() === now.getFullYear();

                    const sameMonth = eventDate.getMonth() === now.getMonth()
                        && eventDate.getFullYear() === now.getFullYear();

                    if (fTime === "Today" && !sameDay) shouldShow = false;
                    if (fTime === "This Week" && eventDate > thisWeek) shouldShow = false;
                    if (fTime === "This Month" && !sameMonth) shouldShow = false;
                }

                if (shouldShow) filteredEvents.push(card);
            });


            // ✅ إظهار النتائج
            eventCards.forEach(card => card.style.display = "none");
            filteredEvents.forEach(card => card.style.display = "block");

            // ✅ تحديث العداد
            document.getElementById("event-count").textContent = filteredEvents.length;
        }


        document.getElementById("sort-by").addEventListener("change", updateVisibleEvents);


        // Function to add a filter tag
    function addFilterTag(category, value) {
    const tag = document.createElement("div");
    tag.className =
    "filter-tag bg-gray-100 rounded-full py-1 px-3 text-sm text-gray-700 flex items-center";
    tag.innerHTML = `
      <span class="mr-1">${category}: ${value}</span>
      <div class="w-4 h-4 flex items-center justify-center cursor-pointer" data-category="${category}" data-value="${value}">
      <i class="ri-close-line"></i>
      </div>
      `;
    // Add click event to remove tag
    tag.querySelector("div").addEventListener("click", function () {
    removeFilter(this.dataset.category, this.dataset.value);
});
    activeFilters.appendChild(tag);
}
    // Function to remove a filter
    function removeFilter(category, value) {
    if (category === "time") {
    selectedFilters.time = null;
    document.querySelectorAll('input[name="time"]').forEach((radio) => {
    radio.checked = false;
});
} else {
    selectedFilters[category] = selectedFilters[category].filter(
    (item) => item !== value,
    );
    // Uncheck the corresponding checkbox
    const checkbox = document.getElementById(
    value.toLowerCase().replace(/\s+/g, "-"),
    );
    if (checkbox) {
    checkbox.checked = false;
}
}
    updateActiveFilters();
}
    // Handle audience filter checkboxes
    document.querySelectorAll(".audience-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
    if (this.checked) {
    selectedFilters.audience.push(this.value);
} else {
    selectedFilters.audience = selectedFilters.audience.filter(
    (item) => item !== this.value,
    );
}
    updateActiveFilters();
});
});


    // Handle type filter checkboxes
    document.querySelectorAll(".type-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
    if (this.checked) {
    selectedFilters.type.push(this.value);
} else {
    selectedFilters.type = selectedFilters.type.filter(
    (item) => item !== this.value,
    );
}
    updateActiveFilters();
});
});
    // Handle time filter radio buttons
    document.querySelectorAll(".time-radio").forEach((radio) => {
    radio.addEventListener("change", function () {
    selectedFilters.time = this.value;
    updateActiveFilters();
});


    });
    // Handle location filter checkboxes
    document.querySelectorAll(".location-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
    if (this.checked) {
    selectedFilters.location.push(this.value);
} else {
    selectedFilters.location = selectedFilters.location.filter(
    (item) => item !== this.value,
    );
}
    updateActiveFilters();
});
});
    // Handle price filter checkboxes
    document.querySelectorAll(".price-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
    if (this.checked) {
    selectedFilters.price.push(this.value);
} else {
    selectedFilters.price = selectedFilters.price.filter(
    (item) => item !== this.value,
    );
}
    updateActiveFilters();
});
});
    // Handle clear all button
    clearAllBtn.addEventListener("click", function () {
    // Reset all filters
    selectedFilters = {
    audience: [],
    type: [],
    time: null,
    location: [],
    price: [],
};
    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
});
    // Uncheck all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.checked = false;
});
    updateActiveFilters();
});
    // Location search functionality
    const locationSearch = document.getElementById("location-search");
    const locationCheckboxes = document.querySelectorAll(".location-checkbox");
    locationSearch.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    locationCheckboxes.forEach((checkbox) => {
    const label = checkbox.nextElementSibling;
    const locationName = label.textContent.toLowerCase();
    if (locationName.includes(searchTerm)) {
    checkbox.parentElement.style.display = "flex";
} else {
    checkbox.parentElement.style.display = "none";
}
});
});
    // Sort dropdown functionality
    const sortDropdown = document.getElementById("sort-by");
    sortDropdown.addEventListener("change", function () {
    // In a real application, this would trigger a re-fetch or re-sort of the events
    console.log("Sort by:", this.value);
});
});



    tailwind.config = {
        theme: {
            extend: {
                colors: { primary: "#004047", secondary: "" },
                borderRadius: {
                    none: "0px",
                    sm: "4px",
                    DEFAULT: "8px",
                    md: "12px",
                    lg: "16px",
                    xl: "20px",
                    "2xl": "24px",
                    "3xl": "32px",
                    full: "9999px",
                    button: "8px",
                },
            },
        },
    };
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













    let currentSlide = 0;
    let autoSlideInterval;

    function openModal(mainImage, title, date, location, description, galleryImages = []) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDate').textContent = date;
        document.getElementById('modalLocation').textContent = location;
        document.getElementById('modalDescription').textContent = description;

        const track = document.getElementById('sliderTrack');
        track.innerHTML = '';
        galleryImages.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.className = "w-full h-64 object-cover flex-shrink-0";
            track.appendChild(img);
        });

        currentSlide = 0;
        updateSlider();

        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => nextSlide(), 3000);

        document.getElementById('eventModal').classList.remove('hidden');
    }

    function closeModal() {
        clearInterval(autoSlideInterval);
        document.getElementById('eventModal').classList.add('hidden');
    }

    function updateSlider() {
        const track = document.getElementById('sliderTrack');
        const offset = currentSlide * track.offsetWidth;
        track.style.transform = `translateX(-${offset}px)`;
    }

    function nextSlide() {
        const track = document.getElementById('sliderTrack');
        const slides = track.children.length;
        currentSlide = (currentSlide + 1) % slides;
        updateSlider();
    }

    function prevSlide() {
        const track = document.getElementById('sliderTrack');
        const slides = track.children.length;
        currentSlide = (currentSlide - 1 + slides) % slides;
        updateSlider();
    }

    window.addEventListener('resize', updateSlider);
