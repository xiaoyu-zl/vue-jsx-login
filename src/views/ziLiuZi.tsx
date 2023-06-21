import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {},
  emits: ["DIY"],
  components: {},
  setup(props, ctx) {
    const { emit } = ctx;
    const sum = ref<Number>(1);
    return () => (
      <>
        子瘤子
        <el-button onClick={() => emit("DIY")}>点击调用父</el-button>
      </>
    );
  },
});
