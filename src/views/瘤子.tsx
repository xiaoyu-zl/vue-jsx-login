import { defineComponent, ref } from 'vue'
import ziLiuZi from "./ziLiuZi"
export default defineComponent({
    props: {},
    emits: [],
    components: {ziLiuZi},
    setup(props, ctx) {
        const sum = ref<Number>(1)
        const fn = ()=>{
          console.log("???");
          
        }
        return ()=> <>
        瘤子
       <ziLiuZi onDIY={()=>fn()}>

       </ziLiuZi>
        </>
    }
})