import { createStore } from 'vuex';

export const ALL_CONTENT: Record<string, Content> = {
	intro1: {
		title: 'Introduction',
		content: 'TypeScript is a great general purpose language. To get you started off, let\'s try printing out the classic "Hello, world!". To print a statement in TypeScript, use console.log(\'YOUR TEXT HERE\'). Give it a try!',
		validateOutput: output => output.toLowerCase().includes('hello, world!'),
		next: 'intro2'
	},
	intro2: {
		title: `Variables`,
		content: `Variables are values that can be set to, really, anything. They are really useful if you don't want to keep repeat yourself, or if you want to use a value that isn't known until later (eg. user input). To declare variables in TypeScript, you can use 'var', 'let', or 'const'. It's considered good practice to use const wherever possible, let where you must, and never use var as it's a legacy feature. Try changing this message from 'Hello world!' to 'Goodbye world!'.`,
		validateOutput: output => output === 'Goodbye, world!\n',
		code: `
const greeting = 'Hello';

console.log(greeting + ', world!');
`,
		next: 'intro3'
	},
	intro3: {
		title: `Looping`,
		content: `TypeScript has a couple ways of looping. There's the for loop, generic for loops, .forEach functions on arrays, while loops and do/while loops. Almost all of the loops discussed here are interchangable, but they do each have a time and place where they'll most likely be needed. For example, a for loop might be useful if you want to do something a fixed amount of times, but a do/while loop would be useful if you want to try something until it works. For this example, try printing 'Hi' 10 times. Looping 5 times looks like this in TypeScript:\n\nfor (let i = 0; i < 5; i++) {\n&nbsp;&nbsp;&nbsp;&nbsp;// do something\n}`,
		validateOutput: output => output === 'Hi\n'.repeat(10),
		code: `
const printingVariable = 'Hi';

// Put your for loop here!



`,
		next: 'intro4'
	},
	intro4: {
		title: `Well, isn't this just JavaScript?`,
		content: `Well, yes and no. TypeScript has a couple advantages over JavaScript, one of which is types. In the following example, you can see how the following won't run*, because TypeScript has detected an error! Since the function accepts a string, and a number was given, TypeScript has refused to continue. If this were JavaScript, the error would not have been found, and you wouldn't have known until you pressed run, and something didn't work. To proceed, change the variable to the correct one.\n\n\n* TypeScript's browser compiler doesn't have as many fancy features as the full installation, so this doesn't actually perform as expected.`,
		code: `
function doSomething(foo: string) { // The :string tells TypeScript that this function only accepts strings!
    console.log(foo);
}

const numberVariable = 5;
const stringVariable = 'This works now!'; // :string isn't needed here, as TypeScript can already tell this variable is a string

doSomething(numberVariable);
`,
		validateOutput: output => output === 'This works now!\n',
		next: 'finished'
	},
	finished: {
		title: 'Congratulations, you\'ve finished!',
		content: `You have completed the TypeScript interactive tutorial. If you want, you can continue to use this playground, or download TypeScript yourself by downloading Node.js and running 'npm i -g typescript'.`,
		validateOutput: () => true,
		next: undefined
	}
};

interface Content {
	title: string;
	content: string;
	validateOutput: (output: string) => boolean;
	code?: string;
	next: string | undefined;
}

export default createStore({
	state: {
		currentContentId: 'intro1',
		currentContent: ALL_CONTENT.intro1,
		console: '',
		setContent: undefined as ((value: string) => void) | undefined
	},
	mutations: {
		updateContent(state, contentName: keyof typeof ALL_CONTENT) {
			state.currentContentId = contentName;
			state.currentContent = ALL_CONTENT[contentName];

			if (state.currentContent.code) state.setContent?.(state.currentContent.code);
		},
		addConsole(state, line: string) {
			state.console += `${line}\n`;
		},
		clearConsole(state) {
			state.console = '';
		},
		setContent(state, setContent) {
			state.setContent = setContent;
		}
	},
	actions: {
	},
	modules: {
	}
});
