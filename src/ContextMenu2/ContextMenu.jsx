import React, { useEffect, useRef } from 'react';
import css from './index.module.css';

const contextMenuObject = {};

const shiftDistance = 15;

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
        if (rect.width + pos.left > window.innerWidth + shiftDistance) pos.left = window.innerWidth - rect.width - shiftDistance;
        if (rect.height + pos.top > window.innerHeight + shiftDistance) pos.top = window.innerHeight - rect.height - shiftDistance;
    })();
    const style = block.menu.style;
    style.top = pos.top + "px";
    style.left = pos.left + "px";
    block.menu.classList.remove(css.hidden);
}
function toggleMenu(menu) {
    const block = getMenu(menu);
    if (!block.menu) return;
    if (block.menu.classList.contains(css.hidden)) {
        openMenu(menu);
    } else {
        closeMenu(menu);
    }
}
function closeMenu(menu) {
    if (!menu) return closeAllMenu();
    if (!contextMenuObject[menu] || !contextMenuObject[menu].menu) return;
    contextMenuObject[menu].menu.classList.add(css.hidden);
    contextMenuObject[menu].menu.style.top = 0;
    contextMenuObject[menu].menu.style.left = 0;
}
function closeAllMenu(menu, trigger = false) {
    Object.keys(contextMenuObject).forEach(menus => {
        if (menu && menus === menu) return;
        closeMenu(menus);
    });
}

const excludedElements = [];
function addExclude(elem) {
    if (!excludedElements.includes(elem)) excludedElements.push(elem);
}

function loopExclude(elem) {
    while (elem !== document.querySelector("body")) {
        if (excludedElements.includes(elem)) return true;
        elem = elem.parentElement;
    }
    return false;
}

window.addEventListener("mousedown", (e) => {
    if (loopExclude(e.target)) return;
    closeAllMenu(null, true);
}, true);

export function ContextMenu({ menu = null, className = "", animation = "fade", ...props}) {
    const refer = useRef();
    const child = useRef();
    useEffect(() => {
        addMenu(menu, "menu", refer.current);
        addExclude(refer.current);
        addExclude(child.current);
    }, [menu]);
    return (
        <div className={`${css.block} ${css.hidden}`} ref={refer} onContextMenu={(e) => e.preventDefault()} style={{top: 0, left: 0}}>
            <div className={`${css.menu} myoasis-contextmenu ${className} ${css[`an${animation}`]}`} {...props} ref={child}></div>
        </div>
    );
};

export function ContextMenuTrigger({menu, onClick = null, onContextMenu = null, exact = true, trigger = "contextmenu", children = null}) {
    const refer = useRef();
    useEffect(() => {
        addExclude(refer.current);
    }, []);
    useEffect(() => {
        addMenu(menu, "trigger", trigger);
        addMenu(menu, "exact", exact);
    }, [menu, trigger, exact]);

    const perform = (e, toggle = false) => {
        e.preventDefault();
        const rect = refer.current.getBoundingClientRect();
        addMenu(menu, "position", (exact ? { top: e.clientY, left: e.clientX } : { top: rect.top + rect.height + shiftDistance, left: e.clientX }));
        if (toggle) {toggleMenu(menu);} else {openMenu(menu);}
    };

    const clicked = (e) => {
        closeAllMenu(menu);
        if (trigger !== "click") return;
        if (onClick && onClick(e) === false) return;
        perform(e, true);
    };
    const context = (e) => {
        closeAllMenu();
        if (onContextMenu && onContextMenu(e) === false) return;
        perform(e, trigger !== "contextmenu");
    };
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                onClick: clicked,
                onContextMenu: context,
                ref: (refer.current? null : refer),
            });
        }
        return child;
    });
    return (
        <>{childrenWithProps}</>
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