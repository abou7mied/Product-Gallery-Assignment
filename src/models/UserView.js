const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  userId: Types.ObjectId,
  productId: Types.ObjectId,
  viewDate: {
    type: Date,
    default: Date.now
  }
})

schema.index({
  userId: 1
})

module.exports = model('UserView', schema)
