
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

    eventCards.forEach((card) => {
    let shouldShow = true;

    const category = card.querySelector(".absolute.top-2.right-2")?.textContent?.trim();
    const location = card.querySelector(".ri-map-pin-line")?.parentElement?.textContent?.trim();
    const priceText = card.querySelector(".text-sm.font-medium.text-gray-900")?.textContent?.trim();
    const isFree = priceText === "Free";
    const audience = card.dataset.audience?.split(',') || [];

    const dateText = card.querySelector(".ri-calendar-line")?.parentElement?.textContent?.trim();
    const eventDate = new Date(dateText?.match(/\w+\s\d{1,2},\s\d{4}/)?.[0] || ""); // try parse date

    const today = new Date();
    const timeFilter = selectedFilters.time;

    // Type filter
    if (selectedFilters.type.length > 0 && !selectedFilters.type.includes(category)) {
    shouldShow = false;
}

    // Price filter
    if (selectedFilters.price.length > 0) {
    const matchFree = selectedFilters.price.includes("Free") && isFree;
    const matchPaid = selectedFilters.price.includes("Paid") && !isFree;
    if (!(matchFree || matchPaid)) shouldShow = false;
}

    // Location filter
    if (selectedFilters.location.length > 0) {
    const matched = selectedFilters.location.some(loc => location?.includes(loc));
    if (!matched) shouldShow = false;
}

    // Audience filter
    if (selectedFilters.audience.length > 0) {
    const hasAudience = selectedFilters.audience.some(a => audience.includes(a));
    if (!hasAudience) shouldShow = false;
}

    // Time filter
    if (timeFilter) {
    const eventDay = eventDate.getDate(), eventMonth = eventDate.getMonth(), eventYear = eventDate.getFullYear();
    const now = new Date();
    const thisWeek = new Date(now);
    thisWeek.setDate(now.getDate() + 7);

    if (timeFilter === "Today" && (
    eventDay !== now.getDate() || eventMonth !== now.getMonth() || eventYear !== now.getFullYear()
    )) shouldShow = false;

    if (timeFilter === "This Week" && eventDate > thisWeek) shouldShow = false;

    if (timeFilter === "This Month" && eventMonth !== now.getMonth()) shouldShow = false;
}

    if (shouldShow) filteredEvents.push(card);
});

    // Sort based on dropdown
    const sortOption = document.getElementById("sort-by").value;
    filteredEvents.sort((a, b) => {
    const getDate = card => new Date(card.querySelector(".ri-calendar-line")?.parentElement?.textContent?.trim().match(/\w+\s\d{1,2},\s\d{4}/)?.[0] || "");
    const getPrice = card => {
    const price = card.querySelector(".text-sm.font-medium.text-gray-900")?.textContent?.trim();
    return price === "Free" ? 0 : parseFloat(price.replace("$", ""));
};
    const getRating = card => parseFloat(card.querySelector(".ri-star-fill")?.parentElement?.textContent?.trim().split(" ")[0] || "0");
    const getReviews = card => parseInt(card.querySelector(".ri-star-fill")?.parentElement?.textContent?.match(/\((\d+)/)?.[1] || "0");

    switch (sortOption) {
    case "newest": return getDate(b) - getDate(a);
    case "oldest": return getDate(a) - getDate(b);
    case "price-low": return getPrice(a) - getPrice(b);
    case "price-high": return getPrice(b) - getPrice(a);
    case "rating": return getRating(b) - getRating(a);
    case "popular": return getReviews(b) - getReviews(a);
    default: return 0;
}
});

    // Apply display logic
    eventCards.forEach(card => card.style.display = "none");
    filteredEvents.forEach(card => card.style.display = "block");

    // Update counter
    document.getElementById("event-count").textContent = filteredEvents.length;
}

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

        // Sort dropdown functionality
        const sortDropdown = document.getElementById("sort-by");
        sortDropdown.addEventListener("change", function () {
            updateActiveFilters(); // يعيد تصفية وترتيب الأحداث حسب الخيار المحدد
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