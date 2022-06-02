import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { FileUpload } from 'graphql-upload';
import { InjectModel } from 'nestjs-typegoose';
import { ImageModel } from 'src/common/models/Image';
import { ImageService } from 'src/image/image.service';
import { CloudinaryConstants } from 'src/utils/constants';
import { IsValidObjectId } from 'src/utils/fns';
import { CreateBusinessInput } from './inputs/create-business.input';
import { EditBusinessInput } from './inputs/edit-business.input';
import { Business } from './models/business.model';
import { CreateBusinessReturnType } from './schema-types/create-business';
import { EventEmitter2 } from '@nestjs/event-emitter'
import { ImagesEvent } from 'src/utils/events';

@Injectable()
export class BusinessService {
    constructor(
        @InjectModel(Business) private readonly BusinessModel: ReturnModelType<typeof Business>,
        private readonly ImageService: ImageService,
        private readonly eventEmitter: EventEmitter2
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


    // delete business by id
    async deleteBusinessById(businessId: string): Promise<string> {
        this.isValidId(businessId)
        const business = await this.findBusinessById(businessId);
        if (!business) {
            throw new NotFoundException("Business not found!")
        }
        // send this event, so that image module will use this id to remove the image from the database
        this.eventEmitter.emit(ImagesEvent.DELETE_IMAGE, { id: business.imageId });
        await this.BusinessModel.findOneAndDelete({ _id: businessId });
        return `${business.businessName} has been deleted Successfully!`;
    }

    // findBusiness By ID

    async findBusinessById(businessId: string): Promise<Business> {
        this.isValidId(businessId);
        const business = await this.BusinessModel.findById(businessId)
        return business;
    }


    async editBusiness(businessId: string, data: EditBusinessInput): Promise<CreateBusinessReturnType> {
        this.isValidId(businessId);
        const business = await this.BusinessModel.findOneAndUpdate({ _id: businessId }, { $set: { ...data } }, { new: true });
        return {
            message: `${business.businessName} has been updated`,
            business
        }
    }

    private isValidId(id: string | number | Buffer | Uint8Array) {
        const isValid = IsValidObjectId(id);
        if (!isValid) {
            throw new BadRequestException("Invalid Object Id.")
        }
        return true;
    }


}
