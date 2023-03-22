import React, { useEffect, useRef } from 'react';

function Popup({ data }) {
    const popup = useRef();
    useEffect(() => {
        if (popup.current) data.update({
            popup: popup.current,
        });
    }, [popup]);

    return (
        <>
            {data.enabled && <div ref={popup} onClick={() => data.close()} onContextMenu={e => e.preventDefault()} onScroll={e => e.stopPropagation()} onMouseDown={e => e.stopPropagation()} className="__mos_ctxt_menu" style={{
                zIndex: `${data.visible ? "" : "-"}2147483647`,
                translate: `${data.position.left}px ${data.position.top}px`
            }}>
                <div className={`__mos_ctxt_menu_block contextmenu ${data.className}`} data-theme={data.theme} style={{
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
            </div>}
        </>
    );
};

export default Popup;