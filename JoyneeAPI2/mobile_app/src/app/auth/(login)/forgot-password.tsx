import { getAuth, sendPasswordResetEmail } from '@react-native-firebase/auth';
import { Link, router, Stack } from 'expo-router';
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

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();
  const [focusedTextField, setFocusedTextField] = React.useState<
    'email' | null
  >(null);
  const [email, setEmail] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  async function handleSubmit() {
    if (submitting) return;
    if (!email) {
      Alert.alert('Missing email', 'Please enter your email address.');
      return;
    }
    try {
      setSubmitting(true);
      Keyboard.dismiss();
      await sendPasswordResetEmail(getAuth(), email.trim());
      Alert.alert(
        'Check your email',
        'If an account exists for that email, a password reset link has been sent.'
      );
      router.back();
    } catch (e: any) {
      console.warn('Password reset error', e?.code ?? e);
      if (e?.code === 'auth/invalid-email') {
        Alert.alert('Invalid email', 'Please enter a valid email address.');
        return;
      }
      Alert.alert(
        'Check your email',
        'If an account exists for that email, a password reset link has been sent.'
      );
      router.back();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View
      className="ios:bg-card flex-1"
      style={{ paddingBottom: insets.bottom }}
    >
      <Stack.Screen
        options={{
          title: 'Forgot password',
          headerShadowVisible: false,
          headerLeft() {
            return (
              <Link asChild href="/auth/(login)">
                <Button variant="plain" className="ios:px-0">
                  <Text className="text-primary">Cancel</Text>
                </Button>
              </Link>
            );
          },
        }}
      />
      <KeyboardAwareScrollView
        bottomOffset={Platform.select({ ios: 175 })}
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
                ios: 'Reset your password',
                default: 'Forgot password',
              })}
            </Text>
            {Platform.OS !== 'ios' && (
              <Text className="ios:text-sm text-center text-muted-foreground">
                Enter your email to receive a reset link
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
                    onSubmitEditing={handleSubmit}
                    submitBehavior="submit"
                    autoFocus
                    onFocus={() => setFocusedTextField('email')}
                    onBlur={() => setFocusedTextField(null)}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    returnKeyType="send"
                  />
                </FormItem>
              </FormSection>
            </Form>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView
        offset={{
          closed: 0,
          opened: Platform.select({
            ios: insets.bottom + 30,
            default: insets.bottom,
          }),
        }}
      >
        {Platform.OS === 'ios' ? (
          <View className=" px-12 py-4">
            <Button
              size="lg"
              disabled={!email || submitting}
              onPress={handleSubmit}
            >
              <Text>{submitting ? 'Sending…' : 'Send reset link'}</Text>
            </Button>
          </View>
        ) : (
          <View className="flex-row justify-end py-4 pl-6 pr-8">
            <Button
              disabled={!email || submitting}
              onPress={() => {
                if (focusedTextField === 'email') {
                  KeyboardController.setFocusTo('next');
                  return;
                }
                handleSubmit();
              }}
            >
              <Text className="text-sm">
                {focusedTextField === 'email'
                  ? 'Next'
                  : submitting
                    ? 'Sending…'
                    : 'Send reset link'}
              </Text>
            </Button>
          </View>
        )}
      </KeyboardStickyView>
      {Platform.OS === 'ios' && (
        <Link asChild href="/auth/(login)">
          <Button variant="plain">
            <Text className="text-sm text-primary">Back to login</Text>
          </Button>
        </Link>
      )}
    </View>
  );
}
