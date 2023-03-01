import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
// import { error } from "console";

export class ExceptionsHelper{
    static DuplicateException(error: Error,name:string): void{
        throw new HttpException({
            status: HttpStatus.CONFLICT,
            message: `${name} duplicate`,
            errorCode: `${name}_duplicate`,
            data: {}
          }, HttpStatus.CONFLICT, {
            cause: error
          }); 
    }

    static dataNotSaved(error: Error): void{
        throw new HttpException({
            status: HttpStatus.CONFLICT,
            message: 'data not saved',
            errorCode: 'data_not_saved',
            data: {}
          }, HttpStatus.INTERNAL_SERVER_ERROR, {
            cause: error
          }); 
        // throw new HttpException('Data not saved', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    static NotFoundErrorHandler(error: Error,name:string): void{
        throw new NotFoundException('Not Founded', 
             { 
                  cause: new Error(), 
                  description: `${name} not Founded`
            })
    }
}