import React, {useState, useRef} from 'react';
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  Heading,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ScrollView,
  Button,
  Icon,
  ButtonText,
} from '@gluestack-ui/themed';

import {CloseIcon} from '@gluestack-ui/themed';

const ModalCustom = ({
  children,
  showModal,
  setShowModal,
  heading,
  action,
  actionText,
  ref,
  scrollHorizontal,
  size,
}) => {
  return (
    <Modal
      isOpen={showModal}
      size={size ? size : 'lg'}
      onClose={() => {
        setShowModal(false);
      }}
      finalFocusRef={ref}>
      <ModalBackdrop />
      <ModalContent>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <ModalHeader mb="$2">
            <Heading size="lg">{heading}</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowModal(false);
              }}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={action}>
              <ButtonText>{actionText}</ButtonText>
            </Button>
          </ModalFooter>
        </ScrollView>
      </ModalContent>
    </Modal>
  );
};

export default ModalCustom;
