import React from 'react';

function Item({ data = null, object = null, className = "", icon = null, disabled = false, checked = false, content = null, after = null, onClick = null, children = null }) {

    return (
        <>
            <button type="button" disabled={disabled} className={`__mos_ctxt_item ${className}`}>
                <div className={`__mos_ctxt_item_icon __mos_ctxt_item_icon_ ${icon ? "__mos_ctxt_item_icon_has_" : ""}`}>{icon}</div>
                <div className="__mos_ctxt_item_content">{content || children}</div>
                <div className={`__mos_ctxt_item_after ${after ? "__mos_ctxt_item_after_" : ""}`}>{after}</div>
                <div className={`__mos_ctxt_item_icon __mos_ctxt_item_icon__ ${checked ? "__mos_ctxt_item_icon_has__" : ""}`}>{checked && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>}</div>
                <div className="__mos_ctxt_item_screen" onClick={e => {
                    e.stopPropagation();
                    if (!disabled) {
                        e.preventDefault();
                        object.close();
                        setTimeout(() => {
                            onClick && onClick(data);
                            object.events.onSelect && object.events.onSelect(object, data);
                        }, 0);
                    }
                }} ></div>
            </button>
        </>
    );
};

export default Item;