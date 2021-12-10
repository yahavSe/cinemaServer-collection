var Subscription = require('./subscriptionsSchema')

var getALL = async () => {
    return new Promise((resolve, reject) => {
        Subscription.find({}, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

var getById = (id) => {
    return new Promise((resolve, reject) => {
        Subscription.find(id, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

var addSubscription = (subscription,id) => {
    let prom = new Promise((resolve, reject) => {
        var newSubscription = new Subscription({
            id: subscription.id,
            memberId : subscription.memberId,
            movies: [{
                movieId:subscription.movieId,
                date:subscription.date 
            }]
        })

        newSubscription.save((err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("The Subscription has been created")
            }
        })
    })

    return prom;
}

var updateSubscription = (subscription, subId) => {
    console.log("subscription",subscription);
    console.log("subId",subId);
    return new Promise((resolve, reject) => {
        var newSubObj = new Subscription({
            id: subscription.id,
            memberId : subscription.memberId,
            movies: [{
                movieId:subscription.movieId,
                date:subscription.date 
            }]
        })
        Subscription.findByIdAndUpdate(subId, subscription , (err) => {
            if (err) {
                reject(err)
            }
            else {
                
                resolve("The Subscription has been updated")
            }
        })

    })
}

var deleteSubscription = (id) => {
    return new Promise((resolve, reject) => {
        Subscription.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("Deleted!!!")
            }
        })
    })
}

module.exports = { getALL, getById, addSubscription, updateSubscription, deleteSubscription }