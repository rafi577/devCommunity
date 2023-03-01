import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
// import { error } from "console";

export class ExceptionsHelper{
    static emailDuplicateException(error: Error): void{
        throw new HttpException({
            status: HttpStatus.CONFLICT,
            message: 'email duplicate',
            errorCode: 'email_duplicate',
            data: {}
          }, HttpStatus.CONFLICT, {
            cause: error
          }); 
    }

    static NotFound(error: Error): void{
        throw new NotFoundException('Something bad happened', 
            { 
                cause: new Error(), 
                description: 'User not found' 
            })
    }
    // throw new NotFoundException('Something bad happened', 
    //         { 
    //             cause: new Error(), 
    //             description: 'User not found' 
    //         })
}