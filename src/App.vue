<template>
	<div class="main-container">
		<div class="side-info-bar">
			<span class="title">{{ $store.state.currentContent.title }}</span>
			<span class="content">{{ $store.state.currentContent.content }}</span>
			<div class="bottom-bar">
				<button class="back-button" @click="$store.commit('updateContent', $store.state.currentContent.next)"></button>
				<button class="next-button"></button>
			</div>
		</div>
		<div class="code-example">
			{{ $store.state.currentContent.codeExample }}
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
	name: 'App',
	components: {
		HelloWorld
	}
});
</script>

<style>
.main-container {
	display: grid;
	grid-template-rows: 1fr 1fr;
	grid-template-columns: 1fr;
	padding: 5px;
	background-color: #2b2b2b;
	color: #fff;
}

.side-info-bar, .code-example {
	background-color: #1b1b1b;
	border-radius: 3px;
}

.side-info-bar {
	display: grid;
	grid-template-rows: 20px 1fr 20px;
	grid-template-columns: 1fr;
}

.bottom-bar {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 5px;
}

button {
	background-color: #2b2b2b;
	border-width: 0;
	border-radius: 3px;
	padding: 10px 20px;
	box-sizing: border-box;
	color: #fff;
}
</style>
