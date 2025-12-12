import loadTemplate from '../utils/loadTemplate.js';

const template = await loadTemplate('./components/product-present.html');

export default class PresentProductElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
     
  }
}
customElements.define('present-product-element', PresentProductElement);