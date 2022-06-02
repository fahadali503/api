import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ImageModel } from 'src/common/models/Image';
import { ImageService } from './image.service';
import { ImageResolver } from './image.resolver';

@Module({
  imports: [
    TypegooseModule.forFeature([ImageModel])
  ],
  providers: [ImageService, ImageResolver],
  exports: [ImageService]
})
export class ImageModule { }
