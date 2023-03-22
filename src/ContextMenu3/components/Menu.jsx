import React, { useContext, useEffect } from 'react';
import Ctxt from '../core/ctxt';

function Menu({ name, children, beforeConstruct = null, onConstruct = null }) {
    const { getContext } = useContext(Ctxt);
    
    useEffect(() => {
        const obj = getContext(name);
        obj.update({
            children,
            events: old => {
                const list = {...old};
                list.beforeConstruct = beforeConstruct;
                list.onConstruct = onConstruct;
                return list;
            },
        });
    }, [children]);

    return (<></>);
};

export default Menu;