export class UIComponent {
    constructor(config) {
        if (this.constructor === UIComponent) {
            throw new Error('UIComponent is an abstract class');
        }
        this.id = config.id || `widget_${Date.now()}_${Math.random()}`;
        this.title = config.title || 'Виджет';
        this.element = null;
        this.listeners = [];
        this.closeHandler = null;
    }

    render() {
        throw new Error('Method render() must be implemented');
    }

    destroy() {
        // Удаляем все зарегистрированные слушатели
        this.listeners.forEach(({ element, event, handler }) => {
            if (element && element.removeEventListener) {
                element.removeEventListener(event, handler);
            }
        });
        
        // Удаляем элемент из DOM
        if (this.element && this.element.parentNode) {
            this.element.remove();
        }
        
        this.element = null;
        this.listeners = [];
    }

    addListener(element, event, handler) {
        if (element && element.addEventListener) {
            element.addEventListener(event, handler);
            this.listeners.push({ element, event, handler });
        }
    }

    createWidgetContainer(contentElement) {
        const widget = document.createElement('div');
        widget.className = 'widget';
        widget.setAttribute('data-id', this.id);

        const header = document.createElement('div');
        header.className = 'widget-header';
        header.innerHTML = `
            <h3>${this.title}</h3>
            <div class="widget-actions">
                <button class="close-widget-btn" data-widget-id="${this.id}">✕</button>
            </div>
        `;

        const content = document.createElement('div');
        content.className = 'widget-content';
        content.appendChild(contentElement);

        widget.appendChild(header);
        widget.appendChild(content);

        this.element = widget;
        
        // Добавляем слушатель для кнопки закрытия
        const closeBtn = header.querySelector('.close-widget-btn');
        if (closeBtn) {
            this.closeHandler = (e) => {
                e.stopPropagation();
                if (this.onClose) {
                    this.onClose(this.id);
                }
            };
            this.addListener(closeBtn, 'click', this.closeHandler);
        }

        return widget;
    }
    
    setOnCloseHandler(handler) {
        this.onClose = handler;
    }
}
