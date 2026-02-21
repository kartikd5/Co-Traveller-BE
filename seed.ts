import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { UsersService } from './src/modules/users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

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
  } catch (error) {
    console.error('Seed error:', error.message);
  }

  await app.close();
}

bootstrap();
