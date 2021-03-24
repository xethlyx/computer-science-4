import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

const oldLog = console.log;
console.log = (...args) => {
	oldLog(...args);
	store.commit('addConsole', args.join(' '));
}

createApp(App).use(store).mount('#app');
