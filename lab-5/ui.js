// ui.js
import { store } from './store.js';

const board = document.getElementById('board');
const cntSquares = document.getElementById('cntSquares');
const cntCircles = document.getElementById('cntCircles');

export const ui = {
    init() {
        document.getElementById('addSquare').addEventListener('click', () => store.addShape('square'));
        document.getElementById('addCircle').addEventListener('click', () => store.addShape('circle'));
        
        document.getElementById('recolorSquares').addEventListener('click', () => store.recolor('square'));
        document.getElementById('recolorCircles').addEventListener('click', () => store.recolor('circle'));

        board.addEventListener('click', (e) => {
            if (e.target.classList.contains('shape')) {
                const id = e.target.dataset.id;
                store.removeShape(id);
            }
        });

        this.update(store.state);
    },

    update(state) {
        const stats = store.getStats();
        cntSquares.textContent = stats.squares;
        cntCircles.textContent = stats.circles;

        board.innerHTML = ''; 
        
        state.shapes.forEach(shape => {
            const el = document.createElement('div');
            el.className = `shape ${shape.type}`;
            el.style.backgroundColor = shape.color;
            el.dataset.id = shape.id;
            board.appendChild(el);
        });
    }
};