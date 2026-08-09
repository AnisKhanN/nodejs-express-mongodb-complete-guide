const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Flexible middleware that accepts any field name (music, albumArt, file, audio, song, artwork)
// and handles Multer errors gracefully without breaking Express
const handleFileUpload = (req, res, next) => {
    upload.any()(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                message: "Multer upload error",
                error: err.message,
                code: err.code,
                field: err.field,
            });
        } else if (err) {
            return res.status(500).json({
                message: "Error during file upload",
                error: err.message,
            });
        }

        // Standardize single file access on req.file
        if (Array.isArray(req.files) && req.files.length > 0) {
            const preferredFields = ["music", "file", "audio", "song", "artwork", "albumArt"];
            const matchedFile = req.files.find((f) => preferredFields.includes(f.fieldname));
            req.file = matchedFile || req.files[0];
        }

        next();
    });
};

module.exports = { upload, handleFileUpload };