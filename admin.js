
// Dropdown functionality
    document.addEventListener('DOMContentLoaded', function() {
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const gridView = document.getElementById('gridView');
    const listView = document.getElementById('listView');
    const listViewBody = document.getElementById('listViewBody');
    function toggleView(showGrid) {
    if (showGrid) {
    gridView.classList.remove('hidden');
    listView.classList.add('hidden');
    gridViewBtn.classList.add('bg-primary', 'text-white');
    gridViewBtn.classList.remove('text-gray-600');
    listViewBtn.classList.remove('bg-primary', 'text-white');
    listViewBtn.classList.add('text-gray-600');
} else {
    gridView.classList.add('hidden');
    listView.classList.remove('hidden');
    listViewBtn.classList.add('bg-primary', 'text-white');
    listViewBtn.classList.remove('text-gray-600');
    gridViewBtn.classList.remove('bg-primary', 'text-white');
    gridViewBtn.classList.add('text-gray-600');

    // Populate list view
    listViewBody.innerHTML = Object.entries(eventData).map(([id, event]) => `
      <tr>
        <td class="px-6 py-4">
          <div class="flex items-center">
            <div class="h-20 w-32 flex-shrink-0 overflow-hidden rounded">
              <img src="${event.image}" alt="${event.title}" class="h-full w-full object-cover">
            </div>
          </div>
        </td>
        <td class="px-6 py-4">
          <div class="flex flex-col">
            <p class="font-medium text-gray-900">${event.title}</p>
            <p class="text-sm text-gray-500"><i class="ri-calendar-line mr-1"></i>${event.date} • ${event.time}</p>
            <p class="text-sm text-gray-500"><i class="ri-map-pin-line mr-1"></i>${event.location}</p>
          </div>
        </td>
        <td class="px-6 py-4 text-sm text-gray-500">${event.price}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full ${
    event.status === 'Pending' ? 'status-pending' :
    event.status === 'Approved' ? 'status-approved' :
    'status-rejected'
}">${event.status}</span>
        </td>
        <td class="px-6 py-4">
          <div class="flex items-center space-x-2">
            <button class="px-2 py-1 bg-primary text-white text-sm font-medium rounded !rounded-button whitespace-nowrap">
              <i class="ri-check-line mr-1"></i> Approve
            </button>
            <button class="px-2 py-1 bg-red-50 text-red-600 text-sm font-medium rounded !rounded-button whitespace-nowrap">
              <i class="ri-close-line mr-1"></i> Reject
            </button>
            <button onclick="openModal('${id}')" class="px-2 py-1 bg-gray-50 text-gray-700 text-sm font-medium rounded !rounded-button whitespace-nowrap">
              <i class="ri-eye-line mr-1"></i> Details
            </button>
          </div>
        </td>
      </tr>
    `).join('');
}
}
    gridViewBtn.addEventListener('click', () => toggleView(true));
    listViewBtn.addEventListener('click', () => toggleView(false));
    const dropdowns = [
{ button: 'audienceDropdown', content: 'audienceDropdownContent' },
{ button: 'typeDropdown', content: 'typeDropdownContent' },
{ button: 'timeDropdown', content: 'timeDropdownContent' },
{ button: 'locationDropdown', content: 'locationDropdownContent' },
{ button: 'priceDropdown', content: 'priceDropdownContent' },
{ button: 'sortDropdown', content: 'sortDropdownContent' },
{ button: 'perPageDropdown', content: 'perPageDropdownContent' }
    ];
    dropdowns.forEach(dropdown => {
    const button = document.getElementById(dropdown.button);
    const content = document.getElementById(dropdown.content);
    if (button && content) {
    button.addEventListener('click', function(e) {
    e.stopPropagation();
    content.classList.toggle('show');
// Close other dropdowns
    dropdowns.forEach(otherDropdown => {
    if (otherDropdown.content !== dropdown.content) {
    const otherContent = document.getElementById(otherDropdown.content);
    if (otherContent && otherContent.classList.contains('show')) {
    otherContent.classList.remove('show');
}
}
});
});
}
});
// Close dropdowns when clicking outside
    document.addEventListener('click', function() {
    dropdowns.forEach(dropdown => {
    const content = document.getElementById(dropdown.content);
    if (content && content.classList.contains('show')) {
    content.classList.remove('show');
}
});
});
// Prevent closing when clicking inside dropdown content
    document.querySelectorAll('.dropdown-content').forEach(content => {
    content.addEventListener('click', function(e) {
    e.stopPropagation();
});
});
// Custom date range toggle
    const timeRadios = document.querySelectorAll('input[name="time"]');
    const customDateRange = document.getElementById('customDateRange');
    timeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
    if (this.value === 'custom' && this.checked) {
    customDateRange.classList.remove('hidden');
} else {
    customDateRange.classList.add('hidden');
}
});
});
// Price range slider
    const priceRangeSlider = document.getElementById('priceRangeSlider');
    const priceRangeValue = document.getElementById('priceRangeValue');
    if (priceRangeSlider && priceRangeValue) {
    priceRangeSlider.addEventListener('input', function() {
    priceRangeValue.textContent = `$0 - $${this.value}`;
});
}
});
    // Modal functionality
    const eventData = {
        event1: {
            title: "Clay hand-making course",
            date: "May 15-16, 2025",
            time: "9:00 AM - 5:00 PM",
            location: "Nablus",
            price: "₪ 20 ILS",
            organizer: "Clay hand-making course",
            contact: "Clay hand-making course@gmail.com | +970 59 987 6543",
            type: "Entertainment",
            audience: "Adults",
            status: "20",
            description: "Dive into the world of creativity with our handmade crafts course, designed to be educational, entertaining, and culturally enriching. This hands-on workshop invites participants of all ages to explore various crafting techniques such as clay modeling, paper art, jewelry making, and more. Learn the stories and traditions behind handmade arts while developing your skills in a relaxed, family-friendly environment. Whether you're crafting for fun or discovering a new passion, this course offers a unique and memorable creative experience."
                ,
            image: "IMAGE/Handmade Projects.jpg"
        },
        event2: {
            title: "Horse course",
            date: "May 15-16, 2025",
            time: "9:00 AM - 5:00 PM",
            location: "Convention Center, Bethlehem",
            price: "₪ 40 ILS",
            organizer: "Horse course",
            contact: "events@gmail.com | +970 59 987 6543",
            type: "Entertainment",
            audience: "Adults",
            status: "40",
            description: "Palestine Tech Summit brings together tech professionals, entrepreneurs, investors, and enthusiasts for two days of networking, learning, and collaboration. The event features keynote speeches from industry leaders, panel discussions on emerging technologies, workshops, and a startup showcase. This year's focus is on digital transformation and sustainable tech solutions for local challenges.",
            image: "IMAGE/Horse course.jpg"
        },
        event3: {
            title: "Cooking course",
            date: "May 10, 2025",
            time: "2:00 PM - 4:00 PM",
            location: "Community Center, Hebron",
            price: "Free",
            organizer: "Cooking course",
            contact: "Cooking course@org | +970 59 456 7890",
            type: "Educational",
            audience: "Adults",
            status: "Pending",
            description: "Embark on a culinary journey with our interactive cooking course, designed to be both educational and entertaining! Whether you’re a novice or a seasoned cook, this course will equip you with essential cooking skills, from basic techniques to advanced recipes. Explore diverse cuisines and cultural dishes, and learn the secrets behind creating flavorful meals. Enjoy hands-on cooking experiences, tips from expert chefs, and a fun atmosphere that makes learning enjoyable. By the end of the course, you’ll be confident in your cooking abilities and ready to impress with your culinary creations!"
                ,
            image:      "IMAGE/Cooking course2.jpg"


        },
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
    modalContent.innerHTML = `
<div class="relative h-60 mb-4 rounded overflow-hidden">
<img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover">
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
    function closeModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}
    // Close modal when clicking outside
    document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('eventModal');
    modal.addEventListener('click', function(e) {
    if (e.target === modal) {
    closeModal();
}
});
});



