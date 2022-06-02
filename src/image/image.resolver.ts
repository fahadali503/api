import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ImageModel } from 'src/common/models/Image';
import { ImageService } from './image.service';
import { OnEvent } from '@nestjs/event-emitter'
import { ImagesEvent } from 'src/utils/events';
import { Cloudinary } from 'src/utils/cloudinary';

@Resolver(of => ImageModel)
export class ImageResolver {
    constructor(private readonly ImageService: ImageService) { }

    // Delete Image Event Listener
    @OnEvent(ImagesEvent.DELETE_IMAGE)
    deleteImageListener(payload: { id: string }) {

        return this.ImageService.deleteImageById(payload.id);
    }

    @Mutation(returns => ImageModel)
    uploadSingleImage(@Args('image', { type: () => GraphQLUpload }) image: FileUpload) {
        return this.ImageService.uploadSingle(image, 'test', '123')
    }

    @Mutation(returns => [ImageModel])
    async uploadMultiple(@Args('image', { type: () => [GraphQLUpload] }) images: FileUpload[]) {
        const files = await this.ImageService.uploadMultiple(images, 'multiple', '123');
        return files;
    }
}
