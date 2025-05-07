document.addEventListener("DOMContentLoaded", function () {
    // Attendee slider
    const attendeeSlider = document.getElementById("attendee-limit");
    const attendeeValue = document.getElementById("attendee-value");

    attendeeSlider.addEventListener("input", function () {
        attendeeValue.textContent = this.value;
        document
            .querySelector("#preview-title")
            .nextElementSibling.nextElementSibling.nextElementSibling.querySelector(
            "span",
        ).textContent = this.value + " attendees max";
    });

    // Price toggle
    const priceToggle = document.getElementById("price-toggle");
    const priceInputContainer = document.getElementById("price-input-container");

    priceToggle.addEventListener("change", function () {
        if (this.checked) {
            priceInputContainer.classList.remove("hidden");
        } else {
            priceInputContainer.classList.add("hidden");
        }
    });

    // Event name preview update
    const eventNameInput = document.getElementById("event-name");
    eventNameInput.addEventListener("input", function () {
        document.getElementById("preview-title").textContent =
            this.value || "Summer Music Festival";
    });

    // Event description preview update
    const eventDescriptionInput = document.getElementById("event-description");
    eventDescriptionInput.addEventListener("input", function () {
        document.getElementById("preview-description").textContent =
            this.value ||
            "Join us for an unforgettable night of music featuring top artists and bands. Food, drinks, and amazing atmosphere guaranteed!";
    });

    // Event date preview update
    const eventDateInput = document.getElementById("event-date");
    const eventTimeInput = document.getElementById("event-time");

    function updateDatePreview() {
        const date = eventDateInput.value
            ? new Date(eventDateInput.value)
            : new Date("2025-05-15");
        const time = eventTimeInput.value || "19:00";

        const options = { month: "short", day: "numeric", year: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);

        // Convert 24h time to 12h format
        let [hours, minutes] = time.split(":");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;

        document.getElementById("preview-date").textContent =
            `${formattedDate} • ${hours}:${minutes} ${ampm}`;
    }

    eventDateInput.addEventListener("change", updateDatePreview);
    eventTimeInput.addEventListener("change", updateDatePreview);

    // Address preview update
    const addressInput = document.getElementById("event-address");
    addressInput.addEventListener("input", function () {
        document.getElementById("preview-location").textContent =
            this.value || "Central Park, New York";
    });

    // Image upload preview
    const imageUploadButton = document.querySelector(".border-dashed");
    const imageUploadInput = document.getElementById("image-upload");
    const imagePreviewContainer = document.getElementById(
        "image-preview-container",
    );

    imageUploadButton.addEventListener("click", function () {
        imageUploadInput.click();
    });

    imageUploadInput.addEventListener("change", function () {
        if (this.files.length > 0) {
            imagePreviewContainer.classList.remove("hidden");
        }
    });

    // Event type selection
    const eventTypeButtons = document.querySelectorAll(".tab-button");
    eventTypeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            eventTypeButtons.forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");

            // Update preview
            const previewTags = document.querySelector(
                "#preview-description",
            ).nextElementSibling;
            const firstTag = previewTags.firstElementChild;
            firstTag.textContent = this.textContent.trim();
        });
    });

    // Feature tags selection
    const featureTags = document.querySelectorAll(".feature-tag");
    featureTags.forEach((tag) => {
        tag.addEventListener("click", function () {
            this.classList.toggle("selected");
        });
    });

    // Add custom feature
    const addFeatureButton = document.getElementById("add-feature");
    const customFeatureInput = document.getElementById("custom-feature");
    const featuresContainer = document.getElementById("features-container");

    addFeatureButton.addEventListener("click", function () {
        const featureText = customFeatureInput.value.trim();
        if (featureText) {
            const newFeature = document.createElement("div");
            newFeature.className =
                "feature-tag px-4 py-2 rounded-full border border-gray-300 text-sm font-medium cursor-pointer hover:border-primary transition";
            newFeature.textContent = featureText;
            newFeature.addEventListener("click", function () {
                this.classList.toggle("selected");
            });
            featuresContainer.appendChild(newFeature);
            customFeatureInput.value = "";
        }
    });

    // Show image preview by default
    imagePreviewContainer.classList.remove("hidden");
});