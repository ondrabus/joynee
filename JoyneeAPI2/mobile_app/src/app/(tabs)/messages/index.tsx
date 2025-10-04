import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import * as React from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  clamp,
  FadeIn,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Avatar, AvatarFallback } from '@/components/nativewindui/Avatar';
import { ContextMenu } from '@/components/nativewindui/ContextMenu';
import type { ContextMenuMethods } from '@/components/nativewindui/ContextMenu/types';
import { createContextItem } from '@/components/nativewindui/ContextMenu/utils';
import { Icon } from '@/components/nativewindui/Icon';
import { LargeTitleHeader } from '@/components/nativewindui/LargeTitleHeader';
import {
  List,
  ListItem,
  type ListRenderItemInfo,
} from '@/components/nativewindui/List';
import { Text } from '@/components/nativewindui/Text';
import { cn } from '@/lib/cn';
import { useColorScheme } from '@/lib/useColorScheme';

export default function ConversationsIosScreen() {
  const { colors, isDarkColorScheme } = useColorScheme();

  // selection UI removed

  const renderItem = React.useCallback(
    (info: ListRenderItemInfo<(typeof ITEMS)[number]>) => (
      <MessageRow info={info} />
    ),
    []
  );

  // top header removed; selection toggled via long-press only

  return (
    <>
      <LargeTitleHeader
        title="Messages"
        backgroundColor={isDarkColorScheme ? colors.background : colors.card}
        searchBar={SEARCH_BAR}
      />
      <List
        data={ITEMS}
        contentInsetAdjustmentBehavior="automatic"
        estimatedItemSize={88}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </>
  );
}

const SEARCH_BAR = {
  iosHideWhenScrolling: true,
  content: (
    <View
      className={cn(
        'flex-1',
        Platform.OS === 'ios' && 'bg-card dark:bg-background'
      )}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerClassName="flex-1"
      >
        <Animated.View
          entering={FadeIn}
          className="ios:pt-4 flex-row border-b border-border px-4 pb-4"
        >
          <View className="items-center gap-2 px-4">
            <Avatar alt="avatar" className="size-12">
              <AvatarFallback>
                <View className="opacity-90 dark:opacity-80">
                  <Text
                    className="dark:ios:text-white leading-6 text-white dark:text-background"
                    variant="title3"
                  >
                    GM
                  </Text>
                </View>
              </AvatarFallback>
            </Avatar>
            <Text variant="caption1">George</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  ),
};

const CONTEXT_MENU_ITEMS = [
  createContextItem({
    actionKey: 'hide-alerts',
    title: 'Hide Alerts',
    icon: { name: 'bell' },
  }),
  createContextItem({
    actionKey: 'delete',
    title: 'Delete',
    icon: { name: 'trash', color: 'red' },
    destructive: true,
  }),
];
const TIME_STAMP_WIDTH = 96;

const TEXT_STYLE: TextStyle = {
  paddingRight: TIME_STAMP_WIDTH,
};

const TIMESTAMP_CONTAINER_STYLE = {
  maxWidth: TIME_STAMP_WIDTH,
};

