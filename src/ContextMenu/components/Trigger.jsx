import React, { useContext, useEffect, useRef } from 'react';
import MenuContext from './core/context';

function Trigger({
    name,
    children,
    inset = false,
    toggle = false,
    onTrigger = null,
    placement = null,
    shiftDistance = 10,
    trigger = "contextmenu",
}) {
    return (
        <>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    return <Child key={index} child={child} data={{
                        name,
                        inset,
                        toggle,
                        trigger,
                        onTrigger,
                        placement,
                        shiftDistance
                    }} />;
                }
                return child;
            })}
        </>
    );
};

export default Trigger;

function Child({ child, data = {} }) {
    const ref = useRef();

    const { name, inset, toggle, trigger, onTrigger, placement, shiftDistance } = data;

    const { getStorage, updateStorage, openPopup, closePopup } = useContext(MenuContext);

    useEffect(() => {
        if (!ref.current) return;
        const onContextMenu = (e) => {
            if (trigger !== "contextmenu") return;
            triggerObject(e);
        };

        const onClick = (e) => {
            if (trigger !== "click") return;
            triggerObject(e);
        };

        const triggerObject = (e) => {
            const object = getStorage(name);

            if (onTrigger && onTrigger(e) === false) return;
            if (!object.popup?.children?.length) return;

            e.preventDefault();
            e.stopPropagation();

            if (toggle && object?.modal?.toggled) return closePopup(name);

            const { clientY: top, clientX: left } = e;

            updateStorage(name, {
                modal: {
                    toggle,
                    enabled: false,
                    options: {
                        inset,
                        placement,
                        shiftDistance,
                    },
                    position: {
                        top,
                        left,
                    },
                    trigger: ref.current,
                    visible: false,
                },
            });
            openPopup(name, object);
        };


        ref.current.addEventListener("click", onClick);
        ref.current.addEventListener("contextmenu", onContextMenu);
    }, [ref]);

    return (
        <>
            {React.cloneElement(child, {
                ref,
            })}
        </>
    );
}