import { Dashboard } from './js/Dashboard.js';

// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Создаём дашборд
    const dashboard = new Dashboard('widgetsGrid');

    // Добавляем обработчики для кнопок
    const addTransformationsBtn = document.getElementById('addTransformationsBtn');
    const addNewsBtn = document.getElementById('addNewsBtn');
    const addRandomItemBtn = document.getElementById('addRandomItemBtn');

    if (addTransformationsBtn) {
        addTransformationsBtn.addEventListener('click', () => {
            dashboard.addWidget('transformations', { title: '🔮 Трансформации Исаака' });
        });
    }

    if (addNewsBtn) {
        addNewsBtn.addEventListener('click', () => {
            dashboard.addWidget('news', { title: '📰 Последние новости' });
        });
    }

    if (addRandomItemBtn) {
        addRandomItemBtn.addEventListener('click', () => {
            dashboard.addWidget('randomItem', { title: '🎲 Рандомный предмет' });
        });
    }

    // Создаём стартовые виджеты
    dashboard.addWidget('transformations', { title: '🔮 Трансформации Исаака' });
    dashboard.addWidget('news', { title: '📰 Последние новости' });
    dashboard.addWidget('randomItem', { title: '🎲 Рандомный предмет' });
});
