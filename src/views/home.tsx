import { defineComponent } from "vue";
import style from "@/cssModule/home.module.scss"; //以.module做样式隔离

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup() {
    return () => (
      <div class={style["main"]}>
        <div class={style["sphere"]}></div>
      </div>
    );
  },
});