function MessageRow({
  info,
}: {
  info: ListRenderItemInfo<(typeof ITEMS)[number]>;
}) {
  const ref = React.useRef<ContextMenuMethods>(null);
  const { colors } = useColorScheme();

  function onListItemPress() {
    ref.current?.dismissMenu?.();

    router.push('/messages/chat');
  }

  return (
    <Swipeable isUnread={info.item.unread}>
      <ContextMenu
        ref={ref}
        items={CONTEXT_MENU_ITEMS}
        iosRenderPreview={renderIosContextMenuPreview(info)}
        materialAlign="center"
      >
        <ListItem
          {...info}
          subTitleNumberOfLines={2}
          onPress={onListItemPress}
          className={cn(
            'h-[88px]',
            info.index === 0 &&
              'ios:border-t-0 border-border/25 dark:border-border/80 border-t'
          )}
          leftView={
            <View className="flex-1 flex-row items-center p-3 pl-2">
              <View className="w-6 items-center justify-center">
                <View className="pr-0.5">
                  {info.item.unread && (
                    <View className="size-2.5 rounded-full bg-primary" />
                  )}
                </View>
              </View>
              <Avatar alt="avatar" className="size-12">
                <AvatarFallback>
                  <View className="opacity-90 dark:opacity-80">
                    {info.item.contact ? (
                      <Text
                        className="dark:ios:text-white leading-6 text-white dark:text-background"
                        variant="title3"
                      >
                        {getInitials(info.item.title)}
                      </Text>
                    ) : (
                      <Icon
                        name="person.fill"
                        className="ios:text-white text-background"
                      />
                    )}
                  </View>
                </AvatarFallback>
              </Avatar>
            </View>
          }
          titleStyle={TEXT_STYLE}
          titleClassName="font-medium text-lg"
          subTitleClassName="pt-0.5"
          rightView={
            <>
              <View className="pr-3">
                <Icon name="chevron.right" size={15} color={colors.grey} />
              </View>
            </>
          }
        />
      </ContextMenu>
      <View
        style={TIMESTAMP_CONTAINER_STYLE}
        className="absolute right-8 top-1.5"
      >
        <Text
          numberOfLines={1}
          variant="footnote"
          className="text-muted-foreground"
        >
          {info.item.timestamp}
        </Text>
      </View>
    </Swipeable>
  );
}

const renderIosContextMenuPreview = (info: {
  item: (typeof ITEMS)[number];
}) => {
  return () => {
    return (
      <View className="bg-card/60 dark:bg-muted/70 h-96 w-screen rounded-lg p-4">
        <View className="pb-4">
          <Text variant="caption2" className="text-center">
            iMessage
          </Text>
          <Text variant="caption2" className="text-center">
            {info.item.timestamp}
          </Text>
        </View>
        <View className="pr-10">
          <View
            style={{ borderCurve: 'circular' }}
            className="rounded-2xl bg-card p-3"
          >
            <Text>{info.item.subTitle}</Text>
          </View>
        </View>
      </View>
    );
  };
};

function getInitials(name: string): string {
  const nameParts = name.trim().split(/\s+/);
  const firstInitial = nameParts[0].charAt(0).toUpperCase();
  if (nameParts.length === 1) {
    return firstInitial;
  }
  const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  return firstInitial + lastInitial;
}

const dimensions = Dimensions.get('window');

const BUTTON_WIDTH = 75;

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
  mass: 0.5,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

const ACTION_BUTTON_STYLE: ViewStyle = {
  width: BUTTON_WIDTH,
};

