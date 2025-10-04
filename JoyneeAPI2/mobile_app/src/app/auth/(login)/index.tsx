import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
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

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [focusedTextField, setFocusedTextField] = React.useState<
    'email' | 'password' | null
  >(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  async function handleSubmit() {
    if (submitting) return;
    try {
      setSubmitting(true);
      Keyboard.dismiss();
      await signInWithEmailAndPassword(getAuth(), email.trim(), password);
      router.replace('/');
    } catch (e: any) {
      console.warn('Login error', e?.code ?? e);
      Alert.alert('Login failed', 'Invalid email or password.');
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
          title: 'Log in',
          headerShadowVisible: false,
          headerLeft() {
            return (
              <Link asChild href="/">
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
              {Platform.select({ ios: 'Welcome back!', default: 'Log in' })}
            </Text>
            {Platform.OS !== 'ios' && (
              <Text className="ios:text-sm text-center text-muted-foreground">
                Welcome back!
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
                    onFocus={() => setFocusedTextField('password')}
                    onBlur={() => setFocusedTextField(null)}
                    secureTextEntry
                    returnKeyType="done"
                    textContentType="password"
                    onSubmitEditing={handleSubmit}
                  />
                </FormItem>
              </FormSection>
              <View className="flex-row">
                <Link asChild href="/auth/(login)/forgot-password">
                  <Button size="sm" variant="plain" className="px-0.5">
                    <Text className="text-sm text-primary">
                      Forgot password?
                    </Text>
                  </Button>
                </Link>
              </View>
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
              disabled={!email || !password || submitting}
              onPress={handleSubmit}
            >
              <Text>{submitting ? 'Signing in…' : 'Continue'}</Text>
            </Button>
          </View>
        ) : (
          <View className="flex-row justify-between py-4 pl-6 pr-8">
            <Link asChild href="/auth/(create-account)">
              <Button variant="plain" className="px-2">
                <Text className="px-0.5 text-sm text-primary">
                  Create Account
                </Text>
              </Button>
            </Link>
            <Button
              disabled={!email || !password || submitting}
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
                    ? 'Signing in…'
                    : 'Submit'}
              </Text>
            </Button>
          </View>
        )}
      </KeyboardStickyView>
      {Platform.OS === 'ios' && (
        <Link asChild href="/auth/(create-account)">
          <Button variant="plain">
            <Text className="text-sm text-primary">Create Account</Text>
          </Button>
        </Link>
      )}
    </View>
  );
}
