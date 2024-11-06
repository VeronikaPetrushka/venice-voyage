import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from "react-native-linear-gradient";
import { getRandomTip } from "../constants/tips.js";
import WelcomeModal from "./WelcomeModal.jsx";
import SettingsModal from "./SettingsModal.jsx";
import TripModal from "./TripModal.jsx";
import Tutorial from "./Tutorial.jsx";
import TipModal from "./TipModal";
import Icons from "./Icons.jsx";
import Map from "./Map";

const { height , width} = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();
    const [welcomeModalVisible, setWelcomeModalVisible] = useState(true);
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);
    const [tripModalVisible, setTripModalVisible] = useState(false);
    const [tutorialModalVisible, setTutorialModalVisible] = useState(false);
    const [tipModalVisible, setTipModalVisible] = useState(false);
    const [currentTip, setCurrentTip] = useState({ name: '', tip: '' });
    const [uploadedImage, setUploadedImage] = useState({ uri: Image.resolveAssetSource(require('../assets/avatar/user.png')).uri });

    const loadAvatar = async () => {
        try {
          const storedImageUri = await AsyncStorage.getItem('uploadedImage');
            
          if (storedImageUri) {
            setUploadedImage(({ uri: storedImageUri }));
        } else {
            setUploadedImage({ uri: Image.resolveAssetSource(require('../assets/avatar/user.png')).uri });
        }
        } catch (error) {
          console.error('Error loading avatar:', error);
        }
      };

      useEffect(() => {
        loadAvatar();
      }, []);

    const handleWelcomeVisible = () => {
        setWelcomeModalVisible(!welcomeModalVisible);
    };

    const handleSettingsVisible = async () => {
        setSettingsModalVisible(!settingsModalVisible);
        setUploadedImage({ uri: Image.resolveAssetSource(require('../assets/avatar/user.png')).uri });
        await loadAvatar();
    }

    const handleTripVisible = () => {
        setTripModalVisible(!tripModalVisible);
    };


    const handleTutorialVisible = () => {
        setTutorialModalVisible(!tutorialModalVisible);
    };

    const handleTipVisible = () => {
        setTipModalVisible(!tipModalVisible);
        if (!tipModalVisible) {
            setCurrentTip(getRandomTip());
        }
    };

    const handleGenerateNewTip = () => {
        setCurrentTip(getRandomTip());
    };

    return (
        <ImageBackground source={require('../assets/newDiz/back.png')} style={{ flex: 1 }}>
        <View style={styles.container}>

            <View style={styles.upperPanel}>
                <TouchableOpacity style={styles.infoBtn} onPress={handleTripVisible}>
                    <Text style={styles.infoText}>Your trip</Text>
                </TouchableOpacity>
                <View style={styles.settingsContainer}>
                    <TouchableOpacity style={styles.settingsBtn} onPress={handleSettingsVisible}>
                        <Image 
                            source={uploadedImage} 
                            style={styles.avatarImage}
                        />
                    </TouchableOpacity>
                    <Text style={styles.settingsText}>Settings</Text>
                </View>
            </View>

            <View style={{width: '100%', height: '63%'}}>
                <TouchableOpacity style={styles.quizIcon} onPress={() => navigation.navigate('QuizScreen')}>
                    <Icons type={'quiz'}/>
                </TouchableOpacity>
                <Map />
            </View>

            <TouchableOpacity style={styles.tutorialBtn} onPress={handleTutorialVisible}>
                <LinearGradient
                            colors={['#FFD662', '#C06014']}
                            
                            start={{ x: -0.15, y: 0.5 }}
                            end={{ x: 1.1, y: 0.5 }}
                            style={[styles.gradient]}
                        >
                    <Text style={styles.tutorialText}>Tutorial</Text>
                </LinearGradient>
            </TouchableOpacity>

            <View style={styles.bottomPanel}>
                <TouchableOpacity style={styles.adviceBtn} onPress={handleTipVisible}>
                    <LinearGradient
                            colors={['#C06014', '#854442']}
                            start={{ x: -0.15, y: 0.5 }}
                            end={{ x: 1.1, y: 0.5 }}
                            style={[styles.gradient]}
                        >
                        <Text style={styles.btnText}>Get traveler tip</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.scoreBtn} onPress={() => navigation.navigate('StatisticScreen')}>
                    <LinearGradient
                            colors={['#C06014', '#854442']}
                            start={{ x: -0.15, y: 0.5 }}
                            end={{ x: 1.1, y: 0.5 }}
                            style={[styles.gradient]}
                        >
                        <Text style={styles.btnText}>Statistic</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <SettingsModal visible={settingsModalVisible} onClose={handleSettingsVisible} />
            <WelcomeModal visible={welcomeModalVisible} onClose={handleWelcomeVisible}/>
            <TripModal visible={tripModalVisible} onClose={handleTripVisible} />
            <Tutorial visible={tutorialModalVisible} onClose={handleTutorialVisible}/>
            <TipModal visible={tipModalVisible} onClose={handleTipVisible} tip={currentTip} newTip={handleGenerateNewTip} />

        </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: height * 0.07,
    },

    upperPanel: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginBottom: height * 0.025
    },

    infoBtn: {
        width: width * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#C06014',
        marginRight: 20
    },

    infoText: {
        fontSize: 17,
        fontWeight: '900',
        color: '#FFD662',
    },

    settingsContainer: {
        alignItems: 'center',
        justifyContent:'center'
    },

    settingsBtn: {
        borderRadius: 100,
        width: 52,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#854442'
    },

    avatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },

    settingsText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#FFD662'
    },

    quizIcon: {
        width: 60,
        height: 60,
        position: 'absolute',
        top: 5,
        left: 10,
        zIndex: 15
    },

    tutorialBtn: {
        width: '100%',
        height: height * 0.075,
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: height * 0.02,
        marginTop: height * 0.04,
    },

    tutorialText: {
        fontSize: 19,
        fontWeight: '900',
        color: '#fff'
    },

    gradient: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        flexDirection: 'row',
    },

    bottomPanel: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    adviceBtn: {
        width: '48%',
        height: height * 0.065,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 14,
        overflow: 'hidden',
    },

    scoreBtn: {
        width: '48%',
        height: height * 0.065,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
    },

    btnText: {
        fontSize: 17,
        color: '#fff',
        fontWeight: '800'
    }
});

export default Home;