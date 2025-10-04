import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { router } from 'expo-router';
import * as React from 'react';
import { Alert, Image, Keyboard, Platform, View } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardController,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import { Form, FormItem, FormSection } from '~/components/nativewindui/Form';
import { Text } from '~/components/nativewindui/Text';
import { TextField } from '~/components/nativewindui/TextField';

const LOGO_SOURCE = {
  uri: 'https://nativewindui.com/_next/image?url=/_next/static/media/logo.28276aeb.png&w=2048&q=75',
};

export default function CredentialsScreen() {
  const insets = useSafeAreaInsets();
  const [focusedTextField, setFocusedTextField] = React.useState<
    'email' | 'password' | 'confirm-password' | null
  >(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  async function handleSignup() {
    if (submitting) return;
    if (!email || !password || !confirm) {
      Alert.alert('Missing info', 'Please fill in all fields.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }
    try {
      setSubmitting(true);
      Keyboard.dismiss();
      await createUserWithEmailAndPassword(getAuth(), email.trim(), password);
      router.replace('/');
    } catch (e) {
      console.warn('Signup error', e);
      Alert.alert(
        'Sign up failed',
        'Unable to create account. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View
      className="ios:bg-card flex-1"
      style={{ paddingBottom: insets.bottom }}
    >
      <KeyboardAwareScrollView
        bottomOffset={Platform.select({ ios: 8 })}
        bounces={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="ios:pt-12 pt-20"
      >
        <View className="ios:px-12 flex-1 px-8">
          <View className="items-center pb-1">
            <Image
              source={LOGO_SOURCE}
              className="ios:size-12 size-8"
              resizeMode="contain"
            />
            <Text
              variant="title1"
              className="ios:font-bold pb-1 pt-4 text-center"
            >
              {Platform.select({
                ios: 'Set up your credentials',
                default: 'Create Account',
              })}
            </Text>
            {Platform.OS !== 'ios' && (
              <Text className="ios:text-sm text-center text-muted-foreground">
                Set up your credentials
              </Text>
            )}
          </View>
          <View className="ios:pt-4 pt-6">
            <Form className="gap-2">
              <FormSection className="ios:bg-background">
                <FormItem>
                  <TextField
                    value={email}
                    onChangeText={setEmail}
                    placeholder={Platform.select({ ios: 'Email', default: '' })}
                    label={Platform.select({
                      ios: undefined,
                      default: 'Email',
                    })}
                    onSubmitEditing={() =>
                      KeyboardController.setFocusTo('next')
                    }
                    submitBehavior="submit"
                    autoFocus
                    onFocus={() => setFocusedTextField('email')}
                    onBlur={() => setFocusedTextField(null)}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    returnKeyType="next"
                  />
                </FormItem>
                <FormItem>
                  <TextField
                    value={password}
                    onChangeText={setPassword}
                    placeholder={Platform.select({
                      ios: 'Password',
                      default: '',
                    })}
                    label={Platform.select({
                      ios: undefined,
                      default: 'Password',
                    })}
                    onSubmitEditing={() =>
                      KeyboardController.setFocusTo('next')
                    }
                    onFocus={() => setFocusedTextField('password')}
                    onBlur={() => setFocusedTextField(null)}
                    submitBehavior="submit"
                    secureTextEntry
                    returnKeyType="next"
                    textContentType="newPassword"
                  />
                </FormItem>
                <FormItem>
                  <TextField
                    value={confirm}
                    onChangeText={setConfirm}
                    placeholder={Platform.select({
                      ios: 'Confirm password',
                      default: '',
                    })}
                    label={Platform.select({
                      ios: undefined,
                      default: 'Confirm password',
                    })}
                    onFocus={() => setFocusedTextField('confirm-password')}
                    onBlur={() => setFocusedTextField(null)}
                    onSubmitEditing={handleSignup}
                    secureTextEntry
                    returnKeyType="done"
                    textContentType="newPassword"
                  />
                </FormItem>
              </FormSection>
            </Form>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView offset={{ closed: 0, opened: insets.bottom }}>
        {Platform.OS === 'ios' ? (
          <View className=" px-12 py-4">
            <Button
              size="lg"
              disabled={!email || !password || !confirm || submitting}
              onPress={handleSignup}
            >
              <Text>{submitting ? 'Creating…' : 'Submit'}</Text>
            </Button>
          </View>
        ) : (
          <View className="flex-row justify-end py-4 pl-6 pr-8">
            <Button
              disabled={!email || !password || !confirm || submitting}
              onPress={handleSignup}
            >
              <Text className="text-sm">
                {submitting ? 'Creating…' : 'Submit'}
              </Text>
            </Button>
          </View>
        )}
      </KeyboardStickyView>
    </View>
  );
}
