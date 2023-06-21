<script lang="tsx">
import { ref } from "vue";
export default {
  setup() {
    const sum = ref<number>(1);
    return () => <div>{sum.value}</div>;
  },
};
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
