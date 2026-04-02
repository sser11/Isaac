import { UIComponent } from './UIComponent.js';

const CHARACTERS_DATA = [
    {
        name: 'Исаак',
        emoji: '',
        health: '3 сердечка ❤️❤️❤️',
        damage: '3.50 ⚔️',
        speed: '1.00 💨',
        range: '23.75 📏',
        tearRate: '10 💧',
        description: 'Главный герой игры. Начинает со слезами и способностью использовать предмет D6 после разблокировки.'
    },
    {
        name: 'Магдалина',
        emoji: '',
        health: '4 сердечка ❤️❤️❤️❤️',
        damage: '3.50 ⚔️',
        speed: '0.85 💨',
        range: '23.75 📏',
        tearRate: '10 💧',
        description: 'Имеет больше здоровья, но медленнее. Начинает с предметом "Капелька йода".'
    },
    {
        name: 'Каин',
        emoji: '',
        health: '2 сердечка ❤️❤️',
        damage: '3.50 ⚔️',
        speed: '1.20 💨',
        range: '23.75 📏',
        tearRate: '10 💧',
        description: 'Начинает с "Ключом Лакки Фута". Имеет повышенную удачу и скорость, но видит мир искажённо.'
    },
    {
        name: 'Иуда',
        emoji: '',
        health: '1 сердечко ❤️',
        damage: '4.50 ⚔️',
        speed: '1.00 💨',
        range: '23.75 📏',
        tearRate: '10 💧',
        description: 'Высокий урон, но низкое здоровье. Начинает с предметом "Книга Велиала".'
    },
    {
        name: 'Ева',
        emoji: '',
        health: '2 сердечка ❤️❤️',
        damage: '3.50 ⚔️',
        speed: '1.00 💨',
        range: '23.75 📏',
        tearRate: '10 💧',
        description: 'Начинает с предметом "Мёртвый ворон". Чем меньше здоровья, тем сильнее.'
    },
    {
        name: 'Самсон',
        emoji: '',
        health: '3 сердечка ❤️❤️❤️',
        damage: '3.50 ⚔️',
        speed: '1.00 💨',
        range: '23.75 📏',
        tearRate: '10 💧',
        description: 'Начинает с "Кровавой яростью". Получает временное усиление при получении урона.'
    },
    {
        name: 'Азазель',
        emoji: '',
        health: '3 сердечка ❤️❤️❤️',
        damage: '4.50 ⚔️',
        speed: '1.25 💨',
        range: '8.00 📏',
        tearRate: '10 💧',
        description: 'Начинает с полётом и коротким лучом Brimstone. Очень сильный персонаж для новичков.'
    },
    {
        name: 'Лазарь',
        emoji: '',
        health: '3 сердечка ❤️❤️❤️',
        damage: '3.50 ⚔️',
        speed: '1.00 💨',
        range: '23.75 📏',
        tearRate: '10 💧',
        description: 'Может воскреснуть один раз за забег с усиленными характеристиками.'
    },
    {
        name: 'Эдем',
        emoji: '',
        health: 'Случайно 🎲',
        damage: 'Случайно 🎲',
        speed: 'Случайно 🎲',
        range: 'Случайно 🎲',
        tearRate: 'Случайно 🎲',
        description: 'Начинает каждый забег со случайными характеристиками и случайными предметами.'
    },
    {
        name: 'Забытый',
        emoji: '',
        health: '3 кости 🦴🦴🦴',
        damage: '3.50 ⚔️',
        speed: '1.00 💨',
        range: '23.75 📏',
        tearRate: '10 💧',
        description: 'Имеет костяное оружие в ближнем бою и скелета, который стреляет слезами.'
    },
    {
        name: 'Потерянный',
        emoji: '',
        health: '1 сердечко (разрушается от 1 хита) 💀',
        damage: '3.50 ⚔️',
        speed: '1.00 💨',
        range: '23.75 📏',
        tearRate: '10 💧',
        description: 'Очень сложный персонаж. Умирает от одного удара, но начинает с полётом и Священной Тенью.'
    },
    {
        name: 'Кукла Кипер',
        emoji: '',
        health: '2 монетных сердечка 🪙🪙',
        damage: '3.50 ⚔️',
        speed: '0.85 💨',
        range: '23.75 📏',
        tearRate: '10 💧',
        description: 'Персонаж из монет. Здоровье восстанавливается монетами, а не сердечками.'
    }
];

export class CharactersWidget extends UIComponent {
    constructor(config) {
        super(config);
        this.title = config.title || '👥 Персонажи';
        this.modal = null;
    }

    render() {
        const container = document.createElement('div');
        container.innerHTML = '<div class="loading">👥 Загрузка персонажей...</div>';
        
        const widget = this.createWidgetContainer(container);
        
        setTimeout(() => {
            this.displayCharacters(container);
        }, 300);
        
        return widget;
    }

    displayCharacters(container) {
        const charactersGrid = document.createElement('div');
        charactersGrid.className = 'characters-grid';

        CHARACTERS_DATA.forEach(character => {
            const card = document.createElement('div');
            card.className = 'character-card';
            card.innerHTML = `
                <div class="character-emoji">${character.emoji}</div>
                <div class="character-name">${character.name}</div>
            `;
            
            card.addEventListener('click', () => {
                this.showCharacterModal(character);
            });
            
            charactersGrid.appendChild(card);
        });

        container.innerHTML = '';
        container.appendChild(charactersGrid);
    }

    showCharacterModal(character) {
        const modal = document.getElementById('characterModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = `
            <div class="character-stats">
                <div class="character-stats-emoji">${character.emoji}</div>
                <h2 class="character-stats-name">${character.name}</h2>
                <div class="stats-list">
                    <div class="stat-item">
                        <span class="stat-label">❤️ Здоровье:</span>
                        <span class="stat-value">${character.health}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">⚔️ Урон:</span>
                        <span class="stat-value">${character.damage}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">💨 Скорость:</span>
                        <span class="stat-value">${character.speed}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">📏 Дальность:</span>
                        <span class="stat-value">${character.range}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">💧 Скорость стрельбы:</span>
                        <span class="stat-value">${character.tearRate}</span>
                    </div>
                </div>
                <div class="character-description">
                    <strong>📖 Описание:</strong><br>
                    ${character.description}
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };
        
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }
}
