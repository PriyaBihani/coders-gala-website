const mongoose = require("mongoose");

const SpecialitySchema = mongoose.Schema(
  {
    ArticleContent: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      unique: true,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Speciality", SpecialitySchema);
