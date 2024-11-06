import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Dimensions } from "react-native"
import Icons from './Icons';

const { height } = Dimensions.get('window');

const WelcomeModal = ({ visible, onClose }) => {

    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                    <Icons type={'close'} />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Welcome to Venice, Traveler!</Text>
                <Text style={styles.modalText}>Explore the magical city of canals, bridges, and hidden gems. Embark on a quest to discover Venice’s most iconic and secret places. Each visit earns you points — how many can you collect during your stay? Ready to dive in? Let’s start your adventure!
                </Text>
            </View>
        </View>
    </Modal>
    )
};

const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 16,
        paddingTop: 50,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 19,
        fontWeight: '800',
        lineHeight: 19.36,
        color: '#3C3C3B',
        marginBottom: 20,
        textAlign: 'center',
        lineHeight: 21
    },

    modalText: {
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 16,
        color: '#3C3C3B',
        marginBottom: 28,
        textAlign: 'center',
        lineHeight: 21
    },

    closeBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        width: 40,
        height: 40
    }
})


export default WelcomeModal;