// eslint-disable-next-line max-lines-per-function
function Swipeable({
  children,
  isUnread,
}: {
  children: React.ReactNode;
  isUnread: boolean;
}) {
  const translateX = useSharedValue(0);
  const previousTranslateX = useSharedValue(0);
  const initialTouchLocation = useSharedValue<{ x: number; y: number } | null>(
    null
  );

  const rootStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  const statusActionStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      flex: 1,
      height: '100%',
      width: interpolate(
        translateX.value,
        [0, dimensions.width],
        [0, dimensions.width]
      ),
    };
  });
  const trashActionStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      right: 0,
      flex: 1,
      height: '100%',
      width: interpolate(
        -translateX.value,
        [0, dimensions.width],
        [0, dimensions.width]
      ),
    };
  });
  const notificationActionStyle = useAnimatedStyle(() => {
    return {
      overflow: 'hidden',
      position: 'absolute',
      left: interpolate(
        -translateX.value,
        [0, dimensions.width],
        [dimensions.width, 0]
      ),
      flex: 1,
      height: '100%',
      width:
        previousTranslateX.value > translateX.value
          ? interpolate(
              -translateX.value,
              [0, BUTTON_WIDTH * 2, BUTTON_WIDTH * 3, dimensions.width],
              [0, BUTTON_WIDTH, BUTTON_WIDTH * 1.2, 0]
            )
          : interpolate(
              -translateX.value,
              [0, BUTTON_WIDTH * 2, dimensions.width],
              [0, BUTTON_WIDTH, 0]
            ),
    };
  });
  const statusIconStyle = useAnimatedStyle(() => {
    return {
      overflow: 'hidden',
      position: 'absolute',
      left: interpolate(
        translateX.value,
        [0, BUTTON_WIDTH, BUTTON_WIDTH * 2, BUTTON_WIDTH * 3, dimensions.width],
        [-BUTTON_WIDTH, 0, 0, BUTTON_WIDTH * 2, dimensions.width - BUTTON_WIDTH]
      ),

      flex: 1,
      height: '100%',
      width: BUTTON_WIDTH,
    };
  });
  const trashIconStyle = useAnimatedStyle(() => {
    return {
      overflow: 'hidden',
      position: 'absolute',
      right:
        previousTranslateX.value > translateX.value
          ? interpolate(
              -translateX.value,
              [
                0,
                BUTTON_WIDTH * 2,
                BUTTON_WIDTH * 3,
                BUTTON_WIDTH * 3 + 40,
                dimensions.width,
              ],
              [
                -BUTTON_WIDTH,
                0,
                0,
                BUTTON_WIDTH + 40,
                dimensions.width - BUTTON_WIDTH,
              ]
            )
          : interpolate(
              -translateX.value,
              [0, BUTTON_WIDTH * 2, dimensions.width],
              [-BUTTON_WIDTH, 0, dimensions.width - BUTTON_WIDTH]
            ),
      flex: 1,
      height: '100%',
      width: BUTTON_WIDTH,
    };
  });

  function onToggleMarkAsRead() {
    console.log('onToggleMarkAsRead');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
  function onDelete() {
    console.log('onDelete');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
  function onToggleNotifications() {
    console.log('onToggleNotifications');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
  const pan = Gesture.Pan()
    .manualActivation(Platform.OS !== 'ios')
    .onBegin((evt) => {
      initialTouchLocation.value = { x: evt.x, y: evt.y };
    })
    .onStart(() => {
      previousTranslateX.value = translateX.value;
    })
    // Prevents blocking the scroll view
    .onTouchesMove((evt, state) => {
      if (!initialTouchLocation.value || !evt.changedTouches.length) {
        state.fail();
        return;
      }

      const xDiff = Math.abs(
        evt.changedTouches[0].x - initialTouchLocation.value.x
      );
      const yDiff = Math.abs(
        evt.changedTouches[0].y - initialTouchLocation.value.y
      );
      const isHorizontalPanning = xDiff > yDiff;

      if (isHorizontalPanning && xDiff > 0.5) {
        state.activate();
      } else {
        state.fail();
      }
    })
    .onUpdate((event) => {
      translateX.value = clamp(
        event.translationX + previousTranslateX.value,
        -dimensions.width,
        dimensions.width
      );
    })
    .onEnd((event) => {
      const right = event.translationX > 0 && translateX.value > 0;
      const left = event.translationX < 0 && translateX.value < 0;

      if (right) {
        if (translateX.value > BUTTON_WIDTH * 2) {
          translateX.value = withSpring(0, SPRING_CONFIG);
          runOnJS(onToggleMarkAsRead)();
          return;
        }
        translateX.value = withSpring(
          event.translationX > 0 ? BUTTON_WIDTH : -BUTTON_WIDTH,
          SPRING_CONFIG
        );
        return;
      }

      if (left) {
        if (translateX.value < -BUTTON_WIDTH * 3) {
          translateX.value = withSpring(-dimensions.width, SPRING_CONFIG);
          runOnJS(onDelete)();
          return;
        }
        translateX.value = withSpring(
          event.translationX > 0 ? BUTTON_WIDTH * 2 : -BUTTON_WIDTH * 2,
          SPRING_CONFIG
        );
        return;
      }

      translateX.value = withSpring(0, SPRING_CONFIG);
    });

  function onStatusActionPress() {
    translateX.value = withSpring(0, SPRING_CONFIG);
    onToggleMarkAsRead();
  }

  function onDeleteActionPress() {
    translateX.value = withSpring(-dimensions.width, SPRING_CONFIG);
    onDelete();
  }

  function onNotificationActionPress() {
    translateX.value = withSpring(0, SPRING_CONFIG);
    onToggleNotifications();
  }

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Animated.View style={statusActionStyle} className="bg-primary">
          <Animated.View style={statusIconStyle}>
            <Pressable
              style={ACTION_BUTTON_STYLE}
              onPress={onStatusActionPress}
              className="absolute inset-y-0 right-0 items-center justify-center"
            >
              <Icon
                sfSymbol={{
                  name: isUnread
                    ? 'checkmark.message.fill'
                    : 'message.badge.fill',
                }}
                materialCommunityIcon={{
                  name: isUnread ? 'read' : 'email-mark-as-unread',
                }}
                color="white"
              />
            </Pressable>
          </Animated.View>
        </Animated.View>
        <Animated.View style={trashActionStyle} className="bg-destructive">
          <Animated.View style={trashIconStyle}>
            <Pressable
              style={ACTION_BUTTON_STYLE}
              onPress={onDeleteActionPress}
              className="absolute inset-y-0 right-0 items-center justify-center"
            >
              <Icon name="trash.fill" color="white" />
            </Pressable>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={notificationActionStyle}
          className="bg-violet-600"
        >
          <Pressable
            style={ACTION_BUTTON_STYLE}
            onPress={onNotificationActionPress}
            className="absolute inset-y-0 left-0 items-center justify-center"
          >
            <Icon
              sfSymbol={{ name: 'bell.slash.fill' }}
              materialCommunityIcon={{ name: 'bell-cancel' }}
              color="white"
            />
          </Pressable>
        </Animated.View>
        <Animated.View style={rootStyle}>{children}</Animated.View>
      </View>
    </GestureDetector>
  );
}

// selecting toolbar removed

//

const ITEMS = [
  {
    id: '1',
    contact: true,
    unread: true,
    title: 'Alice Johnson',
    subTitle:
      'Hi team, please find the latest updates on the project. We have completed the initial phase and are moving into the testing stage.',
    timestamp: '8:32 AM',
  },
  {
    id: '2',
    contact: true,
    unread: true,
    title: 'Bob Smith',
    subTitle:
      'Reminder: We have a team meeting scheduled for tomorrow at 10 AM. Please make sure to bring your reports.',
    timestamp: 'Yesterday',
  },
  {
    id: '3',
    contact: false,
    unread: false,
    title: '(555) 123-4567',
    subTitle:
      'You have a missed call from this number. Please call back at your earliest convenience.',
    timestamp: 'Saturday',
  },
  {
    id: '4',
    contact: true,
    unread: false,
    title: 'Catherine Davis',
    subTitle:
      'Hi, please find attached the invoice for the services provided last month. Let me know if you need any further information.',
    timestamp: 'Last Tuesday',
  },
  {
    id: '5',
    contact: true,
    unread: true,
    title: 'Daniel Brown',
    subTitle: "Hey, are you free for lunch this Thursday? Let's catch up!",
    timestamp: '10:15 AM',
  },
  {
    id: '6',
    contact: false,
    unread: false,
    title: '(555) 987-6543',
    subTitle:
      'Your service appointment is scheduled for June 29th. Please be available during the time slot.',
    timestamp: '2024-06-29',
  },
  {
    id: '7',
    contact: true,
    unread: false,
    title: 'Evelyn Clark',
    subTitle: 'Wishing you a very happy birthday! Have a great year ahead.',
    timestamp: '2024-06-29',
  },
  {
    id: '8',
    contact: false,
    unread: false,
    title: '(555) 321-7654',
    subTitle: "Don't forget to submit your timesheet by the end of the day.",
    timestamp: '2024-06-29',
  },
  {
    id: '9',
    contact: true,
    unread: false,
    title: 'Fiona Wilson',
    subTitle:
      'Attached is the weekly report for your review. Please provide your feedback.',
    timestamp: '2024-06-29',
  },
  {
    id: '10',
    contact: true,
    unread: false,
    title: 'George Martinez',
    subTitle:
      'Hi all, we are planning a team outing next weekend. Please confirm your availability.',
    timestamp: '2024-06-29',
  },
  {
    id: '11',
    contact: false,
    unread: false,
    title: '(555) 654-3210',
    subTitle:
      'Congratulations! You are eligible for a special promotion. Contact us to learn more.',
    timestamp: '2024-06-29',
  },
  {
    id: '12',
    contact: true,
    unread: false,
    title: 'Hannah Lee',
    subTitle:
      'Hi, your contract is up for renewal. Please review the attached document and let us know if you have any questions.',
    timestamp: '2024-06-29',
  },
];
