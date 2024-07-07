import React, {useState, useRef} from 'react';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  VStack,
  Center,
  Box,
  Select,
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
} from '@gluestack-ui/themed';
import {CloseIcon} from '@gluestack-ui/themed';
import FormControlCustom from '../../../components/FormControlCustom';
import DatePicker from 'react-native-date-picker';
import ModalCustom from '../../../components/ModalCustom';
import firestore from '@react-native-firebase/firestore';
import {useFirebase} from '../../../contexts/FirebaseContext';

const AddFees = ({showModal, setShowModal, ref}) => {
  const {data} = useFirebase();

  console.log('DATA: ', data);

  console.log('Clicked');
  const [regNo, setRegNo] = useState('');
  const [amountDue, setAmoundDue] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [lateFees, setLateFees] = useState('');
  const [payableAmount, setPayableAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [studentName, setStudentName] = useState('');
  const [remarks, setRemarks] = useState('');

  const [resultModal, setResultModal] = useState(false);
  const [resultText, setResultText] = useState('');
  const resultRef = useRef(null);

  const studentData = data.students.find(student => student.regNo === regNo);

  const regNoElements = data.students.map(student => {
    return <SelectItem label={student.regNo} value={student.regNo} />;
  });

  const addFees = async () => {
    try {
      const student = firestore().collection('students').doc(studentData._id);

      const feesToAdd = {
        amountDue: parseInt(amountDue),
        amountPaid: parseInt(amountPaid),
        lateFees: Boolean(lateFees),
        payableAmount: parseInt(payableAmount),
        paymentDate: paymentDate.toDateString(),
        student: student,
        studentName: studentName,
        regNo: parseInt(regNo),
        remarks: remarks,
      };

      console.log('FEES TO ADD: ', feesToAdd);

      if (
        Object.values(feesToAdd).some(
          value => value === null || value === undefined || value === '',
        )
      ) {
        throw new Error('All fields must be filled');
      }

      if (!student) throw Error('Student does not exist');

      const doc = await firestore().collection('fees').add(feesToAdd);

      await student.update({
        fees: [...studentData.fees, doc.id],
      });

      if (!doc) throw new Error('Fee not able to be added');

      setResultModal(true);
      setResultText('Fee record added');
    } catch (error) {
      setResultModal(true);
      setResultText(error.message);
    }
  };

  return (
    <Box>
      <ModalCustom
        action={addFees}
        actionText={'Add'}
        heading="Add Fees"
        showModal={showModal}
        setShowModal={setShowModal}
        ref={ref}>
        <VStack space="lg">
          <FormControl isRequired>
            <FormControlLabel mb="$2">
              <FormControlLabelText>Registration No</FormControlLabelText>
            </FormControlLabel>
            <Select onValueChange={regNo => setRegNo(regNo)}>
              <SelectTrigger variant="outline" size="md">
                <SelectInput
                  placeholder={regNo ? '' + regNo : 'Select Registration No'}
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
                  <ScrollView>{regNoElements}</ScrollView>
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>
          <FormControlCustom
            type={'text'}
            value={studentName}
            onChange={setStudentName}
            label="Student Name"
            required={true}
          />
          <FormControlCustom
            type={'numeric'}
            value={amountDue}
            onChange={setAmoundDue}
            keyboardType="numeric"
            label="Amount Due"
            required={true}
          />
          <FormControlCustom
            type={'numeric'}
            value={amountPaid}
            onChange={setAmountPaid}
            keyboardType="numeric"
            label="Amount Paid"
            required={true}
          />
          <FormControlCustom
            type={'numeric'}
            value={payableAmount}
            onChange={setPayableAmount}
            keyboardType="numeric"
            label="Payable Amount"
            required={true}
          />

          <FormControl isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText>Payment Date</FormControlLabelText>
            </FormControlLabel>
            <Center>
              <DatePicker
                date={paymentDate}
                mode="date"
                onDateChange={date => setPaymentDate(date)}
                onConfirm={date => {
                  setPaymentDate(date);
                }}
              />
            </Center>
          </FormControl>

          <FormControl isRequired>
            <FormControlLabel mb="$2">
              <FormControlLabelText>Late Fees</FormControlLabelText>
            </FormControlLabel>
            <Select onValueChange={feeStatus => setLateFees(feeStatus)}>
              <SelectTrigger variant="outline" size="md">
                <SelectInput
                  placeholder={lateFees ? '' + lateFees : 'Fee Status'}
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
                  <ScrollView>
                    <SelectItem label="True" value={true} />
                    <SelectItem label="False" value={false} />
                  </ScrollView>
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>

          <FormControlCustom
            type={'text'}
            value={remarks}
            onChange={setRemarks}
            label={'Remarks'}
          />
        </VStack>
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

export default AddFees;
