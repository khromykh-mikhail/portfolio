import { translations } from "./translations.js";

document.addEventListener("DOMContentLoaded", () => {
    // =====================
    // 🌙 THEME MANAGEMENT
    // =====================
    const themeBtn = document.getElementById('theme-btn');
    const themeBtnMobile = document.getElementById('theme-btn-mobile');

    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const dark = document.body.classList.contains('dark-mode');
        if (themeBtn) themeBtn.textContent = dark ? '☀️' : '🌙';
        if (themeBtnMobile) themeBtnMobile.textContent = dark ? '☀️' : '🌙';
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }

    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    if (themeBtnMobile) themeBtnMobile.addEventListener('click', toggleTheme);

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeBtn) themeBtn.textContent = '☀️';
        if (themeBtnMobile) themeBtnMobile.textContent = '☀️';
    }

    // =====================
    // 🌐 LANGUAGE MANAGEMENT
    // =====================
    const langSelect = document.getElementById('lang-select');
    const langSelectMobile = document.getElementById('lang-select-mobile');

    function changeLanguage(lang) {
        if (!translations[lang]) return;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) el.textContent = translations[lang][key];
        });

        // Optional sections (exist only on homepage)
        const profileIntro = document.querySelector('.section__text__p1');
        const profileDesc = document.querySelector('.section__text__p2');
        const downloadBtn = document.querySelector('.btn-color-2');
        const contactBtn = document.querySelector('.btn-color-1');
        const expTitle = document.querySelector('#experiance .title');
        const projTitle = document.querySelector('#projects .title');
        const contactTitle = document.querySelector('#contact .title');
        const returnBtn = document.querySelector('.btn-color-3');

        if (profileIntro) profileIntro.textContent = translations[lang].profile_intro;
        if (profileDesc) profileDesc.textContent = translations[lang].profile_desc;
        if (downloadBtn) downloadBtn.textContent = translations[lang].download_cv;
        if (contactBtn) contactBtn.textContent = translations[lang].contact_btn;
        if (expTitle) expTitle.textContent = translations[lang].competences;
        if (projTitle) projTitle.textContent = translations[lang].projects_title;
        if (contactTitle) contactTitle.textContent = translations[lang].contact_title;
        if (returnBtn) returnBtn.textContent = translations[lang].return_title;

        localStorage.setItem('lang', lang);
    }

    if (langSelect) langSelect.addEventListener('change', e => changeLanguage(e.target.value));
    if (langSelectMobile) langSelectMobile.addEventListener('change', e => changeLanguage(e.target.value));

    const savedLang = localStorage.getItem('lang') || 'fr';
    changeLanguage(savedLang);
    if (langSelect) langSelect.value = savedLang;
    if (langSelectMobile) langSelectMobile.value = savedLang;

    // =====================
    // 🍔 MENU TOGGLE
    // =====================
    const menuIcon = document.querySelector(".hamburger-icon");
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            document.querySelector(".menu-links")?.classList.toggle("open");
            menuIcon.classList.toggle("open");
        });
    }

    // =====================
    // 🎠 CAROUSEL (if exists)
    // =====================
    const images = document.querySelectorAll('.carousel img');
    if (images.length > 0) {
        let current = 0;
        const nextBtn = document.getElementById('next');
        const prevBtn = document.getElementById('prev');

        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                current = (current + 1) % images.length;
                showImage(current);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                current = (current - 1 + images.length) % images.length;
                showImage(current);
            });
        }
    }
});
