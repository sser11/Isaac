import { TransformationsWidget } from './TransformationsWidget.js';
import { NewsWidget } from './NewsWidget.js';
import { RandomItemWidget } from './RandomItemWidget.js';

export class Dashboard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container with id "${containerId}" not found`);
        }
        this.widgets = new Map();
        this.widgetCounter = 0;
    }

    addWidget(widgetType, config = {}) {
        let widget;
        const widgetId = `widget_${++this.widgetCounter}_${Date.now()}`;
        
        switch(widgetType) {
            case 'transformations':
                widget = new TransformationsWidget({ ...config, id: widgetId });
                break;
            case 'news':
                widget = new NewsWidget({ ...config, id: widgetId });
                break;
            case 'randomItem':
                widget = new RandomItemWidget({ ...config, id: widgetId });
                break;
            default:
                throw new Error(`Unknown widget type: ${widgetType}`);
        }

        const widgetElement = widget.render();
        
        // Устанавливаем обработчик закрытия
        widget.setOnCloseHandler((id) => {
            this.removeWidget(id);
        });
        
        this.widgets.set(widgetId, widget);
        this.container.appendChild(widgetElement);
        
        return widgetId;
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
