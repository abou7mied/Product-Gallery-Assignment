const moment = require('moment')
const mongoose = require('mongoose')
const Database = require('../data-access/Database')
const UserView = require("../models/UserView")

const productIds = [
  "5fb79eb0357779493c3afe1d",
  "5fb79eb0357779493c3afe1e",
  "5fb79eb0357779493c3afe1f",
  "5fb79eb0357779493c3afe20",
  "5fb79eb0357779493c3afe21",
  "5fb79eb0357779493c3afe22",
  "5fb79eb0357779493c3afe23",
  "5fb79eb0357779493c3afe24",
  "5fb79eb0357779493c3afe25",
  "5fb79eb0357779493c3afe26"
]

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}


async function start() {
  await Database.connect()
  await UserView.remove()
  console.log('Database connected')

  const userIds = []
  for (let i = 0; i < 5000; i++) {
    userIds.push(mongoose.Types.ObjectId())
  }

  let savingPromise = Promise.resolve()
  let toInsert = []
  let totalCount = 0
  let inserted = 0
  const save = async (data) => {
    if (data.length) {
      const result = await UserView.insertMany(data)
      inserted += result.length
      console.log("inserted", `${inserted.toLocaleString()}/${totalCount.toLocaleString()}`)
    }
  }

  for (let i = 0; i < 365; i++) {
    const d = moment.utc().subtract(i, 'd')
    for (let j = 0; j < userIds.length; j++) {
      const randomUserIndex = getRandomArbitrary(0, userIds.length)
      const user = userIds[randomUserIndex]

        const randomProductIndex = getRandomArbitrary(0, productIds.length)
        const randomProduct = productIds[randomProductIndex]
        toInsert.push({
          productId: mongoose.Types.ObjectId(randomProduct),
          userId: mongoose.Types.ObjectId(user),
          viewDate: d
        })
        totalCount++
        if (toInsert.length === 5000) {
          let data = toInsert
          toInsert = []
          savingPromise = savingPromise.then(() => save(data))
        }
    }
  }
  savingPromise = savingPromise.then(() => save(toInsert))
  console.log('Iteration finished, wait promises...')
  try {
    await savingPromise
  } catch (error) {
    console.error(error)
  }
  console.log('All data saved')
}

start()
