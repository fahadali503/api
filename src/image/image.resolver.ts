import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ImageModel } from 'src/common/models/Image';
import { ImageService } from './image.service';

@Resolver(of => ImageModel)
export class ImageResolver {
    constructor(private readonly ImageService: ImageService) { }

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
