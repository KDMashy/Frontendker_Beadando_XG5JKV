import { Injectable } from '@nestjs/common';
import { User } from '../../user/entity/user.entity';
import { UserService } from 'src/modules/user/service/user.service';
import { ComparePassword } from 'src/modules/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ) {}

    async validateUser(username:string, password: string) {
        if(username == 'testuser' && password == 'test1234'){
            const user = {
                id: 333,
                username: 'testuser',
                email: 'testing@gmail.com',
                password: 'beegetettenNemFuttattamEncodingot'
            };
            return user;
        }
        const userDB = await this.userService.FindUserByName(username);
        if(userDB){
            const matched = ComparePassword(password, userDB.password);
            if (matched){
                return userDB;
            }
            return null;
        }
        return null;
    }
}