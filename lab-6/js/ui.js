import {Ajax} from "../Ajax.js";

const btnFetch = document.getElementById('btn-fetch');
const btnError = document.getElementById('btn-error');
const btnReset = document.getElementById('btn-reset');
const loader = document.getElementById('loader');
const errorMsg = document.getElementById('error-msg');
const resultPart = document.getElementById('result');
const empty = document.getElementById('empty-state')
const ajax = new Ajax({baseURL: 'https://jsonplaceholder.typicode.com/posts'});
export const ui = {
    init() {
        btnFetch.addEventListener('click', () => this.fetchData());
        btnError.addEventListener('click', () => this.simulateError());
        btnReset.addEventListener('click', () => this.resetUI());
    },

    async fetchData() {
        errorMsg.style.display = 'none';
        loader.style.display = 'block';
        empty.style.display = 'block';
        errorMsg.textContent = '';
        try {
            const result = await ajax.get();
            resultPart.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
        } catch (err) {
            errorMsg.style.display = 'block';
            errorMsg.textContent = err.message;
        } finally {
            empty.style.display = 'none';
            loader.style.display = 'none';
        }
    },

    async simulateError() {
        errorMsg.style.display = 'none';
        loader.style.display = 'block';
        empty.style.display = 'block';
        errorMsg.textContent = '';
        try {
            const result = await ajax.put();
            resultPart.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
        } catch (err) {
            errorMsg.style.display = 'block';
            errorMsg.textContent = err.message;
        } finally {
            empty.style.display = 'none';
            loader.style.display = 'none';
        }
    },

    resetUI() {
        empty.style.display = 'block';
        errorMsg.style.display = 'none';
        errorMsg.textContent = '';
        resultPart.innerHTML = '';
    }
}