document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const submitBtn = document.getElementById('submit-btn');

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showFeedback('Message sent successfully! Thank you for reaching out—let us build something great together soon.', 'success');
                form.reset();
            } else {
                showFeedback('Oops! Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            showFeedback('Network error. Please check your connection.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Send Message</span> <i data-lucide="send" class="w-4 h-4"></i>`;
            if (window.lucide) window.lucide.createIcons();
        }
    });

    function showFeedback(text, type) {
        feedback.textContent = text;
        feedback.classList.remove('hidden', 'bg-emerald-500/10', 'text-emerald-400', 'bg-rose-500/10', 'text-rose-400', 'border', 'border-emerald-500/20', 'border-rose-500/20');
        if (type === 'success') {
            feedback.classList.add('bg-emerald-500/10', 'text-emerald-400', 'border', 'border-emerald-500/20');
        } else {
            feedback.classList.add('bg-rose-500/10', 'text-rose-400', 'border', 'border-rose-500/20');
        }
        setTimeout(() => { feedback.classList.add('hidden'); }, 6000);
    }
});