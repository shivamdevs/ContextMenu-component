import React, { useContext, useEffect, useRef, useState } from 'react';
import Ctxt from '../core/ctxt';
import { getTriggerObject } from '../core/trigger';

function Trigger({ children, name, trigger = "contextmenu", onTrigger = null }) {
    const refer = useRef();
    const { getContext } = useContext(Ctxt);

    const [object, setObject] = useState(null);

    useEffect(() => {
        if (refer.current) {
            const data = getContext(name);
            data.addTrigger(getTriggerObject(trigger, onTrigger, refer, data));
            setObject(data);
        }
    }, [name, refer]);

    return (
        <>{React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                    ref: (refer.current ? null : refer),
                });
            }
            return child;
        })}</>
    );
};

export default Trigger;