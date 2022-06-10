import { useState } from "react";

export function useLocalStorage(key: string, initialValue: unknown) {
    const [storedValue, setStoredValue] = useState(() => {
        const item = window.localStorage.getItem(key);
        if (item) {
            
            return JSON.parse(item);
        } else {
            window.localStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue;
        }
    });
    const setValue = (value: unknown) => {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
    };
    return [storedValue, setValue];
}