import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const photoFromCamera = (
  cb: (value: {uri: string; name: string; type: string}) => void,
) => {
  launchCamera({mediaType: 'photo'}, (response: any) => {
    cb({
      uri: response.uri,
      type: response.type,
      name: response.fileName,
    });
  });
};

export const photoFromLibrary = (
  cb: (value: {uri: string; name: string; type: string}) => void,
) => {
  launchImageLibrary({mediaType: 'photo'}, (response: any) => {
    cb({
      uri: response.uri,
      type: response.type,
      name: response.fileName,
    });
  });
};
