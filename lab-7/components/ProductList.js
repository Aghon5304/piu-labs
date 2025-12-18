import productsData from '../data/ProductsData.json' with { type: 'json' };

class ProductList extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        productsData.forEach(product => {
            const element = document.createElement('present-product-element');
            
            const img = document.createElement('img');
            img.slot = 'product-image';
            img.src = product.image;
            element.appendChild(img);
            
            const name = document.createElement('span');
            name.slot = 'product-name';
            name.textContent = product.name;
            element.appendChild(name);
            
            const description = document.createElement('span');
            description.slot = 'product-description';
            description.textContent = product.description;
            element.appendChild(description);
            
            if (product.colors) {
                const colorsList = document.createElement('ul');
                colorsList.slot = 'product-colors';
                colorsList.classList.add('product-colors');
                product.colors.forEach(color => {
                    const li = document.createElement('li');
                    li.textContent = color;
                    colorsList.appendChild(li);
                });
                element.appendChild(colorsList);
            }

            if (product.sizes) {
                const sizesList = document.createElement('ul');
                sizesList.slot = 'product-size';
                sizesList.classList.add('product-sizes');
                product.sizes.forEach(size => {
                    const li = document.createElement('li');
                    li.textContent = size;
                    sizesList.appendChild(li);
                });
                element.appendChild(sizesList);
            }
            
            if (product.promotion) {
                const promo = document.createElement('span');
                promo.slot = 'product-promotion';
                promo.textContent = product.promotion;
                element.appendChild(promo);
            }
            
            const price = document.createElement('span');
            price.slot = 'product-price';
            price.textContent = product.price;
            element.appendChild(price);
            
            this.appendChild(element);
        });
    }
}
customElements.define('product-list', ProductList);