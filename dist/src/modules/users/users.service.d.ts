import { Model } from 'mongoose';
import { UpdateProfileDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(data: {
        type: string;
        identifier: string;
        name: string;
    }): Promise<UserDocument>;
    findByIdentifier(type: string, identifier: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDocument | null>;
    updateLastActive(id: string): Promise<void>;
    getProfile(id: string): Promise<User>;
    updateProfile(id: string, updateData: UpdateProfileDto): Promise<User>;
}
