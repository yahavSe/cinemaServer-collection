var axios = require("axios");
var Member = require("./membersSchema");
var subscription = require("./subscriptionsBL");
var subscriptionS = require("./subscriptionsSchema");

var usersImport = async () => {
  let objUsrers = await axios.get("https://jsonplaceholder.typicode.com/users");
  objUsrers.data.forEach((element) => {
    addMember2(element);
  });
};

var getALL = async () => {
  return new Promise((resolve, reject) => {
    Member.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
var getById = (id) => {
  return new Promise((resolve, reject) => {
    Member.findById(id, (err, data) => {
      if (err) {
        reject(err);
      } else {
        subscription.getById(data._id);
        resolve(data);
      }
    });
  });
};

var addMember = (member) => {
  let prom = new Promise((resolve, reject) => {
    var newMember = new Member({
      id: member.id,
      name: member.name,
      email: member.email,
      city: member.city,
    });

    newMember.save((err, data) => {
      if (err) {
        reject(err);
      } else {
        var obj = {
          id: data._id,
          memberId: member.id,
          movies: Array,
        };
        addSubscription(obj);
        resolve("The Member has been created");
      }
    });
  });

  return prom;
};

var addMember2 = (member) => {
  let prom = new Promise((resolve, reject) => {
    var newMember = new Member({
      id: member.id,
      name: member.name,
      email: member.email,
      city: member.address.city,
    });

    newMember.save((err, data) => {
      if (err) {
        reject(err);
      } else {
        var obj = {
          id: data._id,
          memberId: member.id,
          movies: Array,
        };
        addSubscription(obj);
        resolve("The Member has been created");
      }
    });
  });

  return prom;
};

var updateMember = (member, id) => {
  return new Promise((resolve, reject) => {
    console.log("member", member);
    Member.findByIdAndUpdate(
      id,
      {
        id: member.id,
        name: member.name,
        email: member.email,
        city: member.city,
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("The Member has been updated");
        }
      }
    );
  });
};

var deleteMember = (id) => {
  return new Promise((resolve, reject) => {
    Member.findByIdAndDelete(id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted!!!");
      }
    });
  });
};
///////////////////////////////////////////////////////

var addSubscription = (subscription) => {
  let prom = new Promise((resolve, reject) => {
    var newSubscription = new subscriptionS({
      id: subscription.id,
      memberId: subscription.memberId,
      movies: [
        {
          movieId: subscription.movieId,
          date: subscription.date,
        },
      ],
    });

    newSubscription.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve("The Subscription has been created");
      }
    });
  });

  return prom;
};
module.exports = {
  getALL,
  getById,
  addMember2,
  addMember,
  updateMember,
  deleteMember,
  usersImport,
};
