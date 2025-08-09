import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <LinearGradient
        colors={[
          'rgba(255,255,250,0.3)',
          'rgba(197,253,218,0.475)',
          'rgba(140,250,185,0.65)',
          'rgba(82,248,153,0.825)',
          'rgba(54,246,136,0.9125)',
          'rgba(25,245,120,1)'
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.topSection}>
            <View style={styles.characterContainer}>
              <View style={styles.characterPlaceholder}>
                <Text style={styles.characterEmoji}>😊</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.textSection}>
            <Text style={styles.title}>Welcome to Betterfly</Text>
            <Text style={styles.subtitle}>
              Transform your daily habits and unlock your potential with personalized insights and guidance.
            </Text>
          </View>
          
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Let's personalize your start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'space-between',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  characterContainer: {
    position: 'relative',
    width: 158,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#52f899',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#19f578',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  characterEmoji: {
    fontSize: 40,
  },
  textSection: {
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    marginBottom: 60,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#0f1c14',
    lineHeight: 44,
    letterSpacing: -1,
    marginBottom: 16,
    fontFamily: 'System', // Will use system font as fallback
  },
  subtitle: {
    fontSize: 20,
    color: '#4a5565',
    lineHeight: 30,
    fontWeight: '400',
  },
  buttonSection: {
    width: '100%',
  },
  button: {
    backgroundColor: '#0f1c14',
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 300,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
});