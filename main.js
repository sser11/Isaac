import { Dashboard } from './js/Dashboard.js';

document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new Dashboard('widgetsGrid');

    const addTransformationsBtn = document.getElementById('addTransformationsBtn');
    const addCharactersBtn = document.getElementById('addCharactersBtn');

    if (addTransformationsBtn) {
        addTransformationsBtn.addEventListener('click', () => {
            dashboard.addWidget('transformations', { title: '🔮 Трансформации Исаака' });
        });
    }

    if (addCharactersBtn) {
        addCharactersBtn.addEventListener('click', () => {
            dashboard.addWidget('characters', { title: '👥 Персонажи The Binding of Isaac' });
        });
    }

    // Создаём стартовые виджеты
    dashboard.addWidget('transformations', { title: '🔮 Трансформации Исаака' });
    dashboard.addWidget('characters', { title: '👥 Персонажи The Binding of Isaac' });
});
