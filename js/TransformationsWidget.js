import { UIComponent } from './UIComponent.js';

// Используем надежные URL с картинками из официальной вики
const TRANSFORMATIONS_DATA = {
    'guppy': {
        name: '🐱 Кот Гаппи',
        icon: '🐱',
        items: [
            { name: 'Коготь Гаппи', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/e/ef/Guppy%27s_Paw.png/revision/latest?cb=20150913173429' },
            { name: 'Голова Гаппи', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/e/e9/Guppy%27s_Head.png/revision/latest?cb=20150913173318' },
            { name: 'Хвост Гаппи', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/2/2c/Guppy%27s_Tail.png/revision/latest?cb=20150913173451' }
        ],
        effect: 'Мухи при атаке, полёт, дополнительная жизнь'
    },
    'leviathan': {
        name: '😈 Левиафан',
        icon: '😈',
        items: [
            { name: 'Сатанинская Библия', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/5/5a/Satanic_Bible.png/revision/latest?cb=20150913173947' },
            { name: 'Церемониальное Одеяние', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/d/d6/Ceremonial_Robe.png/revision/latest?cb=20150913172619' },
            { name: 'Козлиная Голова', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/f/fe/Goat_Head.png/revision/latest?cb=20150913173217' }
        ],
        effect: 'Увеличенный урон, скорость, +1 сердечко'
    },
    'seraphim': {
        name: '👼 Серафим',
        icon: '👼',
        items: [
            { name: 'Ангельские Крылья', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/6/6d/Angel_Wings.png/revision/latest?cb=20150913172119' },
            { name: 'Святой Грааль', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/f/f9/Holy_Grail.png/revision/latest?cb=20150913173343' },
            { name: 'Нимб', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/7/71/Halo.png/revision/latest?cb=20150913173258' }
        ],
        effect: 'Полёт, сердечки душ, +1 сердечко души'
    },
    'beelzebub': {
        name: '🪰 Вельзевул',
        icon: '🪰',
        items: [
            { name: 'Голова Сверчка', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/3/33/Cricket%27s_Head.png/revision/latest?cb=20150913172729' },
            { name: 'Череп', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/5/5d/Skull.png/revision/latest?cb=20150913174014' },
            { name: 'Гнилая Голова Боба', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/6/6f/Bob%27s_Rotten_Head.png/revision/latest?cb=20150913172315' }
        ],
        effect: 'Синие мухи, иммунитет к спайкам'
    },
    'bookworm': {
        name: '📚 Книжный Червь',
        icon: '📚',
        items: [
            { name: 'Библия', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/1/1a/The_Bible.png/revision/latest?cb=20150913174128' },
            { name: 'Книга Теней', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/f/f2/Book_of_Shadows.png/revision/latest?cb=20150913172400' },
            { name: 'Книга Велиала', img: 'https://static.wikia.nocookie.net/bindingofisaac/images/2/2d/The_Book_of_Belial.png/revision/latest?cb=20150913174107' }
        ],
        effect: 'Дополнительный заряд активных предметов'
    }
};

export class TransformationsWidget extends UIComponent {
    constructor(config) {
        super(config);
        this.title = config.title || '🔮 Трансформации';
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
        
        const itemsHtml = trans.items.map(item => `
            <div class="recipe-item">
                <img class="recipe-item-img" src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/60x60?text=?'">
                <div class="recipe-item-name">${item.name}</div>
            </div>
        `).join('');
        
        recipeDiv.innerHTML = `
            <div class="recipe-title">📜 Рецепт:</div>
            <div class="items-list">${itemsHtml}</div>
            <div class="recipe-title">✨ Эффект: ${trans.effect}</div>
        `;

        wrapper.appendChild(summary);
        wrapper.appendChild(recipeDiv);

        summary.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = recipeDiv.style.display === 'block';
            recipeDiv.style.display = isExpanded ? 'none' : 'block';
            const arrow = summary.querySelector('.transformation-arrow');
            arrow.textContent = isExpanded ? '▼' : '▲';
            arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        });

        return wrapper;
    }
}
