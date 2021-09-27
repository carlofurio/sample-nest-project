import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { User } from "./user.model";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Post()
    async addUser(@Body() body: User): Promise<{ id: string }> {
        const generatedId = await this.usersService.addUser(body.name,);
        return { id: generatedId }
    }

    @Get()
    getAllUsers() {
        return this.usersService.getUsers();
    }

    @Get(':id')
    async getUser(@Param('id') userId: string) {
        return this.usersService.getUser(userId);
    }

    @Patch(':id')
    async updateUser(
        @Param('id') userId: string,
        @Body() body: User
    ) {
        this.usersService.updateUser(userId, body.name);
        return null;
    }

    @Delete(':id')
    removeUser(@Param('id') userId: string) {
        this.usersService.removeUser(userId);
        return null
    }
}