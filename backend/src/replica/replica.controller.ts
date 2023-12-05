import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReplicaService } from './replica.service';
import { ReplicaEntity } from '../entities/replica.entity';

@Controller('replica')
export class ReplicaController {

    constructor(private replicaService: ReplicaService) {}

    @Get()
    getReplicas(): Promise<ReplicaEntity[]> {
        return this.replicaService.getAllReplicas();
    }

    @Get('input')
    getInputReplicas(): Promise<ReplicaEntity[]> {
        return this.replicaService.getInputReplica();
    }

    @Get('output')
    getOutputReplicas(): Promise<ReplicaEntity[]> {
        return this.replicaService.getOutputReplica();
    }

    @Get(':id')
    getReplicaById(@Param('id') id: string): Promise<ReplicaEntity> {
        return this.replicaService.getReplicaById(id);
    }

    @Delete(':id')
    deleteReplica(@Param('id') id: string): Promise<void> {
        return this.replicaService.deleteReplica(id);
    }

    @Post()
    createReplica(@Body() replica: ReplicaEntity): Promise<ReplicaEntity> {
        return this.replicaService.createReplica(replica);
    }

    @Put(':id')
    async updateReplica(@Param('id') id: string, @Body() replica: ReplicaEntity): Promise<ReplicaEntity> {
        await this.replicaService.updateReplica(id, replica);
        return { ...replica, id }
    }
}
