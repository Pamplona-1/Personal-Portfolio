document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            showFeedback('Please fill in all fields.', 'error');
            return;
        }
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Send Message</span> <i data-lucide="send" class="w-4 h-4"></i>`;
            if (window.lucide) window.lucide.createIcons();
            showFeedback('Message sent successfully! Thank you for getting in touch.', 'success');
            form.reset();
        }, 1200);
    });

    function showFeedback(text, type) {
        feedback.textContent = text;
        feedback.classList.remove('hidden', 'bg-emerald-500/10', 'text-emerald-400', 'bg-rose-500/10', 'text-rose-400');
        if (type === 'success') {
            feedback.classList.add('bg-emerald-500/10', 'text-emerald-400', 'border', 'border-emerald-500/20');
        } else {
            feedback.classList.add('bg-rose-500/10', 'text-rose-400', 'border', 'border-rose-500/20');
        }
        setTimeout(() => { feedback.classList.add('hidden'); }, 5000);
    }
});
