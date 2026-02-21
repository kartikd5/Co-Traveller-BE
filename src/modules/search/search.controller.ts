import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchQueryDto } from './dto/search-query.dto';
import { SearchService } from './search.service';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Public search endpoint with pagination and filters' })
  @ApiResponse({ status: 200, description: 'Paginated list of travel posts' })
  async search(@Query() query: SearchQueryDto) {
    return this.searchService.searchPosts(query);
  }
}
