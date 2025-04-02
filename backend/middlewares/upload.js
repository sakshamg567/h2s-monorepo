const multer = require("multer");
const path = require("path");

// Storage setup
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "uploads/"); // Save files in the 'uploads' folder
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
   }
});

// File filter: Allow only PDFs & images
const fileFilter = (req, file, cb) => {
   const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
   if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
   } else {
      cb(new Error("Only PDF or image files are allowed!"), false);
   }
};

// Multer middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;
