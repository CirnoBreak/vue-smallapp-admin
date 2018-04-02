<template>
  <div class="row">
    <h1>404 Not Found</h1>
    <hr>
    <h2>页面不存在</h2>
    <button @click="back">返回到主页</button>
  </div>
</template>

<script>
  export default {
    methods: {
      back() {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="less">
.row {
  text-align: center;
  margin: 60px auto;
}

h1, h2, p {
  text-rendering: optimizeLegibility;
}

h2, p {
  color: #374140;
}

h1 {
  color: #1E1E20;
  font-size: 120px;
  line-height: 122px;
}

h2 {
  font-size: 30px;
  line-height: 32px;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  line-height: 20px;
}

hr {
  width: 15%;
  margin: 40px auto;
  border-color: #DC3522;
}

button {
  background: transparent;
  font-size: 20px;
  margin: 40px auto;
  border: 1px solid #000;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  outline: none;
}
</style>