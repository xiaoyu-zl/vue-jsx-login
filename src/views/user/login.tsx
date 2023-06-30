import { defineComponent, PropType, ref, reactive, toRefs } from "vue";
import style from "@/cssModule/login.module.scss"; //以.module做样式隔离
import type { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    title: {
      type: String as PropType<string>,
      default: "",
    },
  },
  emits: ["handoff"],
  components: {},
  setup(props, ctx) {
    const router = useRouter();
    const { title } = toRefs(props);
    const { emit } = ctx;
    //form
    type FormData = {
      userName: string;
      password: string;
    };
    const formData = ref<FormData>({ userName: "user", password: "123456" });
    const rules = reactive<FormRules>({
      userName: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "change",
        },
        {
          pattern: /^[^\u4e00-\u9fa5]{1,10}$/g, //正则校验不用字符串
          message: "用户名不能输入汉字",
          trigger: "change",
        },
        {
          min: 2,
          max: 8,
          message: "长度应为 2 ~ 8",
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
    const formRef = ref<FormInstance>();
    const submitForm = async () => {
      if (!formRef.value) return;
      const isOk = await formRef.value.validate((valid: boolean) => valid);
      if (isOk) {
        router.push("/home");
      }
    };
    return () => (
      <div class={[style["inner-container"], style["flipOutY"]]}>
        <el-form ref={formRef} rules={rules} model={formData.value}>
          <div class={style["box"]}>
            <h1>{title.value}</h1>
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
              <span onClick={() => emit("handoff")}>前往登录</span>
            </p>
          </div>
        </el-form>
      </div>
    );
  },
});
