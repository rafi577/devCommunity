import { Developer } from './../models/developer.schema';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService : AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   ignoreExpiration: false,
      secretOrKey:'secret',
    });
  }

  async validate(payload: any): Promise<Developer> {//i'll return the the data from this function later
    const {id} = payload;
    const developer = await this.authService.getDeveloper(id);
    return developer;
  }
}
