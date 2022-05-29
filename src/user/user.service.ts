import { BadRequestException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { FileUpload } from 'graphql-upload';
import { InjectModel } from 'nestjs-typegoose';
import { Cloudinary } from 'src/utils/cloudinary';
import { SignUpInput } from './args-types/sign-up.args';
import { User } from './model/User.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>
    ) { }

    async findByUsername(username: string) {
        return await this.UserModel.findOne({ username })
    }

    async findByEmail(email: string) {
        return await this.UserModel.findOne({ email })
    }

    async createUser(data: SignUpInput, file: FileUpload) {
        const { email, fullName, password, role, username } = data;
        const existByUsername = await this.findByUsername(username);
        const existByEmail = await this.findByEmail(email)
        if (existByUsername) {
            throw new BadRequestException("Username is in use.")
        }
        if (existByEmail) {
            throw new BadRequestException("Email is in use.")
        }

        const imageData = await this.uploadProfilePicture(file);
        console.log('Image Url', imageData)
        return 'ok'

    }

    uploadProfilePicture(file: FileUpload) {
        const { createReadStream, filename, encoding, mimetype } = file;
        const stream = createReadStream();
        return new Promise((resolve: (data: UploadApiResponse) => void, reject: (err: UploadApiErrorResponse) => void) => {
            stream.pipe(
                Cloudinary.uploader.upload_stream({ filename_override: filename, unique_filename: false, discard_original_filename: false, use_filename: true }, (err, data) => {
                    resolve(data);
                    reject(err)
                })
            )
        })
    }
}
