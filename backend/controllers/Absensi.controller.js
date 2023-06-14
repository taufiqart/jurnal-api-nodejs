const Absensi = require("../models/Absensi.model");
const jwt = require("jsonwebtoken");
module.exports = {
  getAllAbsensi: async (req, res, next) => {
    if (req.user.role != "siswa") {
      let data = await Absensi.find().populate("userId").sort({ tanggal: -1 });
      res.json(data);
      return;
    } else {
      let data = await Absensi.find({ userId: req.user._id }).sort({
        tanggal: -1,
      });
      res.json(data);
      return;
    }
  },
  getAllAbsensiUser: async (req, res, next) => {
    let data = await Absensi.find({ userId: req.params.id }).sort({
      tanggal: -1,
    });
    res.json(data);
  },
  createAbsensi: async (req, res, next) => {
    let absensi = new Absensi(req.body);
    try {
      await absensi.save();
      res.json({ message: "Berhasil absen" });
    } catch ({ errors }) {
      res.status(400);
      res.json({ errors });
    }
  },
  updateStatusAbsensi: async (req, res, next) => {
    if (!req.body.status) {
      res.json({
        errors: {
          status: {
            message: "Status wajib di isi",
            type: "required",
          },
        },
      });
      return;
    }
    if (!req.params.id) {
      res.json({
        errors: {
          status: {
            message: "Parameter id wajib di isi",
            type: "required",
          },
        },
      });
      return;
    }
    try {
      await Absensi.updateOne(
        { _id: req.params.id },
        {
          status: req.body.status,
        }
      );
      res.json({ message: "Berhasil merubah status" });
    } catch (error) {
      console.log(error);
    }
  },
};
