export class UIComponent {
    constructor(config) {
        if (this.constructor === UIComponent) {
            throw new Error('UIComponent is an abstract class');
        }
        this.id = config.id || `widget_${Date.now()}_${Math.random()}`;
        this.title = config.title || 'Виджет';
        this.element = null;
        this.listeners = [];
    }

    render() {
        throw new Error('Method render() must be implemented');
    }

    destroy() {
        if (this.element && this.element.parentNode) {
            this.listeners.forEach(({ element, event, handler }) => {
                element.removeEventListener(event, handler);
            });
            this.element.remove();
        }
        this.element = null;
        this.listeners = [];
    }

    addListener(element, event, handler) {
        element.addEventListener(event, handler);
        this.listeners.push({ element, event, handler });
    }

    createWidgetContainer(contentElement) {
        const widget = document.createElement('div');
        widget.className = 'widget';
        widget.dataset.id = this.id;

        const header = document.createElement('div');
        header.className = 'widget-header';
        header.innerHTML = `
            <h3>${this.title}</h3>
            <div class="widget-actions">
                <button class="btn-danger close-widget" data-id="${this.id}">✕</button>
            </div>
        `;

        const content = document.createElement('div');
        content.className = 'widget-content';
        content.appendChild(contentElement);

        widget.appendChild(header);
        widget.appendChild(content);

        return widget;
    }
}