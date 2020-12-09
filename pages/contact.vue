<template>
  <b-container class="container text-center">
    <h1 class="mb-3">Контакт связи с автором InstaEditor</h1>
    <p><b-button variant="outline-primary">Telegram</b-button></p>
  </b-container>
</template>

<script>
export default {
  head() {
    return {
      title: "Контакт связи с автором InstaEditor",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Связаться с автором можно с помощью Telegram."
        }
      ]
    };
  }
};
</script>

<style scoped>
.container {
  padding: 100px 0;
}
</style>
