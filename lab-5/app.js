// app.js
import { store } from './store.js';
import { ui } from './ui.js';

store.subscribe(ui);
ui.init();