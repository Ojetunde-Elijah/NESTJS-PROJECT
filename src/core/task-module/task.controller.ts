import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseBoolPipe, Post, Query, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './interface/task';
import { Request, Response } from 'express';
import { QueryParamDto, TaskDto, TaskParamDto } from './dto/task.dto';

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(@Res() res: Response){
    const data = await this.taskService.getAllTasks()
    return res.status(200).send(data);
  }

  @Get(":id")
  async getTask(@Param() reqParam: TaskParamDto){
        return await this.taskService.getTask(reqParam.id)
  }

  @Get("/filter/data")
  @UsePipes(new ValidationPipe({ whitelist: false, transform: true}))
  async filterTaskById(@Query("filter") filter: ParseBoolPipe, @Res() res: Response){
    const data = await this.taskService.filterTask(filter);
    return res.status(200).send(data)
  }


  @Delete(":id")
  async deleteTaskById(@Param() reqParam: TaskParamDto, @Res() res: Response){
    const data = await this.taskService.deleteTask(reqParam.id)
    return res.status(200).send(data)
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() task: TaskDto, @Res() res: Response){
    const data = await this.taskService.addTask(task)
    return res.status(200).send(data);
  }
  
}
