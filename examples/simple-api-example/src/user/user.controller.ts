import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Req,
  Res,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AddUserDto } from './dto/add-user.dto';
import { GetUsersWithPostDto } from './dto/get-users-with-post.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  index(@Req() req: Request, @Res() res: Response): string {
    return '/User';
  }

  @Get('/list')
  getUsers(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Res() res: Response,
  ): Response {
    const users = this.userService.list({
      pageIndex: Number.parseInt(pageIndex),
      pageSize: Number.parseInt(pageSize),
    });
    return res.json(users);
  }

  @Post('/list')
  getUsersWithPost(
    @Body() body: GetUsersWithPostDto,
    @Res() res: Response,
  ): Response {
    const users = this.userService.list({
      pageIndex: body.pageIndex,
      pageSize: body.pageSize,
    });
    return res.json(users);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string, @Res() res: Response): Response {
    const user = this.userService.getUserById(Number.parseInt(id));
    return res.send(user);
  }

  @Put('/:id')
  addUser(@Body() body: AddUserDto, @Res() res: Response): Response {
    const user = this.userService.addUser(body);
    return res.send(user);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string, @Res() res: Response): Response {
    const result = this.userService.deleteUserById(Number.parseInt(id));
    return res.send(result ? 'success' : 'error');
  }
}
