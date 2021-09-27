import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Model } from "mongoose";

import { User } from "./user.model";

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private userModel: Model<User>) {

    }

    async addUser(name: string): Promise<string> {
        const newProduct = new this.userModel({ name })
        const result = await newProduct.save();
        return result.id;
    }

    async getUsers() {
        const users = await this.userModel.find()
        return users.map((user) => ({
            id: user._id,
            name: user.name,
        }));
    }

    async getUser(userId: string) {
        const user = await this.findUser(userId)
        return { ...user };
    }

    async updateUser(
        userId: string,
        name?: string,
        products?: string[],
    ) {
        const user = await this.findUser(userId);
        const updatedUser = {
            name: name ? name : user.name,
        }
        await this.userModel.updateOne({ _id: userId }, { $set: updatedUser })
    }

    removeUser(userId?: string) {
        userId && this.userModel.deleteOne({ _id: userId }).exec()
    }

    private async findUser(id: string) {
        const user = await this.userModel.findOne({ _id: id }).lean().exec();
        if (!user) {
            throw new NotFoundException('Could not find user');
        }
        return {...user};
    }

}