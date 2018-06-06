<template lang='pug'>

.color(:style='getTextColor')
  vheader(:color='received.text')
  .background(:style='getBackgroundColor')

  .input-wrapper
    .input-prepend #
    input.input(
      type='text',
      placeholder='35495e',
      v-model='color',
      @input='fetch',
      maxlength='6'
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
      color: '35495e',
      received: {
        color: '#35495e',
        name: 'Dark Denim',
        text: '#fff'
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

  methods: {
    async fetch () {
      this.color = this.color.toLowerCase()

      if (this.test(this.color)) {
        const { data } = await axios.get(`/api/color/get/${this.color}`)

        this.received.name = data.name
        this.received.color = data.hex
        this.received.text = data.luminance > 85 ? '#000' : '#fff'
      }
    },

    test (color) {
      return /[abcdefABCDEF0-9]{6}/.test(color)
    },

    select (event) {
      const { target } = event

      window.getSelection().selectAllChildren(target)
    }
  }
}

</script>
