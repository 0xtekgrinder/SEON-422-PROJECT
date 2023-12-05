import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReplicaEntity, ReplicaType } from '../entities/replica.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReplicaService {
    constructor(
        @InjectRepository(ReplicaEntity)
        private replicaRepository: Repository<ReplicaEntity>
    ) {}

    async getInputReplica(): Promise<ReplicaEntity[]> {
        return await this.replicaRepository.findBy({ type: ReplicaType.INPUT });
    }

    async getOutputReplica(): Promise<ReplicaEntity[]> {
        return await this.replicaRepository.findBy({ type: ReplicaType.OUTPUT });
    }

    async getReplicaById(id: string): Promise<ReplicaEntity> {
        return await this.replicaRepository.findOneBy({ id });
    }

    async getAllReplicas(): Promise<ReplicaEntity[]> {
        return await this.replicaRepository.find();
    }

    async createReplica(replica: ReplicaEntity): Promise<ReplicaEntity> {
        return await this.replicaRepository.save(replica);
    }

    async deleteReplica(id: string): Promise<void> {
        await this.replicaRepository.delete({ id });
    }

    async updateReplica(id: string, replica: ReplicaEntity): Promise<undefined> {
        await this.replicaRepository.update({ id }, replica);
    }
}
