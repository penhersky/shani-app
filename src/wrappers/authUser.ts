import {get, pick, find} from 'lodash';

import {SET_ADMIN, SET_SHORT_USER} from '../../redux/types/user';

export const saveUser = (data: any, dispatch: any) => {
  if (get(data?.getAccount, 'user')) {
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
