import { mongoose } from '@typegoose/typegoose';

export const IsValidObjectId = (id: string | Buffer | Uint8Array | number) => {
    return mongoose.Types.ObjectId.isValid(id);
}