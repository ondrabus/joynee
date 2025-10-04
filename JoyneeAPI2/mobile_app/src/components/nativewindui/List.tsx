import {
  FlashList,
  type FlashListProps,
  type ListRenderItem as FlashListRenderItem,
  type ListRenderItemInfo,
} from '@shopify/flash-list';
import { cva } from 'class-variance-authority';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import {
  Platform,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  TextStyle,
  View,
  type ViewProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/nativewindui/Button';
import { Text, TextClassContext } from '@/components/nativewindui/Text';
import { cn } from '@/lib/cn';

cssInterop(FlashList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});

type ListDataItem = string | { title: string; subTitle?: string };
type ListVariant = 'insets' | 'full-width';

type ListRef<T extends ListDataItem> = React.Ref<FlashList<T>>;

type ListRenderItemProps<T extends ListDataItem> = ListRenderItemInfo<T> & {
  variant?: ListVariant;
  isFirstInSection?: boolean;
  isLastInSection?: boolean;
  sectionHeaderAsGap?: boolean;
};

type ListProps<T extends ListDataItem> = Omit<FlashListProps<T>, 'renderItem'> & {
  ref?: ListRef<T>;
  renderItem?: ListRenderItem<T>;
  variant?: ListVariant;
  sectionHeaderAsGap?: boolean;
};
type ListRenderItem<T extends ListDataItem> = (
  props: ListRenderItemProps<T>
) => ReturnType<FlashListRenderItem<T>>;

function List<T extends ListDataItem>({
  variant = 'full-width',
  contentContainerClassName,
  contentContainerStyle,
  renderItem,
  data,
  sectionHeaderAsGap = false,
  contentInsetAdjustmentBehavior = 'automatic',
  ...props
}: ListProps<T>) {
  const insets = useSafeAreaInsets();
  return (
    <FlashList
      data={data}
      contentInsetAdjustmentBehavior={contentInsetAdjustmentBehavior}
      renderItem={renderItemWithVariant(renderItem, variant, data, sectionHeaderAsGap)}
      contentContainerClassName={cn(
        variant === 'insets' && cn((!data || typeof data?.[0] !== 'string') && 'pt-4', 'ios:px-4'),
        variant === 'full-width' &&
          cn(
            'ios:bg-card ios:dark:bg-background',
            sectionHeaderAsGap && 'bg-card dark:bg-background'
          ),
        contentContainerClassName
      )}
      contentContainerStyle={
        contentContainerStyle
          ? StyleSheet.flatten([
              contentContainerStyle,
              {
                paddingBottom: Platform.select({
                  ios:
                    !contentInsetAdjustmentBehavior || contentInsetAdjustmentBehavior === 'never'
                      ? insets.bottom + 16
                      : 0,
                  default: insets.bottom,
                }),
              },
            ])
          : {
              paddingBottom: Platform.select({
                ios:
                  !contentInsetAdjustmentBehavior || contentInsetAdjustmentBehavior === 'never'
                    ? insets.bottom + 16
                    : 0,
                default: insets.bottom,
              }),
            }
      }
      getItemType={getItemType}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  );
}

function getItemType<T>(item: T) {
  return typeof item === 'string' ? 'sectionHeader' : 'row';
}

function renderItemWithVariant<T extends ListDataItem>(
  renderItem: ListRenderItem<T> | null | undefined,
  variant: ListVariant,
  data: readonly T[] | null | undefined,
  sectionHeaderAsGap?: boolean
) {
  return (args: ListRenderItemProps<T>) => {
    const previousItem = data?.[args.index - 1];
    const nextItem = data?.[args.index + 1];
    return renderItem
      ? renderItem({
          ...args,
          variant,
          isFirstInSection: !previousItem || typeof previousItem === 'string',
          isLastInSection: !nextItem || typeof nextItem === 'string',
          sectionHeaderAsGap,
        })
      : null;
  };
}

function isPressable(props: PressableProps) {
  return (
    ('onPress' in props && props.onPress) ||
    ('onLongPress' in props && props.onLongPress) ||
    ('onPressIn' in props && props.onPressIn) ||
    ('onPressOut' in props && props.onPressOut) ||
    ('onLongPress' in props && props.onLongPress)
  );
}

type ListItemProps<T extends ListDataItem> = PressableProps &
  ListRenderItemProps<T> & {
    androidRootClassName?: string;
    titleClassName?: string;
    titleStyle?: StyleProp<TextStyle>;
    textNumberOfLines?: number;
    subTitleClassName?: string;
    subTitleStyle?: StyleProp<TextStyle>;
    subTitleNumberOfLines?: number;
    textContentClassName?: string;
    leftView?: React.ReactNode;
    rightView?: React.ReactNode;
    removeSeparator?: boolean;
    bottomView?: React.ReactNode;
  };

const itemVariants = cva('ios:gap-0 flex-row gap-0 bg-card', {
  variants: {
    variant: {
      insets: 'ios:bg-card bg-card/70',
      'full-width': 'bg-card dark:bg-background',
    },
    sectionHeaderAsGap: {
      true: '',
      false: '',
    },
    isFirstItem: {
      true: '',
      false: '',
    },
    isFirstInSection: {
      true: '',
      false: '',
    },
    removeSeparator: {
      true: '',
      false: '',
    },
    isLastInSection: {
      true: '',
      false: '',
    },
    disabled: {
      true: 'opacity-70',
      false: 'opacity-100',
    },
  },
  compoundVariants: [
    {
      variant: 'insets',
      sectionHeaderAsGap: true,
      className: 'ios:dark:bg-card dark:bg-card/70',
    },
    {
      variant: 'insets',
      isFirstInSection: true,
      className: 'ios:rounded-t-[10px]',
    },
    {
      variant: 'insets',
      isLastInSection: true,
      className: 'ios:rounded-b-[10px]',
    },
    {
      removeSeparator: false,
      isLastInSection: true,
      className: 'ios:border-b-0 border-b border-border/25 dark:border-border/80',
    },
    {
      variant: 'insets',
      isFirstItem: true,
      className: 'border-border/40 border-t',
    },
  ],
  defaultVariants: {
    variant: 'insets',
    sectionHeaderAsGap: false,
    isFirstInSection: false,
    isLastInSection: false,
    disabled: false,
  },
});

