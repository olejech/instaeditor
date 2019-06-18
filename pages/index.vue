<template>
  <section>
    <b-row class="mt-3">
      <div class="col-md-12">
        <h1>InstaEditor</h1>
        <b-form-textarea
          id="textarea"
          v-model="input_text"
          placeholder="Здесь блогеры пишут текст для постов в Instagram 🔥 Нажмите 1 раз Enter для новой строки и 2 раза для пустой строки. Чтобы скопировать текст с форматированном варианте, нажмите на кнопку «Копировать» 😉"
          rows="10"
        ></b-form-textarea>
      </div>
    </b-row>
    <div class="row mt-3">
      <div class="col-md-12">
        <b-button @click="copyTextarea" variant="outline-primary">Скопировать</b-button>
      </div>
    </div>

    <b-modal
      v-model="modalShow"
      title="Редактор текста для Instagram"
      ok-only
      ok-title="Написать текст"
    >
      <p>Перед вами редактор текста для постов в Instagram. Здесь можно написать текст с абзацами и пустыми строками и в готовом виде скопировать его в ваш пост.</p>
      <p><nuxt-link to="/how">Зачем это нужно?</nuxt-link></p>
    </b-modal>
  </section>
</template>

<script>
export default {
  data() {
    return {
      input_text: '',
      output_text: '',
      modalShow: true
    }
  },
  methods: {
    async copyTextarea() {
      this.output_message = this.input_text.replace(/\n/g, '⠀\n')
      try {
        await this.$copyText(this.output_message)
        this.$bvToast.toast('Текст скопирован!', {
          title: 'Инфо',
          autoHideDelay: 5000,
          variant: 'success'
        })
      } catch (e) {
        console.error(e)
      }
    },
  }
}
</script>