import React from 'react';
import {statuses} from '../../translate';

import {AntDesign, size} from '../../lib/icon';

export const getList = (
  status: string,
  tr: (text: any, key: string) => any,
  performer?: any,
): {
  value: string;
  label: string;
  icon: (props: {
    color: string;
    style?:
      | {
          marginRight: number;
          marginVertical?: number | undefined;
        }
      | undefined;
  }) => React.ReactNode;
}[] => {
  return [
    performer && {
      value: 'cancelPerformer',
      label: tr(statuses, 'action.cancelPerformer'),
      icon: (props) => (
        <AntDesign
          name="deleteuser"
          color={props.color}
          style={props.style}
          size={size.medium}
        />
      ),
    },
    {
      value: 'closed',
      label: tr(statuses, 'action.close'),
      icon: (props) => (
        <AntDesign
          name="check"
          color={props.color}
          style={props.style}
          size={size.medium}
        />
      ),
    },
    {
      value: 'canceled',
      label: tr(statuses, 'action.cancel'),
      icon: (props) => (
        <AntDesign
          name="close"
          color={props.color}
          style={props.style}
          size={size.medium}
        />
      ),
    },
  ];
};
