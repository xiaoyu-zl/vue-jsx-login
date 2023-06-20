import { defineComponent, ref } from 'vue'

export default defineComponent({
    props: {},
    emits: [],
    components: {},
    setup(props, ctx) {
        const sum = ref<Number>(1)
        return () =>
            <div  >
                <div >home</div>
                <el-input v-model={sum.value} placeholder="Please input" />
            </div>
    }
})