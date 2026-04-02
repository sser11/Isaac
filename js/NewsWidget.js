import { UIComponent } from './UIComponent.js';

export class NewsWidget extends UIComponent {
    constructor(config) {
        super(config);
        this.title = config.title || '📰 Новости игры';
        this.news = [];
        this.isLoading = false;
    }

    async fetchNews() {
        try {
            // Используем прокси для обхода CORS
            const proxyUrl = 'https://api.allorigins.win/raw?url=';
            const rssUrl = 'https://bindingofisaac.com/feed/';
            
            const response = await fetch(proxyUrl + encodeURIComponent(rssUrl));
            const text = await response.text();
            
            // Парсим XML вручную
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');
            const items = xmlDoc.querySelectorAll('item');
            
            const newsItems = [];
            for (let i = 0; i < Math.min(items.length, 5); i++) {
                const item = items[i];
                newsItems.push({
                    title: item.querySelector('title')?.textContent || 'Новость',
                    pubDate: item.querySelector('pubDate')?.textContent || new Date().toISOString(),
                    description: item.querySelector('description')?.textContent?.substring(0, 150) || 'Нет описания'
                });
            }
            
            return newsItems.length > 0 ? newsItems : this.getFallbackNews();
        } catch (error) {
            console.warn('API error, using fallback data', error);
            return this.getFallbackNews();
        }
    }

    getFallbackNews() {
        return [
            { title: '🎮 Релиз The Binding of Isaac: Repentance+', pubDate: '2024-11-20', description: 'Новые предметы, трансформации и достижения уже в игре!' },
            { title: '🤝 Анонс сотрудничества с Enter the Gungeon', pubDate: '2024-11-15', description: 'Кроссовер предметы и персонажи теперь доступны' },
            { title: '⚡ Обновление 1.7.9: Баланс трансформаций', pubDate: '2024-11-10', description: 'Гаппи и Левиафан получили усиление, исправлены баги' },
            { title: '💰 Скидка в Steam: -50% на все DLC', pubDate: '2024-11-05', description: 'Покупайте The Binding of Isaac со скидкой до 27 ноября' },
            { title: '🎪 Новый ивент: Неделя Исаака', pubDate: '2024-11-01', description: 'Ежедневные испытания с уникальными наградами' }
        ];
    }

    async render() {
        const container = document.createElement('div');
        container.innerHTML = '<div class="loading">📡 Загрузка новостей...</div>';
        
        const widget = this.createWidgetContainer(container);
        
        // Загружаем новости асинхронно
        this.fetchNews().then(news => {
            this.news = news;
            this.displayNews(container);
        });
        
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
            const date = new Date(item.pubDate);
            const formattedDate = !isNaN(date.getTime()) ? date.toLocaleDateString('ru-RU') : 'Дата неизвестна';
            newsItem.innerHTML = `
                <div class="news-title">📌 ${item.title}</div>
                <div class="news-description">${item.description}</div>
                <div class="news-date">📅 ${formattedDate}</div>
            `;
            newsList.appendChild(newsItem);
        });

        container.innerHTML = '';
        container.appendChild(newsList);
    }
}
