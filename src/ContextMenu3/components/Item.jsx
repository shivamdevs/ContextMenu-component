import React, { useContext, useEffect, useRef, useState } from 'react';
import Popup from './Popup';
import Ctxt from '../core/ctxt';
import { generateRandomBlobString } from '../core/basics';
import { getChildTriggerObject } from '../core/trigger';

function Item({ data = null, object = null, icon = null, disabled = false, checked = false, content = null, after = null, onClick = null, children = null, }) {

    const [child, setChild] = useState(null);
    const refer = useRef();

    const { getContext, context: contextObject } = useContext(Ctxt);
    const name = useRef(object.key + generateRandomBlobString(32));

    useEffect(() => {
        if (children && refer.current) {
            const data = getContext(name.current);
            data.addTrigger(getChildTriggerObject(refer, data, contextObject));
            data.update({
                children,
                isChild: refer.current
            })
            setChild(data);
        }
    }, [name, children, refer]);
    return (
        <>
            <button type="button"  disabled={disabled} className="__mos_ctxt_item">
                <div className={`__mos_ctxt_item_icon __mos_ctxt_item_icon_ ${icon ? "__mos_ctxt_item_icon_has_" : ""}`}>{icon}</div>
                <div className="__mos_ctxt_item_content">{content}</div>
                <div className={`__mos_ctxt_item_after ${after ? "__mos_ctxt_item_after_" : ""}`}>{after}</div>
                <div className={`__mos_ctxt_item_icon __mos_ctxt_item_icon__ ${(child || checked) ? "__mos_ctxt_item_icon_has__" : ""}`}>{child ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" width="1em" height="1em" fill="currentColor"><path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg> : (checked && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>)}</div>
                <div className="__mos_ctxt_item_screen" ref={refer} onClick={e => {
                    e.stopPropagation();
                    if (!disabled) {
                        e.preventDefault();
                        object.close();
                        setTimeout(() => {
                            onClick && onClick(data);
                        }, 0);
                    }
                }} ></div>
            </button>
        </>
    );
};

export default Item;