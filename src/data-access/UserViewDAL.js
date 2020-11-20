const mongoose = require('mongoose')
const UserView = require('../models/UserView')

class UserViewDAL {
  static countProductViews(unique, productId, groupBy, dateFilter = {}) {
    if (groupBy) {
      groupBy = groupBy.toLowerCase()
    }
    const $match = {
      productId: mongoose.Types.ObjectId(productId)
    }
    if (dateFilter.startDate || dateFilter.endDate) {
      $match.$viewDate = {}
    }
    if (dateFilter.startDate) {
      $match.$viewDate.$gte = dateFilter.startDate
    }
    if (dateFilter.endDate) {
      $match.$viewDate.$lte = dateFilter.endDate
    }

    let dateToGroupByProjection = '$date'
    if (['day', 'month', 'week', 'year'].includes(groupBy)) {
      let dateFormat = "%Y-%m-%d"
      switch (groupBy) {
        case 'week':
          dateFormat = "%Y-%U"
          break
        case 'month':
          dateFormat = "%Y-%m"
          break
        case 'year':
          dateFormat = "%Y"
          break
      }
      dateToGroupByProjection = {
        $dateToString: {
          format: dateFormat,
          date: "$viewDate"
        }
      }
    }
    const pipeline = [
      {
        $match: $match,
      },
      {
        $project: {
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$viewDate"
            }
          },
          group: dateToGroupByProjection,
          userId: '$userId'
        }
      },
    ]

    if (unique) {
      pipeline.push({
        $group: {
          _id: '$userId',
          date: {
            $last: '$date'
          },
          group: {
            $last: '$group'
          },
          views: {
            $sum: 1
          }
        }
      })
    }
    pipeline.push({
      $group: {
        _id: '$group',
        date: {
          $last: '$date'
        },
        group: {
          $last: '$group'
        },
        views: {
          $sum: 1
        }
      }
    })
    pipeline.push({
      $project: {
        _id: 0,
        date: 1,
        views: 1
      }
    })
    return UserView.aggregate(pipeline)
  }


  static async saveUserView(productId, userId) {
    return UserView.create({
      productId: mongoose.Types.ObjectId(productId),
      userId: mongoose.Types.ObjectId(userId),
    })
  }
}

module.exports = UserViewDAL
