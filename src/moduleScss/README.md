1. 使用css.module 平替 <style scoped>
2. 使用 :global 伪类来穿透子组件样式

```css
// 使用:global 伪类
// 使用层级更准确的去穿透样式
.input {
  margin-top: 20px;
  width: 200px;
  :global(.el-input__wrapper) {
    background-color: pink;
    border: 1px solid red;
  }
}
```
