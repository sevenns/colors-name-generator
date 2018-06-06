<template lang='pug'>

.header
  a.github(
    href='https://github.com/sevenns/colors-name-generator',
    target='_blank',
    :style='getColor'
  )
    icon(name='github', height='36px')

  a.sevenns(
    href='http://sevenns.pw/',
    target='_blank',
    :style='getColor'
  )
    icon(name='sevenns', height='36px')

</template>

<script>

export default {
  props: {
    color: {
      type: String,
      default: '#fff'
    }
  },

  computed: {
    getColor () {
      return {
        color: this.color
      }
    }
  }
}

</script>

