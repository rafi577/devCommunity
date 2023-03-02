import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";


export class ExceptionsHelper{
    static DuplicateException(name:string): void{
        throw new HttpException({
            status: HttpStatus.CONFLICT,
            message: `${name} duplicate`,
            errorCode: `${name}_duplicate`,
            data: {}
          }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    static dataNotSaved(errName:string): void{
        throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: `${errName} not saved`,
            errorCode: `${errName}_not_saved`,
            data: {}
          }, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    static NotFoundErrorHandler(name:string): void{
        throw new NotFoundException('Not Founded', 
            { 
                description: `${name} not Founded`
            })
    }
}