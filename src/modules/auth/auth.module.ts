import { JwtStrategy } from '../../decorators/jwt.strategy';
import { Developer, DeveloperSchema } from './../../models/developer.schema';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Developer.name, schema: DeveloperSchema }
      ]
      ),
      PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
        secret:'secret',
        signOptions:{
            expiresIn: '3d',
        }
        }),
    ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService,JwtStrategy]
})
export class AuthModule {}
