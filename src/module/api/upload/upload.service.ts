import { InjectRepository } from '@nestjs/typeorm';
import { UploadRecords } from './../../../common/entities/upload/upload-records.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
    constructor(
        @InjectRepository(UploadRecords)
        private readonly uploadRecordsRep: Repository<UploadRecords>
    ){}

    async uploadRecords(id: number, file: any) {
        await this.uploadRecordsRep.insert({
            user_id: id,
            path: file.path,
            type: file.fieldname
        })
        return {
            path: file.path
        }
    }

    async getRecords(page = 0, size = 10) {
        return await this.uploadRecordsRep.find({
            skip: page * size,
            take: size,
            order: {
                create_time: 'DESC'
            }
        })
    }
}