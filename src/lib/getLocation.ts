import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const detectAccessToLocation = async (): Promise<Boolean> => {
  const check = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  if (!check) {
    if (Platform.OS !== 'android') {
      const result = await Geolocation.requestAuthorization('whenInUse');
      if (result !== 'denied') {
        return true;
      }
      return false;
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    }
  } else {
    return true;
  }
};

export default async (): Promise<{
  lat: number;
  lng: number;
  speed: number;
  accuracy: number;
}> => {
  const result = await detectAccessToLocation();
  if (result) {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lng: position.coords.longitude,
            lat: position.coords.latitude,
            speed: Number(position.coords.speed),
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          reject(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    });
  }
  return {
    lng: 0,
    lat: 0,
    speed: 0,
    accuracy: 0,
  };
};
