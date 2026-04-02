import { UIComponent } from './UIComponent.js';

const TRANSFORMATIONS_DATA = {
    'guppy': {
        name: '🐱 Кот Гаппи',
        icon: '🐱',
        items: [
            { name: 'Коготь Гаппи', emoji: '🐾' },
            { name: 'Голова Гаппи', emoji: '🐱' },
            { name: 'Хвост Гаппи', emoji: '📎' }
        ],
        effect: 'Мухи при атаке, полёт'
    },
    'leviathan': {
        name: '😈 Левиафан',
        icon: '😈',
        items: [
            { name: 'Сатанинская Библия', emoji: '📖' },
            { name: 'Копыта', emoji: '👣' },
            { name: 'Рога', emoji: '🦌' }
        ],
        effect: '+1 сердце, урон, скорость'
    },
    'seraphim': {
        name: '👼 Серафим',
        icon: '👼',
        items: [
            { name: 'Крылья', emoji: '🪽' },
            { name: 'Святой Грааль', emoji: '🏆' },
            { name: 'Нимб', emoji: '💫' }
        ],
        effect: 'Полёт, сердечки душ'
    },
    'beelzebub': {
        name: '🪰 Вельзевул',
        icon: '🪰',
        items: [
            { name: 'Мушиная корона', emoji: '👑' },
            { name: 'Муха', emoji: '🪰' },
            { name: 'Сморкач', emoji: '💩' }
        ],
        effect: 'Синие мухи, иммунитет к спайкам'
    },
    'bookworm': {
        name: '📚 Книжный червь',
        icon: '📚',
        items: [
            { name: 'Библия', emoji: '📖' },
            { name: 'Книга теней', emoji: '📘' },
            { name: 'Книга Бел', emoji: '📕' }
        ],
        effect: 'Дополнительный заряд предметов'
    },
    'spider_baby': {
        name: '🕷️ Паучий ребенок',
        icon: '🕷️',
        items: [
            { name: 'Паук', emoji: '🕷️' },
            { name: 'Паутина', emoji: '🕸️' },
            { name: 'Мешок пауков', emoji: '🎒' }
        ],
        effect: 'Пауки-союзники'
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
            <div class="recipe-title">📜 Рецепт:</div>
            <div class="items-list" id="items-${key}"></div>
            <div class="recipe-title">✨ Эффект: ${trans.effect}</div>
        `;

        wrapper.appendChild(summary);
        wrapper.appendChild(recipeDiv);

        const itemsContainer = recipeDiv.querySelector(`#items-${key}`);
        trans.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'recipe-item';
            itemDiv.innerHTML = `
                <div class="recipe-item-img">${item.emoji}</div>
                <div class="recipe-item-name">${item.name}</div>
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