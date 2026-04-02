import { UIComponent } from './UIComponent.js';

// Реальная база предметов из игры с изображениями
const ISAAC_ITEMS = [
    { name: 'Brimstone', emoji: '💀', description: 'Луч смерти, пробивающий всех врагов на пути', image: 'https://static.wikia.nocookie.net/bindingofisaac/images/c/c9/Brimstone.png' },
    { name: 'Sacred Heart', emoji: '❤️', description: 'Огромный урон и замедление вражеских пуль', image: 'https://static.wikia.nocookie.net/bindingofisaac/images/9/9a/Sacred_Heart.png' },
    { name: 'Godhead', emoji: '✨', description: 'Аура, наносящая урон врагам вокруг', image: 'https://static.wikia.nocookie.net/bindingofisaac/images/9/97/Godhead.png' },
    { name: 'Tech X', emoji: '⚡', description: 'Лазерные кольца, пробивающие стены', image: 'https://static.wikia.nocookie.net/bindingofisaac/images/4/4b/Tech_X.png' },
    { name: "Mom's Knife", emoji: '🔪', description: 'Управляемый нож, наносящий огромный урон', image: 'https://static.wikia.nocookie.net/bindingofisaac/images/3/3a/Mom%27s_Knife.png' },
    { name: 'Cricket\'s Head', emoji: '🐞', description: 'Значительно увеличивает урон', image: 'https://static.wikia.nocookie.net/bindingofisaac/images/3/33/Cricket%27s_Head.png' },
    { name: 'Magic Mushroom', emoji: '🍄', description: 'Увеличивает все характеристики', image: 'https://static.wikia.nocookie.net/bindingofisaac/images/c/c2/Magic_Mushroom.png' },
    { name: 'Polyphemus', emoji: '👁️', description: 'Огромный урон, медленная скорость стрельбы', image: 'https://static.wikia.nocookie.net/bindingofisaac/images/f/fc/Polyphemus.png' },
    { name: 'Ipecac', emoji: '🧪', description: 'Взрывные слезы, наносящие урон по площади', image: 'https://static.wikia.nocookie.net/bindingofisaac/images/9/99/Ipecac.png' },
    { name: 'Epic Fetus', emoji: '🚀', description: 'Управляемые ракеты с огромным уроном', image: 'https://static.wikia.nocookie.net/bindingofisaac/images/2/2b/Epic_Fetus.png' }
];

export class RandomItemWidget extends UIComponent {
    constructor(config) {
        super(config);
        this.title = config.title || '🎲 Случайный предмет';
        this.currentItem = null;
    }

    async fetchRandomItem() {
        try {
            // Пытаемся получить данные из API, если не получается - используем локальную базу
            const response = await fetch('https://api.isaacguru.com/v1/items/random', {
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                return {
                    name: data.name || 'Unknown Item',
                    description: data.description || 'Описание отсутствует',
                    image: data.image || this.getDefaultImageForItem(data.name)
                };
            }
            throw new Error('API not available');
        } catch (error) {
            console.warn('Using local item database');
            return ISAAC_ITEMS[Math.floor(Math.random() * ISAAC_ITEMS.length)];
        }
    }

    getDefaultImageForItem(name) {
        const item = ISAAC_ITEMS.find(i => i.name.toLowerCase() === name?.toLowerCase());
        return item?.image || 'https://static.wikia.nocookie.net/bindingofisaac/images/9/97/Question_Mark.png';
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
        
        const itemImage = this.currentItem.image || this.getDefaultImageForItem(this.currentItem.name);
        
        container.innerHTML = `
            <div class="item-card">
                <div class="item-icon">
                    <img src="${itemImage}" alt="${this.currentItem.name}" class="item-image" onerror="this.src='https://static.wikia.nocookie.net/bindingofisaac/images/9/97/Question_Mark.png'">
                </div>
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
