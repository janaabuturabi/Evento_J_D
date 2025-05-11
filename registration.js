document.addEventListener('DOMContentLoaded', function() {
    const notesField = document.getElementById('notes');
    const charCount = document.getElementById('charCount');

    notesField.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCount.textContent = currentLength;

        if (currentLength >= 450) {
            charCount.classList.add('text-amber-600');
        } else {
            charCount.classList.remove('text-amber-600');
        }
    });

    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Simple validation
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const termsAgreement = document.getElementById('termsAgreement').checked;

        if (!fullName || !email || !phone || !termsAgreement) {
            alert('Please fill in all required fields and accept the terms and conditions.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Success message (in a real app, you would submit to a server)
        alert('Registration successful! Thank you for registering.');
        form.reset();
    });
});