import React from 'react';
import ContextMenuBlock from "./lib/Block";
import ContextMenuTrigger from "./lib/Trigger";
import ContextMenu from "./lib/Menu";
import ContextMenuItem from "./lib/Item";
import ContextMenuBreak from "./lib/Break";

function App() {
    return (
        <>
            <ContextMenuBlock>
                <ContextMenuTrigger toggle trigger="click" placement="top" name="google">
                    <div style={{
                        position: "fixed",
                        inset: "100px",
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid red",
                    }}>
                    </div>
                </ContextMenuTrigger>
                <ContextMenu name="google">
                    <ContextMenuItem checked icon={<i className="fas fa-1"></i>} onClick={() => alert("Menu Item 1")} content="Menu Item 1" />
                    <ContextMenuBreak />
                    <ContextMenuItem checked after="Ctrl + 2" icon={<i className="fas fa-2"></i>} onClick={() => alert("Menu Item 2")} content="Menu Item 2" />
                    <ContextMenuBreak />
                    <ContextMenuItem checked after="Ctrl + 3" icon={<i className="fas fa-3"></i>} onClick={() => alert("Menu Item 3")} content="Menu Item 3" />
                    <ContextMenuItem checked after="Ctrl + 4" icon={<i className="fas fa-4"></i>} onClick={() => alert("Menu Item 4")} content="Menu Item 4" />
                    <ContextMenuBreak />
                    <ContextMenuItem checked disabled after="Ctrl + 5" icon={<i className="fas fa-5"></i>} onClick={() => alert("Menu Item 5")} content="Menu Item 5" />
                </ContextMenu>
            </ContextMenuBlock>
        </>
    );
};

export default App;