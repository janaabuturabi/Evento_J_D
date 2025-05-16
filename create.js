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

document.getElementById('publish-event').addEventListener('click', async function(e) {
    e.preventDefault();

    // نجمع البيانات
    const data = new FormData();
    data.append('name',           document.getElementById('event-name').value);
    data.append('max_attendees',  document.getElementById('attendee-limit').value);
    data.append('date',           document.getElementById('event-date').value);
    data.append('time',           document.getElementById('event-time').value);
    data.append('price',          document.getElementById('price-toggle').checked
        ? document.getElementById('event-price').value
        : 0);
    data.append('address',        document.getElementById('event-address').value);
    data.append('latitude',       window.marker ? window.marker.getLatLng().lat : '');
    data.append('longitude',      window.marker ? window.marker.getLatLng().lng : '');
    data.append('duration',       document.getElementById('event-duration').value);
    data.append('duration_unit',  document.getElementById('duration-unit').value);
    data.append('description',    document.getElementById('event-description').value);
    data.append('rating',         document.querySelector('input[name="rating"]:checked')?.value || 0);

    //audience (مثلاً ["kids","adults",...])
    const aud = Array.from(document.querySelectorAll('#audience-kids, #audience-adults, #audience-families, #audience-seniors'))
        .filter(cb => cb.checked)
        .map(cb => cb.id.replace('audience-',''));
    data.append('audience', JSON.stringify(aud));

    // event type
    data.append('event_type', document.querySelector('.tab-button.active').dataset.type);

    // features
    const feats = Array.from(document.querySelectorAll('.feature-tag.selected'))
        .map(div => div.dataset.feature);
    data.append('features', JSON.stringify(feats));

    // images
    const files = document.getElementById('image-upload').files;
    for (let i = 0; i < files.length; i++) {
        data.append('images[]', files[i]);
    }

    // نرسل إلى الـPHP
    try {
        const resp = await fetch('process_event.php', {
            method: 'POST',
            body: data
        });
        const json = await resp.json();
        if (json.success) {
            alert('تم حفظ الحدث بنجاح (ID=' + json.id + ')');
            window.location.href = 'events.html';
        } else {
            alert('خطأ: ' + json.error);
        }
    } catch (err) {
        console.error(err);
        alert('فشل الاتصال بالخادم.');
    }
});
