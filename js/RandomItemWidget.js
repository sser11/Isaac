import { UIComponent } from './UIComponent.js';

const ITEMS_DATABASE = [
    { name: 'Brimstone', description: 'Луч смерти, пробивающий всех врагов на пути. Огромный урон и дальность.', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/c/c9/Brimstone.png/revision/latest?cb=20150913172442' },
    { name: 'Sacred Heart', description: 'Огромный урон и замедление вражеских пуль. Слезы становятся гоминг-снарядами.', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/9/9a/Sacred_Heart.png/revision/latest?cb=20150913173918' },
    { name: 'Godhead', description: 'Аура, наносящая урон врагам вокруг. Очень редкий и мощный предмет.', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/9/97/Godhead.png/revision/latest?cb=20150913173152' },
    { name: 'Tech X', description: 'Лазерные кольца, пробивающие стены. Отличный предмет для прохождения.', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/4/4b/Tech_X.png/revision/latest?cb=20150913174104' },
    { name: "Mom's Knife", description: 'Управляемый нож, наносящий огромный урон. Можно контролировать направление.', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/3/3a/Mom%27s_Knife.png/revision/latest?cb=20150913173535' },
    { name: "Cricket's Head", description: 'Значительно увеличивает урон. Простой но эффективный предмет.', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/3/33/Cricket%27s_Head.png/revision/latest?cb=20150913172729' },
    { name: 'Magic Mushroom', description: 'Увеличивает все характеристики. Один из лучших предметов в игре.', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/c/c2/Magic_Mushroom.png/revision/latest?cb=20150913173502' },
    { name: 'Polyphemus', description: 'Огромный урон, но медленная скорость стрельбы. Один выстрел - одна смерть.', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/f/fc/Polyphemus.png/revision/latest?cb=20150913173818' },
    { name: 'Ipecac', description: 'Взрывные слезы, наносящие урон по площади. Осторожно - можно взорвать себя!', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/9/99/Ipecac.png/revision/latest?cb=20150913173404' },
    { name: 'Epic Fetus', description: 'Управляемые ракеты с огромным уроном. Полный контроль над полем боя.', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/2/2b/Epic_Fetus.png/revision/latest?cb=20150913173035' }
];

export class RandomItemWidget extends UIComponent {
    constructor(config) {
        super(config);
        this.title = config.title || '🎲 Случайный предмет';
        this.currentItem = null;
    }

    getRandomItem() {
        const randomIndex = Math.floor(Math.random() * ITEMS_DATABASE.length);
        return ITEMS_DATABASE[randomIndex];
    }

    render() {
        const container = document.createElement('div');
        container.innerHTML = '<div class="loading">🎲 Загрузка предмета...</div>';
        
        const widget = this.createWidgetContainer(container);
        
        // Имитация загрузки
        setTimeout(() => {
            this.currentItem = this.getRandomItem();
            this.displayItem(container);
        }, 300);
        
        return widget;
    }

    displayItem(container) {
        const refresh = () => {
            container.innerHTML = '<div class="loading">🎲 Загрузка...</div>';
            setTimeout(() => {
                this.currentItem = this.getRandomItem();
                this.displayItem(container);
            }, 200);
        };
        
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
}
