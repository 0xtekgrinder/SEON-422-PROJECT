import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValueEntity } from '../entities/value.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ValueService {
    constructor(
        @InjectRepository(ValueEntity)
        private valueRepository: Repository<ValueEntity>
    ) {}

    async getAllValues(): Promise<ValueEntity[]> {
        return await this.valueRepository.find();
    }

    async getValueByReplica(replica: string): Promise<ValueEntity> {
        return await this.valueRepository.findOneBy({ replica });
    }

    async upsertValue(value: ValueEntity): Promise<void> {
        await this.valueRepository.upsert(value, ['replica']);
    }

    async deleteValue(replica: string): Promise<void> {
        await this.valueRepository.delete({ replica });
    }
}
