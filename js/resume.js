document.addEventListener('DOMContentLoaded', () => {
    const resumeBtn = document.getElementById('download-resume-btn');
    if (!resumeBtn) return;

    const resumeUrl = 'assets/images/resume/Resume.pdf';

    if (resumeBtn.tagName === 'A') {
        resumeBtn.href = resumeUrl;
        resumeBtn.target = '_blank';
        resumeBtn.rel = 'noopener noreferrer';
    }

    resumeBtn.addEventListener('click', (e) => {
        if (resumeBtn.tagName !== 'A') {
            e.preventDefault();
            window.open(resumeUrl, '_blank', 'noopener,noreferrer');
        }
    });
});