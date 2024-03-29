import React from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {useMutation} from '@apollo/client';
import _ from 'lodash';

import {rating as schema} from '../schemas';
import {PUT_TASK} from '../../redux/types/task';

import Rating from '../components/Rating';

const Vote = ({score, id, size}: {score: number; id: string; size: number}) => {
  const dispatch = useDispatch();
  const {type} = useSelector((state: any) => state.user);
  const [request, {data, error}] = useMutation(schema.addRatingFrom(type));

  const [rating, setRating] = React.useState(score);
  const [old, setOld] = React.useState(score);

  const onPressRatingHandler = (newRating: number) => {
    dispatch({
      type: PUT_TASK,
      id,
      task: {
        [`${type}Rating`]: {
          score: newRating,
        },
      },
    });
    setRating(newRating);
    request({variables: {order: id, score: newRating}});
  };

  React.useEffect(() => {
    if (_.get(data, 'setOrderStatus.result') === 'SUCCESS') {
      setOld(rating);
    }
    if (_.get(data, 'setOrderStatus.result') === 'ERROR' || error) {
      setRating(old);
      dispatch({
        type: PUT_TASK,
        id,
        task: {
          [`${type}Rating`]: {
            score: old,
          },
        },
      });
    }
  }, [data, old, rating, error, dispatch, type, id]);

  return (
    <Rating
      size={size}
      styles={style.rating}
      value={rating}
      onPress={onPressRatingHandler}
    />
  );
};

const style = StyleSheet.create({
  rating: {
    paddingVertical: 5,
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: 'space-between',
  },
});

export default Vote;
