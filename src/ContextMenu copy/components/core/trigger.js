export function getTriggerObject(getContext, name, trigger, onTrigger, refer, placement, inset, shiftDistance) {
    const button = refer.current;
    const onClick = (e) => {
        const object = getContext(name);
        if (trigger !== "click") return;
        eEvent(e, object);
    };
    const onContextmenu = (e) => {
        const object = getContext(name);
        if (trigger !== "contextmenu") return;
        eEvent(e, object);
    };
    const eEvent = (e, object) => {
        console.log(object);
        if (onTrigger && onTrigger() === false) return;
        if (!object.children?.length) return;
        e.preventDefault();
        e.stopPropagation();
        object.update({
            trigger: button,
            placement,
            inset,
            shiftDistance,
            position: {
                top: e.clientY,
                left: e.clientX,
            }
        });;
        object.open();
    };

    button.addEventListener("click", onClick);
    button.addEventListener("contextmenu", onContextmenu);

    return button;
}