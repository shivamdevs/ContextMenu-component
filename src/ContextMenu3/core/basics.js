export function matchNodeByParents(toMatchByLooping, toMatchWith) {
    while (toMatchByLooping !== document.querySelector("body")) {
        if (toMatchWith === toMatchByLooping) return true;
        toMatchByLooping = toMatchByLooping.parentElement;
    }
    return false;
}

export function getPopupPosition(item, top, left) {
    // Get the dimensions of the popup element
    const { width, height } = item?.getBoundingClientRect() || { width: 300, height: 300 };

    // Calculate the initial top and left position
    let popupTop = top;
    let popupLeft = left;

    // Check if there is enough space on the initial side
    if (left + width <= window.innerWidth) {
        popupLeft = left;
    } else if (left - width >= 0) {
        popupLeft = left - width;
    } else {
        popupLeft = 0;
    }

    if (top + height > window.innerHeight) {
        popupTop = Math.max(top - height, 0);
    }

    // Return the final top and left position
    return {
        top: popupTop,
        left: popupLeft,
    };
}

export function getChildPopupPosition(item, button) {
    const childRect = item?.getBoundingClientRect() || { width: 300, height: 300 };
    const parentRect = button.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let popupTop, popupLeft;

    // Check if there is enough space on the right side
    if (parentRect.left + parentRect.width + childRect.width <= viewportWidth) {
        // Position the child popup to the right of the button
        popupLeft = parentRect.left + parentRect.width - 5;
    } else if (parentRect.left - childRect.width >= 0) {
        // Position the child popup to the left of the button
        popupLeft = parentRect.left - childRect.width - 5;
    } else {
        // If there is not enough space on either side, position the child popup towards the center of the screen
        popupLeft = Math.max(viewportWidth / 2 - childRect.width / 2, 0);
    }

    // Check if there is enough space below the button
    if (parentRect.top + childRect.height <= viewportHeight) {
        // Position the child popup below the button
        popupTop = parentRect.top;
    } else {
        // Position the child popup above the button
        popupTop = viewportHeight - childRect.height;
    }

    return { top: popupTop, left: popupLeft };
}



export function generateRandomBlobString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}