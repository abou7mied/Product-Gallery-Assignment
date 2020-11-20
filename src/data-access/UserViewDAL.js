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
      $match.viewDate = {}
    }
    if (dateFilter.startDate) {
      $match.viewDate.$gte = new Date(dateFilter.startDate)
    }
    if (dateFilter.endDate) {
      $match.viewDate.$lte = new Date(dateFilter.endDate)
    }
    let dateToGroupByProjection = '$date'
    let dateFormat = "%Y-%m-%d"
    if (['day', 'month', 'week', 'year'].includes(groupBy)) {
      switch (groupBy) {
        case 'week':
          dateFormat = "%Y W%U"
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
              format: dateFormat,
              date: "$viewDate"
            }
          },
          group: dateToGroupByProjection,
          userId: '$userId',
          viewDate: '$viewDate',
        }
      },
    ]

    const groupProjects = {
      date: {
        $last: '$date'
      },
      group: {
        $last: '$group'
      },
      viewDate: {
        $last: '$viewDate'
      },
      userId: {
        $last: '$userId'
      },
      views: {
        $sum: 1
      }
    }

    if (!unique) {
      pipeline.push({
        $group: {
          _id: '$group',
          ...groupProjects
        }
      })
    } else {
      pipeline.push({
        $group: {
          _id: {
            group: '$group',
            userId: '$userId',
          },
          ...groupProjects,
        }
      })
      pipeline.push({
        $group: {
          _id: '$group',
          ...groupProjects,
        }
      })
    }
    pipeline.push({
      $sort: {
        viewDate: -1,
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
