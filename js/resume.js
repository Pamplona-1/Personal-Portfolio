document.addEventListener('DOMContentLoaded', () => {
    const resumeBtn = document.getElementById('download-resume-btn');
    if (!resumeBtn) return;
    resumeBtn.addEventListener('click', () => {
        const resumeWindow = window.open('', '_blank');
        resumeWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>John Rein M. Pamplona - Resume</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 800px; margin: 40px auto; padding: 20px; }
                    h1 { color: #0f172a; margin-bottom: 4px; }
                    h2 { color: #3b82f6; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px; margin-top: 24px; }
                    .contact-info { font-size: 0.9rem; color: #64748b; margin-bottom: 20px; }
                </style>
            </head>
            <body>
                <h1>John Rein M. Pamplona</h1>
                <div class="contact-info">Calamba City, Laguna, Philippines | johnreinpamplona12@gmail.com | 09359386414</div>
                <h2>Professional Title</h2>
                <p>BSIT Student | Aspiring Software Developer | Aspiring Network Engineer</p>
                <h2>Education</h2>
                <p><strong>Bachelor of Science in Information Technology (3rd Year)</strong><br>City College of Calamba, Calamba City, Laguna</p>
                <h2>Featured Project</h2>
                <p><strong>BrewBound</strong> - Web-based navigation and information management system for local coffee shops in Poblacion 1-7, Calamba City.</p>
                <h2>Certificates & Trainings</h2>
                <p><strong>Certificate of Participation - Community-Powered Impact</strong><br>Organized by the Department of Computing and Informatics, City College of Calamba (October 13, 2026)</p>
                <script>window.print();</script>
            </body>
            </html>
        `);
        resumeWindow.document.close();
    });
});
