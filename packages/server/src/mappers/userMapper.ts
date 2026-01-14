import { PersonDTO } from '@dvld/shared/src/dtos/person.dto';
import { User } from '../entities/User';

export const toUserDTO = (user: User) => ({
    ...user
});
