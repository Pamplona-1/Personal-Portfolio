const projectsData = [
    {
        id: "brewbound",
        title: "BrewBound",
        category: "Web Development",
        desc: "A web-based navigation and information management system for local coffee shops in selected barangays of Calamba City (Poblacion 1–7).",
        image: "assets/images/brewbound.png",
        fallbackImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop",
        tags: ["React", "Vite", "Node.js", "Tailwind CSS", "Leaflet.js", "Google Sheets"],
        team: ["John Rein M. Pamplona", "Elvis Joshua L. Lucio", "Eavan C. Firme"],
        liveUrl: "https://brewbound-final.vercel.app/",
        fullDetails: "BrewBound is an advanced web-based navigation and information management platform specifically tailored for coffee shops across Poblacion Barangays 1-7 in Calamba City."
    },
    {
        id: "task-monitoring",
        title: "Task Monitoring System",
        category: "Web Development",
        desc: "A web-based productivity application designed to efficiently track, manage, and monitor pending and completed daily tasks.",
        image: "assets/images/taskmonitoring.png",
        fallbackImage: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=800&auto=format&fit=crop",
        tags: ["HTML", "CSS", "JavaScript"],
        team: ["John Rein M. Pamplona"],
        liveUrl: "https://junior1217.github.io/task_monitoring/",
        fullDetails: "A clean and intuitive task management tool built with vanilla web technologies to help users organize their workflow, update task statuses in real-time, and maintain productivity through a streamlined interface."
    },
    {
        id: "password-validation",
        title: "Password Validation Tool",
        category: "Web Development",
        desc: "An interactive security assessment tool for sign-up forms that dynamically evaluates password strength in real-time.",
        image: "assets/images/passvalidation.png",
        fallbackImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
        tags: ["HTML", "CSS", "JavaScript"],
        team: ["John Rein M. Pamplona"],
        liveUrl: "https://junior1217.github.io/form/",
        fullDetails: "A robust form security component that analyzes user passwords based on strict criteria (minimum 8 characters, uppercase letters, numbers, and special characters) and dynamically categorizes strength levels from Very Weak to Very Strong to enhance account security."
    },
    {
        id: "escapar",
        title: "Escapar",
        category: "Prototype Design",
        desc: "A prototype of mobile application ordering system",
        image: "assets/images/escapar.png",
        fallbackImage: "https://images.unsplash.com/photo-1581091870620-3c7e1f8b5d4e?q=80&w=800&auto=format&fit=crop",
        tags: ["Figma", "UI/UX Design"],
        team: ["James Mathew Castillo", "Reynalyn Cornelio", "John Rein Pamplona", "Gellian Mae Ronquillo", "Mariella Taming", "Derick Tresvalles"],
        liveUrl: "https://tinyurl.com/escapar-shop",
        fullDetails: "Escapar is a mobile application prototype designed to streamline the ordering process for users, providing an intuitive interface for browsing products, customizing orders, and completing transactions efficiently. The design focuses on user experience, ensuring ease of navigation and accessibility."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('projects-grid');
    const modalContainer = document.getElementById('modal-container');
    if (!grid) return;

    function renderProjects() {
        grid.innerHTML = '';
        projectsData.forEach(project => {
            const card = document.createElement('div');
            card.className = 'rounded-3xl bg-cardBg border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-primaryAccent/50 transition-all shadow-xl';
            card.innerHTML = `
                <div class="relative aspect-video overflow-hidden bg-slate-900">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='${project.fallbackImage}'">
                    <div class="absolute top-4 right-4 px-3 py-1 rounded-full bg-darkBg/80 backdrop-blur-md border border-slate-700 text-xs font-semibold text-primaryAccent">
                        ${project.category}
                    </div>
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <h3 class="text-2xl font-bold text-white mb-2">${project.title}</h3>
                    <p class="text-secondaryText text-sm mb-4 leading-relaxed">${project.desc}</p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        ${project.tags.map(t => `<span class="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 text-xs font-medium">${t}</span>`).join('')}
                    </div>
                    <div class="mt-auto flex items-center justify-between pt-4 border-t border-slate-800">
                        <button class="view-project-btn text-primaryAccent font-semibold text-sm hover:underline flex items-center gap-1" data-id="${project.id}">
                            <span>View Details</span>
                            <i data-lucide="arrow-right" class="w-4 h-4"></i>
                        </button>
                        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-primaryAccent text-white text-xs font-semibold shadow-md hover:opacity-90 transition-all flex items-center gap-1.5">
                            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                            <span>Live Demo</span>
                        </a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
        if (window.lucide) window.lucide.createIcons();
        attachModalEvents();
    }

    function attachModalEvents() {
        document.querySelectorAll('.view-project-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const project = projectsData.find(p => p.id === id);
                if (project && modalContainer) {
                    modalContainer.innerHTML = `
                        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkBg/85 backdrop-blur-md">
                            <div class="relative w-full max-w-3xl rounded-3xl bg-cardBg border border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                                <div class="p-6 border-b border-slate-800 flex items-center justify-between">
                                    <h3 class="text-2xl font-bold text-white">${project.title}</h3>
                                    <button id="close-modal" class="p-2 rounded-xl bg-slate-800 text-secondaryText hover:text-white">
                                        <i data-lucide="x" class="w-5 h-5"></i>
                                    </button>
                                </div>
                                <div class="p-6 overflow-y-auto space-y-6">
                                    <div class="aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                                        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover" onerror="this.src='${project.fallbackImage}'">
                                    </div>
                                    <div>
                                        <h4 class="text-sm uppercase tracking-wider text-primaryAccent font-semibold mb-2">Project Overview</h4>
                                        <p class="text-secondaryText text-base leading-relaxed">${project.fullDetails}</p>
                                    </div>
                                    <div>
                                        <h4 class="text-sm uppercase tracking-wider text-primaryAccent font-semibold mb-2">Team Members</h4>
                                        <ul class="list-disc list-inside text-secondaryText space-y-1">
                                            ${project.team.map(member => `<li>${member}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                                <div class="p-6 border-t border-slate-800 flex items-center justify-end gap-4 bg-darkBg/50">
                                    <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primaryAccent to-secondaryAccent text-white font-semibold text-sm shadow-lg hover:opacity-95 flex items-center gap-2">
                                        <i data-lucide="external-link" class="w-4 h-4"></i>
                                        <span>Visit Live Website</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
                    if (window.lucide) window.lucide.createIcons();
                    document.getElementById('close-modal').addEventListener('click', () => { modalContainer.innerHTML = ''; });
                }
            });
        });
    }
    renderProjects();
});