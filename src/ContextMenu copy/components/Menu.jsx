import React, { useContext, useEffect } from 'react';
import Ctxt from './core/context';

function Menu({ name, children, theme = "default", className = "", beforeConstruct = null, onConstruct = null, beforeShow = null, onShown = null, beforeHide = null, onHidden = null, beforeDestroy = null, onDestroy = null, onOpen = null, onClose = null, onSelect = null }) {
    const { resetContext } = useContext(Ctxt);

    useEffect(() => {
        resetContext(name, {
            children,
            theme,
            className,
            events: old => {
                const list = { ...old };
                list.beforeConstruct = beforeConstruct;
                list.onConstruct = onConstruct;
                list.beforeShow = beforeShow;
                list.onShown = onShown;
                list.beforeHide = beforeHide;
                list.onHidden = onHidden;
                list.beforeDestroy = beforeDestroy;
                list.onDestroy = onDestroy;
                list.onOpen = onOpen;
                list.onClose = onClose;
                list.onSelect = onSelect;
                return list;
            },
        });
    }, [children]);

    return (<></>);
};

export default Menu;