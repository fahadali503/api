import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { FileUpload } from 'graphql-upload';
import { InjectModel } from 'nestjs-typegoose';
import { ImageModel } from 'src/common/models/Image';
import { Cloudinary, ICloudinaryImage } from 'src/utils/cloudinary';

@Injectable()
export class ImageService {
    constructor(
        @InjectModel(ImageModel) private readonly imageModel: ReturnModelType<typeof ImageModel>
    ) { }

    private uploadImage(file: FileUpload, folder: string) {
        // const promises: Promise<any>[] = [];
        // console.log(promises)
        // if (Array.isArray(file)) {
        //     file.forEach(({ createReadStream, filename }) => {
        //         const stream = createReadStream();
        //         promises.push(new Promise((resolve, reject) => {
        //             stream.pipe(Cloudinary.uploader.upload_stream({ filename_override: filename, unique_filename: false, use_filename: true, folder }, (err, data) => {
        //                 reject(err);
        //                 resolve(data);
        //             }));
        //         }))
        //     });
        //     return promises as unknown as ICloudinaryImage[];
        // }
        const stream = file.createReadStream();
        return new Promise((resolve, reject) => {
            stream.pipe(Cloudinary.uploader.upload_stream({ filename_override: file.filename, unique_filename: false, use_filename: true, folder }, (err, data) => {
                resolve(data);
                reject(err)
            }))
        }) as Promise<ICloudinaryImage>;
    }

    // private async createImage(file: FileUpload | FileUpload[], folder: string, userId: string) {
    //     // const files: Image[] = [];
    //     const stream = file.createReadStream();
    //     let image = new Promise((resolve, reject) => {
    //         stream.pipe(Cloudinary.uploader.upload_stream({
    //             unique_filename: false, discard_original_filename: false, use_filename: true, folder
    //         }, (err, data) => {
    //             resolve(data);
    //             reject(err);
    //         }))
    //     });
    //     const imageToBeSave = await image as ICloudinaryImage;
    //     const newImage = new this.ImageModel({ ...imageToBeSave, folder, userId });
    //     await newImage.save();
    //     return newImage;
    // }

    async uploadSingle(file: FileUpload, folder: string, userId: string) {
        const image = await this.uploadImage(file, folder);
        const newImage = new this.imageModel({ ...image, folder, userId });
        await newImage.save();
        return newImage;
    }

    async uploadMultiple(file: FileUpload[], folder: string, userId: string) {
        const files = await Promise.all(file)
        const images = files.map(async (image) => {
            const { width, height, format, resource_type, bytes, url, secure_url, asset_id } = await this.uploadImage(image, folder)
            const newImage = new this.imageModel({
                width, height, format, folder, resource_type, bytes, url, secure_url, asset_id, userId
            });
            return await newImage.save();
        });
        return images;

    }


    async deleteImageById(id: string) {
        const image = await this.imageModel.findByIdAndDelete(id);
        await Cloudinary.uploader.destroy(image.url);
    }


    // find Image By Id
    async findImageById(imageId: string): Promise<ImageModel> {
        const image = await this.imageModel.findById(imageId);
        return image;
    }

}
