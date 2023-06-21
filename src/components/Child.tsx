import { CSSProperties, defineComponent, PropType, toRefs, ref } from "vue";

type Props = {
  count: number;
  style: CSSProperties;
};
export default defineComponent({
  props: {
    style: {
      type: Object as PropType<Props["style"]>,
      default: undefined,
    },
    count: {
      type: Number as PropType<Props["count"]>,
      default: undefined,
    },
  },
  emits: ["childSum"],
  setup(props, ctx) {
    const { style, count } = toRefs(props);
    const { slots, emit } = ctx;
    const arr = ref<Array<string>>(["测试1", "测试2", "测试3"]);

    return () => (
      <div style={style.value}>
        <h1>This is Child</h1>
        {slots?.header && slots.header()}
        <el-button type="primary" onClick={() => emit("childSum", 2)}>
          Count+2
        </el-button>
        <p>Child count is: {count.value}</p>
        {arr.value.map((v) => (
          <div>Child count is: {v}</div>
        ))}
      </div>
    );
  },
});
