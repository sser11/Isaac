export class UIComponent {
    constructor(config) {
        this.id = config.id || `widget_${Date.now()}_${Math.random()}`;
        this.title = config.title || 'Виджет';
        this.element = null;
    }

    render() {
        throw new Error('Method render() must be implemented');
    }

    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.remove();
        }
        this.element = null;
    }

    createWidgetContainer(contentElement) {
        const widget = document.createElement('div');
        widget.className = 'widget';
        widget.setAttribute('data-id', this.id);

        const header = document.createElement('div');
        header.className = 'widget-header';
        
        const title = document.createElement('h3');
        title.textContent = this.title;
        
        const actions = document.createElement('div');
        actions.className = 'widget-actions';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-widget-btn';
        closeBtn.textContent = '✕';
        closeBtn.setAttribute('data-widget-id', this.id);
        
        actions.appendChild(closeBtn);
        header.appendChild(title);
        header.appendChild(actions);

        const content = document.createElement('div');
        content.className = 'widget-content';
        content.appendChild(contentElement);

        widget.appendChild(header);
        widget.appendChild(content);

        this.element = widget;
        
        return widget;
    }
}
