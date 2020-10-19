import { Controller, UseGuards, Get } from '@nestjs/common';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { LotteriesService } from './lotteries.service';

@Controller('lotteries')
@UseGuards(RolesGuard)
export class LotteriesController {
    constructor(private lotteriesService: LotteriesService){}
    @Get()
    async getAll(){
        return await this.lotteriesService.findAll();
    }

}
