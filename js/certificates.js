const certificatesData = [
    {
        title: "Certificate of Participation - Community-Powered Impact",
        organization: "Department of Computing and Informatics, City College of Calamba",
        date: "October 13, 2026",
        image: "assets/images/certificates/community-powered-impact.jpg",
        desc: "Participated in the ITalks: Beyond the Screen webinar organized by the Department of Computing and Informatics at City College of Calamba."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('certificates-container');
    const modalContainer = document.getElementById('modal-container');
    if (!container) return;

    function renderCertificates() {
        container.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${certificatesData.map((cert, index) => `
                    <div class="rounded-3xl bg-cardBg border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-primaryAccent/50 transition-all shadow-xl">
                        <div class="relative aspect-[4/3] overflow-hidden bg-slate-900 cursor-pointer view-cert-btn" data-index="${index}">
                            <img src="${cert.image}" alt="${cert.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'">
                            <div class="absolute inset-0 bg-darkBg/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span class="px-4 py-2 rounded-xl bg-primaryAccent text-white text-xs font-semibold shadow-lg">Preview Certificate</span>
                            </div>
                        </div>
                        <div class="p-6 flex flex-col flex-grow">
                            <span class="text-xs text-primaryAccent font-semibold uppercase tracking-wider mb-1">${cert.date}</span>
                            <h3 class="text-xl font-bold text-primaryText mb-2">${cert.title}</h3>
                            <p class="text-secondaryText text-xs mb-4">${cert.organization}</p>
                            <p class="text-secondaryText text-sm mb-4 leading-relaxed">${cert.desc}</p>
                            <div class="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                                <button class="view-cert-btn text-primaryAccent font-semibold text-sm hover:underline flex items-center gap-1" data-index="${index}">
                                    <span>View Full Size</span>
                                    <i data-lucide="maximize-2" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        if (window.lucide) window.lucide.createIcons();
        attachCertModalEvents();
    }

    function attachCertModalEvents() {
        document.querySelectorAll('.view-cert-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                const cert = certificatesData[index];
                if (cert && modalContainer) {
                    modalContainer.innerHTML = `
                        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkBg/85 backdrop-blur-md">
                            <div class="relative w-full max-w-4xl rounded-3xl bg-cardBg border border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                                <div class="p-6 border-b border-slate-800 flex items-center justify-between">
                                    <h3 class="text-xl font-bold text-primaryText">${cert.title}</h3>
                                    <button id="close-cert-modal" class="p-2 rounded-xl bg-slate-800 text-secondaryText hover:text-white">
                                        <i data-lucide="x" class="w-5 h-5"></i>
                                    </button>
                                </div>
                                <div class="p-6 overflow-y-auto flex justify-center bg-slate-950">
                                    <img src="${cert.image}" alt="${cert.title}" class="max-w-full h-auto rounded-xl shadow-2xl border border-slate-800" onerror="this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'">
                                </div>
                            </div>
                        </div>
                    `;
                    if (window.lucide) window.lucide.createIcons();
                    document.getElementById('close-cert-modal').addEventListener('click', () => {
                        modalContainer.innerHTML = '';
                    });
                }
            });
        });
    }

    renderCertificates();
});