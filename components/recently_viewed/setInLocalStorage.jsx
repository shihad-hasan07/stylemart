export function setInLocalStorage(id) {
    if (!id) return;
    if (typeof window === "undefined") return;

    const key = "recentlyViewed";
    const TTL = 48 * 60 * 60 * 1000;
    const now = Date.now();

    const stored = JSON.parse(
        localStorage.getItem(key) || "{}"
    );

    if (stored.lastUpdated && now - stored.lastUpdated > TTL) {
        localStorage.removeItem(key);
    }

    let items = stored.items || [];

    items = items.filter(storedId => storedId !== id);

    if (items.length === 4) {
        items.pop();
    }

    items.unshift(id);

    localStorage.setItem(
        key,
        JSON.stringify({
            lastUpdated: now,
            items,
        })
    );
}
