import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import register from "./register.tsx";
import login from "./login.tsx";

import style from "@/moduleScss/login.module.scss"; //以.module做样式隔离
import type { FormInstance, FormRules } from "element-plus";
export default defineComponent({
  components: { register, login },
  setup() {
    const route = useRouter();
    console.log(route);
    const url = ref<string>("../../vid/sand-beach.mp4");
    type FnRequire = (url: string) => string;
    const require: FnRequire = (url) => {
      return new URL(url, import.meta.url).href;
    };
    //form
    type FormData = {
      userName: string;
      password: string;
    };
    const formData = ref<FormData>({ userName: "", password: "" });
    const rules = reactive<FormRules>({
      userName: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入用户名密码",
          trigger: "change",
        },
        {
          min: 6,
          max: 18,
          message: "长度应为 6 ~ 18",
          trigger: "change",
        },
      ],
    });
    const off = ref(true);
    const formRef = ref<FormInstance>();
    const submitForm = async () => {
      const isOk = await formRef.value.validate((valid: boolean) => valid);
      console.log(isOk);
    };
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
