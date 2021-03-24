<template>
    <div class="monaco" ref="monacoRef">

    </div>
    <button class="run" @click="run">Run</button>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import * as monaco from 'monaco-editor';
import * as ts from 'typescript';
import store from '@/store';

export default defineComponent({
    setup() {
        const monacoRef = ref(null);
        let editor: monaco.editor.IStandaloneCodeEditor;

        onMounted(() => {
            editor = monaco.editor.create(monacoRef.value!, {
                language: 'typescript',
                theme: 'vs-dark',
                value: '// Type your code here!\n// Keep in mind this is NOT sandboxed, meaning that you are not safe from self XSS.\n// Also, it is recommended that you do not attempt infinite loops.\n\n'
            });
        });

        function run() {
            const javascript = ts.transpile(editor.getValue());
            eval(javascript);

            const success = store.state.currentContent.validateOutput(store.state.console);

            alert(`CONSOLE OUTPUT (Successful: ${success}):\n\n${store.state.console}`);

            if (success && store.state.currentContent.next) store.commit('updateContent', store.state.currentContent.next);

            store.commit('clearConsole');
        }

        return { monacoRef, run };
    }
})
</script>

<style scoped>
.monaco {
    width: 100%;
    height: 100%;
}

.run {
    position: absolute;
    right: 20px;
    bottom: 10px;
    z-index: 1000;
}
</style>