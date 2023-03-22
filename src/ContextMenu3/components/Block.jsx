import React, { useEffect, useState } from 'react';

import Ctxt from '../core/ctxt';
import Popup from './Popup';
import "./../styles/default.css";
import { getChildPopupPosition, getPopupPosition } from '../core/basics';


function Block({ children }) {
    const [context, setContext] = useState({});

    function getContext(name) {
        return context[name] || (() => {
            const object = {
                key: name,
                triggers: [],
                children: [],
                enabled: false,
                visible: false,
                position: {
                    top: 0,
                    left: 0,
                },
                popup: null,

                update(data) {
                    updateMenuObject(name, data);
                },
                addTrigger(...data) {
                    updateMenuObject(name, {
                        triggers: old => [...old, ...data],
                    });
                },
                open() {
                    openPopup(this);
                },
                close() {
                    closePopup(this);
                },
            };
            setContext((old) => {
                const data = { ...old };
                if (!data[name]) data[name] = object;
                return data;
            });
            return object;
        })(name);
    };

    function updateMenuObject(menu, object) {
        setContext(old => {
            const data = { ...old };
            const current = data[menu];
            for (const key in object)
                if (Object.hasOwnProperty.call(object, key))
                    current[key] = (() => {
                        const value = object[key];
                        if (typeof value === "function") return value(current[key]);
                        return value;
                    })();
            return data;
        });
    };

    function openPopup(object) {
        const { beforeConstruct = null, onConstruct = null, beforeShow = null, onShown = null } = object.events || {};
        if (beforeConstruct && beforeConstruct(object) === false) return;
        object.update({
            enabled: true
        });
        onConstruct && onConstruct(object);
        if (beforeShow && beforeShow(object) === false) return object.update({
            enabled: false
        });
        setTimeout(() => {
            const { popup, position, isChild } = object;
            const { left, top } = isChild ? getChildPopupPosition(popup, isChild) : getPopupPosition(popup, position.top, position.left);
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
            console.log(object);
            onShown && onShown(object);
        }, 10);
    }

    function closePopup(object) {
        const { beforeHide = null, onHidden = null, beforeDestroy = null, onDestroy = null } = object.events || {};
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
    }

    useEffect(() => {
        // Object.keys(context).forEach(key => console.log(context[key]));
    }, [context]);

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
        // window.addEventListener("scroll", handle);
        // window.addEventListener("keydown", handle);
        return () => {
            window.removeEventListener("mousedown", handle);
            // window.removeEventListener("scroll", handle);
            // window.removeEventListener("keydown", handle);
        };
    }, [context]);

    const value = {
        context,
        getContext,
        updateMenuObject,

        openPopup,
        closePopup,
    };

    return (
        <Ctxt.Provider value={value}>
            <style>
                .__mos_ctxt_menu, .__mos_ctxt_menu * {`{box-sizing: border-box;}`}
            </style>
            {children}
            <MappedBlock />
        </Ctxt.Provider>
    );
};

export default Block;

function MappedBlock() {
    return (
        <Ctxt.Consumer>{({ context }) => Object.keys(context).map(key => <Popup key={key} data={context[key]} />)}</Ctxt.Consumer>
    );
}