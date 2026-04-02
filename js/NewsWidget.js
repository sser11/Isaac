import { UIComponent } from './UIComponent.js';

export class NewsWidget extends UIComponent {
    constructor(config) {
        super(config);
        this.title = config.title || '📰 Новости игры';
        this.news = [];
    }

    async fetchNews() {
        try {
            const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://bindingofisaac.com/feed/');
            const data = await response.json();
            return data.items?.slice(0, 5) || this.getFallbackNews();
        } catch (error) {
            console.warn('API error, using fallback data');
            return this.getFallbackNews();
        }
    }

    getFallbackNews() {
        return [
            { title: 'Релиз The Binding of Isaac: Repentance+', pubDate: '2024-11-20', description: 'Новые предметы и трансформации!' },
            { title: 'Анонс сотрудничества с Enter the Gungeon', pubDate: '2024-11-15', description: 'Кроссовер предметы уже в игре' },
            { title: 'Обновление 1.7.9: Баланс трансформаций', pubDate: '2024-11-10', description: 'Гаппи и Левиафан теперь сильнее' },
            { title: 'Скидка в Steam: -50% на все DLC', pubDate: '2024-11-05', description: 'Покупайте выгодно' },
            { title: 'Новый ивент: Неделя Исаака', pubDate: '2024-11-01', description: 'Ежедневные испытания' }
        ];
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
        if (!this.news || this.news.length === 0) {
            container.innerHTML = '<div class="error">❌ Не удалось загрузить новости</div>';
            return;
        }

        const newsList = document.createElement('div');
        newsList.className = 'news-list';

        this.news.forEach(item => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <div class="news-title">📌 ${item.title}</div>
                <div class="news-description">${item.description || item.content?.substring(0, 100) || ''}</div>
                <div class="news-date">📅 ${new Date(item.pubDate).toLocaleDateString('ru-RU')}</div>
            `;
            newsList.appendChild(newsItem);
        });

        container.innerHTML = '';
        container.appendChild(newsList);
    }
}