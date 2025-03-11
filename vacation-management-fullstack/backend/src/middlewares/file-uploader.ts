import { Upload } from "@aws-sdk/lib-storage";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 } from "uuid";
import config from 'config'
import s3Client from "../aws/aws";


declare global {
    namespace Express {
        interface Request {
            imageUrl?: string
        }
    }
}

export default async function fileUploader(req: Request, res: Response, next: NextFunction) {
    if (!req.files) return next()

    const vacationImage = req.files.vacationImage as UploadedFile

    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: config.get<string>('s3.bucket'),
            Key: `${v4()}${path.extname(vacationImage.name)}`,
            Body: vacationImage.data,
            ContentType: vacationImage.mimetype
        }
    })

    const response = await upload.done()

    req.imageUrl = response.Location
    next()
}