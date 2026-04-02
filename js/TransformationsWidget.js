import { UIComponent } from './UIComponent.js';

const TRANSFORMATIONS_DATA = {
    'guppy': {
        name: 'Кот Гаппи',
        icon: '🐱',
        items: [
            { name: 'Коготь Гаппи', img: 'https://bindingofisaac.fandom.com/wiki/Guppy%27s_Paw?file=Guppy%27s_Paw.png' },
            { name: 'Голова Гаппи', img: 'https://bindingofisaac.fandom.com/wiki/Guppy%27s_Head?file=Guppy%27s_Head.png' },
            { name: 'Хвост Гаппи', img: 'https://bindingofisaac.fandom.com/wiki/Guppy%27s_Tail?file=Guppy%27s_Tail.png' }
        ],
        effect: 'Мухи при атаке, полёт, дополнительная жизнь'
    },
    'leviathan': {
        name: 'Левиафан',
        icon: '😈',
        items: [
            { name: 'Сатанинская Библия', img: 'https://bindingofisaac.fandom.com/wiki/Satanic_Bible?file=Satanic_Bible.png' },
            { name: 'Церемониальное Одеяние', img: 'https://bindingofisaac.fandom.com/wiki/Ceremonial_Robe?file=Ceremonial_Robe.png' },
            { name: 'Козлиная Голова', img: 'https://bindingofisaac.fandom.com/wiki/Goat_Head?file=Goat_Head.png' }
        ],
        effect: 'Увеличенный урон, скорость, +1 сердечко'
    },
    'seraphim': {
        name: 'Серафим',
        icon: '👼',
        items: [
            { name: 'Ангельские Крылья', img: 'https://bindingofisaac.fandom.com/wiki/Angel_Wings?file=Angel_Wings.png' },
            { name: 'Святой Грааль', img: 'https://bindingofisaac.fandom.com/wiki/Holy_Grail?file=Holy_Grail.png' },
            { name: 'Нимб', img: 'https://bindingofisaac.fandom.com/wiki/Halo?file=Halo.png' }
        ],
        effect: 'Полёт, сердечки душ, +1 сердечко души'
    },
    'beelzebub': {
        name: 'Вельзевул',
        icon: '🪰',
        items: [
            { name: 'Голова Сверчка', img: 'https://bindingofisaac.fandom.com/wiki/Cricket%27s_Head?file=Cricket%27s_Head.png' },
            { name: 'Череп', img: 'https://bindingofisaac.fandom.com/wiki/Skull?file=Skull.png' },
            { name: 'Гнилая Голова Боба', img: 'https://bindingofisaac.fandom.com/wiki/Bob%27s_Rotten_Head?file=Bob%27s_Rotten_Head.png' }
        ],
        effect: 'Синие мухи, иммунитет к спайкам'
    },
    'bookworm': {
        name: 'Книжный Червь',
        icon: '📚',
        items: [
            { name: 'Библия', img: 'https://bindingofisaac.fandom.com/wiki/The_Bible?file=The_Bible.png' },
            { name: 'Книга Теней', img: 'https://bindingofisaac.fandom.com/wiki/Book_of_Shadows?file=Book_of_Shadows.png' },
            { name: 'Книга Велиала', img: 'https://bindingofisaac.fandom.com/wiki/The_Book_of_Belial?file=The_Book_of_Belial.png' }
        ],
        effect: 'Дополнительный заряд активных предметов'
    }
};

export class TransformationsWidget extends UIComponent {
    constructor(config) {
        super(config);
        this.title = config.title || 'Трансформации';
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
        recipeDiv.innerHTML = `<div class="recipe-title">📜 Рецепт:</div><div class="items-list" id="items-${key}"></div><div class="recipe-title">✨ Эффект: ${trans.effect}</div>`;

        wrapper.appendChild(summary);
        wrapper.appendChild(recipeDiv);

        const itemsContainer = recipeDiv.querySelector(`#items-${key}`);
        trans.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'recipe-item';
            itemDiv.innerHTML = `
                <img class="recipe-item-img" src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/60x60?text=?'">
                <div class="recipe-item-name">${item.name}</div>
            `;
            itemsContainer.appendChild(itemDiv);
        });

        summary.addEventListener('click', () => {
            const isExpanded = recipeDiv.style.display === 'block';
            recipeDiv.style.display = isExpanded ? 'none' : 'block';
            summary.querySelector('.transformation-arrow').textContent = isExpanded ? '▼' : '▲';
        });

        return wrapper;
    }
}
