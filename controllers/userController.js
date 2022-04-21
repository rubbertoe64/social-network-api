const User = require('../models/User');
const Thoughts = require('../models/Thought');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req,res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      { $set: req.body },
      { runValidators: true, new: true }
      )
    .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
      User.findOneAndRemove({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : Thoughts.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
              )
        )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'User deleted but no thought with this id!' })
            : res.json({ message: 'User successfully deleted!' })
        )
        .catch((err) => res.status(500).json(err));
    },
  addFriend(req,res){
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$push: {friends: req.params.friendId}}, 
      {new: true, runValidators: true})
    .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeFriend(req,res){
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$pull: {friends: req.params.friendId}}, 
      {new: true})
      .then((friend) =>
      !friend
        ? res.status(404).json({ message: 'No friend with this id!' })
        : res.json(friend)
    )
    .catch((err) => res.status(500).json(err));
  }
  
}

// example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }