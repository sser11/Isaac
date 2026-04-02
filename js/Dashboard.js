import { TransformationsWidget } from './TransformationsWidget.js';
import { NewsWidget } from './NewsWidget.js';
import { RandomItemWidget } from './RandomItemWidget.js';

export class Dashboard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.widgets = [];
    }

    addWidget(widgetType, config = {}) {
        let widget;
        
        switch(widgetType) {
            case 'transformations':
                widget = new TransformationsWidget(config);
                break;
            case 'news':
                widget = new NewsWidget(config);
                break;
            case 'randomItem':
                widget = new RandomItemWidget(config);
                break;
            default:
                console.error('Unknown widget type:', widgetType);
                return null;
        }

        const widgetElement = widget.render();
        
        // Находим кнопку закрытия и добавляем обработчик
        const closeBtn = widgetElement.querySelector('.close-widget-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.removeWidget(widget);
            });
        }
        
        this.widgets.push(widget);
        this.container.appendChild(widgetElement);
        
        return widget;
    }

    removeWidget(widget) {
        const index = this.widgets.indexOf(widget);
        if (index !== -1) {
            widget.destroy();
            this.widgets.splice(index, 1);
        }
    }

    getAllWidgets() {
        return [...this.widgets];
    }
}
