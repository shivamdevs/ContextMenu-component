import * as React from 'react';

declare module 'oasismenu' {
  export interface OasisMenuProps {
    name: string;
    children?: React.ReactNode;
    className?: string;
    noStyle?: boolean;
    theme?: string;
    animation?: string;
    itemClass?: string;
    onItemClick?: ((data: any, object: any) => void) | null;
    onItemHover?: ((event: React.MouseEvent, data: any, object: any) => void) | null;
    itemHoverClass?: string;
    itemKeepHovered?: boolean;
    beforeHide?: ((object: any) => void) | null;
    beforeShow?: ((object: any) => void) | null;
    beforeDestroy?: ((object: any) => void) | null;
    beforeConstruct?: ((object: any) => void) | null;
    onShown?: ((object: any) => void) | null;
    onHidden?: ((object: any) => void) | null;
    onDestroy?: ((object: any) => void) | null;
    onConstruct?: ((object: any) => void) | null;
    onOpen?: ((object: any) => void) | null;
    onClose?: ((object: any) => void) | null;
    onSelect?: ((data: any, object: any) => void) | null;
  }

  export interface OasisMenuItemProps {
    content?: React.ReactNode;
    children?: React.ReactNode;
    data?: any;
    icon?: React.ReactNode;
    after?: React.ReactNode;
    checked?: boolean;
    disabled?: boolean;
    preventClose?: boolean;
    statusIcon?: React.ReactNode;
    className?: string;
    hoverClassName?: string;
    onHover?: ((event: React.MouseEvent, data: any, object: any) => void) | null;
    onClick?: ((data: any, object: any) => void) | null;
  }

  export interface OasisMenuBreakProps {
    className?: string;
  }

  export interface OasisMenuBlockProps {
    children?: React.ReactNode;
  }

  export interface OasisMenuTriggerProps {
    children?: React.ReactNode;
    name: string;
    trigger?: 'contextmenu' | 'click';
    onTrigger?: (event: React.MouseEvent) => void;
    placement?: 'top-left' | 'top' | 'top-right' | 'right-top' | 'right' | 'right-bottom' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left-bottom' | 'left' | 'left-top' | 'center';
    inset?: boolean;
    shiftDistance?: number;
  }

  export const OasisMenu: React.FC<OasisMenuProps>;
  export const OasisMenuItem: React.FC<OasisMenuItemProps>;
  export const OasisMenuBreak: React.FC<OasisMenuBreakProps>;
  export const OasisMenuBlock: React.FC<OasisMenuBlockProps>;
  export const OasisMenuTrigger: React.FC<OasisMenuTriggerProps>;
}