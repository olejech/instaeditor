<template>
  <b-container>
    <nuxt />
    <footer class="footer-copyright text-center">
      <b-row class="py-3">
        <b-col>
          <nuxt-link to="/" class="text-secondary">Редактор</nuxt-link>
          <nuxt-link to="/hashtags" class="text-secondary">Хештеги</nuxt-link>
          <nuxt-link to="/contact" class="text-secondary">Контакт</nuxt-link>
          <nuxt-link to="/how" class="text-secondary">Инструкция</nuxt-link>
        </b-col>
      </b-row>
      <b-row>
        <b-col>© 2019 InstaEditor.ru</b-col>
      </b-row>
    </footer>
  </b-container>
</template>
