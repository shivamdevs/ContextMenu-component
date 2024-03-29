import React, { useContext, useEffect } from 'react';
import MenuContext from './core/context';

function Menu({
    name,
    children,
    className = "",
    noStyle = false,
    theme = "default",
    animation = "slide-in",

    itemClass = "",
    onItemClick = null,
    onItemHover = null,
    itemHoverClass = "",
    itemKeepHovered = false,

    beforeHide = null,
    beforeShow = null,
    beforeDestroy = null,
    beforeConstruct = null,

    onShown = null,
    onHidden = null,
    onDestroy = null,
    onConstruct = null,

    onOpen = null,
    onClose = null,
    onSelect = null
}) {
    const { updateStorage } = useContext(MenuContext);
    useEffect(() => {
        updateStorage(name, {
            popup: {
                element: null,
                children,
                options: {
                    theme,
                    noStyle,
                    animation,
                    className,
                    itemClass,
                    onItemClick,
                    onItemHover,
                    itemHoverClass,
                    itemKeepHovered,
                },
                events: {
                    onOpen,
                    onShown,
                    onClose,
                    onHidden,
                    onSelect,
                    onDestroy,
                    beforeHide,
                    beforeShow,
                    onConstruct,
                    beforeDestroy,
                    beforeConstruct,
                },
            },
        });
    }, [name, theme, children, className, beforeHide, beforeShow, beforeDestroy, beforeConstruct, onShown, onHidden, onDestroy, onConstruct, onOpen, onClose, onSelect]);
    return null;
};

export default Menu;