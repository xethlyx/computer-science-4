import { createStore } from 'vuex';

export const ALL_CONTENT: Record<string, Content> = {
	intro1: {
		title: 'Introduction',
		content: 'TypeScript is a great general purpose language. To get you started off, let\'s try printing out the classic "Hello world!". To print a statement in TypeScript, use console.log(\'YOUR TEXT HERE\'). Give it a try!',
		validateOutput: output => output.toLowerCase().includes('hello world'),
		next: 'console'
	}
};

interface Content {
	title: string;
	content: string;
	validateOutput: (output: string) => boolean;
	next: string | undefined;
}

export default createStore({
	state: {
		currentContentId: 'intro1',
		currentContent: ALL_CONTENT.intro1,
		console: ''
	},
	mutations: {
		updateContent(state, contentName: keyof typeof ALL_CONTENT) {
			state.currentContentId = contentName;
			state.currentContent = ALL_CONTENT[contentName];
		},
		addConsole(state, line: string) {
			state.console += `${line}\n`;
		},
		clearConsole(state) {
			state.console = '';
		}
	},
	actions: {
	},
	modules: {
	}
});
