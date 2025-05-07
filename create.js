document.addEventListener('DOMContentLoaded', function() {
    // Attendee slider
    const attendeeSlider = document.getElementById('attendee-limit');
    const attendeeValue = document.getElementById('attendee-value');

    attendeeSlider.addEventListener('input', function() {
        attendeeValue.textContent = this.value;
        document.querySelector('#preview-title').nextElementSibling.nextElementSibling.nextElementSibling.querySelector('span').textContent = this.value + ' attendees max';
    });

    // Price toggle
    const priceToggle = document.getElementById('price-toggle');
    const priceInputContainer = document.getElementById('price-input-container');

    priceToggle.addEventListener('change', function() {
        if (this.checked) {
            priceInputContainer.classList.remove('hidden');
        } else {
            priceInputContainer.classList.add('hidden');
        }
    });

    // Event name preview update
    const eventNameInput = document.getElementById('event-name');
    eventNameInput.addEventListener('input', function() {
        document.getElementById('preview-title').textContent = this.value || 'Summer Music Festival';
    });

    // Event description preview update
    const eventDescriptionInput = document.getElementById('event-description');
    eventDescriptionInput.addEventListener('input', function() {
        document.getElementById('preview-description').textContent = this.value || 'Join us for an unforgettable night of music featuring top artists and bands. Food, drinks, and amazing atmosphere guaranteed!';
    });

    // Event date preview update
    const eventDateInput = document.getElementById('event-date');
    const eventTimeInput = document.getElementById('event-time');

    function updateDatePreview() {
        const date = eventDateInput.value ? new Date(eventDateInput.value) : new Date('2025-05-15');
        const time = eventTimeInput.value || '19:00';

        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        // Convert 24h time to 12h format
        let [hours, minutes] = time.split(':');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        document.getElementById('preview-date').textContent = `${formattedDate} • ${hours}:${minutes} ${ampm}`;
    }

    eventDateInput.addEventListener('change', updateDatePreview);
    eventTimeInput.addEventListener('change', updateDatePreview);

    // Address preview update
    const addressInput = document.getElementById('event-address');
    addressInput.addEventListener('input', function() {
        document.getElementById('preview-location').textContent = this.value || 'Central Park, New York';
    });

    // Image upload preview
    const imageUploadButton = document.querySelector('.border-dashed');
    const imageUploadInput = document.getElementById('image-upload');
    const imagePreviewContainer = document.getElementById('image-preview-container');

    imageUploadButton.addEventListener('click', function() {
        imageUploadInput.click();
    });

    imageUploadInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            imagePreviewContainer.classList.remove('hidden');
        }
    });

    // Event type selection
    const eventTypeButtons = document.querySelectorAll('.tab-button');
    eventTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            eventTypeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update preview
            const previewTags = document.querySelector('#preview-description').nextElementSibling;
            const firstTag = previewTags.firstElementChild;
            firstTag.textContent = this.textContent.trim();
        });
    });

    // Feature tags selection
    const featureTags = document.querySelectorAll('.feature-tag');
    featureTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });

    // Add custom feature
    const addFeatureButton = document.getElementById('add-feature');
    const customFeatureInput = document.getElementById('custom-feature');
    const featuresContainer = document.getElementById('features-container');

    addFeatureButton.addEventListener('click', function() {
        const featureText = customFeatureInput.value.trim();
        if (featureText) {
            const newFeature = document.createElement('div');
            newFeature.className = 'feature-tag px-4 py-2 rounded-full border border-gray-300 text-sm font-medium cursor-pointer hover:border-primary transition';
            newFeature.textContent = featureText;
            newFeature.addEventListener('click', function() {
                this.classList.toggle('selected');
            });
            featuresContainer.appendChild(newFeature);
            customFeatureInput.value = '';
        }
    });

    // Show image preview by default
    imagePreviewContainer.classList.remove('hidden');
});

