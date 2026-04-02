import { TransformationsWidget } from './TransformationsWidget.js';
import { NewsWidget } from './NewsWidget.js';
import { RandomItemWidget } from './RandomItemWidget.js';

export class Dashboard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.widgets = new Map();
        this.widgetCounter = 0;
    }

    addWidget(widgetType, config = {}) {
        let widget;
        const id = `widget_${++this.widgetCounter}_${Date.now()}`;
        
        switch(widgetType) {
            case 'transformations':
                widget = new TransformationsWidget({ ...config, id, title: config.title || '🔮 Трансформации' });
                break;
            case 'news':
                widget = new NewsWidget({ ...config, id, title: config.title || '📰 Новости' });
                break;
            case 'randomItem':
                widget = new RandomItemWidget({ ...config, id, title: config.title || '🎲 Случайный предмет' });
                break;
            default:
                throw new Error(`Unknown widget type: ${widgetType}`);
        }

        const widgetElement = widget.render();
        this.widgets.set(id, widget);
        this.container.appendChild(widgetElement);

        this.setupCloseHandler(widgetElement, id);
        
        return id;
    }

    setupCloseHandler(widgetElement, id) {
        const closeBtn = widgetElement.querySelector('.close-widget');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.removeWidget(id);
            });
        }
    }

    removeWidget(widgetId) {
        const widget = this.widgets.get(widgetId);
        if (widget) {
            widget.destroy();
            this.widgets.delete(widgetId);
        }
    }

    getAllWidgets() {
        return Array.from(this.widgets.values());
    }
}