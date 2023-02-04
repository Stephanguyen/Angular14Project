import { ErrorHandler, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocationStrategy } from "@angular/common";

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

    constructor(private HttpClient: HttpClient,
        private locationStrategy: LocationStrategy){
        super()
    }

    override handleError(error: any): void {

        var errorEvent = {
            path: this.locationStrategy.path(),
            message: error.message?? error.toString(),
            handler: 'GlobalErrorHandler',
            user: 'the-id-of-the-current-user',
            time: new Date(),
            stack: error.stack
        }

        this.HttpClient.post('http://localhost:3002/errors',
        errorEvent).subscribe(() => {})
    }
}