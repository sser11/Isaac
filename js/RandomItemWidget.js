import { UIComponent } from './UIComponent.js';

const FALLBACK_ITEMS = [
    { name: 'Brimstone', emoji: '💀', description: 'Луч смерти, пробивающий врагов' },
    { name: 'Sacred Heart', emoji: '❤️', description: 'Огромный урон и замедление пуль' },
    { name: 'Godhead', emoji: '✨', description: 'Аура, наносящая урон вокруг' },
    { name: 'Tech X', emoji: '⚡', description: 'Лазерные кольца, пробивающие стены' },
    { name: 'Mom\'s Knife', emoji: '🔪', description: 'Управляемый нож' }
];

export class RandomItemWidget extends UIComponent {
    constructor(config) {
        super(config);
        this.title = config.title || '🎲 Случайный предмет';
        this.currentItem = null;
    }

    async fetchRandomItem() {
        try {
            const response = await fetch('https://api.isaacguru.com/v1/items/random');
            const data = await response.json();
            return {
                name: data.name || 'Unknown',
                emoji: this.getEmojiForItem(data.name),
                description: data.description || 'Описание отсутствует'
            };
        } catch (error) {
            console.warn('API error, using fallback items');
            return FALLBACK_ITEMS[Math.floor(Math.random() * FALLBACK_ITEMS.length)];
        }
    }

    getEmojiForItem(name) {
        const emojiMap = {
            'brimstone': '💀',
            'sacred': '❤️',
            'godhead': '✨',
            'tech': '⚡',
            'knife': '🔪'
        };
        for (const [key, emoji] of Object.entries(emojiMap)) {
            if (name.toLowerCase().includes(key)) return emoji;
        }
        return '🎁';
    }

    async render() {
        const container = document.createElement('div');
        container.innerHTML = '<div class="loading">🎲 Загрузка предмета...</div>';
        
        const widget = this.createWidgetContainer(container);
        
        this.currentItem = await this.fetchRandomItem();
        this.displayItem(container);
        
        return widget;
    }

    displayItem(container) {
        const refresh = () => this.refreshItem(container);
        
        container.innerHTML = `
            <div class="item-card">
                <div class="item-icon">${this.currentItem.emoji}</div>
                <div class="item-name">${this.currentItem.name}</div>
                <div class="item-description">${this.currentItem.description}</div>
                <button class="refresh-btn">🎲 Случайный предмет</button>
            </div>
        `;
        
        const btn = container.querySelector('.refresh-btn');
        if (btn) {
            this.addListener(btn, 'click', refresh);
        }
    }

    async refreshItem(container) {
        container.innerHTML = '<div class="loading">🎲 Загрузка...</div>';
        this.currentItem = await this.fetchRandomItem();
        this.displayItem(container);
    }
}