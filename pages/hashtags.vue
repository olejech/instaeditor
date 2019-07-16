<template>
  <div>
    <b-row class="mt-3">
      <b-col>
        <h1 class="text-center mb-3">Редактор хештегов для Инстаграм</h1>
        <b-form-textarea
          id="textarea"
          v-model="input_text"
          placeholder="Введите текст... Автоматически добавится знак решетки 😉"
          rows="10"
          :state="count_word.length <= 30 && count_word.length > 0"
        ></b-form-textarea>
        <small for="textarea" class="float-right">{{ this.hashtagsCount }} / 30</small>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="success" v-if="output_text">{{ this.output_text }}</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="auto">
        <b-button class="mb-3" @click="hashtags" variant="outline-primary">Генерировать и копировать</b-button>
        <b-button class="mb-3" @click="hashtagsRandom" variant="outline-primary">Поменять местами</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Редактор хештегов Инстаграм',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Сервис быстрого создания хештегов для Инстаграм из вашего текста и расстановка их в случайном порядке'
        }
      ]
    }
  },
  data() {
    return {
      input_text: '',
      output_text: '',
      count_word: 0
    }
  },
  methods: {
    async hashtags() {
      if (this.count_word.length <= 30 && this.count_word.length > 0) {
        this.output_text = this.input_text.split(' ')
        for (var i = 0; i < this.output_text.length; i++) {
          this.output_text[i] = '#' + this.output_text[i]
        }
        this.output_text = this.output_text.join(' ')
        try {
          await this.$copyText(this.output_text)
          this.$bvToast.toast('Текст скопирован!', {
            title: 'Инфо',
            autoHideDelay: 5000,
            variant: 'success'
          })
        } catch (e) {
          console.error(e)
        }
      } else
        this.$bvToast.toast('Слишком много хештегов!', {
          title: 'Ошибка',
          autoHideDelay: 5000,
          variant: 'danger'
        })
    },
    async hashtagsRandom() {
      if (this.count_word.length <= 30 && this.count_word.length > 0) {
        let randomText = this.input_text.split(' ')

        for (var i = 0; i < randomText.length; i++) {
          randomText[i] = '#' + randomText[i]
        }

        function compareRandom(a, b) {
          return Math.random() - 0.5
        }
        this.output_text = randomText.sort(compareRandom).join(' ')

        try {
          await this.$copyText(this.output_text)
          this.$bvToast.toast('Текст скопирован!', {
            title: 'Инфо',
            autoHideDelay: 1000,
            variant: 'success'
          })
        } catch (e) {
          console.error(e)
        }
      } else
        this.$bvToast.toast('Слишком много хештегов!', {
          title: 'Ошибка',
          autoHideDelay: 5000,
          variant: 'danger'
        })
    }
  },
  computed: {
    hashtagsCount() {
      if (this.input_text == '') return 0
      this.count_word = this.input_text.split(' ')
      return this.count_word.length
    }
  }
}
</script>