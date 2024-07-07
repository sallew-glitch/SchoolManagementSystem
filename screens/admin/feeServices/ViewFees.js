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
  Heading,
} from '@gluestack-ui/themed';

import ModalCustom from '../../../components/ModalCustom';
import {useFirebase} from '../../../contexts/FirebaseContext';
import ViewCard from '../../../components/ViewCard';
import firestore from '@react-native-firebase/firestore';

const ViewFees = ({showModal, setShowModal, ref}, props) => {
  const {data} = useFirebase();

  console.log('DATA: ', data);

  console.log('ENTERED');

  const [feesID, setFeesID] = useState(null);
  const [regNo, setRegNo] = useState('');

  const [feesDisplayModal, setFeesDisplayModal] = useState(false);

  const feesDisplayRef = useRef(null);

  const displayData = () => {
    setFeesDisplayModal(true);
  };

  const studentElements = data.students.map(student => {
    return <SelectItem label={student.regNo} value={student.regNo} />;
  });

  const feesData = data.fees.filter(fees => fees.regNo === regNo);

  const feesElements = feesData.map(fees => {
    return (
      <ViewCard
        actionText="View"
        action={() => console.log('Entered')}
        setState={setFeesID}
        heading={fees.studentName}
        itemsData={fees}
      />
    );
  });

  return (
    <Box>
      <ModalCustom
        showModal={showModal}
        setShowModal={setShowModal}
        ref={ref}
        action={displayData}
        actionText={'View'}
        heading="View Fees">
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
        heading="View Fees">
        {feesElements}
      </ModalCustom>
    </Box>
  );
};

export default ViewFees;
