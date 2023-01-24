declare module 'myoasis-contextmenu';
export const __esModule: boolean;
export function ContextMenu({ menu, className, ...props }: {
    [x: string]: any;
    menu?: any;
    className?: string;
}): any;
export function ContextMenuItem({ className, onClick, data, children, ...props }: {
    [x: string]: any;
    className?: string;
    onClick?: any;
    data?: any;
    children: any;
}): any;
export function ContextMenuTrigger({ menu, onClick, onContextMenu, exact, trigger, ...props }: {
    [x: string]: any;
    menu: any;
    onClick?: any;
    onContextMenu?: any;
    exact?: boolean;
    trigger?: string;
}): any;
