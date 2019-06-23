<template>
  <section>
    <b-row class="mt-3">
      <b-col>
        <h1 class="text-center mb-3">InstaEditor - редактор текста для Инстаграм</h1>
        <b-form-textarea
          id="textarea"
          v-model="input_text"
          placeholder="Введите текст... Нажмите 1 раз Enter для новой строки и 2 раза для пустой строки 😉"
          rows="10"
          :state="input_text.length <= 2200 && input_text.length > 0"
        ></b-form-textarea>
        <small for="textarea" class="float-right">{{ this.input_text.length }} / 2200</small>
      </b-col>
    </b-row>
    <div class="row mt-2">
      <div class="col-md-12">
        <b-button @click="copyTextarea" variant="outline-primary">Скопировать</b-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      input_text: '',
      output_text: '',
      startCharacters: 0,
      finishCharacters: 2200
    }
  },
  methods: {
    async copyTextarea() {
      if (this.input_text.length > 0 && this.input_text.length <= 2200) {
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
      } else {
        this.$bvToast.toast('Количество символом не соответствует правилам Instagram.', {
          title: 'Ошибка',
          autoHideDelay: 5000,
          variant: 'danger'
        })
      }
    }
  }
}
</script>