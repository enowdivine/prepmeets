import { Response, Request, NextFunction } from "express";
const path = require("path");

const fileExtLimiter = (allowedMimeTypes: any[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const files: any = req.files;

    // const fileExtensions: any[] = [];
    // Object.keys(files).forEach((key) => {
    //   fileExtensions.push(path.extname(files[key].name));
    // });

    // // Are the file extension allowed?
    // const allowed = fileExtensions.every((ext) =>
    //   allowedExtArray.includes(ext)
    // );

    const fileMimeTypes: string[] = [];
    Object.keys(files).forEach((key) => {
      fileMimeTypes.push(files[key].mimetype);
    });

    // Are the file MIME types allowed?
    const allowed = fileMimeTypes.every((mimeType) =>
      allowedMimeTypes.includes(mimeType)
    );

    if (!allowed) {
      const message =
        `Upload failed. Only ${allowedMimeTypes.toString()} files allowed.`.replaceAll(
          ",",
          ", "
        );

      return res.status(422).json({ status: "error", message });
    }

    next();
  };
};

export default fileExtLimiter;
