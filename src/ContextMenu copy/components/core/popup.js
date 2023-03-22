export function getPopupPosition(item, { top, left }) {
    const { width, height } = item?.getBoundingClientRect() || { width: 300, height: 300 };

    // calculate the maximum position for the popup's top and left edges
    const maxLeft = window.innerWidth - width;
    const maxTop = window.innerHeight - height;

    // calculate the default position for the popup
    let popupLeft = Math.min(left + width, maxLeft);
    let popupTop = Math.min(top + height, maxTop);

    // check if the popup needs to be flipped to the left or top side
    if (popupLeft > left + width) {
        popupLeft = Math.max(left - width, 0);
    }
    if (popupTop > top + height) {
        popupTop = Math.max(top - height, 0);
    }

    // check if the flipped position is still within the bounds of the window
    if (popupLeft < 0) {
        popupLeft = Math.min(left + width, maxLeft);
    }
    if (popupTop < 0) {
        popupTop = Math.min(top + height, maxTop);
    }

    return {
        left: popupLeft,
        top: popupTop,
    };
}
export function getPlacementPosition(item, popup, position, inset, shiftDistance) {
    const itemRect = item.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();

    if (inset) {

        switch (position) {
            case "top-left":
            case "left-top":
                return {
                    top: itemRect.top + shiftDistance,
                    left: itemRect.left + shiftDistance,
                };
            case "top":
                return {
                    top: itemRect.top + itemRect.height + shiftDistance,
                    left: itemRect.left + itemRect.width / 2 - popupRect.width / 2,
                };
            case "top-right":
            case "right-top":
                return {
                    top: itemRect.top + shiftDistance,
                    left: itemRect.right - popupRect.width - shiftDistance,
                };
            case "right":
                return {
                    top: itemRect.top + itemRect.height / 2 - popupRect.height / 2,
                    left: itemRect.right + shiftDistance,
                };
            case "right-bottom":
            case "bottom-right":
                return {
                    top: itemRect.bottom - popupRect.height - shiftDistance,
                    left: itemRect.right - popupRect.width - shiftDistance,
                };
            case "bottom":
                return {
                    top: itemRect.bottom + shiftDistance,
                    left: itemRect.left + itemRect.width / 2 - popupRect.width / 2,
                };
            case "bottom-left":
            case "left-bottom":
                return {
                    top: itemRect.bottom - popupRect.height - shiftDistance,
                    left: itemRect.left + shiftDistance,
                };
            case "left":
                return {
                    top: itemRect.top + itemRect.height / 2 - popupRect.height / 2,
                    left: itemRect.left - popupRect.width - shiftDistance,
                };
            case "center":
                return {
                    top: itemRect.top + itemRect.height / 2 - popupRect.height / 2,
                    left: itemRect.left + itemRect.width / 2 - popupRect.width / 2,
                };
            default:
                throw new Error(`Invalid position specified: ${position}`);
        }
    }

    switch (position) {
        case "top-left":
            return {
                top: itemRect.top - popupRect.height - shiftDistance,
                left: itemRect.left,
            };
        case "top":
            return {
                top: itemRect.top - popupRect.height - shiftDistance,
                left: itemRect.left + itemRect.width / 2 - popupRect.width / 2,
            };
        case "top-right":
            return {
                top: itemRect.top - popupRect.height - shiftDistance,
                left: itemRect.right - popupRect.width,
            };
        case "right-top":
            return {
                top: itemRect.top,
                left: itemRect.right + shiftDistance,
            };
        case "right":
            return {
                top: itemRect.top + itemRect.height / 2 - popupRect.height / 2,
                left: itemRect.right + shiftDistance,
            };
        case "right-bottom":
            return {
                top: itemRect.bottom - popupRect.height,
                left: itemRect.right + shiftDistance,
            };
        case "bottom-right":
            return {
                top: itemRect.bottom + shiftDistance,
                left: itemRect.right - popupRect.width,
            };
        case "bottom":
            return {
                top: itemRect.bottom + shiftDistance,
                left: itemRect.left + itemRect.width / 2 - popupRect.width / 2,
            };
        case "bottom-left":
            return {
                top: itemRect.bottom + shiftDistance,
                left: itemRect.left,
            };
        case "left-bottom":
            return {
                top: itemRect.bottom - popupRect.height,
                left: itemRect.left - popupRect.width - shiftDistance,
            };
        case "left":
            return {
                top: itemRect.top + itemRect.height / 2 - popupRect.height / 2,
                left: itemRect.left - popupRect.width - shiftDistance,
            };
        case "left-top":
            return {
                top: itemRect.top,
                left: itemRect.left - popupRect.width - shiftDistance,
            };
        default:
            throw new Error(`Invalid position specified: ${position}`);
    }
}