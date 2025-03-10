import { Controller, Get, HttpStatus, Injectable, Param, Res } from "@nestjs/common";
import { CustomerService } from "../service/customer.service";
import { Customer } from "../interface/customer.interface";
import { Response } from "express";

@Controller("customers")
export class CustomerController{
    constructor( private readonly customerService : CustomerService){}

    @Get()
    async getCustomers(@Res() res : Response){
        const data = await this.customerService.listCustomer()
        return res.status(HttpStatus.OK).send(data)
    }

    @Get("/:customerid")
    async getCustomerById(@Res() res: Response, @Param("id") id: string){
        const data = await this.customerService.getCustomer(id)
        res.status(HttpStatus.OK).send(data)
    }
}