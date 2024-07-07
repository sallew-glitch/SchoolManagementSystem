import React, {useState, useRef, useEffect} from 'react';
import {View, Button, Image, Box, Text, ButtonText} from '@gluestack-ui/themed';

import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import ModalCustom from '../../../components/ModalCustom';

const ManageTimetable = ({showModal, setShowModal, modalRef}, props) => {
  const [resultModal, setResultModal] = useState(false);
  const [resultText, setResultText] = useState('');

  const resultRef = useRef(null);

  const [imageUri, setImageUri] = useState('');
  const [imageUriTemp, setImageUriTemp] = useState('');

  console.log('image uri: ', imageUri);

  useEffect(() => {
    const fetchImageUri = async () => {
      const reference = storage().ref('timetable');

      if (!reference) return console.log('No Timetable found');

      const downloadURL = await reference.getDownloadURL();
      setImageUri(downloadURL);
    };

    fetchImageUri();
  }, []);

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.assets[0].uri};
        setImageUriTemp(source.uri);
      }
    });
  };

  const uploadImage = async () => {
    try {
      if (imageUriTemp == null) {
        return;
      }
      console.log('IMAGE URI TEMP: ', imageUriTemp);
      const uploadUri = imageUriTemp;
      const filename = 'timetable';

      console.log('IMAGE URI: ', uploadUri);

      const reference = storage().ref(filename);
      await reference.putFile(uploadUri);

      // Set transferred state
      console.log('Time table uploaded');
      setResultModal(true);
      setResultText('Timetable Successfully uploaded');
      setImageUri(imageUriTemp);
    } catch (error) {
      setResultModal(true);
      setResultText(error.message);
    }
  };

  const removeTimetable = async () => {
    try {
      if (imageUri === null) throw new Error('No Timetable');

      console.log('Inside');
      const filename = 'timetable';

      const reference = storage().ref(filename);

      if (!reference) throw new Error('No timetable ');

      await reference.delete();

      console.log('TIMETABLE DELETED');
      setResultModal(true);
      setResultText('Timetable Sucessfully removed');
      setImageUri('');
    } catch (error) {
      setResultModal(true);
      setResultText(error.message);
    }
  };

  return (
    <Box>
      <ModalCustom
        showModal={showModal}
        setShowModal={setShowModal}
        ref={modalRef}
        action={imageUri ? removeTimetable : uploadImage}
        actionText={imageUri ? 'Remove' : 'Upload'}
        heading="Timetable">
        <View alignItems="center" justifyContent="center" flex={1}>
          {imageUri || imageUriTemp ? (
            <Image
              source={{
                uri: imageUri ? imageUri : imageUriTemp,
              }}
              style={{width: 200, height: 200, margin: 10}}
              width={200}
              height={200}
              m={10}
            />
          ) : (
            <Box>
              <Text mb="$3">No Timetable Uploaded</Text>
              <Button onPress={selectImage}>
                <ButtonText>Select Image</ButtonText>
              </Button>
            </Box>
          )}
        </View>
      </ModalCustom>

      <ModalCustom
        action={() => setResultModal(false)}
        actionText={'OK'}
        heading={'Alert'}
        showModal={resultModal}
        setShowModal={setResultModal}
        ref={resultRef}>
        <Box>
          <Text>{resultText}</Text>
        </Box>
      </ModalCustom>
    </Box>
  );
};

export default ManageTimetable;
