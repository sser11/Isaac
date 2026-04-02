import { UIComponent } from './UIComponent.js';

const CHARACTERS_DATA = [
    {
        name: 'Исаак',
        image: 'https://static.wikia.nocookie.net/bindingofisaac/images/4/4c/Isaac.png/revision/latest?cb=20150913173401',
        health: '3 сердечка',
        damage: '3.50',
        speed: '1.00',
        range: '23.75',
        tearRate: '10',
        description: 'Главный герой игры. Начинает со слезами и способностью использовать предметы D6 после разблокировки.'
    },
    {
        name: 'Магдалина',
        image: 'https://static.wikia.nocookie.net/bindingofisaac/images/c/c4/Magdalene.png/revision/latest?cb=20150913173455',
        health: '4 сердечка',
        damage: '3.50',
        speed: '0.85',
        range: '23.75',
        tearRate: '10',
        description: 'Имеет больше здоровья, но медленнее. Начинает с предметом "Капелька йода".'
    },
    {
        name: 'Каин',
        image: 'https://static.wikia.nocookie.net/bindingofisaac/images/8/8e/Cain.png/revision/latest?cb=20150913172521',
        health: '2 сердечка',
        damage: '3.50',
        speed: '1.20',
        range: '23.75',
        tearRate: '10',
        description: 'Начинает с "Ключом Лакки Фута". Имеет повышенную удачу и скорость, но видит мир искажённо.'
    },
    {
        name: 'Иуда',
        image: 'https://static.wikia.nocookie.net/bindingofisaac/images/d/d6/Judas.png/revision/latest?cb=20150913173416',
        health: '1 сердечко',
        damage: '4.50',
        speed: '1.00',
        range: '23.75',
        tearRate: '10',
        description: 'Высокий урон, но низкое здоровье. Начинает с предметом "Книга Велиала".'
    },
    {
        name: 'Ева',
        image: 'https://static.wikia.nocookie.net/bindingofisaac/images/3/30/Eve.png/revision/latest?cb=20150913173020',
        health: '2 сердечка',
        damage: '3.50',
        speed: '1.00',
        range: '23.75',
        tearRate: '10',
        description: 'Начинает с предметом "Мёртвый ворон". Чем меньше здоровья, тем сильнее.'
    },
    {
        name: 'Самсон',
        image: 'https://static.wikia.nocookie.net/bindingofisaac/images/5/57/Samson.png/revision/latest?cb=20150913173933',
        health: '3 сердечка',
        damage: '3.50',
        speed: '1.00',
        range: '23.75',
        tearRate: '10',
        description: 'Начинает с "Кровавой яростью". Получает временное усиление при получении урона.'
    },
    {
        name: 'Азазель',
        image: 'https://static.wikia.nocookie.net/bindingofisaac/images/3/3c/Azazel.png/revision/latest?cb=20150913172203',
        health: '3 сердечка',
        damage: '4.50',
        speed: '1.25',
        range: '8.00',
        tearRate: '10',
        description: 'Начинает с полётом и коротким лучом Brimstone. Очень сильный персонаж для новичков.'
    },
    {
        name: 'Лазарь',
        image: 'https://static.wikia.nocookie.net/bindingofisaac/images/7/7d/Lazarus.png/revision/latest?cb=20150913173434',
        health: '3 сердечка',
        damage: '3.50',
        speed: '1.00',
        range: '23.75',
        tearRate: '10',
        description: 'Может воскреснуть один раз за забег с усиленными характеристиками.'
    },
    {
        name: 'Эдем',
        image: 'https://static.wikia.nocookie.net/bindingofisaac/images/5/5a/Eden.png/revision/latest?cb=20150913172948',
        health: 'Случайно',
        damage: 'Случайно',
        speed: 'Случайно',
        range: 'Случайно',
        tearRate: 'Случайно',
        description: 'Начинает каждый забег со случайными характеристиками и случайными предметами.'
    },
    {
        name: 'Забытый',
        image: 'https://static.wikia.nocookie.net/bindingofisaac/images/f/f1/The_Forgotten.png/revision/latest?cb=20180918155901',
        health: '3 кости',
        damage: '3.50',
        speed: '1.00',
        range: '23.75',
        tearRate: '10',
        description: 'Имеет костяное оружие в ближнем бою и скелета, который стреляет слезами.'
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
                <img class="character-image" src="${character.image}" alt="${character.name}" 
                     onerror="this.src='https://via.placeholder.com/80x80?text=${character.name[0]}'">
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
                <img class="character-stats-image" src="${character.image}" alt="${character.name}" 
                     onerror="this.src='https://via.placeholder.com/120x120?text=${character.name[0]}'">
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
