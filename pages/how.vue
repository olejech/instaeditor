<template>
  <b-row>
    <b-col>
      <b-jumbotron header="InstaEditor" lead="Как работает редактор текста">
        <p>Инстаграм перестал быть площадкой для публикации фото. Сегодня Инстаграм это сайт, где Вы можете узнать новости, почитать статьи и лайкнуть фотографию. Поэтому каждый пытается стать блогером, чтобы быть известным и полезным другим пользователям.</p>
        <p>
          Но чтобы стать полезным, нужно давать полезный контент, в приоретете текстовый. Instagram до сих пор не сделал удобного редактора для написания текста. Блогерам приходится искать и копировать
          <b>секретный пустой пробел</b>, чтобы разделить текст на абзацы.
        </p>
        <p>
          Поэтому, у меня пришла идея сделать простой, но удобный
          <nuxt-link to="/">редактор текста для Инстаграма</nuxt-link>, где Вы можете скопировать набранный текст с абзацами и вставить его при публикации очередного поста.
        </p>
        <b-col sm="auto">
          <b-button class="mb-3" v-b-modal.modal-tall variant="outline-primary" @click="showModalIphone = !showModalIphone">Скачать на Iphone</b-button>
        <b-button class="mb-3" variant="outline-primary" @click="showModalAndroid = !showModalAndroid">Скачать на Android</b-button>
        <b-button class="mb-3" variant="outline-primary" to="/">Начать писать</b-button>
        </b-col>
      </b-jumbotron>

      <b-modal
        v-model="showModalIphone"
        title="Скачать на Iphone"
        ok-only
      >
        <img src="/iphone1.jpg" alt="Кнопка поделиться">
        <p>Нажмите на знак "Поделиться".</p>
        <br />
        <img src="/iphone2.jpg" alt="Смах вправо">
        <p>Смахните вправо</p>
        <br />
        <img src="/iphone3.jpg" alt="Добавить на экран домой">
        <p>"На экран Домой"</p>
        <br />
        <img src="/iphone4.jpg" alt="Подтверждение названия">
        <p>Подтвердить название</p>
        <br />
        <img src="/iphone5.jpg" alt="Запуск приложения из экрана дом">
        <p>Найти на рабочем столе и запускать как приложение</p>    
      </b-modal>

      <b-modal
        v-model="showModalAndroid"
        title="Скачать на Android"
        ok-only
      >
      <img src="/android1.jpg" alt="Баннер добавить на главный экран">
        <p>Нажмите на кнопку "Добавить на главный экран"</p>
        <br />
        <img src="/android2.jpg" alt="Подтверждение добавления">
        <p>Добавить</p></b-modal>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      showModalIphone: false,
      showModalAndroid: false
    }
  },
  head() {
    return {
      title: 'Как написать текст с невидимым пробелом',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Instagram до сих пор не сделал удобного редактора для написания текста. Блогерам приходится искать и копировать секретный пустой пробел, чтобы разделить текст на абзацы.'
        }
      ]
    }
  }
}
</script>

<style>
</style>
