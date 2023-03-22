import React from 'react';

function Break({ data = null, icon = null, disabled = false, checked = false, content = null, onClick = null, children = null, }) {
    return (
        <div className="__mos_ctxt_break" onClick={e => e.stopPropagation()}></div>
    );
};

export default Break;