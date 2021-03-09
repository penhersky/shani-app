import React from 'react';
import {compact} from 'lodash';
import {statuses} from '../../translate';

import {AntDesign, size} from '../../lib/icon';

export const getCustomerList = (
  status: string,
  tr: (text: any, key: string) => any,
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
  return compact([
    status !== 'created' && {
      value: 'created',
      label: tr(statuses, 'action.goToDefault'),
      icon: (props) => (
        <AntDesign
          name="back"
          color={props.color}
          style={props.style}
          size={size.medium}
        />
      ),
    },
    status !== 'closed' && {
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
    status !== 'canceled' && {
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
  ]);
};

export const getPerformerList = (
  status: string,
  tr: (text: any, key: string) => any,
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
  return compact([
    status !== 'in processing' && {
      value: 'in processing',
      label: tr(statuses, 'action')['in processing'],
      icon: (props) => (
        <AntDesign
          name="time-outline"
          color={props.color}
          style={props.style}
          size={size.medium}
        />
      ),
    },
    status !== 'done' && {
      value: 'done',
      label: tr(statuses, 'action.done'),
      icon: (props) => (
        <AntDesign
          name="check"
          color={props.color}
          style={props.style}
          size={size.medium}
        />
      ),
    },
  ]);
};
