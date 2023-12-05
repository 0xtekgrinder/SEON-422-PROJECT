import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TriggerEntity } from '../entities/trigger.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TriggerService {
    constructor(
        @InjectRepository(TriggerEntity)
        private triggerRepository: Repository<TriggerEntity>
    ) {}

    async getAllTriggers(): Promise<TriggerEntity[]> {
        return await this.triggerRepository.find();
    }

    async getTriggerByReplica(replica: string): Promise<TriggerEntity | null> {
        return await this.triggerRepository.findOneBy({ replica });
    }

    async createTrigger(trigger: TriggerEntity): Promise<void> {
        await this.triggerRepository.save(trigger);
    }

    async deleteAllTrigger(): Promise<void> {
        await this.triggerRepository.clear();
    }

    async upsertTrigger(trigger: TriggerEntity): Promise<void> {
        await this.triggerRepository.upsert(trigger, ["replica"]);
    }
}