function ListItem<T extends ListDataItem>({
  item,
  isFirstInSection,
  isLastInSection,
  index,
  variant,
  className,
  androidRootClassName,
  titleClassName,
  titleStyle,
  textNumberOfLines,
  subTitleStyle,
  subTitleClassName,
  subTitleNumberOfLines,
  textContentClassName,
  sectionHeaderAsGap,
  removeSeparator = false,
  leftView,
  rightView,
  bottomView,
  disabled,
  ...props
}: ListItemProps<T>) {
  if (typeof item === 'string') {
    console.log(
      'List.tsx',
      'ListItemComponent',
      "Invalid item of type 'string' was provided. Use ListSectionHeader instead."
    );
    return null;
  }
  return (
    <>
      <Button
        disabled={disabled || !isPressable(props)}
        variant="plain"
        size="none"
        unstable_pressDelay={100}
        androidRootClassName={androidRootClassName}
        className={cn(
          itemVariants({
            variant,
            sectionHeaderAsGap,
            isFirstInSection,
            isLastInSection,
            disabled,
            removeSeparator,
          }),
          className
        )}
        {...props}>
        <TextClassContext.Provider value="font-normal leading-5">
          {!!leftView && <View>{leftView}</View>}
          <View
            className={cn(
              'h-full flex-1 flex-row',
              !item.subTitle ? 'ios:py-3 py-[18px]' : 'ios:py-2 py-2',
              !leftView && 'ml-4',
              !rightView && 'pr-4',
              !removeSeparator &&
                (!isLastInSection || variant === 'full-width') &&
                'ios:border-b ios:border-border/80',
              !removeSeparator &&
                isFirstInSection &&
                variant === 'full-width' &&
                'ios:border-t ios:border-border/80'
            )}>
            <View className={cn('flex-1', textContentClassName)}>
              <Text numberOfLines={textNumberOfLines} style={titleStyle} className={titleClassName}>
                {item.title}
              </Text>
              {!!item.subTitle && (
                <Text
                  numberOfLines={subTitleNumberOfLines}
                  variant="subhead"
                  style={subTitleStyle}
                  className={cn('text-muted-foreground', subTitleClassName)}>
                  {item.subTitle}
                </Text>
              )}
              {!!bottomView && bottomView}
            </View>
            {!!rightView && <View>{rightView}</View>}
          </View>
        </TextClassContext.Provider>
      </Button>
      {!removeSeparator && Platform.OS !== 'ios' && !isLastInSection && (
        <View className={cn(variant === 'insets' && 'px-4')}>
          <View className="bg-border/25 dark:bg-border/80 h-px" />
        </View>
      )}
    </>
  );
}

type ListSectionHeaderProps<T extends ListDataItem> = ViewProps &
  ListRenderItemProps<T> & {
    textClassName?: string;
    ref?: React.Ref<View>;
  };

function ListSectionHeader<T extends ListDataItem>({
  ref,
  item,
  isFirstInSection,
  isLastInSection,
  index,
  variant,
  className,
  textClassName,
  sectionHeaderAsGap,
  ...props
}: ListSectionHeaderProps<T>) {
  if (typeof item !== 'string') {
    console.log(
      'List.tsx',
      'ListSectionHeaderComponent',
      "Invalid item provided. Expected type 'string'. Use ListItem instead."
    );
    return null;
  }

  if (sectionHeaderAsGap) {
    return (
      <View
        className={cn(
          'bg-background',
          Platform.OS !== 'ios' && 'border-border/25 dark:border-border/80 border-b',
          className
        )}
        {...props}
        ref={ref}>
        <View className="h-8" />
      </View>
    );
  }
  return (
    <View
      className={cn(
        'ios:pb-1 pb-4 pl-4 pt-4',
        Platform.OS !== 'ios' && 'border-border/25 dark:border-border/80 border-b',
        variant === 'full-width' ? 'bg-card dark:bg-background' : 'bg-background',
        className
      )}
      {...props}
      ref={ref}>
      <Text
        variant={Platform.select({ ios: 'footnote', default: 'body' })}
        className={cn('ios:uppercase ios:text-muted-foreground', textClassName)}>
        {item}
      </Text>
    </View>
  );
}

const ESTIMATED_ITEM_HEIGHT = {
  titleOnly: Platform.select({ ios: 45, default: 57 }),
  withSubTitle: 56,
};

function getStickyHeaderIndices<T extends ListDataItem>(data: T[]) {
  if (!data) return [];
  const indices: number[] = [];
  for (let i = 0; i < data.length; i++) {
    if (typeof data[i] === 'string') {
      indices.push(i);
    }
  }
  return indices;
}

export { ESTIMATED_ITEM_HEIGHT, getStickyHeaderIndices, List, ListItem, ListSectionHeader };
export type {
  ListDataItem,
  ListItemProps,
  ListProps,
  ListRef,
  ListRenderItemInfo,
  ListSectionHeaderProps,
};
