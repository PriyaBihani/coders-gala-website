const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      unique: true,
      required: true,
    },
    SpecialityId: { type: mongoose.Schema.Types.ObjectId, required: true },
    locked: {
      type: Boolean,
      default: false,
    },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Topic', TopicSchema);
