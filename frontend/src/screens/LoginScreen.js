import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { CosmicBackground } from '../components/CosmicBackground';
import { BlurView } from 'expo-blur';
import { theme } from '../theme';
import { Phone, ArrowRight, ShieldCheck, Zap } from 'lucide-react-native';
import { useAuth } from '../hooks/useAuth';

export const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const { sendOTP, verifyOTP, loading, user } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigation.replace('Chat');
    }
  }, [user]);

  const handleNext = async () => {
    setError('');
    if (step === 1 && phone.length >= 10) {
      // For real SMS, pass the recaptcha container id
      const result = await sendOTP(phone, 'recaptcha-container');
      if (result.success) {
        setStep(2);
      } else {
        setError(result.error || 'Failed to send OTP. Check your Firebase config.');
      }
    } else if (step === 2 && otp.length === 6) {
      const result = await verifyOTP(otp);
      if (result.success) {
        navigation.replace('Chat');
      } else {
        setError(result.error || 'Invalid Code');
      }
    }
  };

  return (
    <CosmicBackground>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Zap color={theme.colors.blueMain} size={48} style={styles.logo} />
            <Text style={styles.title}>Nova Gateway</Text>
            <Text style={styles.subtitle}>Enter the luxury space resort network</Text>
          </View>

          <BlurView intensity={30} tint="dark" style={styles.glassCard}>
            <Text style={styles.inputLabel}>
              {step === 1 ? 'Galactic Transit ID' : 'Identity Verification'}
            </Text>
            
            <View style={styles.inputWrapper}>
              {step === 1 ? (
                <>
                  <Phone size={20} color={theme.colors.blueMain} />
                  <TextInput 
                    style={styles.input}
                    placeholder="+94XXXXXXXXX"
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                </>
              ) : (
                <>
                  <ShieldCheck size={20} color={theme.colors.blueMain} />
                  <TextInput 
                    style={styles.input}
                    placeholder="Enter 6-digit OTP"
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    keyboardType="number-pad"
                    maxLength={6}
                    value={otp}
                    onChangeText={setOtp}
                  />
                </>
              )}
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity 
              style={[styles.button, { opacity: loading ? 0.6 : 1 }]} 
              onPress={handleNext}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Transmitting...' : step === 1 ? 'Verify Number' : 'Secure Entrance'}
              </Text>
              {!loading && <ArrowRight size={20} color="#000" />}
            </TouchableOpacity>
          </BlurView>
          
          {/* Required for Firebase Web Recaptcha */}
          <View id="recaptcha-container" />

          <Text style={styles.footerText}>
            By entering, you agree to the Intergalactic Comm Protocols.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </CosmicBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    marginBottom: 20,
    shadowColor: theme.colors.blueMain,
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontFamily: 'Outfit_600SemiBold',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontFamily: 'Outfit_300Light',
    marginTop: 5,
  },
  glassCard: {
    padding: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  inputLabel: {
    color: theme.colors.blueMain,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 15,
    fontFamily: 'Outfit_600SemiBold',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  input: {
    flex: 1,
    color: '#fff',
    marginLeft: 15,
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
  },
  button: {
    backgroundColor: theme.colors.blueMain,
    height: 55,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.blueMain,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Outfit_600SemiBold',
    marginRight: 10,
  },
  footerText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.3)',
    fontSize: 11,
    marginTop: 30,
    fontFamily: 'Outfit_400Regular',
  },
  errorText: {
    color: '#ff4500',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Outfit_400Regular',
  }
});
