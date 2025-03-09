import { Injectable } from "@nestjs/common";
import { Task } from "./interface/task";
import { TaskStoreService } from "./task.store.service";

@Injectable()
export class TaskService{
    constructor(private readonly taskStoreService : TaskStoreService){}

    public async addTask(task: Task): Promise<Task>{
        task.completed = false;
        task.description = "dummy";
        task.owner = "Elijah";
        task.duration = 2;
        return this.taskStoreService.addTask(task)
    }

    public async getTask(id: string): Promise<Task>{
       return this.taskStoreService.getTask(id)
    }

    public async getAllTasks(): Promise<Task[]>{
        return this.taskStoreService.getAllTasks()
    }

    public async deleteTask(id: string): Promise<Task[]>{
        return this.taskStoreService.deleteTask(id)
    }
    public async filterTask(filter): Promise<Task[]>{
        return this.taskStoreService.filterTask(filter)
    }
}