const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JurnalSchema = new Schema(
  {
    judul: {
      type: String,
      required: true,
    },
    deskripsi: {
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
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const Jurnal = mongoose.model("jurnal", JurnalSchema);
module.exports = Jurnal;
