const axios = require('axios')

module.exports = async (context) => {
  const { hex } = context.request.params

  const result = await axios.get(`https://api.color.pizza/v1/${hex}`)

  return result.data.colors[0]
}
