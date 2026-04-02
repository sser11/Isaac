import { UIComponent } from './UIComponent.js';

// База данных предметов с реальными изображениями из игры
const ITEMS_IMAGES = {
    'Коготь Гаппи': 'https://static.wikia.nocookie.net/bindingofisaac/images/e/ef/Guppy%27s_Paw.png',
    'Голова Гаппи': 'https://static.wikia.nocookie.net/bindingofisaac/images/e/e9/Guppy%27s_Head.png',
    'Хвост Гаппи': 'https://static.wikia.nocookie.net/bindingofisaac/images/2/2c/Guppy%27s_Tail.png',
    'Сатанинская Библия': 'https://static.wikia.nocookie.net/bindingofisaac/images/5/5a/Satanic_Bible.png',
    'Копыта': 'https://static.wikia.nocookie.net/bindingofisaac/images/d/d6/Ceremonial_Robe.png',
    'Рога': 'https://static.wikia.nocookie.net/bindingofisaac/images/f/fe/Goat_Head.png',
    'Крылья': 'https://static.wikia.nocookie.net/bindingofisaac/images/6/6d/Angel_Wings.png',
    'Святой Грааль': 'https://static.wikia.nocookie.net/bindingofisaac/images/f/f9/Holy_Grail.png',
    'Нимб': 'https://static.wikia.nocookie.net/bindingofisaac/images/7/71/Halo.png',
    'Мушиная корона': 'https://static.wikia.nocookie.net/bindingofisaac/images/3/33/Cricket%27s_Head.png',
    'Муха': 'https://static.wikia.nocookie.net/bindingofisaac/images/5/5d/Skull.png',
    'Сморкач': 'https://static.wikia.nocookie.net/bindingofisaac/images/6/6f/Bob%27s_Rotten_Head.png',
    'Библия': 'https://static.wikia.nocookie.net/bindingofisaac/images/1/1a/The_Bible.png',
    'Книга теней': 'https://static.wikia.nocookie.net/bindingofisaac/images/f/f2/Book_of_Shadows.png',
    'Книга Бел': 'https://static.wikia.nocookie.net/bindingofisaac/images/2/2d/The_Book_of_Belial.png',
    'Паук': 'https://static.wikia.nocookie.net/bindingofisaac/images/6/67/Spiders.png',
    'Паутина': 'https://static.wikia.nocookie.net/bindingofisaac/images/3/3e/Web.png',
    'Мешок пауков': 'https://static.wikia.nocookie.net/bindingofisaac/images/c/c4/Sack_of_Spiders.png'
};

const TRANSFORMATIONS_DATA = {
    'guppy': {
        name: '🐱 Кот Гаппи',
        icon: '🐱',
        items: ['Коготь Гаппи', 'Голова Гаппи', 'Хвост Гаппи'],
        effect: 'Мухи при атаке, полёт, +1 жизнь'
    },
    'leviathan': {
        name: '😈 Левиафан',
        icon: '😈',
        items: ['Сатанинская Библия', 'Копыта', 'Рога'],
        effect: '+1 сердце, увеличенный урон, скорость'
    },
    'seraphim': {
        name: '👼 Серафим',
        icon: '👼',
        items: ['Крылья', 'Святой Грааль', 'Нимб'],
        effect: 'Полёт, сердечки душ, +1 сердечко души'
    },
    'beelzebub': {
        name: '🪰 Вельзевул',
        icon: '🪰',
        items: ['Мушиная корона', 'Муха', 'Сморкач'],
        effect: 'Синие мухи, иммунитет к спайкам'
    },
    'bookworm': {
        name: '📚 Книжный червь',
        icon: '📚',
        items: ['Библия', 'Книга теней', 'Книга Бел'],
        effect: 'Дополнительный заряд активных предметов'
    },
    'spider_baby': {
        name: '🕷️ Паучий ребенок',
        icon: '🕷️',
        items: ['Паук', 'Паутина', 'Мешок пауков'],
        effect: 'Пауки-союзники при получении урона'
    }
};

export class TransformationsWidget extends UIComponent {
    constructor(config) {
        super(config);
        this.title = config.title || '🔮 Трансформации';
        this.expandedId = null;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'transformations-list';

        Object.entries(TRANSFORMATIONS_DATA).forEach(([key, trans]) => {
            const item = this.createTransformationItem(key, trans);
            container.appendChild(item);
        });

        return this.createWidgetContainer(container);
    }

    createTransformationItem(key, trans) {
        const wrapper = document.createElement('div');
        wrapper.className = 'transformation-item';

        const summary = document.createElement('div');
        summary.className = 'transformation-summary';
        summary.innerHTML = `
            <div class="transformation-icon">${trans.icon}</div>
            <div class="transformation-name">${trans.name}</div>
            <div class="transformation-arrow">▼</div>
        `;

        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'transformation-recipe';
        recipeDiv.style.display = 'none';
        recipeDiv.innerHTML = `
            <div class="recipe-title">📜 Рецепт трансформации:</div>
            <div class="items-list" id="items-${key}"></div>
            <div class="recipe-title">✨ Эффект: ${trans.effect}</div>
        `;

        wrapper.appendChild(summary);
        wrapper.appendChild(recipeDiv);

        const itemsContainer = recipeDiv.querySelector(`#items-${key}`);
        trans.items.forEach(itemName => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'recipe-item';
            const imgUrl = ITEMS_IMAGES[itemName] || 'https://static.wikia.nocookie.net/bindingofisaac/images/9/97/Question_Mark.png';
            itemDiv.innerHTML = `
                <img class="recipe-item-img" src="${imgUrl}" alt="${itemName}" onerror="this.src='https://static.wikia.nocookie.net/bindingofisaac/images/9/97/Question_Mark.png'">
                <div class="recipe-item-name">${itemName}</div>
            `;
            itemsContainer.appendChild(itemDiv);
        });

        this.addListener(summary, 'click', () => {
            const isExpanded = recipeDiv.style.display === 'block';
            recipeDiv.style.display = isExpanded ? 'none' : 'block';
            summary.querySelector('.transformation-arrow').textContent = isExpanded ? '▼' : '▲';
        });

        return wrapper;
    }
}
