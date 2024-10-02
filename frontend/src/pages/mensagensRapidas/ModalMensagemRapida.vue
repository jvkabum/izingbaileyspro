<template>
  <q-dialog
    persistent
    :value="modalMensagemRapida"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      :style="$q.screen.width < 500 ? 'width: 95vw' : 'min-width: 700px; max-width: 700px'"
      class="q-pa-lg"
    >
      <div class="text-h6">{{ mensagemRapida.id ? 'Editar' : 'Criar' }} Mensagem Rápida {{ mensagemRapida.id ? `(ID: ${mensagemRapida.id})` : '' }}</div>
      
      <q-card-section class="q-pa-none">
        <div class="row q-my-md">
          <div class="col">
            <q-input
              style="width: 200px; margin-left: 62px"
              outlined
              rounded
              dense
              v-model="mensagemRapida.key"
              label="Chave"
            />
            <p style="margin-left: 62px; font-size: 10px; margin-top: 3px;">
              A chave é o atalho para pesquisa da mensagem pelos usuários.
            </p>
          </div>
        </div>
        
        <div class="row items-center">
          <div class="col-xs-3 col-sm-2 col-md-1">
            <q-btn round flat class="q-ml-sm">
              <q-icon size="2em" name="mdi-emoticon-happy-outline" />
              <q-tooltip>Emoji</q-tooltip>
              <q-menu anchor="top right" self="bottom middle" :offset="[5, 40]">
                <VEmojiPicker
                  style="width: 40vw"
                  :showSearch="false"
                  :emojisByRow="20"
                  labelSearch="Localizar..."
                  lang="pt-BR"
                  @select="onInsertSelectEmoji"
                />
              </q-menu>
            </q-btn>
          </div>
          <div class="col-xs-8 col-sm-10 col-md-11 q-pl-sm">
            <label class="text-caption">Mensagem:</label>
            <textarea
              ref="inputEnvioMensagem"
              style="min-height: 15vh; max-height: 15vh;"
              class="q-pa-sm bg-white full-width rounded-all"
              placeholder="Digite a mensagem"
              autogrow
              dense
              outlined
              @input="onInputMessage"
              :value="mensagemRapida.message"
            />
          </div>
        </div>

        <!-- Uploader de Arquivos -->
        <div class="row q-my-md">
          <q-uploader
            url=""
            label="Anexar Arquivos"
            @added="onFileAdded"
            :auto-upload="false"
            multiple
            accept="image/*,video/*,audio/*,application/pdf"
          />
        </div>
      </q-card-section>
      
      <q-card-actions align="right" class="q-mt-md">
        <q-btn
          rounded
          label="Cancelar"
          color="negative"
          v-close-popup
          class="q-mr-md"
        />
        <q-btn
          rounded
          label="Salvar"
          color="positive"
          @click="handleMensagemRapida"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { VEmojiPicker } from 'v-emoji-picker'
import { CriarMensagemRapida, AlterarMensagemRapida } from 'src/service/mensagensRapidas'

export default {
  name: 'ModalMensagemRapida',
  components: { VEmojiPicker },
  props: {
    modalMensagemRapida: {
      type: Boolean,
      default: false
    },
    mensagemRapidaEmEdicao: {
      type: Object,
      default: () => {
        return { id: null, key: '', message: '', medias: [] }
      }
    }
  },
  data () {
    return {
      mensagemRapida: {
        key: null,
        message: null,
        medias: [] // Para armazenar os arquivos anexados
      },
      loading: false
    }
  },
  methods: {
    onInsertSelectEmoji (emoji) {
      const tArea = this.$refs.inputEnvioMensagem
      const startPos = tArea.selectionStart
      const endPos = tArea.selectionEnd
      const tmpStr = this.mensagemRapida.message || ''

      if (!emoji.data) return

      this.mensagemRapida.message = tmpStr.substring(0, startPos) + emoji.data + tmpStr.substring(endPos)

      // Posiciona o cursor corretamente após inserir o emoji
      this.$nextTick(() => {
        tArea.selectionStart = tArea.selectionEnd = startPos + emoji.data.length
      })
    },
    
    onInputMessage (event) {
      this.mensagemRapida.message = event.target.value
    },

    onFileAdded (files) {
      this.mensagemRapida.medias = files
    },

    abrirModal () {
      if (this.mensagemRapidaEmEdicao.id) {
        this.mensagemRapida = { ...this.mensagemRapidaEmEdicao }
      } else {
        this.resetarMensagemRapida()
      }
    },

    fecharModal () {
      this.resetarMensagemRapida()
      this.$emit('update:mensagemRapidaEmEdicao', { id: null })
      this.$emit('update:modalMensagemRapida', false)
    },

    resetarMensagemRapida () {
      this.mensagemRapida = {
        key: null,
        message: null,
        medias: []
      }
    },

    async handleMensagemRapida () {
      if (!this.mensagemRapida.key || !this.mensagemRapida.message) {
        this.$q.notify({
          type: 'negative',
          message: 'A chave e a mensagem são obrigatórias.'
        })
        return
      }

      const formData = new FormData()
      formData.append('key', this.mensagemRapida.key)
      formData.append('message', this.mensagemRapida.message)

      if (this.mensagemRapida.medias.length) {
        this.mensagemRapida.medias.forEach(file => {
          formData.append('medias', file)
        })
      }

      this.loading = true
      try {
        let data
        if (this.mensagemRapida.id) {
          ({ data } = await AlterarMensagemRapida(this.mensagemRapida.id, formData))
          this.$emit('mensagemRapida:editada', { ...this.mensagemRapida, ...data })
          this.$q.notify({
            type: 'info',
            message: 'Mensagem Rápida editada!'
          })
        } else {
          ({ data } = await CriarMensagemRapida(formData))
          this.$emit('mensagemRapida:criada', data)
          this.$q.notify({
            type: 'positive',
            message: 'Mensagem rápida criada!'
          })
        }
        this.fecharModal()
      } catch (error) {
        console.error(error)
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao salvar a mensagem.'
        })
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.textarea-container {
  min-height: 15vh;
  max-height: 15vh;
}

.q-uploader {
  width: 100%;
  margin-top: 20px;
}

.q-card {
  width: 95vw;
  max-width: 700px;
}

.q-btn {
  margin-right: 10px;
}
</style>

