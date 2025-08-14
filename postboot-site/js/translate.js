document.addEventListener('DOMContentLoaded', () => {
    const defaultLanguage = 'pt';
    let translations = {};

    // Função para carregar as traduções de um arquivo JSON
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`translations/${lang}.json`);
            if (!response.ok) {
                console.error(`Could not load ${lang}.json`);
                return;
            }
            translations = await response.json();
            applyTranslations();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    // Função para aplicar as traduções aos elementos da página
    function applyTranslations() {
        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }

    // Função para definir o idioma
    window.setLanguage = function(lang) {
        localStorage.setItem('language', lang);
        loadTranslations(lang);
    }

    // Função para inicializar o tradutor
    function initialize() {
        const savedLanguage = localStorage.getItem('language');
        const browserLanguage = navigator.language.split('-')[0];

        const language = savedLanguage || (['en', 'pt'].includes(browserLanguage) ? browserLanguage : defaultLanguage);
        
        // Adiciona o toggle de idioma ao seletor
        const langSelector = document.getElementById('language-selector');
        if (langSelector) {
            langSelector.innerHTML = `
                <label class="switch">
                    <input type="checkbox" id="languageToggle">
                    <span class="slider round"></span>
                    <span class="lang-label lang-pt">PT</span>
                    <span class="lang-label lang-en">EN</span>
                </label>
            `;
            const toggle = document.getElementById('languageToggle');
            if (toggle) {
                toggle.checked = (language === 'en'); // Define o estado inicial
                toggle.addEventListener('change', () => {
                    setLanguage(toggle.checked ? 'en' : 'pt');
                });
            }
        }

        loadTranslations(language);
    }

    initialize();
});
