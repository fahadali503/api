import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Image } from 'src/common/models/Image';
import { ImageService } from './image.service';

@Resolver(of => Image)
export class ImageResolver {
    constructor(private readonly ImageService: ImageService) { }

    @Mutation(returns => Image)
    uploadSingleImage(@Args('image', { type: () => GraphQLUpload }) image: FileUpload) {
        return this.ImageService.createImage(image, 'test', '123')
    }

    @Mutation(returns => [Image])
    async uploadMultiple(@Args('image', { type: () => [GraphQLUpload] }) images: FileUpload[]) {
        const files = await this.ImageService.createImage(images, 'multiple', '123');
        return files;
    }
}
