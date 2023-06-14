const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AbsensiSchema = new Schema(
  {
    absensi: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    tanggal: {
      type: Number,
      required: true,
      default: () => Date.now(),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  { timestamps: true }
);

const Absensi = mongoose.model("absensi", AbsensiSchema);
module.exports = Absensi;
