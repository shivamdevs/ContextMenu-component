import React from 'react';

function Break({className = "" }) {
    return (
        <div className={`__mos_ctxt_break ${className}`} onClick={e => e.stopPropagation()}></div>
    );
};

export default Break;