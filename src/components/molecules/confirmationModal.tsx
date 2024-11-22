import React, { ReactNode, useState } from "react";
import { Modal, Alert, View, Text, Pressable, StyleSheet } from "react-native";

interface Props {
  openModal: boolean;
  onClose: () => void;
  text?: string;
  children?: ReactNode;
  hasButton?: boolean;
}

const ConfirmationModal = ({ openModal, onClose, text, children, hasButton = true }: Props) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {
            text &&
            <Text style={styles.modalText}>{text}</Text>
          }
          {
            children &&
            children
          }
          {
            hasButton &&
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onClose}>
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          }
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5E6E8'
  },
  modalView: {
    width: '60%',
    height: 'auto',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    display: 'flex',
    gap: 20,
    justifyContent: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#192A51',
  },
  textStyle: {
    color: '#F5E6E8',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: '#192A51',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold'
  },
});


export default ConfirmationModal;