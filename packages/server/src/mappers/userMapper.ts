import { UserDTO } from '@dvld/shared/src/dtos/user.dto';
import { User } from '../entities/User';

export const toUserDTO = (user: User): UserDTO => {    
    return {
        id: user.id,
        personId: user.person.id,
        personFullName: user.person.full_name,
        username: user.username,
        isActive: user.is_active
    };
};
