import React, {useState, useRef} from 'react';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  VStack,
  Center,
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
  Pressable,
  Text,
} from '@gluestack-ui/themed';
import FormControlCustom from '../../../components/FormControlCustom';
import DatePicker from 'react-native-date-picker';
import ModalCustom from '../../../components/ModalCustom';
import {useFirebase} from '../../../contexts/FirebaseContext';
import ViewCard from '../../../components/ViewCard';
import firestore from '@react-native-firebase/firestore';

const DeleteFees = ({showModal, setShowModal, ref}, props) => {
  const {data} = useFirebase();

  console.log('DATA: ', data);

  const [feesID, setFeesID] = useState(null);
  const [regNo, setRegNo] = useState('');

  const [feesDisplayModal, setFeesDisplayModal] = useState(false);

  const [resultModal, setResultModal] = useState(false);
  const [resultText, setResultText] = useState('');
  const resultRef = useRef(null);

  const studentData = data.students.find(student => student.regNo === regNo);
  const feesData = data.fees.filter(fees => fees.regNo === regNo);

  const feesDisplayRef = useRef(null);

  const deleteFees = async () => {
    try {
      const fee = feesData.find(fee => fee._id === feesID);

      if (!fee) throw new Error('Fee not found');

      const students = firestore().collection('students').doc(studentData.id);

      const doc = firestore().collection('fees').doc(feesID);

      if (!doc) throw Error('No such fee record');

      await doc.delete();

      if (!students) return;

      await students.update({
        fees: studentData.fees.filter(fees => fees != feesID),
      });

      setResultModal(true);
      setResultText('Fee Deleted');
    } catch (error) {
      setResultModal(true);
      setResultText(error.message);
    }
  };

  const displayData = () => {
    setFeesDisplayModal(true);
  };

  const studentElements = data.students.map(student => {
    return <SelectItem label={student.regNo} value={student.regNo} />;
  });

  const feesElements = feesData.map(fees => {
    return (
      <ViewCard
        actionText="Delete"
        action={deleteFees}
        setState={setFeesID}
        heading={fees.studentName}
        itemsData={fees}
      />
    );
  });

  console.log('FEES DATA:', feesData);

  return (
    <Box>
      <ModalCustom
        showModal={showModal}
        setShowModal={setShowModal}
        ref={ref}
        action={displayData}
        actionText={'Show'}
        heading="Delete Fees">
        <FormControl isRequired>
          <Select
            selectedValue={regNo.toString()}
            onValueChange={regNo => setRegNo(regNo)}>
            <SelectTrigger variant="outline" size="md">
              <SelectInput
                placeholder={regNo ? ' ' + regNo : 'Select Registratio no'}
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
                <ScrollView>{studentElements}</ScrollView>
              </SelectContent>
            </SelectPortal>
          </Select>
        </FormControl>
      </ModalCustom>

      <ModalCustom
        showModal={feesDisplayModal}
        setShowModal={setFeesDisplayModal}
        ref={feesDisplayRef}
        action={() => setFeesDisplayModal(false)}
        actionText={'Close'}
        size="full"
        heading="Delete Fees">
        {feesElements}
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

export default DeleteFees;
