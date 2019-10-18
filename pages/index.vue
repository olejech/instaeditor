<template>
  <section>
    <b-row class="row mt-2">
      <b-col>
        <h1 class="text-center mb-3 d-none d-sm-block">InstaEditor - редактор текста для Инстаграм</h1>
        <h1 class="text-center mb-3 d-block d-sm-none">InstaEditor</h1>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <!-- <textarea style="width:200px; height: 60px;" id="area" placeholder="Напишите сообщение здесь"></textarea>
      <br />
      <button onclick="localStorage.removeItem('area');area.value=''">Очистить</button>
      area.value = localStorage.getItem('area');
      area.oninput = () => {
      localStorage.setItem('area', area.value)
      };-->
      <b-col>
        <b-form-textarea
          id="textarea"
          v-model="input_text"
          placeholder="Введите текст... Нажмите 1 раз Enter для новой строки и 2 раза для пустой строки 😉"
          rows="14"
          :state="input_text.length <= 2200 && input_text.length > 0"
        ></b-form-textarea>
        <small for="textarea" class="float-right">{{ this.input_text.length }} / 2200</small>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col>
        <b-button @click="textToFormatBy('$1\u0332')" variant="outline-primary">
          <u>U</u>
        </b-button>
        <b-button @click="textToFormatBy('$1\u0336')" variant="outline-primary">
          <s>S</s>
        </b-button>
        <b-button
          @click="textToBoldOrItalic('bold')"
          variant="outline-primary"
          v-b-tooltip.hover
          title="Только для английских символов"
        >
          <b>B</b>
        </b-button>
        <b-button
          @click="textToBoldOrItalic('italic')"
          variant="outline-primary"
          v-b-tooltip.hover
          title="Только для английских символов"
        >
          <i>I</i>
        </b-button>
        <b-button @click="copyTextarea" variant="outline-primary">Скопировать</b-button>
        <p class="mt-3">18.10.2019: текст автоматически сохраняется на вашем устройстве</p>
        <b-button @click="input_text=''" variant="outline-danger">Очистить</b-button>
      </b-col>
    </b-row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      input_text: "",
      startCharacters: 0,
      finishCharacters: 2200
    };
  },
  methods: {
    async copyTextarea() {
      if (this.input_text.length > 0 && this.input_text.length <= 2200) {
        this.output_message = document
          .getElementById("textarea")
          .value.replace(/\n/g, "⠀\n");
        try {
          await this.$copyText(this.output_message);
          this.$bvToast.toast("Текст скопирован!", {
            title: "Инфо",
            autoHideDelay: 5000,
            variant: "success"
          });
        } catch (e) {
          console.error(e);
        }
      } else {
        this.$bvToast.toast(
          "Количество символом не соответствует правилам Instagram.",
          {
            title: "Ошибка",
            autoHideDelay: 5000,
            variant: "danger"
          }
        );
      }
    },
    textToFormatBy(reg) {
      const e = document.getElementById("textarea");
      const t = e.value;
      const s1 = e.selectionStart;
      const s2 = e.selectionEnd;
      const st = t.substring(s1, s2).replace(/(.)/g, reg);
      const sy = e.scrollTop;
      const sx = e.scrollLeft;
      e.value = t.substring(0, s1) + st + t.substring(s2, t.length);
      e.selectionStart = e.selectionEnd = s1 + st.length;
      e.scrollTop = sy;
      e.scrollLeft = sx;
      e.focus();
    },
    textToBoldOrItalic(typeText) {
      const PREFIX_CODE = 55349;

      const FIRST_BOLD = 56788;
      const LAST_BOLD = FIRST_BOLD + 26 * 2;
      const FIRST_ITALIC = 56840;
      const LAST_ITALIC = FIRST_ITALIC + 26 * 2;
      const FIRST_BOLD_ITALIC = 56892;
      const LAST_BOLD_ITALIC = FIRST_BOLD_ITALIC + 26 * 2;

      const FIRST_SPECIAL = FIRST_BOLD;
      const LAST_SPECIAL = LAST_BOLD_ITALIC;

      const e = document.getElementById("textarea");
      let t = e.value;
      const s1 = e.selectionStart;
      const s2 = e.selectionEnd;
      const ch = t.substring(s1, s2);

      if (typeText == "bold") {
        toggleBold(ch);
      } else if (typeText == "italic") {
        toggleItalic(ch);
      }

      function removeFormatting(ch) {
        let res = "";
        for (let i = 0, len = ch.length; i < len; ++i) {
          const code = ch.charCodeAt(i);
          if (code === PREFIX_CODE && i + 1 < ch.length) {
            let next = ch.charCodeAt(i + 1);
            if (next >= FIRST_SPECIAL && next <= LAST_SPECIAL) {
              const specialIdx = next - FIRST_SPECIAL;
              const letterIndex = specialIdx % 26;
              const capital = specialIdx % (26 * 2) < 26;
              if (capital) {
                res += String.fromCharCode("A".charCodeAt(0) + letterIndex);
              } else {
                res += String.fromCharCode("a".charCodeAt(0) + letterIndex);
              }
              ++i;
              continue;
            }
          }
          res += ch[i];
        }
        return res;
      }

      function toggleBold(ch) {
        return toggle(ch, FIRST_BOLD, LAST_BOLD, FIRST_ITALIC, LAST_ITALIC);
      }

      function toggleItalic(ch) {
        return toggle(ch, FIRST_ITALIC, LAST_ITALIC, FIRST_BOLD, LAST_BOLD);
      }

      function toggle(ch, typeStart, typeEnd, otherStart, otherEnd) {
        let res = "";
        for (let i = 0, len = ch.length; i < len; ++i) {
          const code = ch.charCodeAt(i);
          if (code === PREFIX_CODE && i + 1 < ch.length) {
            let next = ch.charCodeAt(i + 1);
            if (next >= typeStart && next <= typeEnd) {
              res += removeFormatting(String.fromCharCode(code, next));
              ++i;
              continue;
            } else if (next >= otherStart && next <= otherEnd) {
              next += FIRST_BOLD_ITALIC - otherStart;
            } else if (next >= FIRST_BOLD_ITALIC && next <= LAST_BOLD_ITALIC) {
              next += otherStart - FIRST_BOLD_ITALIC;
            }
            res += String.fromCharCode(code, next);
            ++i;
            continue;
          } else if (code >= "a".charCodeAt(0) && code <= "z".charCodeAt(0)) {
            const letterIdx = code - "a".charCodeAt(0);
            res += String.fromCharCode(PREFIX_CODE, typeStart + 26 + letterIdx);
          } else if (code >= "A".charCodeAt(0) && code <= "Z".charCodeAt(0)) {
            const letterIdx = code - "A".charCodeAt(0);
            res += String.fromCharCode(PREFIX_CODE, typeStart + letterIdx);
          } else {
            res += String.fromCharCode(code);
          }
        }

        const sy = e.scrollTop;
        const sx = e.scrollLeft;
        e.value = t.substring(0, s1) + res + t.substring(s2, t.length);
        e.selectionStart = e.selectionEnd = s1 + res.length;
        e.scrollTop = sy;
        e.scrollLeft = sx;
        e.focus();

        return res;
      }

      if ("undefined" === typeof window.fonthacks) {
        window.fonthacks = {};
      }
      window.fonthacks.removeFormatting = removeFormatting;
      window.fonthacks.toggleBold = toggleBold;
      window.fonthacks.toggleItalic = toggleItalic;
    }
  },
  mounted() {
    if (localStorage.instaeditor) {
      this.input_text = localStorage.instaeditor;
    }
  },
  watch: {
    input_text(newInput_text) {
      localStorage.instaeditor = newInput_text;
    }
  }
};
</script>
