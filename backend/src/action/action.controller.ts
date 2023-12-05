import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionEntity } from 'src/entities/action.entity';

@Controller('action')
export class ActionController {
    constructor(private actionService: ActionService) {}

    @Get()
    getActions(): Promise<ActionEntity[]> {
        return this.actionService.getAllActions();
    }

    @Get(':id')
    getActionById(@Param('id') id: string): Promise<ActionEntity> {
        return this.actionService.getActionById(parseInt(id));
    }

    @Post()
    createAction(@Body() action: ActionEntity): Promise<ActionEntity> {
        return this.actionService.createAction(action);
    }

    @Delete(':id')
    deleteAction(@Param('id') id: string): Promise<void> {
        return this.actionService.deleteAction(parseInt(id));
    }

    @Put(':id')
    async updateAction(@Param('id') id: string, @Body() action: ActionEntity): Promise<ActionEntity> {
        const parsedId = parseInt(id);
        await this.actionService.updateAction(parsedId, action);
        return { ...action, id: parsedId }
    }
}
