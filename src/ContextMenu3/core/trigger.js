export function getTriggerObject(trigger, onTrigger, refer, object) {
    const onClick = (e) => {
        if (trigger !== "click") return;
        eEvent(e);
    };
    const onContextmenu = (e) => {
        if (trigger !== "contextmenu") return;
        eEvent(e);
    };
    const eEvent = (e) => {
        if (onTrigger && onTrigger() === false) return;
        e.preventDefault();
        object.update({
            position: {
                top: e.clientY,
                left: e.clientX,
            }
        });
        object.open();
    };

    refer.current.addEventListener("click", onClick);
    refer.current.addEventListener("contextmenu", onContextmenu);

    object.open();

    return refer.current;
}

export function getChildTriggerObject(refer, object) {

    refer.current.addEventListener("mouseover", (e) => {
        if (e.target === refer.current && !object.visible) {
            const { left, top } = refer.current.getBoundingClientRect();
            clearTimeout(object.childTimer);
            object.update({
                position: {
                    top: top,
                    left: left,
                }
            });
            object.open();
        }
    });
    refer.current.addEventListener("mouseout", (e) => {
        setTimeout(() => {
            if (e.target === refer.current && object.visible && !object.isPopupHover)
                object.close();
        }, 30);
    });

    return refer.current;
}