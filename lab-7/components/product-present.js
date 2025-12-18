import loadTemplate from '../utils/loadTemplate.js';

const template = await loadTemplate('./components/product-present.html');

export default class PresentProductElement extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(template.content.cloneNode(true));
        const button = shadow.querySelector('.add-to-cart-btn');
        button.addEventListener('click', () => {
            const productName = this.querySelector(
                '[slot="product-name"]'
            )?.textContent.trim();
            const productPrice = this.querySelector(
                '[slot="product-price"]'
            )?.textContent.trim();
            const Image = this.querySelector(
                '[slot="product-image"]'
            )?.src.trim();
            const event = new CustomEvent('add-to-cart', {
                bubbles: true,
                composed: true,
                detail: {
                    productName: productName,
                    productPrice: productPrice,
                    Image: Image,
                },
            });
            this.dispatchEvent(event);
        });
    }
}
customElements.define('present-product-element', PresentProductElement);
