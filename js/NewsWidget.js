import { UIComponent } from './UIComponent.js';

const FALLBACK_NEWS = [
    { title: 'Релиз The Binding of Isaac: Repentance+', date: '2024-11-20', description: 'Новые предметы, трансформации и достижения!' },
    { title: 'Анонс сотрудничества с Enter the Gungeon', date: '2024-11-15', description: 'Кроссовер предметы уже в игре' },
    { title: 'Обновление 1.7.9: Баланс трансформаций', date: '2024-11-10', description: 'Гаппи и Левиафан теперь сильнее' },
    { title: 'Скидка в Steam: -50% на все DLC', date: '2024-11-05', description: 'Покупайте выгодно до конца месяца' },
    { title: 'Новый ивент: Неделя Исаака', date: '2024-11-01', description: 'Ежедневные испытания с наградами' }
];

export class NewsWidget extends UIComponent {
    constructor(config) {
        super(config);
        this.title = config.title || 'Новости игры';
        this.news = [];
    }

    async fetchNews() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(FALLBACK_NEWS);
            }, 500);
        });
    }

    async render() {
        const container = document.createElement('div');
        container.innerHTML = '<div class="loading">📡 Загрузка новостей...</div>';
        
        const widget = this.createWidgetContainer(container);
        
        this.news = await this.fetchNews();
        this.displayNews(container);
        
        return widget;
    }

    displayNews(container) {
        const newsList = document.createElement('div');
        newsList.className = 'news-list';

        this.news.forEach(item => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <div class="news-title">📌 ${item.title}</div>
                <div class="news-description">${item.description}</div>
                <div class="news-date">📅 ${item.date}</div>
            `;
            newsList.appendChild(newsItem);
        });

        container.innerHTML = '';
        container.appendChild(newsList);
    }
}
