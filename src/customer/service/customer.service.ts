import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer } from "../interface/customer.interface";

@Injectable()
export class CustomerService{
    constructor(@InjectModel("Customer") private readonly customerModel : Model<Customer>){}

    public async listCustomer(): Promise<Customer[]>{
        return await this.customerModel.find({})
    }
    public async getCustomer(id: string): Promise<Customer>{
        return await this.customerModel.findById(id)
    }
    public async createCustomer(customer):Promise<Customer>{
        return await this.customerModel.save()
    }
    public async updateCutomer(id: string): Promise<Customer[]>{
        return await this.customerModel.findByIdAndUpdate(id)
    }
    public async deleteCustomer(id:string): Promise<Customer[]>{
        return await this.customerModel.findByIdAndDelete(id)
    }
}