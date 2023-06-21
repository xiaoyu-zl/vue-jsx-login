import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    const route = useRoute();
    console.log(route.query?.name);
    const sum = ref<Number>(1);
    return () => (
      <div>
        <div>home</div>
        <el-input v-model={sum.value} placeholder="Please input" />
      </div>
    );
  },
});
