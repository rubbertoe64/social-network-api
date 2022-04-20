const Thoughts = require('../models/Thought');
const User = require('../models/User')
module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thoughts.find()
          .then((thought) => res.json(thought))
          .catch((err) => res.status(500).json(err));
      },
// get one thought
      getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
// Create Thoughts
      createThought(req, res){
        Thoughts.create(req.body)
         .then((thought) => {
             return User.findOneAndUpdate(
                 {username: req.body.username},
                 {$push: { thoughts: thought._id }},
                 {new: true}
             );
         })
         .then((post) =>
            !post
              ? res
                  .status(404)
                  .json({ message: 'comment created, but no posts with this ID' })
              : res.status(200).json({ message: 'comment created' })
          )
         .catch((err) => res.status(500).json(err));
      },
// Update Thoughts
      updateThought(req, res) {
          Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          )
          .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(dbThoughtData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
      },
// Delete Thoughts
      deleteThought(req, res) {
        Thoughts.findOneAndRemove({ _id: req.params.userId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : Thought.findOneAndUpdate(
                  { thought: req.params.thoughtId },
                  { $pull: { thought: req.params.thoughtId } },
                  { new: true }
                )
          )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'Thought created but no user with this id!' })
              : res.json({ message: 'Thought successfully deleted!' })
          )
          .catch((err) => res.status(500).json(err));
      },

    // Create Reaction
    addReaction(req,res){
        Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$push: {reactions: req.body}},
            {new: true, runValidators: true}
        )
        .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
    },
    removeReaction(req,res){
        Thoughts.finOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            { new: true }
        )
        .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Reaction deleted but no thoughts with this id!' })
          : res.json({ message: 'Reaction successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
    }

}

