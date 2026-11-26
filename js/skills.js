const technicalGroups = [
    {
        title: "Languages",
        icon: "code-2",
        items: [
            { name: "C", icon: "code" },
            { name: "C++", icon: "cpu" },
            { name: "Java", icon: "coffee" },
            { name: "Python", icon: "terminal" },
            { name: "JavaScript", icon: "file-code" }
        ]
    },
    {
        title: "Frontend",
        icon: "layout",
        items: [
            { name: "HTML", icon: "layout" },
            { name: "CSS", icon: "palette" },
            { name: "Tailwind CSS", icon: "wind" },
            { name: "Bootstrap", icon: "box" },
            { name: "React", icon: "layers" }
        ]
    },
    {
        title: "Backend & Database",
        icon: "database",
        items: [
            { name: "PHP", icon: "server" },
            { name: "Node.js", icon: "hexagon" },
            { name: "MySQL", icon: "database" }
        ]
    },
    {
        title: "Tools & Networking",
        icon: "wrench",
        items: [
            { name: "Figma", icon: "pen-tool" },
            { name: "Photoshop", icon: "image" },
            { name: "Canva", icon: "layout-template" },
            { name: "GitHub", icon: "git-branch" },
            { name: "VS Code", icon: "code-2" },
            { name: "Vite", icon: "zap" },
            { name: "Cisco Packet Tracer", icon: "network" }
        ]
    }
];

const softSkillsList = [
    {
        name: "Interpersonal Communication",
        icon: "message-square",
        desc: "Connecting clearly and respectfully with teammates, classmates, and collaborators."
    },
    {
        name: "Effective Speaking & Active Listening",
        icon: "ear",
        desc: "Explaining ideas plainly during discussions while listening closely to feedback."
    },
    {
        name: "Self-Management & Time Management",
        icon: "clock",
        desc: "Organizing tasks, pacing workloads, and meeting deadlines consistently."
    },
    {
        name: "Team Collaboration & Peer Leadership",
        icon: "users",
        desc: "Stepping up when needed, sharing knowledge, and helping groupmates push through blockers."
    },
    {
        name: "Problem-Solving & Analytical Thinking",
        icon: "lightbulb",
        desc: "Breaking down complex issues step by step to find practical solutions."
    },
    {
        name: "Adaptability & Continuous Learning",
        icon: "trending-up",
        desc: "Picking up new tools, frameworks, and lessons quickly as requirements shift."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('skills-container');
    if (!container) return;

    container.innerHTML = '';

    // 1. Side-by-Side Technical Category Boxes (Name only, no per-skill descriptions)
    const techGrid = document.createElement('div');
    techGrid.className = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch';

    technicalGroups.forEach((group) => {
        const box = document.createElement('div');
        box.className =
            'spotlight-card p-6 rounded-3xl bg-cardBg/85 backdrop-blur-xl border border-slate-800 hover:border-primaryAccent/50 transition-all shadow-lg flex flex-col';

        const pillsHtml = group.items
            .map(
                (item) => `
                <div class="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-darkBg/75 dark:bg-darkBg/80 border border-slate-800/80 text-primaryText text-xs sm:text-sm font-medium hover:border-primaryAccent/50 transition-colors">
                    <i data-lucide="${item.icon}" class="w-4 h-4 text-primaryAccent shrink-0"></i>
                    <span>${item.name}</span>
                </div>
            `
            )
            .join('');

        box.innerHTML = `
            <div class="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800/70 relative z-10">
                <div class="w-9 h-9 rounded-xl bg-primaryAccent/10 text-primaryAccent flex items-center justify-center shrink-0">
                    <i data-lucide="${group.icon}" class="w-4 h-4"></i>
                </div>
                <h3 class="font-display text-base sm:text-lg font-bold text-primaryText">${group.title}</h3>
            </div>
            <div class="flex flex-wrap gap-2.5 content-start relative z-10">
                ${pillsHtml}
            </div>
        `;

        techGrid.appendChild(box);
    });

    container.appendChild(techGrid);

    const softBox = document.createElement('div');
    softBox.className =
        'spotlight-card p-6 sm:p-8 rounded-3xl bg-cardBg/85 backdrop-blur-xl border border-slate-800 hover:border-secondaryAccent/40 transition-all shadow-lg';

    const softCardsHtml = softSkillsList
        .map(
            (skill) => `
            <div class="p-4 rounded-2xl bg-darkBg/65 border border-slate-800/80 flex items-start gap-3.5 relative z-10">
                <div class="w-9 h-9 rounded-xl bg-secondaryAccent/10 text-secondaryAccent flex items-center justify-center shrink-0 mt-0.5">
                    <i data-lucide="${skill.icon}" class="w-4 h-4"></i>
                </div>
                <div class="min-w-0">
                    <h4 class="text-primaryText font-bold text-sm sm:text-base leading-snug">${skill.name}</h4>
                    <p class="text-xs text-secondaryText mt-1 leading-relaxed">${skill.desc}</p>
                </div>
            </div>
        `
        )
        .join('');

    softBox.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-6 border-b border-slate-800/70 relative z-10">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-secondaryAccent/10 text-secondaryAccent flex items-center justify-center shrink-0">
                    <i data-lucide="sparkles" class="w-5 h-5"></i>
                </div>
                <div>
                    <h3 class="font-display text-lg sm:text-xl font-bold text-primaryText">Soft Skills</h3>
                    <p class="text-xs text-secondaryText">Communication, mindset &amp; teamwork</p>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            ${softCardsHtml}
        </div>
    `;

    container.appendChild(softBox);

    if (window.lucide) window.lucide.createIcons();
});