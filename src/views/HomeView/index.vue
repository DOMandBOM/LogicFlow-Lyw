<template>
  <div class="box">
    <div>
      <div class="gradient-text" style="margin-bottom: 20px; font-size: 20px">
        注意： 以下网址均需科学上网
      </div>
      <div v-for="(item, index) in arr">
        <div class="box-item">
          <span class="gradient-text">{{ item.title }}：</span>
          <a :href="item.url" target="_blank">{{ item.url }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const arr = ref([
  { title: '个人博客', url: 'https://domandbom.github.io/star/' },
  { title: 'LogicFlow博客', url: 'https://domandbom.github.io/star/2025/04213575961113.html' },
  { title: 'LogicFlow的Vue3自定义节点博客', url: '暂无' },
  { title: 'LogicFlow官网', url: 'https://site.logic-flow.cn/' },
  // { title: 'LogicFlow代码', url: 'https://github.com/DOMandBOM/LogicFlow-Lyw' },
])
</script>
<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
}
.box-item {
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
}
a {
  color: #ff6347;
  font-size: 18px;
  text-decoration: none;
}

a:hover {
  color: #007bff;
  text-decoration: none;
}

/* 核心渐变样式（4浏览器兼容方案） */
.gradient-text {
  /* 标准语法（未来-proof） */
  background: linear-gradient(135deg, #ff4d4f 0%, #ffd700 100%);

  /* WebKit内核（Chrome/Safari） */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* Firefox（需浏览器支持，新版本默认开启） */
  background-clip: text;
  color: transparent;
}
</style>
