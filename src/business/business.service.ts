import { BadRequestException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { FileUpload } from 'graphql-upload';
import { InjectModel } from 'nestjs-typegoose';
import { ImageModel } from 'src/common/models/Image';
import { ImageService } from 'src/image/image.service';
import { CloudinaryConstants } from 'src/utils/constants';
import { IsValidObjectId } from 'src/utils/fns';
import { CreateBusinessInput } from './inputs/create-business.input';
import { Business } from './models/business.model';
import { CreateBusinessReturnType } from './schema-types/create-business';

@Injectable()
export class BusinessService {
    constructor(
        @InjectModel(Business) private readonly BusinessModel: ReturnModelType<typeof Business>,
        private readonly ImageService: ImageService
    ) { }


    async create(data: CreateBusinessInput, file: FileUpload, userId: string): Promise<CreateBusinessReturnType> {
        this.isValidId(userId);
        const { businessDescription, businessEmail, businessName, businessPhone, closingTime, experience, offDays, openingTime, ownerCNIC, ownerName } = data;

        const businessImage = await this.ImageService.uploadSingle(file, CloudinaryConstants.BUSINESS_IMAGES, userId)

        const business = new this.BusinessModel({
            businessDescription, businessEmail, businessImage: businessImage.url,
            businessName, businessPhone, closingTime, openingTime, experience, offDays,
            ownerCNIC,
            ownerName,
            imageId: businessImage._id,
            ownerId: userId
        });

        await business.save();
        return {
            message: "Your request to create business has been submitted.",
            business
        }
    }

    // findBusiness By ID

    async findBusinessById(businessId: string): Promise<Business> {
        this.isValidId(businessId);
        const business = await this.BusinessModel.findById(businessId)
        return business;
    }

    private isValidId(id: string | number | Buffer | Uint8Array) {
        const isValid = IsValidObjectId(id);
        if (!isValid) {
            throw new BadRequestException("Invalid Object Id.")
        }
        return true;
    }


}
