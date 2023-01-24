import React, { useEffect, useRef } from 'react';
import css from './index.module.css';

const contextMenuObject = {};

function addMenu(menu, key, data) {
    if (!menu) return;
    if (!contextMenuObject[menu]) contextMenuObject[menu] = {};
    contextMenuObject[menu][key] = data;
}
function getMenu(menu, key) {
    if (!menu || !contextMenuObject[menu]) return {};
    return key !== undefined ? contextMenuObject[menu][key] : contextMenuObject[menu];
}
function openMenu(menu) {
    if (!menu) return;
    const block = getMenu(menu);
    if (!block.menu) return;
    const pos = block.position;
    (() => {
        const rect = block.menu.getBoundingClientRect();
        if (rect.width + pos.left > window.innerWidth + 10) pos.left = window.innerWidth - rect.width - 10;
        if (rect.height + pos.top > window.innerHeight + 10) pos.top = window.innerHeight - rect.height - 10;
    })();
    const style = block.menu.style;
    style.top = pos.top + "px";
    style.left = pos.left + "px";
    block.menu.classList.remove(css.hidden);
}
function closeMenu(menu) {
    if (!menu) return closeAllMenu();
    if (!contextMenuObject[menu] || !contextMenuObject[menu].menu) return;
    contextMenuObject[menu].menu.classList.add(css.hidden);
    contextMenuObject[menu].menu.style.top = 0;
    contextMenuObject[menu].menu.style.left = 0;
}
function closeAllMenu(menu) {
    Object.keys(contextMenuObject).forEach(menus => {
        if (menu && menus === menu) return;
        closeMenu(menus);
    });
}

const excludedElements = [];
function addExclude(elem) {
    if (!excludedElements.includes(elem)) excludedElements.push(elem);
}

window.addEventListener("mousedown", (e) => {
    if (excludedElements.includes(e.target)) return;
    closeAllMenu();
});

export function ContextMenu({menu = null, className = "",  ...props}) {
    const refer = useRef();
    const child = useRef();
    useEffect(() => {
        addMenu(menu, "menu", refer.current);
        addExclude(refer.current);
        addExclude(child.current);
    }, [menu]);
    return (
        <div className={`${css.block} ${css.hidden}`} ref={refer} onContextMenu={(e) => e.preventDefault()} style={{top: 0, left: 0}}>
            <div className={`${css.menu} myoasis-contextmenu ${className}`} {...props} ref={child}></div>
        </div>
    );
};

export function ContextMenuTrigger({menu, onClick = null, onContextMenu = null, exact = true, trigger = "contextmenu", ...props}) {
    const refer = useRef();
    useEffect(() => {
        addExclude(refer.current);
    }, []);

    const perform = (e) => {
        e.preventDefault();
        closeAllMenu(menu);
        const rect = refer.current.getBoundingClientRect();
        addMenu(menu, "position", (exact ? { top: e.clientY, left: e.clientX } : { top: rect.top + rect.height + 10, left: e.clientX }));
        openMenu(menu);
    };

    const clicked = (e) => {
        if (trigger !== "click") return;
        if (onClick && onClick(e) === false) return;
        perform(e);
    };
    const context = (e) => {
        if (trigger !== "contextmenu") return;
        if (onContextMenu && onContextMenu(e) === false) return;
        perform(e);
    };
    return (
        <div ref={refer} onClick={clicked} onContextMenu={context} {...props}></div>
    );
}

export function ContextMenuItem({className = "", onClick = null, data = null, children, ...props}) {
    const refer = useRef();
    const clicked = (e) => {
        e.stopPropagation();
        e.preventDefault();
        closeAllMenu();
        onClick && onClick(data, e);
    };
    useEffect(() => {
        addExclude(refer.current);
    }, []);
    return (
        <div className={`${css.item} myoasis-contextmenuitem ${className}`} {...props}>
            {children}
            <div className={css.screen} ref={refer} onClick={clicked} onContextMenu={clicked}></div>
        </div>
    );
}