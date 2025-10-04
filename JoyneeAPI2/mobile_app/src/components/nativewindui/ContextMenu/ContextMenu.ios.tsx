import { cssInterop } from 'nativewind';
import { View } from 'react-native';
import {
  ContextMenuView,
  MenuAttributes,
  MenuConfig,
  MenuElementConfig,
  OnPressMenuItemEvent,
  // @ts-expect-error - https://github.com/dominicstop/react-native-ios-context-menu/issues/129
} from 'react-native-ios-context-menu';
import {
  MATERIAL_COMMUNITY_ICONS_TO_SF_SYMBOLS,
  MATERIAL_ICONS_TO_SF_SYMBOLS,
} from 'rn-icon-mapper';

import type { ContextItem, ContextMenuConfig, ContextMenuProps, ContextSubMenu } from './types';

cssInterop(ContextMenuView, {
  className: 'style',
});

const PREVIEW_CONFIG = {
  previewSize: 'INHERIT',
  preferredCommitStyle: 'dismiss',
  isResizeAnimated: true,
  previewType: 'CUSTOM',
} as const;

function getAuxiliaryPreviewPosition(position: 'start' | 'center' | 'end') {
  switch (position) {
    case 'start':
      return 'targetLeading';
    case 'center':
      return 'targetCenter';
    case 'end':
      return 'targetTrailing';
  }
}

function getAuxiliaryPreviewConfig(position: 'start' | 'center' | 'end') {
  return {
    verticalAnchorPosition: 'automatic',
    horizontalAlignment: getAuxiliaryPreviewPosition(position),
    transitionConfigEntrance: {
      mode: 'syncedToMenuEntranceTransition',
      shouldAnimateSize: false,
    },
    transitionExitPreset: {
      mode: 'zoomAndSlide',
    },
  } as const;
}

function ContextMenu({
  items,
  title,
  iOSItemSize = 'large',
  onItemPress,
  enabled = true,
  iosRenderPreview,
  iosOnPressMenuPreview,
  iosPreviewConfig,
  renderAuxiliaryPreview,
  auxiliaryPreviewPosition = 'start',
  materialPortalHost: _materialPortalHost,
  materialSideOffset: _materialSideOffset,
  materialAlignOffset: _materialAlignOffset,
  materialAlign: _materialAlign,
  materialWidth: _materialWidth,
  materialMinWidth: _materialMinWidth,
  materialLoadingText: _materialLoadingText,
  materialSubMenuTitlePlaceholder: _materialSubMenuTitlePlaceholder,
  materialOverlayClassName: _materialOverlayClassName,
  ...props
}: ContextMenuProps) {
  return (
    <View>
      <ContextMenuView
        isContextMenuEnabled={enabled}
        menuConfig={toConfigMenu(items, iOSItemSize, title)}
        onPressMenuItem={toOnPressMenuItem(onItemPress)}
        onPressMenuPreview={iosOnPressMenuPreview}
        shouldCleanupOnComponentWillUnmountForAuxPreview
        previewConfig={getPreviewConfig(!!iosRenderPreview, iosPreviewConfig)}
        renderPreview={iosRenderPreview}
        shouldPreventLongPressGestureFromPropagating
        lazyPreview={!!iosRenderPreview}
        auxiliaryPreviewConfig={
          !renderAuxiliaryPreview ? undefined : getAuxiliaryPreviewConfig(auxiliaryPreviewPosition)
        }
        isAuxiliaryPreviewEnabled={!!renderAuxiliaryPreview}
        renderAuxiliaryPreview={renderAuxiliaryPreview}
        {...props}
      />
    </View>
  );
}

export { ContextMenu };

function toOnPressMenuItem(onItemPress: ContextMenuProps['onItemPress']): OnPressMenuItemEvent {
  // @ts-expect-error - https://github.com/dominicstop/react-native-ios-context-menu/issues/129
  return ({ nativeEvent }) => {
    onItemPress?.({
      actionKey: nativeEvent.actionKey,
      title: nativeEvent.actionTitle,
      subTitle: nativeEvent.actionSubtitle,
      state: nativeEvent.menuState ? { checked: nativeEvent.menuState === 'on' } : undefined,
      destructive: nativeEvent.menuAttributes?.includes('destructive'),
      disabled: nativeEvent.menuAttributes?.includes('disabled'),
      hidden: nativeEvent.menuAttributes?.includes('hidden'),
      keepOpenOnPress: nativeEvent.menuAttributes?.includes('keepsMenuPresented'),
      loading: false,
    });
  };
}

