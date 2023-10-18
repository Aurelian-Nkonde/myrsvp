import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Rsvp } from './rsvp.model';
import { RsvpEntity } from './entities/rsvp.entity';
import { AttendingEnum } from './enums/attending_enum';

// our repositories in here!, database Interaction

@Injectable()
export class RsvpRepository {
  constructor(
    @InjectModel(Rsvp)
    private rsvpModel: typeof Rsvp
  ) { }

  async findAll(): Promise<RsvpEntity[]> {
    return await this.rsvpModel.findAll()
  }

  async findByUserId(id: string): Promise<RsvpEntity> {
    return await this.rsvpModel.findOne({
      where: {
        userId: id
      }
    })
  }

  async findByRsvpId(id: string): Promise<RsvpEntity> {
    return await this.rsvpModel.findOne({
      where: {
        rsvpId: id
      }
    })
  }

  async create(data: RsvpEntity): Promise<RsvpEntity> {
    const createdRsvp = await this.rsvpModel.create({ ...data });
    createdRsvp.save()
    return createdRsvp
  }

  async delete(id: string): Promise<void> {
    const rsvp = await this.rsvpModel.findOne({
      where: {
        rsvpId: id
      }
    });
    let deleted = rsvp.destroy();
    return deleted;
  }

  async update(id: string, data: RsvpEntity): Promise<RsvpEntity> {
    const rsvp = await this.rsvpModel.findOne({
      where: {
        rsvpId: id
      }
    });
    const updated = rsvp.update({
      eventType: data.eventType,
      title: data.title,
      host: data.host,
      address: data.address,
      description: data.description,
      attending: data.attending,
      done: data.done,
      attendees: data.attendees
    })
    return updated
  }

  async acceptRsvp(id: string): Promise<RsvpEntity> {
    const rsvp = await this.rsvpModel.findOne({
      where: {
        rsvpId: id
      }
    });
    const updated = rsvp.update({
      attending: AttendingEnum.YES
    });
    return updated
  }

  async declineRsvp(id: string): Promise<RsvpEntity> {
    const rsvp = await this.rsvpModel.findOne({
      where: {
        rsvpId: id
      }
    });
    const updated = rsvp.update({
      attending: AttendingEnum.NO
    });
    return updated
  }

  async totalCount(): Promise<number> {
    const rsvps = (await this.rsvpModel.findAll()).length;
    return rsvps;
  }

  async totalActiveCount(): Promise<number> {
    const rsvps = (await this.rsvpModel.findAll({
      where: {
        done: false
      }
    })).length;
    return rsvps;
  }
}
