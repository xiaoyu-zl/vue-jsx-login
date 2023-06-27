import { defineComponent, ref } from "vue";
import register from "./register.tsx";
import login from "./login.tsx";
import style from "@/cssModule/login.module.scss"; //以.module做样式隔离
export default defineComponent({
  components: { register, login },
  setup() {
    const url = ref<string>("../../vid/sand-beach.mp4");
    type FnRequire = (url: string) => string;
    const require: FnRequire = (url) => {
      return new URL(url, import.meta.url).href;
    };
    //form
    const off = ref(true);
    const handoff = () => {
      off.value = !off.value;
    };
    return () => (
      <div class={style["vid-container"]}>
        <video
          class={style["bgvid"]}
          autoplay={true}
          muted={true}
          preload="auto"
          loop
          controlslist="nodownload"
        >
          <source src={require(url.value)} type="video/webm" />
        </video>
        <div class={style["bgvid"]}>{/* 用于遮挡video */}</div>

        {off.value ? (
          <login title={"Login"} onHandoff={handoff} />
        ) : (
          <register title={"Register"} onHandoff={handoff} />
        )}
      </div>
    );
  },
});
