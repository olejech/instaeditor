<template>
  <section>
    <h1 class="text-center my-3 title">
      InstaEditor - редактор текста для Инстаграм
    </h1>
    <b-form-textarea
      ref="textarea"
      v-model="text"
      placeholder="Введите текст... Нажмите 1 раз Enter для новой строки и 2 раза для пустой строки 😉"
      rows="14"
      :state="text.length <= maxTextLength"
    />
    <small class="float-right">
      {{ this.text.length }} / {{ this.maxTextLength }}
    </small>
    <div class="mt-3">
      <b-button @click="copyTextarea" variant="outline-primary">
        Скопировать
      </b-button>
      <b-button @click="text = ''" variant="outline-danger">
        Очистить
      </b-button>
    </div>

    <hr />

    <p>
      Instagram&nbsp;&mdash; уже давно не&nbsp;просто площадка для публикации
      еды или селфи. Настоящие блогеры привлекают аудиторию собственным полезным
      текстовым контентом и&nbsp;соответственно зарабатывают на&nbsp;этом.
    </p>
    <p>
      <strong>Без разделения текста на&nbsp;абзацы&nbsp;</strong>&mdash;
      у&nbsp;вас получится &laquo;простынь&raquo; из&nbsp;букв, читать которую
      неудобно! Именно поэтому появились сайт&nbsp;/ приложение, которые решают
      эту проблему.
    </p>
    <p class="mb-5">
      Возможно, вам будут полезны и&nbsp;другие сервисы для Instagram.
    </p>
    <h2 class="text-center mb-4">Сервис создания фейковой статистики</h2>
    <a class="mb-3" href="https://v2.instafakestats.ru" target="_blank">
      <img
        class="mb-3 img-fluid mx-auto d-block image"
        src="/instafakestats.gif"
        alt="Сайт instafakestats.ru"
      />
    </a>

    <div class="text-center">
      <b-button
        href="https://v2.instafakestats.ru"
        target="_blank"
        variant="outline-primary"
      >
        Перейти на сайт
      </b-button>
    </div>
  </section>
</template>

<script>
import { showToast } from "../utils/toast";
import messages from "../data/messages.json";

const LOCAL_STORAGE_NAME = "instaeditor";

export default {
  data() {
    return {
      text: "",
      maxTextLength: 2200
    };
  },

  methods: {
    async copyTextarea() {
      if (this.text.length > this.maxTextLength) {
        return showToast(messages["max-length"]);
      }

      try {
        const text = this.$refs.textarea.value.replace(/\n/g, "⠀\n");
        await this.$copyText(text);
        showToast(messages["copied"], "Инфо", "success");
      } catch (e) {
        console.error(e);
        showToast(e.message);
      }
    }
  },

  mounted() {
    if (localStorage.LOCAL_STORAGE_NAME) {
      this.text = localStorage.LOCAL_STORAGE_NAME;
    }
  },

  watch: {
    text(text) {
      localStorage.LOCAL_STORAGE_NAME = text;
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 20px;
}

.image {
  width: 100%;
  max-width: 414px;
}

@media screen and (min-width: 576px) {
  .title {
    font-size: 40px;
  }
}
</style>
