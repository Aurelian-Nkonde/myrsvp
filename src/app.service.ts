import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    async statusApp(): Promise<string>{
        return "the app is Healthy!"
    }
}
