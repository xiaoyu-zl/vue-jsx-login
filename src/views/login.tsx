import {
  defineComponent,
  ref,
  FunctionalComponent,
  CSSProperties,
  PropType,
} from "vue";
import style from "@/moduleScss/login.module.scss"; //以.module做样式隔离
import {useRouter} from "vue-router";
export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    console.log(props, ctx);
    const sum = ref(1);
    type FnSum = (val: number) => void;
    const onSum: FnSum = (val) => {
      sum.value += val;
    };
    const router = useRouter()
    return () => (
      <div class={style.app}>
        <div class={style.title}>login</div>
        <div>
          <el-button
            type="primary"
            onClick={() => {
              sum.value += 1;
            }}
          >
            按钮+1
          </el-button>
        </div>
        <div>
          <el-input
            class={style.input}
            v-model={sum.value}
            placeholder="Please input"
          />
        </div>
        <Child title={"我是子"} style={{ color: "red" }} onChildSum={onSum}>
          {{ slotOne: () => <div>插槽1</div> }}
        </Child>
        <el-button class={style.瘤子} onClick={()=>{
          router.push('liuZi')
        }} >去瘤子页面</el-button>
      </div>
  
    );
  },
});
type Props = {
  title: string;
  style: CSSProperties;
  onChildSum: Function;
};
type Emit = {
  childSum: (val: number) => void;
};
const Child: FunctionalComponent<Props, Emit> = (props, ctx) => {
  const { title } = props;
  const { slots, emit } = ctx;
  return (
    <div>
      <div>{title}</div>
      <div>{slots?.slotOne && slots.slotOne()}</div>
      <div>
        <el-button type="primary" onClick={() => emit("childSum", 2)}>
          按钮+2
        </el-button>
      </div>
    </div>
  );
};
