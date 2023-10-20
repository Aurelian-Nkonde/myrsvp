import { Injectable, NotFoundException } from '@nestjs/common';
import { RsvpRepository } from './rsvp.repository';
import { RsvpEntity } from './entities/rsvp.entity';
import { NotFoundError } from 'rxjs';
import ShortUniqueId from 'short-unique-id';
import { GenerateRsvp } from 'src/utils/generateRsvpId';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationEntity } from 'src/notification/entities/notification.entity';
import { NotificationTypesEnum } from 'src/notification/enums/notification_types';

@Injectable()
export class RsvpService {
  constructor(
    private readonly rsvpRepository: RsvpRepository,
    private readonly notificationService: NotificationService
  ) { }

  async getAllRsvps(): Promise<RsvpEntity[]> {
    const allRsvps = await this.rsvpRepository.findAll();
    if (allRsvps) {
      return allRsvps;
    } else {
      console.error('Error getting all rsvps');
      throw new NotFoundException('All rsvps are not found');
    }
  }

  async getRsvp(id: string): Promise<RsvpEntity> {
    const rsvp = await this.rsvpRepository.findByRsvpId(id);
    if (rsvp) {
      return rsvp;
    } else {
      console.error('Error getting rsvp');
      throw new NotFoundException('Rsvp is not found');
    }

  }

  async createRsvp(rsvp: RsvpEntity): Promise<RsvpEntity> {
    const allRsvps = await this.rsvpRepository.findAll();
    if (allRsvps) {
      const checkingSameRsvpFromSameUser = allRsvps.filter(data => data.host === rsvp.host && data.title === rsvp.title);
      if (checkingSameRsvpFromSameUser.length <= 0) {
        const updatedRsvp: RsvpEntity = {
          eventType: rsvp.eventType,
          title: rsvp.title,
          host: rsvp.host,
          address: rsvp.address,
          description: rsvp.description,
          attending: rsvp.attending,
          done: rsvp.done,
          attendees: rsvp.attendees,
          EventDate: rsvp.EventDate,
          rsvpId: GenerateRsvp(),
          userId: rsvp.userId
        }
        console.log(updatedRsvp)
        let created = await this.rsvpRepository.create(updatedRsvp);
        let data: NotificationEntity = {
          userId: created.userId,
          message: 'The RSVP has been sent!',
          isRead: false,
          notificationType: NotificationTypesEnum.RSVP_IS_SENT
        }
        await this.notificationService.createNotification(data)
        return created
      } else {
        console.error('Same Rsvp from same user exists');
        throw new NotFoundException('Same rsvp from same user exist');
      }
    } else {
      console.error('Error getting all Rsvps');
      throw new NotFoundException('All rsvp are not found')
    }
  }

  async updateRsvp(id: string, data: RsvpEntity): Promise<RsvpEntity> {
    const rsvp = await this.rsvpRepository.findByRsvpId(id);
    if (rsvp) {
      const updatedRsvp = await this.rsvpRepository.update(id, data);
      return updatedRsvp;
    } else {
      console.error('Error getting a rsvp');
      throw new NotFoundException('The rsvp is not found');
    }
  }

  async deleteRsvp(id: string): Promise<void> {
    const rsvp = await this.rsvpRepository.findByRsvpId(id);
    if (rsvp) {
      const deletedRsvp = await this.rsvpRepository.delete(id);
      return deletedRsvp;
    } else {
      console.error('Error getting a rsvp');
      throw new NotFoundException('The rsvp is not found');
    }
  }

  async declineRsvp(id: string): Promise<RsvpEntity> {
    const rsvp = await this.rsvpRepository.findByRsvpId(id);
    if (rsvp) {
      const updated = await this.rsvpRepository.declineRsvp(id);
      return updated
    } else {
      console.error('Error getting rsvp');
      throw new NotFoundException('Rsvp is not found');
    }
  }


  async acceptRsvp(id: string): Promise<RsvpEntity> {
    const rsvp = await this.rsvpRepository.findByRsvpId(id);
    if (rsvp) {
      const updated = await this.rsvpRepository.acceptRsvp(id);
      return updated
    } else {
      console.error('Error getting rsvp');
      throw new NotFoundException('Rsvp is not found');
    }
  }

  async totalRsvpsCount(): Promise<number> {
    const total = await this.rsvpRepository.totalCount();
    if (total) {
      return total;
    } else {
      console.error('Error finding total counts');
      throw new NotFoundException('Total rsvps are not found');
    }
  }

  async totalActiveRsvpsCount(): Promise<number> {
    const total = await this.rsvpRepository.totalActiveCount();
    if (total) {
      return total;
    } else {
      console.error('Error finding total counts');
      throw new NotFoundException('Total rsvps are not found');
    }
  }

}