document.getElementById('image-upload').addEventListener('change', function(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('image-preview-container');
    const uploadedImages = document.getElementById('uploaded-images');

    // تأكد من وجود ملفات
    if (files.length > 0) {
        previewContainer.classList.remove('hidden'); // إظهار قسم الصور المحملة

        // تفريغ الحاوية أولاً
        uploadedImages.innerHTML = '';

        // التكرار عبر الصور وعرضها
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgWrapper = document.createElement('div');
                imgWrapper.classList.add('relative', 'w-32', 'h-32');

                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                imgElement.alt = file.name;
                imgElement.classList.add('w-full', 'h-full', 'object-cover', 'rounded-lg', 'shadow-sm');

                // إضافة زر "إكس" لإغلاق الصورة
                const closeButton = document.createElement('button');
                closeButton.innerHTML = '×';
                closeButton.classList.add('absolute', 'top-0', 'right-0', 'bg-white', 'text-gray-500', 'border', 'border-gray-300', 'rounded-full', 'w-6', 'h-6', 'flex', 'items-center', 'justify-center', 'text-lg', 'cursor-pointer');

                // إضافة حدث لإزالة الصورة عند الضغط على "إكس"
                closeButton.addEventListener('click', function() {
                    imgWrapper.remove(); // إزالة العنصر من الصفحة
                });

                // إضافة الصورة و "إكس" إلى الحاوية
                imgWrapper.appendChild(imgElement);
                imgWrapper.appendChild(closeButton);
                uploadedImages.appendChild(imgWrapper);
            };
            reader.readAsDataURL(file);
        });
    }
});

function updateEventPreview() {
    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const location = document.getElementById('event-location').value;
    const description = document.getElementById('event-description').value;
    const price = document.getElementById('event-price').value;

    // تحديث النصوص في معاينة الحدث
    document.getElementById('preview-title').textContent = title || "Summer Music Festival";
    document.getElementById('preview-date').textContent = date || "May 15, 2025 • 7:00 PM";
    document.getElementById('preview-location').textContent = location || "Central Park, New York";
    document.getElementById('preview-description').textContent = description || "Join us for an unforgettable night of music featuring top artists and bands. Food, drinks, and amazing atmosphere guaranteed!";
    document.getElementById('preview-price').textContent = price || "45";

    // تحديث الفئات
    const tags = document.getElementById('event-tags').value.split(",");
    const tagsContainer = document.getElementById('preview-tags');
    tagsContainer.innerHTML = ""; // مسح الفئات القديمة
    tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.classList.add('px-2', 'py-1', 'bg-primary', 'bg-opacity-10', 'text-primary', 'text-xs', 'rounded-full');
        tagElement.textContent = tag.trim();
        tagsContainer.appendChild(tagElement);
    });
}

let map;
let marker;
let geocoder;

function initMap() {
    const defaultLocation = { lat: 31.9539, lng: 35.9106 }; // عمّان

    map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 12,
        mapTypeId: 'satellite' // ⬅️ عرض الخريطة كقمر صناعي
    });

    marker = new google.maps.Marker({
        map: map,
        position: defaultLocation,
        draggable: true
    });

    geocoder = new google.maps.Geocoder();

    // عند تغيير العنوان
    document.getElementById("event-address").addEventListener("change", function () {
        const address = this.value;
        if (address.trim()) {
            geocoder.geocode({ address: address }, function (results, status) {
                if (status === "OK") {
                    const location = results[0].geometry.location;
                    map.setCenter(location);
                    map.setZoom(16);
                    marker.setPosition(location);
                } else {
                    console.error("Geocoding error:", status);
                }
            });
        }
    });
}

// Get DOM elements
const publishButton = document.getElementById('publish-event');
const eventNameInput = document.getElementById('event-name');
const eventDateInput = document.getElementById('event-date');
const eventTimeInput = document.getElementById('event-time');
const eventAddressInput = document.getElementById('event-address');
const eventPriceInput = document.getElementById('event-price');
const eventDescriptionInput = document.getElementById('event-description');
const eventAudienceInputs = document.querySelectorAll('input[type="checkbox"]'); // For audience selection
const eventTypeButtons = document.querySelectorAll('.tab-button'); // For event type selection

publishButton.addEventListener('click', function () {
    // Collect data from the form
    const eventName = eventNameInput.value;
    const eventDate = eventDateInput.value;
    const eventTime = eventTimeInput.value;
    const eventAddress = eventAddressInput.value;
    const eventPrice = eventPriceInput.value;
    const eventDescription = eventDescriptionInput.value;

    // Collect audience
    const selectedAudience = [];
    eventAudienceInputs.forEach(input => {
        if (input.checked) {
            selectedAudience.push(input.id);
        }
    });

    // Collect event type
    let eventType = '';
    eventTypeButtons.forEach(button => {
        if (button.classList.contains('active')) {
            eventType = button.dataset.type;
        }
    });

    // Store the event data in localStorage (or you can send it to a server)
    const eventData = {
        name: eventName,
        date: eventDate,
        time: eventTime,
        address: eventAddress,
        price: eventPrice,
        description: eventDescription,
        audience: selectedAudience,
        type: eventType
    };

    // Save to localStorage (you can replace this with an API call to save to a database)
    localStorage.setItem('newEvent', JSON.stringify(eventData));

    // Redirect to events page or update the current page
    window.location.href = 'events.html'; // Or you can reload the page and update it dynamically
});


