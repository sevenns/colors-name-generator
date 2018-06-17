<template lang='pug'>

.color(:style='getTextColor')
  vheader(:color='received.text')
  .background(:style='getBackgroundColor')

  .input-wrapper
    .input-prepend #
    input.input(
      type='text',
      placeholder='6c5b7b',
      v-model='color'
    )

  .color__name(@click='select($event)') {{ received.name }}

</template>

<script>

import axios from '~/plugins/axios'
import Header from '~/components/Header'

export default {
  components: { vheader: Header },

  data () {
    return {
      color: '6c5b7b',
      received: {
        color: '#6c5b7b',
        name: 'Princely Violet',
        text: '#c06c84'
      }
    }
  },

  computed: {
    getBackgroundColor () {
      return {
        'background-color': this.received.color
      }
    },

    getTextColor () {
      return {
        color: this.received.text
      }
    }
  },

  watch: {
    color (value) {
      value = value.replace(/([^abcdef0-9])|#/ig, '')

      this.color = value.slice(0, 6)

      this.fetch()
    }
  },

  methods: {
    async fetch () {
      this.color = this.color.toLowerCase()

      if (this.test(this.color)) {
        const { data } = await axios.get(`/api/color/get/${this.color}`)

        this.received.name = data.name
        this.received.color = data.hex
        this.received.text = data.luminance > 65 ? '#000' : '#c06c84'
      }
    },

    test (color) {
      const receivedColor = this.received.color.replace('#', '')
      const test = /[abcdefABCDEF0-9]{6}/.test(color)
      const isSyntaxCorrect = test && color.length === 6

      return isSyntaxCorrect && color !== receivedColor
    },

    select (event) {
      const { target } = event

      window.getSelection().selectAllChildren(target)
    }
  }
}

</script>
