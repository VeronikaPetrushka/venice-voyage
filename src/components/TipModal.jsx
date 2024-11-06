import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback, Modal, Dimensions } from "react-native"
import LinearGradient from "react-native-linear-gradient";

const { height } = Dimensions.get('window');

const TipModal = ({ visible, onClose, tip, newTip }) => {

    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Your daily traveler tip:</Text>
                <Text style={styles.name}>{tip.name}</Text>
                <Text style={styles.tip}>{tip.tip}</Text>
                <TouchableOpacity style={styles.modalBtnNew} onPress={newTip}>
                    <Text style={styles.btnNewText}>Generate new</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.adviceBtn} onPress={onClose}>
                <LinearGradient
                    colors={['#C06014', '#854442']}
                    start={{ x: -0.15, y: 0.5 }}
                    end={{ x: 1.1, y: 0.5 }}
                    style={[styles.gradient]}
                >
                    <Text style={styles.btnText}>Get traveler tip</Text>
                </LinearGradient>
        </TouchableOpacity>

        </View>
        </TouchableWithoutFeedback>
    </Modal>
    )
};

const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: height * 0.057,
        paddingHorizontal: 15,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 16,
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
        fontSize: 18,
        fontWeight: '800',
        lineHeight: 19.36,
        color: '#854442',
        marginBottom: 20,
        textAlign: 'center',
    },

    name: {
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 16,
        color: '#3C3C3B',
        marginBottom: 15,
        textAlign: 'center'
    },

    tip: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 16,
        color: '#3C3C3B',
        marginBottom: 28,
        textAlign: 'center'
    },
    
    gradient: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        flexDirection: 'row',
    },

    adviceBtn: {
        width: '46.5%',
        height: height * 0.065,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 14,
        overflow: 'hidden',
        marginLeft: -200,
        marginTop: 30
    },

    btnText: {
        fontSize: 17,
        color: '#fff',
        fontWeight: '800'
    },

    modalBtnNew: {
        width: '100%',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        backgroundColor: '#C06014'
    },

    btnNewText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '800'
    },
})


export default TipModal;