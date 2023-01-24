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
    block.menu.classList.remove(_indexModule.default.hidden);
}
function closeMenu(menu) {
    if (!menu) return closeAllMenu();
    if (!contextMenuObject[menu] || !contextMenuObject[menu].menu) return;
    contextMenuObject[menu].menu.classList.add(_indexModule.default.hidden);
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
window.addEventListener("mousedown", e => {
    if (excludedElements.includes(e.target)) return;
    closeAllMenu();
});
function ContextMenu({
    menu = null,
    className = "",
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
        className: `${_indexModule.default.menu} myoasis-contextmenu ${className}`
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
    ...props
}) {
    const refer = (0, _react.useRef)();
    (0, _react.useEffect)(() => {
        addExclude(refer.current);
    }, []);
    const perform = e => {
        e.preventDefault();
        closeAllMenu(menu);
        const rect = refer.current.getBoundingClientRect();
        addMenu(menu, "position", exact ? {
            top: e.clientY,
            left: e.clientX
        } : {
            top: rect.top + rect.height + 10,
            left: e.clientX
        });
        openMenu(menu);
    };
    const clicked = e => {
        if (trigger !== "click") return;
        if (onClick && onClick(e) === false) return;
        perform(e);
    };
    const context = e => {
        if (trigger !== "contextmenu") return;
        if (onContextMenu && onContextMenu(e) === false) return;
        perform(e);
    };
    return /*#__PURE__*/_react.default.createElement("div", _extends({
        ref: refer,
        onClick: clicked,
        onContextMenu: context
    }, props));
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