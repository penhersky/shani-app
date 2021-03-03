import React from 'react';
import _ from 'lodash';
import {ScrollView} from 'react-native';

import {Notification} from '../../components';

import {useDataBase, query, notificationSchemas} from '../../wrappers/db';

// @temp
const list = [
  {
    id: 1,
    title: 'New request for the task "Repair of the kettle"',
    subtitle:
      'The task of the organization, in particular constant quantitative growth and the sphere of our activity promotes preparation and realization of directions of progressive development. On the other hand, consultation with a wide range of assets provides a wide range (specialists) of participation in the formation of areas of progressive development.',
    time: 1614678679300,
    image:
      'https://37g8q83dpternslae3eh1f8t-wpengine.netdna-ssl.com/wp-content/uploads/2020/06/Z0A5715-2000x1333.jpeg',
    revised: false,
    hidden: false,
  },
  {
    id: 2,
    title: 'New comment for the task "Repair of the kettle"',
    subtitle: 'The task of the organization, in particular.',
    time: 1614678658702,
    image: 'https://stolicaonego.ru/images/news/410/410929/main.jpg',
    revised: true,
    hidden: false,
  },
  {
    id: 3,
    title:
      'New comment for the task "Repair of the kettle" the task "Repair of the kettle"',
    subtitle: 'The task of the organization, in particular.',
    time: 1614678192367,
    revised: true,
    hidden: false,
  },
  {
    id: 4,
    title: '',
    subtitle: '',
    time: 0,
    hidden: true,
    revised: true,
  },
];

const More = () => {
  const db = useDataBase();

  React.useEffect(() => {
    query(db, notificationSchemas.revisedAll);
  }, [db]);

  return (
    <ScrollView>
      {_.map(list, (item) =>
        item.hidden ? null : <Notification key={item.id} notification={item} />,
      )}
    </ScrollView>
  );
};

export default More;
