declare module 'oasismenu' {
  import React from 'react';

    export interface ContextMenuTriggerProps {
    children?: React.ReactNode;
    name: string;
    trigger?: 'contextmenu' | 'click';
    onTrigger?: (event: React.MouseEvent) => void;
    placement?: 'top-left' | 'top' | 'top-right' | 'right-top' | 'right' | 'right-bottom' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left-bottom' | 'left' | 'left-top' | 'center';
    inset?: boolean;
    shiftDistance?: number;
  }

  export interface ContextMenuProps {
    name: string;
    children?: React.ReactNode;
    className?: string;
    theme?: 'default' | 'dark' | string;
    beforeConstruct?: () => void;
    onConstruct?: () => void;
    beforeShow?: () => void;
    onShown?: () => void;
    beforeHide?: () => void;
    onHidden?: () => void;
    beforeDestroy?: () => void;
    onDestroy?: () => void;
    onOpen?: () => void;
    onClose?: () => void;
    onSelect?: () => void;
  }

  export interface ContextMenuItemProps {
    data?: any;
    icon?: React.ReactNode;
    disabled?: boolean;
    checked?: boolean;
    content?: React.ReactNode;
    after?: React.ReactNode;
    onClick?: (event: React.MouseEvent) => void;
    children?: React.ReactNode;
    className?: string;
  }

  export interface ContextMenuBlockProps {
    children?: React.ReactNode;
  }

  export interface ContextMenuBreakProps {
    className?: string;
  }

  export const ContextMenu: React.FC<ContextMenuProps>;
  export const ContextMenuTrigger: React.FC<ContextMenuTriggerProps>;
  export const ContextMenuItem: React.FC<ContextMenuItemProps>;
  export const ContextMenuBlock: React.FC<ContextMenuBlockProps>;
  export const ContextMenuBreak: React.FC<ContextMenuBreakProps>;
}