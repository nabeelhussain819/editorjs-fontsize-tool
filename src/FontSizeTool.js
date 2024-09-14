import './main.css';

 class FontSizeTool {

    static get isInline() {
        return true;
    }

    static get title() {
        return 'Font Size';
    }

    static get sanitize() {
        return {
            span: {
                class: true,
                style: true,
            },
        };
    }

    constructor({ api }) {
        this.api = api;
        this.button = null;
        this.select = null;
        this.fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px'];
        this.CSS = {
            button: 'cdx-font-size-button',
            select: 'cdx-font-size-select',
            active: 'cdx-font-size-active',
        };
        this.toggleFontSizeMenu = this.toggleFontSizeMenu.bind(this);
        this.applyFontSize = this.applyFontSize.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    render() {
        this.button = document.createElement('div');
        this.button.type = 'div';
        this.button.innerHTML = 'A';
        this.button.classList.add(this.CSS.button);
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleFontSizeMenu();
        });
        return this.button;
    }
    toggleFontSizeMenu() {
        if (this.select) {
            this.closeSelect();
            return;
        }
        this.select = document.createElement('div');
        this.select.classList.add('dropdown-menu');
        const defaultOption = document.createElement('div');
        defaultOption.textContent = 'Select Size';
        defaultOption.style.fontWeight = 'bold'; 
        defaultOption.style.cursor = 'default'; 
        this.select.appendChild(defaultOption);
        this.fontSizes.forEach((size) => {
            const option = document.createElement('div');
            option.textContent = size;
            option.style.cursor = 'pointer';
            option.addEventListener('click', () => {
                this.applyFontSize(size);
                this.closeSelect();
            });
            
            this.select.appendChild(option);
        });
        this.select.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        const buttonRect = this.button.getBoundingClientRect();
        this.select.style.position = 'absolute';
        this.select.style.top = `${buttonRect.height + 5}px`;
        this.select.style.left = '0px'; 
        this.button.appendChild(this.select);
        this.select.style.display = 'block';
        document.addEventListener('click', this.handleClickOutside.bind(this));
    }
    closeSelect() {
       const elements = document.getElementsByClassName('ct ct--shown ct--top')
       for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('ct--shown');
      }
        if (this.select) {
            this.select.remove(); 
            this.select = null;   
        }
    }
    handleClickOutside(event) {
        if (this.select && !this.button.contains(event.target)) {
            this.closeSelect();
        }
    }
    applyFontSize(size) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        if (range.collapsed) return;
    
        try {
            const fragment = range.cloneContents();
            const cleanedFragment = this.cleanFragment(fragment);
            const wrapper = document.createElement('span');
            wrapper.style.fontSize = size;
            wrapper.classList.add('cdx-font-size');
            wrapper.appendChild(cleanedFragment);
            range.deleteContents(); 
            range.insertNode(wrapper);
            const newRange = document.createRange();
            newRange.selectNodeContents(wrapper);
            selection.removeAllRanges();
            selection.addRange(newRange);
            this.api.events.emit('change');
        } catch (e) {
            console.error('Failed to apply font size:', e);
        }
    }
    cleanFragment(fragment) {
        const walker = document.createTreeWalker(fragment, NodeFilter.SHOW_ELEMENT, {
            acceptNode(node) {
                if (node.nodeName.toLowerCase() === 'span' || node.classList.length > 0) {
                    return NodeFilter.FILTER_ACCEPT;
                }
                return NodeFilter.FILTER_SKIP;
            }
        });
    
        const nodesToClean = [];
        while (walker.nextNode()) {
            nodesToClean.push(walker.currentNode);
        }
        nodesToClean.forEach(node => {
            const parent = node.parentNode;
            while (node.firstChild) {
                parent.insertBefore(node.firstChild, node);
            }
            parent.removeChild(node); 
        });
    
        return fragment;
    }
    surround(range, context) {
        if (!context) {
            return false;
        }
        const span = document.createElement('span');
        span.style.fontSize = context.size;
        span.classList.add('cdx-font-size');
        range.surroundContents(span);
    }
    checkState(selection) {
        const anchorNode = selection.anchorNode;
        if (!anchorNode) {
            this.button.classList.remove(this.CSS.active);
            return;
        }
        const parentSpan = anchorNode.parentElement.closest('span.cdx-font-size');
        if (parentSpan) {
            this.button.classList.add(this.CSS.active);
            if (this.select) {
                this.select.value = parentSpan.style.fontSize || '';
            }
        } else {
            this.button.classList.remove(this.CSS.active);
            if (this.select) {
                this.select.value = '';
            }
        }
    }
}
export default FontSizeTool;