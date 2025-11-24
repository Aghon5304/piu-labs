import { randomHsl } from './helpers.js';
class Store {
    constructor() {
        const saved = localStorage.getItem('shapes');
        this.state = saved ? JSON.parse(saved) : { shapes: [] ,idCounter: 0 };
        this.observers = [];
        if (this.state.shapes.length == 0) {
            this.state.idCounter = 0;
        }
    }

    subscribe(fn) { this.observers.push(fn); }

    notify() {
        localStorage.setItem('shapes', JSON.stringify(this.state));
        this.observers.forEach(o => o.update(this.state));
    }

    addShape(type) {
        this.state.shapes.push({
            id: this.state.idCounter++,
            type: type,
            color: randomHsl()
        });
        this.notify();
    }

    removeShape(id) {
        this.state.shapes = this.state.shapes.filter(s => s.id != id);
        this.notify();
    }

    recolor(type) {
        this.state.shapes.forEach(s => {
            if (s.type === type) s.color = randomHsl();
        });
        this.notify();
    }
    
    getStats() {
        return {
            squares: this.state.shapes.filter(s => s.type === 'square').length,
            circles: this.state.shapes.filter(s => s.type === 'circle').length
        };
    }
}

export const store = new Store();