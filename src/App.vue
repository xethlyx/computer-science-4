<template>
	<div class="main-container">
		<div class="side-info-bar">
			<span class="title">{{ $store.state.currentContent.title }}</span>
			<span class="content">{{ $store.state.currentContent.content }}</span>
			<div class="bottom-bar">
				<button class="back-button" @click="back">Back</button>
			</div>
		</div>
		<div class="code-example">
			<Monaco />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store, { ALL_CONTENT } from './store';
import Monaco from '@/components/Monaco.vue';

export default defineComponent({
	name: 'App',
	components: {
		Monaco
	},
	setup() {
		const back = () => {
			for (const [entryId, entry] of Object.entries(ALL_CONTENT)) {
				if (entry.next !== store.state.currentContentId) continue;

				store.commit('updateContent', entryId);
				break;
			}
		}

		return { back };
	}
});
</script>

<style>
* {
	box-sizing: border-box;
}

.title {
	font-size: 20px;
}

.content {
	font-weight: 400;
	font-size: 14px;
	margin-top: 20px;
}

.main-container {
	display: grid;
	grid-template-rows: 1fr;
	grid-template-columns: 1fr 1fr;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	padding: 5px;
	gap: 5px;
	background-color: #2b2b2b;
	color: #fff;
}

.side-info-bar, .code-example {
	padding: 5px 10px;
	background-color: #1b1b1b;
	border-radius: 3px;
}

.side-info-bar {
	display: grid;
	grid-template-rows: 20px 1fr 30px;
	grid-template-columns: 1fr;
	font-family: 'Noto Sans JP', sans-serif;
}

.bottom-bar {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
}

.code-example {
	padding: 0;
	overflow: hidden;
}

button {
	background-color: #2b2b2b;
	border-width: 0;
	border-radius: 3px;
	padding: 10px 20px;
	margin-bottom: 5px;
	height: 30px;
	box-sizing: border-box;
	color: #fff;
}

@media only screen and (max-width: 1000px) {
	.main-container {
		grid-template-rows: 1fr 1fr;
		grid-template-columns: 1fr;
	}
}
</style>
