const certificatesData = [
    {
        title: "Certificate of Participation - Figma for Talents and Local Businesses",
        organization: "Department of Information and Communications Technology (DICT) CALABARZON",
        date: "March 14, 2026",
        image: "assets/images/certificates/figma.jpg",
        verifyUrl: "",
        certId: "DICTR4A-IIDB-2026-0083",
        desc: "Participated in The No-Code Creative: Figma for Talents and Local Businesses Workshop conducted by DICT CALABARZON Regional Office."
    },
    {
        title: "Certificate of Course Completion - Introduction to Cybersecurity",
        organization: "Cisco Networking Academy",
        date: "July 26, 2026",
        image: "assets/images/certificates/introcyb.jpg",
        verifyUrl: "https://www.credly.com/badges/3c5c541f-88bc-4969-ad3c-fb147559988f",
        certId: "",
        desc: "Achieved student level credential for successfully completing the Introduction to Cybersecurity course covering network threats, online safety, and security measures."
    },
    {
        title: "Certificate of Participation - Community-Powered Impact",
        organization: "Department of Computing and Informatics, City College of Calamba",
        date: "October 13, 2026",
        image: "assets/images/certificates/community-powered-impact.jpg",
        verifyUrl: "",
        certId: "",
        desc: "Participated in the ITalks: Beyond the Screen webinar organized by the Department of Computing and Informatics at City College of Calamba."
    },
    {
        title: "Microcertificate of Completion - Interpersonal Skills",
        organization: "Wadhwani Foundation",
        date: "November 18, 2026",
        image: "assets/images/certificates/interpersonal-skills.png",
        verifyUrl: "https://web.certificate.wfglobal.org/en/certificate?certificateId=6afdac86f0a576c777c98bb1",
        certId: "",
        desc: "Successfully completed 11 hours of training through self-paced online learning covering Interpersonal Skills."
    },
    {
        title: "Microcertificate of Completion - Effective Speaking and Listening Skills",
        organization: "Wadhwani Foundation",
        date: "November 18, 2026",
        image: "assets/images/certificates/effective-speaking.png",
        verifyUrl: "https://web.certificate.wfglobal.org/en/certificate?certificateId=6afdac9df0a576c777c98bdb",
        certId: "",
        desc: "Successfully completed 9.75 hours of training through self-paced online learning covering Effective Speaking and Listening Skills."
    },
    {
        title: "Microcertificate of Completion - Self-Management",
        organization: "Wadhwani Foundation",
        date: "November 18, 2026",
        image: "assets/images/certificates/self-management.png",
        verifyUrl: "https://web.certificate.wfglobal.org/en/certificate?certificateId=6afdacbf1eabbe677fc39e25",
        certId: "",
        desc: "Successfully completed 8.75 hours of training through self-paced online learning covering Self-Management."
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
                        <!-- Thumbnail Image (Clickable to view full size and details) -->
                        <div class="relative aspect-[16/9] overflow-hidden bg-slate-900 cursor-pointer view-cert-btn" data-index="${index}">
                            <img src="${cert.image}" alt="${cert.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'">
                            <div class="absolute inset-0 bg-darkBg/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span class="px-4 py-2 rounded-xl bg-primaryAccent text-white text-xs font-semibold shadow-lg">Click to View Full Size</span>
                            </div>
                        </div>

                        <!-- Compact Card Content -->
                        <div class="p-6 flex flex-col flex-grow">
                            <span class="text-xs text-primaryAccent font-semibold uppercase tracking-wider mb-1">${cert.date}</span>
                            <h3 class="text-lg font-bold text-primaryText mb-1 line-clamp-2">${cert.title}</h3>
                            <p class="text-secondaryText text-xs mb-4">${cert.organization}</p>

                            <!-- Footer Actions -->
                            <div class="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                                <button class="view-cert-btn text-primaryAccent font-semibold text-sm hover:underline flex items-center gap-1" data-index="${index}">
                                    <span>View Full Size</span>
                                    <i data-lucide="maximize-2" class="w-4 h-4"></i>
                                </button>
                                ${cert.verifyUrl ? `
                                    <a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-primaryAccent hover:text-white transition-all flex items-center gap-1">
                                        <i data-lucide="external-link" class="w-3 h-3"></i>
                                        <span>Verify</span>
                                    </a>
                                ` : ''}
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
                            <div class="relative w-full max-w-4xl rounded-3xl bg-cardBg border border-slate-800 shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
                                <div class="p-6 border-b border-slate-800 flex items-center justify-between">
                                    <div>
                                        <h3 class="text-xl font-bold text-primaryText">${cert.title}</h3>
                                        <p class="text-xs text-secondaryText mt-1">${cert.organization} • ${cert.date}</p>
                                    </div>
                                    <button id="close-cert-modal" class="p-2 rounded-xl bg-slate-800 text-secondaryText hover:text-white">
                                        <i data-lucide="x" class="w-5 h-5"></i>
                                    </button>
                                </div>
                                <div class="p-6 overflow-y-auto space-y-6 bg-slate-950">
                                    <div class="flex justify-center">
                                        <img src="${cert.image}" alt="${cert.title}" class="max-w-full h-auto rounded-xl shadow-2xl border border-slate-800">
                                    </div>
                                    <div class="bg-cardBg p-4 rounded-2xl border border-slate-800 space-y-2">
                                        <h4 class="text-sm font-semibold uppercase tracking-wider text-primaryAccent">Certificate Details</h4>
                                        <p class="text-secondaryText text-sm leading-relaxed">${cert.desc}</p>
                                        ${cert.certId ? `<p class="text-xs text-slate-400 font-mono pt-2">Certificate ID: ${cert.certId}</p>` : ''}
                                    </div>
                                </div>
                                <div class="p-4 border-t border-slate-800 flex items-center justify-end gap-3 bg-cardBg">
                                    ${cert.verifyUrl ? `
                                        <a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-primaryAccent text-white text-sm font-semibold shadow-md hover:opacity-95 flex items-center gap-2">
                                            <i data-lucide="external-link" class="w-4 h-4"></i>
                                            <span>Verify Certificate</span>
                                        </a>
                                    ` : ''}
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