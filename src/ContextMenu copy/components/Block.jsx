import React, { useEffect, useState } from 'react';

import Ctxt from './core/context';
import Popup from './Popup';
import "./../styles/default.css";
import { getPlacementPosition, getPopupPosition } from './core/popup';


function Block({ children }) {
    const [context, setContext] = useState({});

    function resetContext(name, object) {
        const data = {
            key: name,
            popup: null,
            children: [],
            inset: false,
            className: "",
            trigger: null,
            enabled: false,
            visible: false,
            placement: null,
            theme: "default",
            shiftDistance: 10,
            position: {
                top: 0,
                left: 0,
            },

            events: {
                onOpen: null,
                onClose: null,
                onShown: null,
                onHidden: null,
                onSelect: null,
                onDestroy: null,
                beforeHide: null,
                beforeShow: null,
                onConstruct: null,
                beforeDestroy: null,
                beforeConstruct: null,
            },

            update(item) {
                updateMenuObject(name, item);
            },
            open() {
                openPopup(this);
            },
            close() {
                closePopup(this);
            },
        };

        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                data[key] = (() => {
                    const value = object[key];
                    if (typeof value === "function") return value(data[key]);
                    return value;
                })();
            }
        }
        setContext((old) => {
            const data = { ...old };
            if (!data[name]) data[name] = data;
            return data;
        });
        return data;
    };

    function getContext(name) {
        return context[name];
    }

    function updateMenuObject(menu, object) {
        setContext(old => {
            const data = { ...old };
            const current = data[menu];
            for (const key in object) {
                if (Object.hasOwnProperty.call(object, key)) {
                    current[key] = (() => {
                        const value = object[key];
                        if (typeof value === "function") return value(current[key]);
                        return value;
                    })();
                }
            }
            return data;
        });
    };

    function openPopup(object) {
        const { beforeConstruct = null, onConstruct = null, beforeShow = null, onShown = null, onOpen = null } = object.events || {};
        if (beforeConstruct && beforeConstruct(object) === false) return;
        object.update({
            enabled: true
        });
        onConstruct && onConstruct(object);
        if (beforeShow && beforeShow(object) === false) return object.update({
            enabled: false
        });
        setTimeout(() => {
            const { popup, position, placement, inset, shiftDistance, trigger } = object;
            const places = ['top-left', 'top', 'top-right', 'right-top', 'right', 'right-bottom', 'bottom-right', 'bottom', 'bottom-left', 'left-bottom', 'left', 'left-top'];
            const { left, top } = placement && (places.includes(placement) || inset && placement === "center") ? getPlacementPosition(trigger, popup, placement, inset, shiftDistance) : getPopupPosition(popup, position);
            object.update({
                position: {
                    top,
                    left,
                }
            });
        }, 5);
        setTimeout(() => {
            object.update({
                visible: true
            });
            onShown && onShown(object);
            onOpen && onOpen(object);
        }, 10);
    }

    function closePopup(object) {
        const { beforeHide = null, onHidden = null, beforeDestroy = null, onDestroy = null, onClose = null } = object.events || {};
        if (beforeHide && beforeHide(object) === false) return;
        object.update({
            visible: false
        });
        onHidden && onHidden(object);
        if (beforeDestroy && beforeDestroy(object) === false) return object.update({
            visible: true
        });
        object.update({
            enabled: false
        });
        onDestroy && onDestroy(object);
        onClose && onClose(object);
    }

    useEffect(() => {
        const handle = (e) => {
            Object.keys(context).forEach(key => {
                const object = context[key];
                (object.enabled || object.visible) && object.update({
                    enabled: false,
                    visible: false,
                });
            });
        };
        window.addEventListener("mousedown", handle);
        window.addEventListener("scroll", handle);
        window.addEventListener("resize", handle);
        return () => {
            window.removeEventListener("mousedown", handle);
            window.removeEventListener("scroll", handle);
            window.removeEventListener("resize", handle);
        };
    }, [context]);

    const value = {
        context,
        getContext,
        resetContext,
        updateMenuObject,

        openPopup,
        closePopup,
    };

    return (
        <Ctxt.Provider value={value}>
            {children}
            <MappedBlock />
        </Ctxt.Provider>
    );
};

export default Block;

function MappedBlock() {
    return (
        <Ctxt.Consumer>{({ context }) => Object.keys(context).map(key => context[key] .enabled && <Popup key={key} data={context[key]} />)}</Ctxt.Consumer>
    );
}