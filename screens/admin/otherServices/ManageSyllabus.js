import React, {useState, useRef, useEffect} from 'react';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  View,
  Image,
  Select,
  Box,
  SelectItem,
  SelectTrigger,
  SelectIcon,
  SelectInput,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectPortal,
  Icon,
  ChevronDownIcon,
  ScrollView,
  Text,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';

import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import ModalCustom from '../../../components/ModalCustom';
import {useFirebase} from '../../../contexts/FirebaseContext';

const ManageSyllabus = ({showModal, setShowModal, ref}, props) => {
  const {data} = useFirebase();

  const [imageUri, setImageUri] = useState(null);
  const [imageUriTemp, setImageUriTemp] = useState('');

  const [selectClass, setSelectClass] = useState('');

  const [imageModal, setImageModal] = useState(false);
  const imageRef = useRef(null);

  const [resultModal, setResultModal] = useState(false);
  const [resultText, setResultText] = useState('');

  const resultRef = useRef(null);

  useEffect(() => {
    const fetchImageUri = async () => {
      const reference = storage().ref(selectClass);

      if (!reference) return console.log('No Syllabus found');

      const downloadURL = await reference.getDownloadURL();
      setImageUri(downloadURL);
    };

    fetchImageUri();
  }, [selectClass]);

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.assets[0].uri};
        console.log('SOURCe: ', source);
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
      const filename = selectClass;

      console.log('IMAGE URI: ', uploadUri);

      const reference = storage().ref(filename);
      await reference.putFile(uploadUri);

      // Set transferred state
      setResultModal(true);
      setResultText('Syllabus Successfully uploaded');
      setImageUri(imageUriTemp);
    } catch (error) {
      setResultModal(true);
      setResultText(error.message);
    }
  };

  const removeSyllabus = async () => {
    try {
      if (imageUri === null) throw new Error('No Syllabus');

      console.log('Inside');
      const filename = selectClass;

      const reference = storage().ref(filename);

      if (!reference) throw new Error('No Syllabus');

      await reference.delete();

      setResultModal(true);
      setResultText('Syllabus Sucessfully removed');
      setImageUri('');
    } catch (error) {
      setResultModal(true);
      setResultText(error.message);
    }
  };

  const confirmClass = () => {
    setImageModal(true);
  };

  console.log('CLASSES: ', data.classes);

  const classElements = data.classes.map(Class => {
    return <SelectItem label={Class.className} value={Class.className} />;
  });

  return (
    <Box>
      <ModalCustom
        showModal={showModal}
        setShowModal={setShowModal}
        ref={ref}
        action={confirmClass}
        actionText={'Select'}
        heading="Syllabus">
        <FormControl isRequired>
          <FormControlLabel mb="$2">
            <FormControlLabelText>Select Class</FormControlLabelText>
          </FormControlLabel>
          <Select
            selectedValue={selectClass}
            onValueChange={selectClass => setSelectClass(selectClass)}>
            <SelectTrigger variant="outline" size="md">
              <SelectInput
                placeholder={
                  selectClass.length !== 0 ? ' ' + selectClass : 'Select Class'
                }
              />
              <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <ScrollView>{classElements}</ScrollView>
              </SelectContent>
            </SelectPortal>
          </Select>
        </FormControl>
      </ModalCustom>

      <ModalCustom
        action={imageUri ? removeSyllabus : uploadImage}
        actionText={imageUri ? 'Remove' : 'Upload'}
        heading={'Syllabus'}
        showModal={imageModal}
        setShowModal={setImageModal}
        ref={imageRef}>
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
              <Text mb="$3">No Syllabus Uploaded</Text>
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

export default ManageSyllabus;
