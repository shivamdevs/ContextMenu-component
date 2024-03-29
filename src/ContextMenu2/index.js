"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContextMenu = ContextMenu;
exports.ContextMenuItem = ContextMenuItem;
exports.ContextMenuTrigger = ContextMenuTrigger;
var _react = _interopRequireWildcard(require("react"));
var _indexModule = _interopRequireDefault(require("./index.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
    block.menu.classList.remove(_indexModule.default.hidden);
}
function toggleMenu(menu) {
    const block = getMenu(menu);
    if (!block.menu) return;
    if (block.menu.classList.contains(_indexModule.default.hidden)) {
        openMenu(menu);
    } else {
        closeMenu(menu);
    }
}
function closeMenu(menu) {
    if (!menu) return closeAllMenu();
    if (!contextMenuObject[menu] || !contextMenuObject[menu].menu) return;
    contextMenuObject[menu].menu.classList.add(_indexModule.default.hidden);
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
window.addEventListener("mousedown", e => {
    if (loopExclude(e.target)) return;
    closeAllMenu(null, true);
}, true);
function ContextMenu({
    menu = null,
    className = "",
    animation = "fade",
    ...props
}) {
    const refer = (0, _react.useRef)();
    const child = (0, _react.useRef)();
    (0, _react.useEffect)(() => {
        addMenu(menu, "menu", refer.current);
        addExclude(refer.current);
        addExclude(child.current);
    }, [menu]);
    return /*#__PURE__*/_react.default.createElement("div", {
        className: `${_indexModule.default.block} ${_indexModule.default.hidden}`,
        ref: refer,
        onContextMenu: e => e.preventDefault(),
        style: {
            top: 0,
            left: 0
        }
    }, /*#__PURE__*/_react.default.createElement("div", _extends({
        className: `${_indexModule.default.menu} myoasis-contextmenu ${className} ${_indexModule.default[`an${animation}`]}`
    }, props, {
        ref: child
    })));
}
;
function ContextMenuTrigger({
    menu,
    onClick = null,
    onContextMenu = null,
    exact = true,
    trigger = "contextmenu",
    children = null
}) {
    const refer = (0, _react.useRef)();
    (0, _react.useEffect)(() => {
        addExclude(refer.current);
    }, []);
    (0, _react.useEffect)(() => {
        addMenu(menu, "trigger", trigger);
        addMenu(menu, "exact", exact);
    }, [menu, trigger, exact]);
    const perform = (e, toggle = false) => {
        e.preventDefault();
        const rect = refer.current.getBoundingClientRect();
        addMenu(menu, "position", exact ? {
            top: e.clientY,
            left: e.clientX
        } : {
            top: rect.top + rect.height + shiftDistance,
            left: e.clientX
        });
        if (toggle) {
            toggleMenu(menu);
        } else {
            openMenu(menu);
        }
    };
    const clicked = e => {
        closeAllMenu(menu);
        if (trigger !== "click") return;
        if (onClick && onClick(e) === false) return;
        perform(e, true);
    };
    const context = e => {
        closeAllMenu();
        if (onContextMenu && onContextMenu(e) === false) return;
        perform(e, trigger !== "contextmenu");
    };
    const childrenWithProps = _react.default.Children.map(children, child => {
        if ( /*#__PURE__*/_react.default.isValidElement(child)) {
            return /*#__PURE__*/_react.default.cloneElement(child, {
                onClick: clicked,
                onContextMenu: context,
                ref: refer.current ? null : refer
            });
        }
        return child;
    });
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, childrenWithProps);
}
function ContextMenuItem({
    className = "",
    onClick = null,
    data = null,
    children,
    ...props
}) {
    const refer = (0, _react.useRef)();
    const clicked = e => {
        e.stopPropagation();
        e.preventDefault();
        closeAllMenu();
        onClick && onClick(data, e);
    };
    (0, _react.useEffect)(() => {
        addExclude(refer.current);
    }, []);
    return /*#__PURE__*/_react.default.createElement("div", _extends({
        className: `${_indexModule.default.item} myoasis-contextmenuitem ${className}`
    }, props), children, /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.screen,
        ref: refer,
        onClick: clicked,
        onContextMenu: clicked
    }));
}