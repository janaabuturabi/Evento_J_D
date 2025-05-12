
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
                const price = parseFloat(card.dataset.price?.trim()) || 0;  // تحويل السعر إلى قيمة رقمية
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
                if (fPrice.length > 0) {
                    if (fPrice.includes("Free") && price > 0) shouldShow = false;  // فلتر للأحداث المجانية فقط
                    if (fPrice.includes("Paid") && price === 0) shouldShow = false;  // فلتر للأحداث المدفوعة فقط
                }
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
                const value = this.value;
                if (this.checked) {
                    selectedFilters.price.push(value);
                } else {
                    selectedFilters.price = selectedFilters.price.filter(
                        (item) => item !== value,
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

    const eventData = {
        event1: {
            title: "Java programming course",
            date: "May 24, 2025",
            time: "3:30 PM",
            location: "Bethlehem",
            price: "₪ 20 ILS",
            organizer: "An-Najah University",
            contact: "info@najah.edu | +970 59 987 6543",
            type: "Educational",
            audience: "For Adults",
            status: "20",
            description: "Learn Java programming, covering the basics of object-oriented programming and more.",
            images: ["IMAGE/programming3.jpg", "IMAGE/programming2.jpg", "IMAGE/programming1.jpg"] // Multiple images
        },
        event2: {
            title: "Group drawing",
            date: "May 8, 2025",
            time: "3:30 PM",
            location: "An-Najah National University, Nablus",
            price: "₪ 30 ILS",
            organizer: "An-Najah University",
            contact: "info@najah.edu | +970 59 987 6543",
            type: "Entertainment",
            audience: "For Kids, For Families",
            status: "40",
            description: "An interactive art workshop for kids and families to explore creativity.",
            images: ["IMAGE/arts.jpg", "IMAGE/Group drawing2.jpg"] // Multiple images
        },
        event3: {
            title: "Plant Care",
            date: "May 7, 2025",
            time: "3:30 PM",
            location: "Jenin",
            price: "₪ 40 ILS",
            organizer: "Jenin University",
            contact: "info@jenin.edu | +970 59 987 6543",
            type: "Entertainment",
            audience: "For Kids, For Families, For Adults, For Seniors",
            status: "40",
            description: "A workshop focused on taking care of plants and understanding their growth.",
            images: ["IMAGE/Plant Care2.jpg", "IMAGE/Plant Care1.jpg", "IMAGE/Plant Care3.jpg"] // Multiple images
        },
        event4: {
            title: "exhibition",
            date: "May 30, 2025",
            time: "3:30 PM",
            location: "Ramallah",
            price: "Free",
            organizer: "exhibition",
            contact: "Cultural@com | +970 59 987 6543",
            type: "Cultural",
            audience: "For Adults",
            status: "",
            description: "An exhibition is a public display of art, products, or information, aimed at educating, entertaining, or promoting engagement.",
            images: ["IMAGE/exhibition1.jpg"] // Multiple images
        }
    };

    function openModal(eventId) {
        const modal = document.getElementById('eventModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        const event = eventData[eventId];

        if (event) {
            modalTitle.textContent = event.title;
            let statusClass = '';
            if (event.status === 'Pending') statusClass = 'status-pending';
            else if (event.status === 'Approved') statusClass = 'status-approved';
            else if (event.status === 'Rejected') statusClass = 'status-rejected';

            // Create carousel images
            const imageElements = event.images.map((image, index) => {
                return `<img src="${image}" alt="${event.title}" class="carousel-image w-full h-60 object-cover ${index === 0 ? '' : 'hidden'}" data-index="${index}" />`;
            }).join("");

            modalContent.innerHTML = `
            <div class="relative mb-4 rounded overflow-hidden">
                <div class="carousel-container relative">
                    <button class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-500 text-white px-3 py-2" onclick="changeImage(${eventId}, -1)">
                        &lt;
                    </button>
                    <div class="carousel-images">
                        ${imageElements}
                    </div>
                    <button class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-500 text-white px-3 py-2" onclick="changeImage(${eventId}, 1)">
                        &gt;
                    </button>
                </div>
                <div class="absolute top-4 right-4">
                    <span class="px-3 py-1.5 text-sm font-medium rounded-full ${statusClass}">${event.status}</span>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="md:col-span-2">
                    <h3 class="font-medium text-gray-900 mb-3">Event Description</h3>
                    <p class="text-gray-700 mb-4">${event.description}</p>
                    <h3 class="font-medium text-gray-900 mb-3">Organizer Information</h3>
                    <p class="text-gray-700 mb-1"><span class="font-medium">Organizer:</span> ${event.organizer}</p>
                    <p class="text-gray-700 mb-4"><span class="font-medium">Contact:</span> ${event.contact}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded">
                    <h3 class="font-medium text-gray-900 mb-3">Event Details</h3>
                    <div class="space-y-3">
                        <div class="flex">
                            <div class="w-5 h-5 flex items-center justify-center mr-2 text-primary">
                                <i class="ri-calendar-line"></i>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-700">Date</p>
                                <p class="text-sm text-gray-600">${event.date}</p>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="w-5 h-5 flex items-center justify-center mr-2 text-primary">
                                <i class="ri-time-line"></i>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-700">Time</p>
                                <p class="text-sm text-gray-600">${event.time}</p>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="w-5 h-5 flex items-center justify-center mr-2 text-primary">
                                <i class="ri-map-pin-line"></i>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-700">Location</p>
                                <p class="text-sm text-gray-600">${event.location}</p>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="w-5 h-5 flex items-center justify-center mr-2 text-primary">
                                <i class="ri-money-dollar-circle-line"></i>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-700">Price</p>
                                <p class="text-sm text-gray-600">${event.price}</p>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="w-5 h-5 flex items-center justify-center mr-2 text-primary">
                                <i class="ri-group-line"></i>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-700">Audience</p>
                                <p class="text-sm text-gray-600">${event.audience}</p>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="w-5 h-5 flex items-center justify-center mr-2 text-primary">
                                <i class="ri-price-tag-3-line"></i>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-700">Event Type</p>
                                <p class="text-sm text-gray-600">${event.type}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        }

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function changeImage(eventId, direction) {
        const event = eventData[eventId];
        const images = document.querySelectorAll('.carousel-images .carousel-image');
        let currentIndex = Array.from(images).findIndex(image => !image.classList.contains('hidden'));

        // Update currentIndex based on direction
        currentIndex += direction;

        if (currentIndex < 0) currentIndex = images.length - 1; // Loop to the last image
        if (currentIndex >= images.length) currentIndex = 0;   // Loop to the first image

        // Hide all images
        images.forEach(image => image.classList.add('hidden'));

        // Show the new image
        images[currentIndex].classList.remove('hidden');
    }

    function closeModal() {
        const modal = document.getElementById('eventModal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    document.addEventListener('DOMContentLoaded', function() {
        const modal = document.getElementById('eventModal');
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    });