function toConfigMenu(
  items: ContextMenuConfig['items'],
  iOSItemSize: ContextMenuConfig['iOSItemSize'],
  title: ContextMenuConfig['title']
): MenuConfig {
  return {
    menuTitle: title ?? '',
    menuPreferredElementSize: iOSItemSize,
    menuItems: items.map((item) => {
      if ('items' in item) {
        return toConfigSubMenu(item);
      }
      return toConfigItem(item);
    }),
  };
}

function toConfigSubMenu(subMenu: ContextSubMenu): MenuElementConfig {
  if (subMenu.loading) {
    return {
      type: 'deferred',
      deferredID: `${subMenu.title ?? ''}-${Date.now()}`,
    };
  }
  return {
    menuOptions: subMenu.iOSType === 'inline' ? ['displayInline'] : undefined,
    menuTitle: subMenu.title ?? '',
    menuSubtitle: subMenu.subTitle,
    menuPreferredElementSize: subMenu.iOSItemSize,
    menuItems: subMenu.items.map((item) => {
      if ('items' in item) {
        return toConfigSubMenu(item);
      }
      return toConfigItem(item);
    }),
  };
}

function toConfigItem(item: ContextItem): MenuElementConfig {
  if (item.loading) {
    return {
      type: 'deferred',
      deferredID: `${item.actionKey}-deferred}`,
    };
  }
  const menuAttributes: MenuAttributes[] = [];
  if (item.destructive) {
    menuAttributes.push('destructive');
  }
  if (item.disabled) {
    menuAttributes.push('disabled');
  }
  if (item.hidden) {
    menuAttributes.push('hidden');
  }
  if (item.keepOpenOnPress) {
    menuAttributes.push('keepsMenuPresented');
  }
  return {
    actionKey: item.actionKey,
    actionTitle: item.title ?? '',
    actionSubtitle: item.subTitle,
    menuState: item.state?.checked ? 'on' : 'off',
    menuAttributes,
    discoverabilityTitle: item.subTitle,
    icon: item?.image?.url
      ? {
          type: 'IMAGE_REMOTE_URL',
          imageValue: {
            url: item.image.url,
          },
          imageOptions: {
            cornerRadius: item.image.cornerRadius,
            tint: item.image.tint,
          },
        }
      : item.icon
        ? {
            iconType: 'SYSTEM',
            iconValue: getIconValue(item.icon),
            iconTint: item.icon?.color,
          }
        : undefined,
  };
}

function getPreviewConfig(
  hasPreview: boolean,
  iosPreviewConfig?: ContextMenuProps['iosPreviewConfig']
) {
  if (!hasPreview) {
    return iosPreviewConfig;
  }
  if (!iosPreviewConfig) {
    return PREVIEW_CONFIG;
  }
  return { ...PREVIEW_CONFIG, ...iosPreviewConfig };
}

function getIconValue(icon: ContextItem['icon'] | undefined) {
  if (!icon) {
    return 'questionmark';
  }
  const sfSymbol = (icon?.sfSymbol ?? {}) as { name?: string };
  if (sfSymbol.name) {
    return sfSymbol.name;
  }
  const materialCommunityIcon = (icon?.materialCommunityIcon ?? {}) as { name?: string };
  if (materialCommunityIcon?.name) {
    return MATERIAL_COMMUNITY_ICONS_TO_SF_SYMBOLS[
      materialCommunityIcon.name as keyof typeof MATERIAL_COMMUNITY_ICONS_TO_SF_SYMBOLS
    ];
  }
  const materialIcon = (icon?.materialIcon ?? {}) as { name?: string };
  if (materialIcon?.name) {
    return MATERIAL_ICONS_TO_SF_SYMBOLS[
      materialIcon.name as keyof typeof MATERIAL_ICONS_TO_SF_SYMBOLS
    ];
  }
  return icon?.name ?? 'questionmark';
}
