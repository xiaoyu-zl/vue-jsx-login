import { defineComponent, ref } from "vue";
import style from "@/moduleScss/login.module.scss";
export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    const sum = ref(1);
    return () => (
      <div class={style.app}>
        <div class={style.title}>login</div>
        <div>
          <el-button type="primary">按钮</el-button>
        </div>
        <div>
          <el-input
            class={style.input}
            v-model={sum.value}
            placeholder="Please input"
          />
        </div>
      </div>
    );
  },
});
