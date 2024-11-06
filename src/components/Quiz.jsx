import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, Modal, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import quiz from '../constants/quiz';

const { height, width } = Dimensions.get('window');

const Quiz = () => {
    const navigation = useNavigation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [gameMode, setGameMode] = useState(null);
    const [isModalVisible, setModalVisible] = useState(true);
    const [timer, setTimer] = useState(30);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [topScore, setTopScore] = useState(0);

    useEffect(() => {
        const loadScore = async () => {
            const savedScore = await AsyncStorage.getItem('score');
            if (savedScore) {
                setTopScore(parseInt(savedScore, 10));
            }
        };

        loadScore();
    }, []);

    useEffect(() => {
        let countdown;
        if (gameMode === 'timer' && timer > 0) {
            countdown = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0 || currentQuestionIndex >= quiz.length - 1) {
            setTimeout(() => {
                finishQuiz();
            }, 1000);
        }

        return () => clearInterval(countdown);
    }, [gameMode, timer, currentQuestionIndex]);

    const finishQuiz = async () => {
        await AsyncStorage.setItem('score', (topScore + score).toString());
        setIsQuizFinished(true);
        setModalVisible(false);
    };

    const handleOptionPress = (option) => {
        setSelectedOption(option);
        setShowCorrectAnswer(true);

        if (option === quiz[currentQuestionIndex].correctAnswer) {
            setScore(prevScore => prevScore + 10);
        } else if (gameMode === 'firstIncorrect') {
            setTimeout(() => {
                finishQuiz();
            }, 1000);
            return;
        }

        setTimeout(() => {
            setSelectedOption(null);
            setShowCorrectAnswer(false);
            const nextIndex = currentQuestionIndex + 1;
            if (nextIndex < quiz.length) {
                setCurrentQuestionIndex(nextIndex);
            } else {
                setTimeout(() => {
                    finishQuiz();
                }, 1000);
            }
        }, 1000);
    };

    const startQuiz = (mode) => {
        setGameMode(mode);
        setModalVisible(false);
        if (mode === 'timer') {
            setTimer(30);
            setScore(0);
            setCurrentQuestionIndex(0);
        }
    };

    const tryAgain = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsQuizFinished(false);
        setSelectedOption(null);
        setShowCorrectAnswer(false);
        setTimer(30);
    };

    const goBack = () => {
        navigation.goBack();
    };

    const renderOption = (option) => {
        const isCorrect = option === quiz[currentQuestionIndex].correctAnswer;
        const isSelected = option === selectedOption;

        let backgroundColor = '#FAF3E0';
        if (isSelected) {
            backgroundColor = isCorrect ? '#b6d7a8' : '#d7a3a3';
        } else if (showCorrectAnswer && isCorrect) {
            backgroundColor = '#b6d7a8';
        }

        return (
            <TouchableOpacity
                style={[styles.option, { backgroundColor }]}
                onPress={() => handleOptionPress(option)}>
                <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
        );
    };

    const currentQuestion = quiz[currentQuestionIndex];

    return (
        <ImageBackground source={require('../assets/newDiz/back.png')} style={{flex: 1}}>
        <View style={styles.container}>
            <Modal visible={isModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Choose the game mode:</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => startQuiz('timer')}>
                            <Text style={styles.modalButtonText}>Earn the maximum correct answers in 30 seconds</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => startQuiz('firstIncorrect')}>
                            <Text style={styles.modalButtonText}>Answer until the first incorrect response</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {!isModalVisible && !isQuizFinished && (
                <>
                    {gameMode === 'timer' && (
                        <View style={styles.timerContainer}>
                            <Text style={styles.timerText}>Time remaining: {timer}s</Text>
                        </View>
                    )}
                    <View style={styles.questionContainer}> 
                        <Text style={styles.questionText}>{currentQuestion.question}</Text>
                    </View>
                    <FlatList
                        contentContainerStyle={{alignItems: 'center'}}
                        data={currentQuestion.options}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => renderOption(item)}
                        extraData={selectedOption}
                    />
                </>
            )}
            {isQuizFinished && (
                <View style={styles.finishContainer}>
                    <Text style={styles.finishText}>Quiz Finished!</Text>
                    <View style={styles.finishTextContainer}>
                        <Text style={[styles.finishScore, {marginBottom: 10}]}>{`Congratulations !\nYou've reached the score of ${score} !`}</Text>
                        <Text style={[styles.finishScore, {alignSelf: 'center'}]}>Your total score is {topScore + score}</Text>
                    </View>
                    <TouchableOpacity style={styles.retryButton} onPress={tryAgain}>
                        <Text style={styles.retryButtonText}>Try Again</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.goBackButton} onPress={goBack}>
                        <Text style={styles.goBackButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: height * 0.07,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 20,
    },
    modalContent: {
        width: '100%',
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
        fontSize: 22,
        color: '#3C3C3B',
        fontWeight: '900',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#C06014',
        borderWidth: 1,
        padding: 10,
        borderRadius: 12,
        marginVertical: 7,
        width: width * 0.8,
    },
    modalButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    timerContainer: {
        backgroundColor: '#FAF3E0',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    questionContainer: {
        marginTop: height * 0.2,
        marginBottom: height * 0.1,
        backgroundColor: '#FAF3E0',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    questionText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#3C3C3B',
        textAlign: 'center',
    },
    option: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#854442',
        borderRadius: 5,
        marginBottom: 10,
        width: width * 0.8
    },
    optionText: {
        fontSize: 17,
        color: '#854442'
    },
    timerText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#C06014',
    },
    finishContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    finishTextContainer: {
        backgroundColor: '#FAF3E0',
        borderRadius: 14,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 20,
        marginBottom: height * 0.15
    },
    finishScore: {
        fontSize: 20,
        fontWeight: '800',
        color: '#C06014',
        textAlign: 'center',
    },
    finishText: {
        fontSize: 30,
        fontWeight: '900',
        color: '#FAF3E0',
        marginBottom: height * 0.15,
        marginTop: height * 0.05
    },
    retryButton: {
        backgroundColor: '#FFD662',
        padding: 15,
        borderRadius: 12,
        marginVertical: 15,
        width: width * 0.8,
    },
    retryButtonText: {
        color: '#C06014',
        textAlign: 'center',
        fontSize: 16,
    },
    goBackButton: {
        backgroundColor: '#C06014',
        padding: 15,
        borderRadius: 12,
        width: width * 0.8,
    },
    goBackButtonText: {
        color: '#FFD662',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default Quiz;
