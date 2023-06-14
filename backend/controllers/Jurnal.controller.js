const Jurnal = require("../models/Jurnal.model");

module.exports = {
  getAllJurnal: async (req, res, next) => {
    if (req.user.role != "siswa") {
      let data = await Jurnal.find().populate("userId").sort({ tanggal: -1 });
      res.json(data);
      return;
    } else {
      let data = await Jurnal.find({ userId: req.user._id }).sort({
        tanggal: -1,
      });
      res.json(data);
      return;
    }
  },
  getAllJurnalUser: async (req, res, next) => {
    let data = await Jurnal.find({ userId: req.params.id }).sort({
      tanggal: -1,
    });
    res.json(data);
  },
  createJurnal: async (req, res, next) => {
    let errors = {};
    req.body.judul == ""
      ? (errors["judul"] = { type: "required", message: "Judul haris diisi" })
      : delete errors?.judul;
    req.body.deskripsi == ""
      ? (errors["deskripsi"] = {
          type: "required",
          message: "Deskripsi harus diisi",
        })
      : delete errors?.deskripsi;
    req.body.userId == ""
      ? (errors["userId"] = {
          type: "required",
          message: "UserId harus diisi",
        })
      : delete errors?.userId;

    if (!errors.judul && !errors.deskripsi && !errors.userId) {
      if (req.body.judul && req.body.deskripsi && req.body.userId) {
        let jurnal = new Jurnal(req.body);
        try {
          await jurnal.save();
          res.json({ message: "Berhasil mengisi jurnal" });
        } catch ({ errors }) {
          res.status(400);
          res.json({ errors });
        }
      }
    }
  },
};
