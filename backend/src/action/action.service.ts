import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionEntity } from 'src/entities/action.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActionService {
    constructor(
        @InjectRepository(ActionEntity)
        private actionRepository: Repository<ActionEntity>
    ) {}

    async getAllActions(): Promise<ActionEntity[]> {
        return await this.actionRepository.find();
    }

    async getActionById(id: number): Promise<ActionEntity> {
        return await this.actionRepository.findOneBy({ id });
    }

    async createAction(action: ActionEntity): Promise<ActionEntity> {
        return await this.actionRepository.save(action);
    }

    async deleteAction(id: number): Promise<void> {
        await this.actionRepository.delete({ id });
    }

    async updateAction(id: number, action: ActionEntity): Promise<undefined> {
        await this.actionRepository.update({ id }, action);
    }
}
