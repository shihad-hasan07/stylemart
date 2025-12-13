export function setInLocalStorage(id) {
    if (!id) return;
    if (typeof window === "undefined") return;

    const key = "recentlyViewed";

    let items = JSON.parse(
        localStorage.getItem(key) || "[]"
    );

    // remove duplicate
    items = items.filter(storedId => storedId !== id);

    // if already 4 items, remove the oldest (last one)
    if (items.length === 4) {
        items.pop();
    }

    // add new id as latest
    items.unshift(id);

    localStorage.setItem(key, JSON.stringify(items));
}