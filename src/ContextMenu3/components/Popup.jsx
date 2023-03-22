import React, { useContext, useEffect, useRef } from 'react';

function Popup({ data }) {
    if (!data.enabled) return (<></>);
    const popup = useRef();
    useEffect(() => {
        if (popup.current) data.update({
            popup: popup.current,
        });
    }, [popup]);
    return (
        <div ref={popup} onClick={() => data.close()} onMouseOver={(e) => {
            if (e.target === popup.current && data.isChild && !data.isPopupHover) {
                data.update({
                    isPopupHover: true,
                });
            }
        }} onMouseOut={(e) => {
            if (e.target === popup.current && data.isChild) {
                data.update({
                    isPopupHover: false,
                });
                if (!data.isTriggerHover) {
                    data.close();
                }
            }
        }} onContextMenu={e => e.preventDefault()} onMouseDown={e => e.stopPropagation()} className="__mos_ctxt_menu" style={{
            zIndex: `${data.visible ? "" : "-"}2147483647`,
            translate: `${data.position.left}px ${data.position.top}px`
        }}>
            <div className="__mos_ctxt_menu_block" style={{
                opacity: (data.visible ? "1" : "0"),
                visibility: (data.visible ? "visible" : "hidden"),
                transform: `translateY(${data.visible ? "" : "-1"}0px)`,
            }} onClick={e => e.stopPropagation()}>
                {React.Children.map(data.children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            object: data,
                        });
                    }
                    return child;
                })}
            </div>
        </div>
    );
};

export default Popup;