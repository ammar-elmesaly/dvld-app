import { UserDTO } from '@dvld/shared/src/dtos/user.dto';
import { User } from '../entities/User';

export const toUserDTO = (user: User): UserDTO => {
    const { first_name, second_name, third_name, last_name } = user.person;
    
    const personFullName = `${first_name} ${second_name} ${third_name} ${last_name}`;
    
    return {
        id: user.id,
        personId: user.person.id,
        personFullName,
        username: user.username,
        isActive: user.is_active
    };
};
