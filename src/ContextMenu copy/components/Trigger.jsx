import React, { useContext, useEffect, useRef, useState } from 'react';
import Ctxt from './core/context';
import { getTriggerObject } from './core/trigger';

function Trigger({ children, name, trigger = "contextmenu", onTrigger = null, placement = null, inset = false, shiftDistance = 10 }) {

    return (
        <>{React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
                return <MappedChild key={index} child={child} options={{
                    trigger,
                    onTrigger,
                    name,
                    placement,
                    inset,
                    shiftDistance
                }} />;
            }
            return child;
        })}</>
    );
};

export default Trigger;

function MappedChild({ child, options }) {
    const refer = useRef();
    const { getContext } = useContext(Ctxt);

    const { trigger, onTrigger, name, placement, inset, shiftDistance } = options;

    useEffect(() => {
        if (refer.current) {
            getTriggerObject(getContext, name, trigger, onTrigger, refer, placement, inset, shiftDistance);
        }
    }, [name, refer, trigger, onTrigger, placement, inset, shiftDistance]);
    return (
        <>{React.cloneElement(child, {
            ref: refer,
        })}</>
    );
}