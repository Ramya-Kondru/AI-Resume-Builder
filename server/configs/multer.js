import multer from "multer";

const storage=multer.diskStorage({});

const upload=multer({storage})

export default upload

// created upload middleware-which is used to add the uploaded image in the request with the file property