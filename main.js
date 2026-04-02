import { Dashboard } from './js/Dashboard.js';

document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new Dashboard('widgetsGrid');

    document.getElementById('addTransformationsBtn').addEventListener('click', () => {
        dashboard.addWidget('transformations');
    });

    document.getElementById('addNewsBtn').addEventListener('click', () => {
        dashboard.addWidget('news');
    });

    document.getElementById('addRandomItemBtn').addEventListener('click', () => {
        dashboard.addWidget('randomItem');
    });

    dashboard.addWidget('transformations', { title: '🔮 Трансформации Исаака' });
    dashboard.addWidget('news', { title: '📰 Последние новости' });
    dashboard.addWidget('randomItem', { title: '🎲 Рандомный предмет' });
});