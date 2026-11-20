const skillsData = [
    { name: "C", category: "languages", icon: "code", desc: "Procedural programming & fundamentals" },
    { name: "C++", category: "languages", icon: "cpu", desc: "Object-oriented programming concepts" },
    { name: "Java", category: "languages", icon: "coffee", desc: "App development & algorithms" },
    { name: "Python", category: "languages", icon: "terminal", desc: "Scripting & machine learning models" },
    { name: "PHP", category: "languages", icon: "server", desc: "Server-side web scripting" },
    { name: "JavaScript", category: "languages", icon: "file-code", desc: "Dynamic frontend & ES6+ logic" },
    { name: "HTML", category: "frontend", icon: "layout", desc: "Semantic markup & structure" },
    { name: "CSS", category: "frontend", icon: "palette", desc: "Styling, flexbox, grid & responsive design" },
    { name: "Tailwind CSS", category: "frontend", icon: "wind", desc: "Utility-first rapid UI styling" },
    { name: "Bootstrap", category: "frontend", icon: "box", desc: "Responsive design & prebuilt components" },
    { name: "React", category: "frontend", icon: "layers", desc: "Component-based UI architecture" },
    { name: "Node.js", category: "backend", icon: "hexagon", desc: "Backend runtime environment" },
    { name: "MySQL", category: "backend", icon: "database", desc: "Relational database management" },
    { name: "Figma", category: "tools", icon: "pen-tool", desc: "UI/UX wireframing & prototyping" },
    { name: "VS Code", category: "tools", icon: "code-2", desc: "Primary code editor" },
    { name: "Vite", category: "tools", icon: "zap", desc: "Next-gen frontend build tool" },
    { name: "Cisco Packet Tracer", category: "tools", icon: "network", desc: "Network topologies, OSPF & VLANs" }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('skills-grid');
    const filterBtns = document.querySelectorAll('.skill-filter-btn');
    if (!grid) return;

    function renderSkills(filter = 'all') {
        grid.innerHTML = '';
        const filtered = filter === 'all' ? skillsData : skillsData.filter(s => s.category === filter);
        filtered.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'p-4 rounded-2xl bg-cardBg/85 backdrop-blur-xl border border-slate-800 hover:border-primaryAccent/50 transition-all group flex items-center gap-3.5 shadow-md';
            card.innerHTML = `
                <div class="w-10 h-10 rounded-xl bg-primaryAccent/10 text-primaryAccent flex-shrink-0 flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-primaryAccent/20 transition-all relative z-10">
                    <i data-lucide="${skill.icon}" class="w-5 h-5"></i>
                </div>
                <div class="min-w-0 relative z-10">
                    <h3 class="text-primaryText font-bold text-base leading-tight truncate">${skill.name}</h3>
                    <p class="text-xs text-secondaryText mt-0.5 leading-snug line-clamp-2">${skill.desc}</p>
                </div>
            `;
            grid.appendChild(card);
        });
        if (window.lucide) window.lucide.createIcons();
    }
    renderSkills('all');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-primaryAccent', 'text-white', 'shadow-lg', 'shadow-primaryAccent/20');
                b.classList.add('bg-cardBg/85', 'border', 'border-slate-800', 'text-secondaryText');
            });
            btn.classList.add('bg-primaryAccent', 'text-white', 'shadow-lg', 'shadow-primaryAccent/20');
            btn.classList.remove('bg-cardBg/85', 'border', 'border-slate-800', 'text-secondaryText');
            renderSkills(btn.getAttribute('data-filter'));
        });
    });
});