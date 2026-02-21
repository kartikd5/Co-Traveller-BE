"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const users_service_1 = require("./src/modules/users/users.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
    console.log('Seeding mock users...');
    try {
        const user1 = await usersService.createUser({
            type: 'email',
            identifier: 'test1@example.com',
            name: 'John Doe',
        });
        await usersService.updateProfile(user1._id.toString(), {
            city: 'Mumbai',
            country: 'India',
            longitude: 72.8777,
            latitude: 19.0760,
            gender: 'male'
        });
        const user2 = await usersService.createUser({
            type: 'phone',
            identifier: '9876543210',
            name: 'Jane Smith',
        });
        await usersService.updateProfile(user2._id.toString(), {
            city: 'Delhi',
            country: 'India',
            longitude: 77.2090,
            latitude: 28.6139,
            gender: 'female'
        });
        console.log('Seed completed successfully.');
    }
    catch (error) {
        console.error('Seed error:', error.message);
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map