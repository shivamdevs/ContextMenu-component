import React, { useContext, useEffect, useRef, useState } from 'react';
import MenuContext from './core/context';

function Popup({ data, name }) {

    const popup = useRef();

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const { updateStorage, closePopup } = useContext(MenuContext);

    const { position = {}, visible = false } = data.modal || {};
    const { children, options } = data.popup || {};

    useEffect(() => {
        if (popup.current) {
            updateStorage(name, {
                element: popup.current
            }, "popup");
        }
    }, [popup]);

    return (
        <div
            ref={popup}
            style={{
                zIndex: `${visible ? "" : "-"}2147483647`,
                translate: `${position?.left || 0}px ${position?.top || 0}px`,
                position: "fixed",
                top: "0px",
                left: "0px",
                willChange: "transform",
                padding: "1px",
                boxSizing: "border-box",
            }}
            onMouseDown={e => e.stopPropagation()}
            onContextMenu={e => e.preventDefault()}
            onClick={() => closePopup(name)}
        >
            <div
                className={`oasismenu ${options.className} ${visible ? "oasisopen" : ""}`}
                data-visible={visible}
                data-theme={options.theme}
                data-nostyle={options.noStyle}
                data-animation={options.animation}
                onClick={e => e.stopPropagation()}
            >
                {React.Children.map(children, (child, index) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            object: data,
                            classIndex: index,
                            onClassHover: (index) => setHoveredIndex(index),
                            isClassHovered: index === hoveredIndex,
                        });
                    }
                    return child;
                })}
            </div>
        </div>
    );
};

export default Popup;