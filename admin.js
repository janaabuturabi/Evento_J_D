
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
    title: "Palestinian Heritage Festival",
    date: "May 12, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "Cultural Center, Ramallah",
    price: "$15.00 per person",
    organizer: "Palestinian Cultural Association",
    contact: "info@pca.org | +970 59 123 4567",
    type: "Cultural",
    audience: "Families",
    status: "Pending",
    description: "Join us for a day-long celebration of Palestinian heritage and culture. The festival will feature traditional dance performances, music, art exhibitions, food stalls with authentic Palestinian cuisine, and workshops where visitors can learn traditional crafts. This family-friendly event aims to preserve and showcase the rich cultural heritage of Palestine.",
    image: "https://readdy.ai/api/search-image?query=cultural%20festival%20in%20palestine%20with%20traditional%20dance%20performances%2C%20colorful%20costumes%2C%20crowd%20of%20people%20watching%2C%20outdoor%20venue%20with%20decorations%2C%20high%20quality%20professional%20photograph&width=800&height=400&seq=event1detail&orientation=landscape"
},
    event2: {
    title: "Palestine Tech Summit 2025",
    date: "May 15-16, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Convention Center, Bethlehem",
    price: "$75.00 per person",
    organizer: "Palestine Tech Hub",
    contact: "events@palestinetechhub.org | +970 59 987 6543",
    type: "Educational",
    audience: "Adults",
    status: "Approved",
    description: "Palestine Tech Summit brings together tech professionals, entrepreneurs, investors, and enthusiasts for two days of networking, learning, and collaboration. The event features keynote speeches from industry leaders, panel discussions on emerging technologies, workshops, and a startup showcase. This year's focus is on digital transformation and sustainable tech solutions for local challenges.",
    image: "https://readdy.ai/api/search-image?query=tech%20conference%20with%20speakers%20on%20stage%2C%20audience%20in%20seats%2C%20professional%20lighting%2C%20projection%20screen%20showing%20presentation%2C%20modern%20venue%2C%20high%20quality%20professional%20photograph&width=800&height=400&seq=event2detail&orientation=landscape"
},
    event3: {
    title: "Creative Kids Art Workshop",
    date: "May 10, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Community Center, Hebron",
    price: "Free",
    organizer: "Hebron Youth Initiative",
    contact: "youth@hebroninitiative.org | +970 59 456 7890",
    type: "Educational",
    audience: "Kids",
    status: "Pending",
    description: "This free workshop offers children aged 6-12 a chance to explore their creativity through various art forms. Professional art instructors will guide participants through painting, drawing, and craft activities. All materials will be provided. The workshop aims to encourage self-expression and develop fine motor skills in a supportive environment. Space is limited to 20 children, so early registration is recommended.",
    image: "https://readdy.ai/api/search-image?query=childrens%20art%20workshop%20with%20kids%20painting%20and%20creating%20crafts%2C%20colorful%20art%20supplies%2C%20bright%20classroom%20setting%2C%20instructors%20helping%2C%20happy%20children%2C%20high%20quality%20professional%20photograph&width=800&height=400&seq=event3detail&orientation=landscape"
},
    event4: {
    title: "Palestine Youth Soccer Tournament",
    date: "May 20-22, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "Sports Stadium, Nablus",
    price: "$10.00 per person",
    organizer: "Palestine Sports Association",
    contact: "tournaments@psa.org | +970 59 234 5678",
    type: "Sports",
    audience: "Families",
    status: "Approved",
    description: "The annual Youth Soccer Tournament brings together young athletes from across Palestine to compete in a three-day event. Teams in different age categories (8-10, 11-13, 14-16) will play in a round-robin format followed by knockout stages. Spectators can enjoy watching the matches, food vendors, and other entertainment. All proceeds will support youth sports programs in underserved communities.",
    image: "https://readdy.ai/api/search-image?query=soccer%20match%20in%20stadium%20with%20players%20on%20field%2C%20crowd%20of%20spectators%2C%20sports%20field%20with%20goals%2C%20evening%20lighting%2C%20professional%20sports%20event%2C%20high%20quality%20professional%20photograph&width=800&height=400&seq=event4detail&orientation=landscape"
},
    event5: {
    title: "Business Networking Mixer",
    date: "May 18, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "Grand Hotel, Ramallah",
    price: "$25.00 per person",
    organizer: "Palestine Business Network",
    contact: "events@pbn.org | +970 59 345 6789",
    type: "Networking",
    audience: "Adults",
    status: "Rejected",
    description: "This evening networking event brings together professionals from various industries for meaningful connections and potential collaborations. The ticket includes appetizers, one complimentary drink, and access to speed networking sessions. There will also be a short presentation on current business trends in Palestine by a guest speaker. Business casual attire is recommended.",
    image: "https://readdy.ai/api/search-image?query=business%20networking%20event%20with%20professionals%20mingling%2C%20conference%20room%20setting%2C%20people%20exchanging%20business%20cards%2C%20refreshment%20table%2C%20professional%20attire%2C%20high%20quality%20professional%20photograph&width=800&height=400&seq=event5detail&orientation=landscape"
},
    event6: {
    title: "Summer Music Festival",
    date: "May 25, 2025",
    time: "7:00 PM - 11:00 PM",
    location: "City Park, Jenin",
    price: "$30.00 per person",
    organizer: "Jenin Arts Collective",
    contact: "festival@jeninarts.org | +970 59 567 8901",
    type: "Entertainment",
    audience: "Adults",
    status: "Pending",
    description: "Enjoy a summer evening of live music under the stars at Jenin's City Park. The festival will feature performances by local and regional bands spanning various genres including traditional Palestinian music, indie rock, and jazz fusion. Food and beverage vendors will be available throughout the event. Bring your own blanket or chair for seating. In case of rain, the event will be moved to the Jenin Cultural Center.",
    image: "https://readdy.ai/api/search-image?query=outdoor%20music%20concert%20with%20band%20performing%20on%20stage%2C%20crowd%20of%20people%2C%20evening%20lighting%2C%20sound%20equipment%2C%20outdoor%20venue%20with%20decorations%2C%20high%20quality%20professional%20photograph&width=800&height=400&seq=event6detail&orientation=landscape"
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

