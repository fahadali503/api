import { BadRequestException, Injectable } from '@nestjs/common';
import { BusinessService } from 'src/business/business.service';
import { UserService } from 'src/user/user.service';
import { IsValidObjectId } from 'src/utils/fns';

@Injectable()
export class SellerService {
    constructor(
        private readonly BusinessService: BusinessService,
        private readonly UserService: UserService
    ) { }

    async findBusiness(sellerId: string) {
        this.isValidObject(sellerId);
        return await this.BusinessService.findBusinessByUserId(sellerId);
    }

    private isValidObject(sellerId: string) {
        const isValid = IsValidObjectId(sellerId);
        if (!isValid) {
            throw new BadRequestException("Invalid Object Id.")
        }
        return true;
    }
}
