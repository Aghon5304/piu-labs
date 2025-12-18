import loadTemplate from '../utils/loadTemplate.js';

const template = await loadTemplate('./components/checkout.html');

export default class CheckoutElement extends HTMLElement {
    constructor() {
        super();
        this.priceTotal = 0;
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(template.content.cloneNode(true));
        document.body.addEventListener('add-to-cart', (e) => {
            const product = e.detail;
            console.log('Odebrano w checkout:', product);
            this.#addToCheckoutList(product);
        });
    }
    async #addToCheckoutList(item) {
        const template = await loadTemplate('./components/cart-item.html');
        const cartContainer = this.shadowRoot.querySelector('.items-list');
        const cartItem = template.content.cloneNode(true);
        cartItem.querySelector('.item-name').innerText = item.productName;
        cartItem.querySelector('.item-price').innerText = item.productPrice;
        cartItem.querySelector('.item-image').src = item.Image;
        const listElement = cartItem.querySelector('.cart-item');
        const removeBtn = listElement.querySelector('.remove-from-cart');
        removeBtn.addEventListener('click', () => {
            this.#removeFromCheckoutList(listElement, item.productPrice);
        });
        cartContainer.appendChild(cartItem);
        this.#editTotalPrice(item.productPrice);
    }

    #editTotalPrice(price) {
        this.priceTotal += Number(price);
        const totalElement = this.shadowRoot.querySelector('.total-price');
        totalElement.innerText = `${Math.abs(this.priceTotal.toFixed(2))}`;
    }

    #removeFromCheckoutList(listItemElement, price) {
        listItemElement.remove();

        this.#editTotalPrice(-Number(price));
    }
}

customElements.define('checkout-element', CheckoutElement);
