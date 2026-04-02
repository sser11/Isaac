import { UIComponent } from './UIComponent.js';

const TRANSFORMATIONS_DATA = {
    'guppy': {
        name: '🐱 Кот Гаппи',
        icon: '🐱',
        items: [
            { name: 'Коготь Гаппи', emoji: '🐾' },
            { name: 'Голова Гаппи', emoji: '🐱' },
            { name: 'Хвост Гаппи', emoji: '🐈' }
        ],
        effect: 'Мухи при атаке, полёт, дополнительная жизнь'
    },
    'leviathan': {
        name: '😈 Левиафан',
        icon: '😈',
        items: [
            { name: 'Сатанинская Библия', emoji: '📖' },
            { name: 'Церемониальное Одеяние', emoji: '👘' },
            { name: 'Козлиная Голова', emoji: '🐐' }
        ],
        effect: 'Увеличенный урон, скорость, +1 сердечко'
    },
    'seraphim': {
        name: '👼 Серафим',
        icon: '👼',
        items: [
            { name: 'Ангельские Крылья', emoji: '🪽' },
            { name: 'Святой Грааль', emoji: '🏆' },
            { name: 'Нимб', emoji: '💫' }
        ],
        effect: 'Полёт, сердечки душ, +1 сердечко души'
    },
    'beelzebub': {
        name: '🪰 Вельзевул',
        icon: '🪰',
        items: [
            { name: 'Голова Сверчка', emoji: '🦗' },
            { name: 'Череп', emoji: '💀' },
            { name: 'Гнилая Голова Боба', emoji: '🧟' }
        ],
        effect: 'Синие мухи, иммунитет к спайкам'
    },
    'bookworm': {
        name: '📚 Книжный Червь',
        icon: '📚',
        items: [
            { name: 'Библия', emoji: '📕' },
            { name: 'Книга Теней', emoji: '📘' },
            { name: 'Книга Велиала', emoji: '📖' }
        ],
        effect: 'Дополнительный заряд активных предметов'
    },
    'spider_baby': {
        name: '🕷️ Паучий Ребёнок',
        icon: '🕷️',
        items: [
            { name: 'Паук', emoji: '🕷️' },
            { name: 'Паутина', emoji: '🕸️' },
            { name: 'Мешок Пауков', emoji: '🎒' }
        ],
        effect: 'Пауки-союзники при получении урона'
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
                <div class="recipe-item-emoji">${item.emoji}</div>
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
        });

        return wrapper;
    }
}
