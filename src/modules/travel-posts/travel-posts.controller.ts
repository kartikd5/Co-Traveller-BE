import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTravelPostDto } from './dto/travel-post.dto';
import { TravelPostsService } from './travel-posts.service';

@ApiTags('Travel Posts')
@Controller('travel-posts')
export class TravelPostsController {
  constructor(private readonly travelPostsService: TravelPostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all public active travel posts' })
  async getAll() {
    return this.travelPostsService.findAllPublic({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific post' })
  async getOne(@Param('id') id: string) {
    return this.travelPostsService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new One-Way travel post' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  async create(@Req() req: any, @Body() createDto: CreateTravelPostDto) {
    return this.travelPostsService.create(req.user.userId, createDto);
  }

  @Get('user/me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get login user posts' })
  async getMyPosts(@Req() req: any) {
    return this.travelPostsService.findByUserId(req.user.userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete own travel post' })
  async delete(@Req() req: any, @Param('id') id: string) {
    return this.travelPostsService.delete(id, req.user.userId);
  }
}
