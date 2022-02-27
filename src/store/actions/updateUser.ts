import { UPDATE_USER } from '../types';
import { User } from '../../types';

const updateUser = (payload: User | null) => ({ type: UPDATE_USER, payload });

export default updateUser;