import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ValueService } from './value.service';
import { ValueEntity } from '../entities/value.entity';

@Controller('value')
export class ValueController {
    constructor(private valueService: ValueService) { }

    @Get()
    getValues(): Promise<ValueEntity[]> {
        return this.valueService.getAllValues();
    }

    @Get(':replica')
    getValueByReplica(@Param('replica') replica: string): Promise<ValueEntity> {
        return this.valueService.getValueByReplica(replica);
    }

    @Post(':replica')
    upsertValue(@Param('replica') replica: string, @Body() body: any): Promise<void> {
        return this.valueService.upsertValue({ replica, value: body.value });
    }

    @Delete(':replica')
    deleteValue(@Param('replica') replica: string): Promise<void> {
        return this.valueService.deleteValue(replica);
    }
}
