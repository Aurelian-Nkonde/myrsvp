import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserEntity } from './entities/user.entity';
import { GenerateRsvp } from 'src/utils/generateRsvpId';
import { RoleEnum } from './enums/role_enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ) { }

    async create(data: UserEntity): Promise<UserEntity> {
        const allUsers = await this.userModel.findAll();
        const checkUserExistance = allUsers.filter(user => data.email === user.email).length;
        if (checkUserExistance >= 1) {
            console.error('This user already exists');
            throw new ForbiddenException('This user already exists');
        }
        const generateHashedPassword = await bcrypt.hash(data.password, 10);
        const updatedUser = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: generateHashedPassword,
            userId: GenerateRsvp(),
            role: RoleEnum.USER
        }
        const createdUser = await this.userModel.create(updatedUser)
        createdUser.save();
        return createdUser
    }

    async findUser(email: string, password: string): Promise<UserEntity> {
        const findUserWithEmail = await this.userModel.findOne({
            where: {
                email: email
            }
        });
        if (findUserWithEmail) {
            const correctPassword = await bcrypt.compare(password, findUserWithEmail.password);
            if (correctPassword) {
                const user = await this.userModel.findOne({ where: { email: email } });
                return user
            } else {
                console.error("Error matching the password");
                throw new NotFoundException("Passwords does not match");
            }
        } else {
            console.error('Error finding the user with this email');
            throw new NotFoundException('Email is not found');
        }
    }
}
