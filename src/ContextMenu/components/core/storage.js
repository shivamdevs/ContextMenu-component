import { useState } from 'react';

const useStorage = () => {
    const [storage, setStorage] = useState({});

    let dummyStorage = {};

    const updateStorage = (key, updates = {}, ...path) => {
        setStorage(prevItems => {

            const object = {...prevItems, [key]: (prevItems[key] || {key})};

            const update = (data, index) => {
                if (!data[path[index]]) return;
                if (index === path.length - 1) {
                    return Object.assign(data[path[index]], updates);
                }
                return update(data[path[index]], index + 1);
            }
            if (path.length) {
                update(object[key], 0);
            } else {
                Object.assign(object[key], updates);
            }

            dummyStorage = object;
            return object;
        });
    };

    const getStorage = (key) => (key ? dummyStorage[key] : dummyStorage);

    return { storage, backupStorage: dummyStorage, updateStorage, setStorage, getStorage };
};

export default useStorage;