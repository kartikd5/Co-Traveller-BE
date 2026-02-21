import { UpdateProfileDto } from './dto/user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<import("./schemas/user.schema").User>;
    updateProfile(req: any, updateData: UpdateProfileDto): Promise<import("./schemas/user.schema").User>;
}
