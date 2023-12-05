import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { TriggerService } from './trigger.service';
import { TriggerEntity } from '../entities/trigger.entity';

@Controller('trigger')
export class TriggerController {
    constructor(private triggerService: TriggerService) {}

    @Get()
    getTriggers(): Promise<any[]> {
        return this.triggerService.getAllTriggers();
    }

    @Get(':replica')
    getTriggerByReplica(@Param('replica') replica: string): Promise<any> {
        const trigger = this.triggerService.getTriggerByReplica(replica);
        if (trigger) {
            return trigger;
        } else {
            throw new HttpException('Trigger not found', 404);
        }
    }

    @Delete()
    deleteAllTrigger(): Promise<void> {
        return this.triggerService.deleteAllTrigger();
    }

    @Post()
    upsertTrigger(@Body() trigger: TriggerEntity): Promise<void> {
        return this.triggerService.upsertTrigger(trigger);
    }
}
