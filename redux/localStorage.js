
export const saveState = (state) => {
    try {
        const serialized = JSON.stringify(state);
        localStorage.setItem("states", serialized);
    } catch { }
};

export const loadState = () => {
    try {
        const serialized = localStorage.getItem("states");
        if (!serialized) return undefined;
        return JSON.parse(serialized);
    } catch {
        return undefined;
    }
};
