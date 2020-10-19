import { USER_ROLE_REPOSITORY } from 'src/core/constants';
import { userRole } from './user-role.entity';

export const userRoleProviders = [{
    provide: USER_ROLE_REPOSITORY,
    useValue: userRole,
}]