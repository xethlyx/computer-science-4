import { createStore } from 'vuex';

interface Content {
	title: string;
	content: string;
	codeExample: string;
	next?: keyof typeof ALL_CONTENT;
}

function infer<T extends Record<string, Content>>(arg: T) {
	return arg;
}

const ALL_CONTENT = infer({
	intro1: {
		title: 'Introduction',
		content: 'Introduction',
		codeExample: `console.log('Hello world!')`
	}
});

export default createStore({
	state: {
		currentContent: ALL_CONTENT.intro1
	},
	mutations: {
		updateContent(state, contentName: keyof typeof ALL_CONTENT) {
			state.currentContent = ALL_CONTENT[contentName];
		}
	},
	actions: {
	},
	modules: {
	}
});
