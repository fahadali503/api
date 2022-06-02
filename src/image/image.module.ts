import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Image } from 'src/common/models/Image';
import { ImageService } from './image.service';
import { ImageResolver } from './image.resolver';

@Module({
  imports: [
    TypegooseModule.forFeature([Image])
  ],
  providers: [ImageService, ImageResolver],
  exports: [ImageService]
})
export class ImageModule { }
