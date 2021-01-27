import {get, pick, find} from 'lodash';

import {SET_ADMIN, SET_SHORT_USER} from '../../redux/types/user';
import {insert, tokenSchemas} from './db';

export const saveUser = (data: any, dispatch: any, db: any) => {
  if (get(data?.getAccount, 'user')) {
    insert(
      db,
      tokenSchemas.deleteByType('service'),
      tokenSchemas.insert(
        get(data?.getAccount, 'userToken'),
        'service',
        get(data?.getAccount, 'expiresIn'),
      ),
    );
    dispatch({
      type: SET_SHORT_USER,
      user: {
        ...pick(get(data?.getAccount, 'user'), ['id', 'name', 'type']),
        image: get(
          find(get(data?.getAccount, 'user')?.images, {active: true}),
          'Location',
        ),
      },
    });
  }
  if (get(data?.getAccount, 'admin')) {
    insert(
      db,
      tokenSchemas.deleteByType('service'),
      tokenSchemas.insert(
        get(data?.getAccount, 'adminToken'),
        'service',
        get(data?.getAccount, 'expiresIn'),
      ),
    );
    dispatch({
      type: SET_ADMIN,
      admin: {
        ...pick(get(data?.getAccount, 'admin'), [
          'id',
          'name',
          'email',
          'imageUrl',
          'state',
        ]),
      },
    });
  }
};