// إضافة أحداث التغيير للمداخل
document.getElementById('event-title').addEventListener('input', updateEventPreview);
document.getElementById('event-date').addEventListener('input', updateEventPreview);
document.getElementById('event-location').addEventListener('input', updateEventPreview);
document.getElementById('event-description').addEventListener('input', updateEventPreview);
document.getElementById('event-price').addEventListener('input', updateEventPreview);
document.getElementById('event-tags').addEventListener('input', updateEventPreview);

    document.addEventListener('DOMContentLoaded', function() {
    // Update Event Name
    const eventNameInput = document.getElementById('event-name');
    const previewTitle = document.getElementById('preview-title');
    eventNameInput.addEventListener('input', function() {
    previewTitle.textContent = eventNameInput.value || "Untitled Event";
});

    // Update Date and Time
    const eventDateInput = document.getElementById('event-date');
    const eventTimeInput = document.getElementById('event-time');
    const previewDate = document.getElementById('preview-date');
    eventDateInput.addEventListener('change', updatePreviewDateTime);
    eventTimeInput.addEventListener('change', updatePreviewDateTime);

    function updatePreviewDateTime() {
    const date = eventDateInput.value;
    const time = eventTimeInput.value;
    previewDate.textContent = `${date} • ${time}`;
}

    // Update Price
    const priceToggle = document.getElementById('price-toggle');
    const priceInputContainer = document.getElementById('price-input-container');
    const previewPrice = document.getElementById('preview-price');
    const eventPriceInput = document.getElementById('event-price');

    priceToggle.addEventListener('change', function() {
    priceInputContainer.classList.toggle('hidden', !priceToggle.checked);
    if (priceToggle.checked) {
    previewPrice.textContent = eventPriceInput.value || '0.00';
} else {
    previewPrice.textContent = 'Free';
}
});

    eventPriceInput.addEventListener('input', function() {
    if (priceToggle.checked) {
    previewPrice.textContent = eventPriceInput.value || '0.00';
}
});

    // Update Description
    const eventDescriptionInput = document.getElementById('event-description');
    const previewDescription = document.getElementById('preview-description');
    eventDescriptionInput.addEventListener('input', function() {
    previewDescription.textContent = eventDescriptionInput.value || "No description provided.";
});

    // Update Rating
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    const starLabels = document.querySelectorAll('.star-rating label');
    ratingInputs.forEach(function(input) {
    input.addEventListener('change', function() {
    const ratingValue = input.value;
    updateStarRating(ratingValue);
});
});

    function updateStarRating(ratingValue) {
    starLabels.forEach(function(label, index) {
    const starInput = label.previousElementSibling;
    if (starInput.value <= ratingValue) {
    label.classList.add('text-yellow-500');
    label.classList.remove('text-gray-300');
} else {
    label.classList.add('text-gray-300');
    label.classList.remove('text-yellow-500');
}
});
}

    // Update Tags (Audience, Features)
    const audienceCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="audience-"]');
    const previewTags = document.getElementById('preview-tags');

    audienceCheckboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
    updatePreviewTags();
});
});

    function updatePreviewTags() {
    previewTags.innerHTML = '';
    audienceCheckboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
    const label = checkbox.nextElementSibling;
    const tag = document.createElement('span');
    tag.classList.add('px-2', 'py-1', 'bg-primary', 'bg-opacity-10', 'text-primary', 'text-xs', 'rounded-full');
    tag.textContent = label.textContent;
    previewTags.appendChild(tag);
}
});
}

    // Update Event Features
    const featureTags = document.querySelectorAll('.feature-tag');
    featureTags.forEach(function(tag) {
    tag.addEventListener('click', function() {
    tag.classList.toggle('bg-primary');
    tag.classList.toggle('bg-opacity-10');
    tag.classList.toggle('text-primary');
    updatePreviewTags();
});
});

    // Update Image Preview
    const imageUploadInput = document.getElementById('image-upload');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const uploadedImagesContainer = document.getElementById('uploaded-images');

    imageUploadInput.addEventListener('change', function() {
    imagePreviewContainer.classList.remove('hidden');
    uploadedImagesContainer.innerHTML = '';
    Array.from(imageUploadInput.files).forEach(function(file) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.classList.add('w-24', 'h-24', 'object-cover', 'rounded');
    uploadedImagesContainer.appendChild(img);
});
});
});

