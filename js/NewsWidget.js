import { UIComponent } from './UIComponent.js';

const NEWS_DATA = [
    { 
        title: '🎮 Релиз The Binding of Isaac: Repentance+', 
        date: '20 ноября 2024', 
        description: 'Новые предметы, трансформации и достижения! Добавлено более 100 новых предметов и 5 новых трансформаций.' 
    },
    { 
        title: '🤝 Кроссовер с Enter the Gungeon', 
        date: '15 ноября 2024', 
        description: 'Эксклюзивные предметы из Enter the Gungeon теперь доступны в игре. Пули, пистолеты и уникальные синергии!' 
    },
    { 
        title: '⚡ Обновление 1.7.9: Баланс трансформаций', 
        date: '10 ноября 2024', 
        description: 'Гаппи и Левиафан получили усиление. Исправлены баги с трансформацией Серафима.' 
    },
    { 
        title: '💰 Скидка в Steam: -50% на все DLC', 
        date: '5 ноября 2024', 
        description: 'Покупайте The Binding of Isaac со скидкой до 50%. Акция действует до 30 ноября.' 
    },
    { 
        title: '🎪 Новый ивент: Неделя Исаака', 
        date: '1 ноября 2024', 
        description: 'Ежедневные испытания с уникальными наградами. Заходи каждый день и получай эксклюзивные предметы!' 
    },
    { 
        title: '🏆 Новые достижения в Steam', 
        date: '25 октября 2024', 
        description: 'Добавлено 20 новых достижений для настоящих фанатов. Сможешь получить их все?' 
    }
];

export class NewsWidget extends UIComponent {
    constructor(config) {
        super(config);
        this.title = config.title || '📰 Новости игры';
    }

    render() {
        const container = document.createElement('div');
        container.innerHTML = '<div class="loading">📡 Загрузка новостей...</div>';
        
        const widget = this.createWidgetContainer(container);
        
        // Имитация загрузки с сервера
        setTimeout(() => {
            this.displayNews(container);
        }, 300);
        
        return widget;
    }

    displayNews(container) {
        const newsList = document.createElement('div');
        newsList.className = 'news-list';

        NEWS_DATA.forEach(item => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <div class="news-title">${item.title}</div>
                <div class="news-description">${item.description}</div>
                <div class="news-date">📅 ${item.date}</div>
            `;
            newsList.appendChild(newsItem);
        });

        container.innerHTML = '';
        container.appendChild(newsList);
    }
}
