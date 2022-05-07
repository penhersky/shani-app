import _ from 'lodash';
import {Socket} from 'socket.io-client';

import events from './events';
import * as listeners from './listeners';

export default (socket: Socket) => {
  _.keys(listeners).forEach((value: string) =>
    socket.on(_.get(events.order, value), _.get(listeners, value)),
  );
};
