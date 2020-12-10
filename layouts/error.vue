<template>
  <div class="text-center container">
    <h1 v-if="error.statusCode === 404">Страница не найдена</h1>
    <h1 v-else>An error occurred</h1>
    Перейти на <NuxtLink to="/">главную страницу</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ["error"]
};
</script>

<style scoped>
.container {
  padding: 100px 0;
}
</style>
