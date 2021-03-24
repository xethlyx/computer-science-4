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
                value: store.state.currentContent.code ?? '// Type your code here!\n// Keep in mind this is NOT sandboxed, meaning that you are not safe from self XSS.\n// Also, it is recommended that you do not attempt infinite loops.\n\n'
            });

            store.commit('setContent', (content: string) => editor.setValue(content.trimStart()));
        });

        function run() {
            let javascript;

            try {
                javascript = ts.transpile(editor.getValue(), { allowJs: false, noEmitOnError: true, strict: true });
            } catch (error) {
                alert(`COMPILATION ERROR:\n\n${error}`);

                return;
            }

            try {
                eval(javascript);
            } catch (error) {
                alert(`RUNTIME ERROR:\n\n${error}`);
                store.commit('clearConsole');

                return;
            }

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