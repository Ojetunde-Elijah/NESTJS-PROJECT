import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./interface/task";
import { resolve } from "path";

@Injectable()
export class TaskStoreService{
    public tasks: Task[] = []

    public async addTask(task: Task): Promise<Task>{
        this.tasks.push(task)

        return Promise.resolve(task)
    }

    public async getTask(id: string): Promise<Task>{
       const task = this.tasks.filter(i => i.uuid === id)
       if(task && task.length> 0){
        return Promise.resolve(task[0])
       }
       throw new NotFoundException("task not found")
    }

    public async getAllTasks(): Promise<Task[]>{
        return Promise.resolve(this.tasks)
    }
    public async deleteTask(id: string): Promise<Task[]>{
        const remainingTasks = this.tasks.filter(i => i.uuid !== id)
        return Promise.resolve(remainingTasks);
    }
    public async filterTask(filter): Promise<Task[]>{
        if(!filter){
            return Promise.resolve(this.tasks)
        }
        return Promise.resolve(this.tasks.filter((i: Task)=> i.name === "E"))
}
}