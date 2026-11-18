document.addEventListener('DOMContentLoaded', () => {
    const resumeBtn = document.getElementById('download-resume-btn');
    if (!resumeBtn) return;
    resumeBtn.addEventListener('click', () => {
        const resumeUrl = 'assets/images/resume/Resume.pdf';
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'REIN PAMPLONA Resume';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
