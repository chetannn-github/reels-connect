import multer from "multer";

const storage = multer.memoryStorage();

const uploadPDF = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

export default uploadPDF;
