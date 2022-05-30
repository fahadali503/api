import { BadRequestException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { hash } from 'bcryptjs';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { FileUpload } from 'graphql-upload';
import { InjectModel } from 'nestjs-typegoose';
import { Image } from 'src/common/models/Image';
import { Cloudinary, ICloudinaryImage } from 'src/utils/cloudinary';
import { ROLES } from 'src/utils/role';
import { SignUpInput } from './args-types/sign-up.args';
import { User } from './model/User.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>,
        @InjectModel(Image) private readonly ImageModel: ReturnModelType<typeof Image>
    ) { }

    async findByUsername(username: string) {
        return await this.UserModel.findOne({ username })
    }

    async findByEmail(email: string) {
        return await this.UserModel.findOne({ email })
    }

    async findUserById(id: string): Promise<User> {
        const user = await this.UserModel.findById(id);
        return user;
    }

    async createUser(data: SignUpInput, file: FileUpload): Promise<string> {
        const { email, fullName, password, role, username } = data;
        const existByUsername = await this.findByUsername(username);
        const existByEmail = await this.findByEmail(email)
        if (existByUsername) {
            throw new BadRequestException("Username is in use.")
        }
        if (existByEmail) {
            throw new BadRequestException("Email is in use.")
        }

        const hashedPassword = await hash(password, 10);
        const user = new this.UserModel({ email, username, password: hashedPassword, role, fullName });
        const imageData: ICloudinaryImage = await this.uploadProfilePicture(file);
        const pic = await this.createProfilePicture(imageData, user._id);
        user.profilePicture = pic.url;
        user.imageId = pic._id;
        await user.save()
        return "Your account has been created successfully.";
    }

    private async createProfilePicture({ width, height, format, resource_type, bytes, url, secure_url, asset_id }: ICloudinaryImage, userId: string) {
        const profilePicture = new this.ImageModel({
            width,
            height,
            format,
            resource_type,
            bytes,
            url,
            secure_url,
            asset_id,
            userId
        });
        await profilePicture.save();
        return profilePicture;
    }

    private uploadProfilePicture(file: FileUpload) {
        const { createReadStream, filename, encoding, mimetype } = file;
        const stream = createReadStream();
        return new Promise((resolve: (data) => void, reject: (err: UploadApiErrorResponse) => void) => {
            stream.pipe(
                Cloudinary.uploader.upload_stream({ filename_override: filename, unique_filename: false, discard_original_filename: false, use_filename: true, folder: "profile-pictures" }, (err, data) => {
                    resolve(data);
                    reject(err)
                })
            )
        })
    }
}
