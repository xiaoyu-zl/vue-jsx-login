import { createPinia, storeToRefs } from 'pinia'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";


const store = createPinia()
store.use(piniaPluginPersistedstate)
export { storeToRefs };

export default store

