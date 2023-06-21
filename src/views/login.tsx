import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import style from "@/moduleScss/login.module.scss"; //以.module做样式隔离
import type { FormInstance, FormRules } from "element-plus";
export default defineComponent({
  components: {},
  setup() {
    const route = useRouter();
    console.log(route)
    const url = ref<string>("../vid/sand-beach.mp4");
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
          message: "Please input Activity userName",
          trigger: "blur",
        },
        { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
      ],
      password: [
        {
          required: true,
          message: "Please input Activity password",
          trigger: "blur",
        },
        {
          min: 6,
          max: 18,
          message: "Length should be 6 to 18",
          trigger: "blur",
        },
      ],
    });
    const formRef = ref<FormInstance>();
    const submitForm = async () => {
      const isOk = await formRef.value.validate((valid: boolean) => valid);
      console.log(isOk);
    };
    return () => (
      <div class={style["vid-container"]}>

        <video
          class={style["bgvid"]}
          autoplay={true}
          muted={true}
          preload="auto"
          loop
        >
          <source src={require(url.value)} type="video/webm" />
        </video>
        <div class={style["inner-container"]}>
          <video
            class={[style["bgvid"], style["inner"]]}
            autoplay={true}
            muted={true}
            preload="auto"
            loop
          >
            <source src={require(url.value)} type="video/webm" />
          </video>
          <div>

          </div>
          <el-form ref={formRef} rules={rules} model={formData.value}>
            <div class={style["box"]}>
              <h1>Login</h1>
              <el-form-item prop="userName">
                <el-input
                  class={style["input"]}
                  v-model={formData.value.userName}
                  placeholder="Username"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  class={style["input"]}
                  v-model={formData.value.password}
                  placeholder="Password"
                  type="password"
                  autocomplete="off"
                />
              </el-form-item>
              <el-button
                class={style.button}
                type="primary"
                onClick={() => submitForm()}
              >
                Login
              </el-button>
              <p>
                Not a member? <span>Sign Up</span>
              </p>
            </div>
          </el-form>
        </div>
      </div>
    );
  },
});
