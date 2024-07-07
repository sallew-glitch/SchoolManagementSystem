import React, {useState} from 'react';
import {
  FormControl,
  VStack,
  Heading,
  Text,
  Input,
  InputField,
  Button,
  ButtonText,
  View,
  Select,
  SelectInput,
  SelectTrigger,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectItem,
  SelectPortal,
} from '@gluestack-ui/themed';
import { ChevronDown } from 'lucide-react-native';

function AddMarks({ route, navigation }) {
  const [first, setFirst] = useState('');
  const [mid, setMid] = useState('');
  const [final, setFinal] = useState('');

  const {subjects} = route.params;

  const clearFields = () => {
    setFirst('');
    setMid('');
    setFinal('');
  }

  return (
    <FormControl p="$7" bg="$backgroundLight0">
      <VStack space="xl">
        <Heading color="$black" lineHeight="$md">
          Input Marks
        </Heading>

        {/* <Plus size={30} color="#000000" style={{alignSelf: 'flex-end'}} /> */}

        <VStack space="xs">
          <Text color="$black" lineHeight="$xs">
            Student Reg No
          </Text>
          <Input variant="underlined">
            <InputField
              placeholder="Enter Student Registeration Number"
              type="text"
            />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text color="$black" lineHeight="$xs">
            Choose Subject
          </Text>

          <Select onValueChange={clearFields}>
            <SelectTrigger variant="underlined" size="md">
              <SelectInput placeholder="Select subject" />
              <SelectIcon mr="$3">
                <ChevronDown size={17} color="#000000" />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label={subjects[0]} value={subjects[0]} />
                <SelectItem label={subjects[1]} value={subjects[1]} />
                <SelectItem label={subjects[2]} value={subjects[2]} />
                {/* {props.subjects.forEach(element => {
                  <SelectItem label={element} value={element} />
                })} */}
                
              </SelectContent>
            </SelectPortal>
          </Select>

        </VStack>
        <VStack space="xs">
          <Text color="$black" lineHeight="$xs">
            First Term
          </Text>
          <Input variant="underlined">
            <InputField
              placeholder="Enter First Term Marks"
              type="text"
              value={first}
              onChangeText={setFirst}
            />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text color="$black" lineHeight="$xs">
            Mid Term
          </Text>
          <Input variant="underlined">
            <InputField
              placeholder="Enter Mid Term Marks"
              type="text"
              value={mid}
              onChangeText={setMid}
            />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text color="$black" lineHeight="$xs">
            Final Term
          </Text>
          <Input variant="underlined">
            <InputField
              placeholder="Enter Final Term Marks"
              type="text"
              value={final}
              onChangeText={setFinal}
            />
          </Input>
        </VStack>

        <Button
          ml="auto"
          onPress={() => {
            setShowModal(false);
          }}>
          <ButtonText color="$white">Save</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}

export default AddMarks;
