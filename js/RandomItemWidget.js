import { UIComponent } from './UIComponent.js';

const ITEMS_DB = [
    { name: 'Brimstone', description: 'Луч смерти, пробивающий всех врагов', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/c/c9/Brimstone.png' },
    { name: 'Sacred Heart', description: 'Огромный урон и замедление вражеских пуль', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/9/9a/Sacred_Heart.png' },
    { name: 'Godhead', description: 'Аура, наносящая урон врагам вокруг', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/9/97/Godhead.png' },
    { name: 'Tech X', description: 'Лазерные кольца, пробивающие стены', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/4/4b/Tech_X.png' },
    { name: "Mom's Knife", description: 'Управляемый нож, наносящий огромный урон', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/3/3a/Mom%27s_Knife.png' },
    { name: "Cricket's Head", description: 'Значительно увеличивает урон', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/3/33/Cricket%27s_Head.png' },
    { name: 'Magic Mushroom', description: 'Увеличивает все характеристики', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/c/c2/Magic_Mushroom.png' },
    { name: 'Polyphemus', description: 'Огромный урон, медленная скорость стрельбы', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/f/fc/Polyphemus.png' }
];

export class RandomItemWidget extends UIComponent {
    constructor(config) {
        super(config);
        this.title = config.title || 'Случайный предмет';
        this.currentItem = null;
    }

    async fetchRandomItem() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * ITEMS_DB.length);
                resolve(ITEMS_DB[randomIndex]);
            }, 300);
        });
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
                <div class="item-icon">
                    <img class="item-image" src="${this.currentItem.img}" alt="${this.currentItem.name}" onerror="this.src='https://via.placeholder.com/100x100?text=?'">
                </div>
                <div class="item-name">${this.currentItem.name}</div>
                <div class="item-description">${this.currentItem.description}</div>
                <button class="refresh-btn">🎲 Случайный предмет</button>
            </div>
        `;
        
        const btn = container.querySelector('.refresh-btn');
        if (btn) {
            btn.addEventListener('click', refresh);
        }
    }

    async refreshItem(container) {
        container.innerHTML = '<div class="loading">🎲 Загрузка...</div>';
        this.currentItem = await this.fetchRandomItem();
        this.displayItem(container);
    }
}
