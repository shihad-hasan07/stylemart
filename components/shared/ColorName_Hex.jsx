
export default function ColorName_Hex(colorName) {
    if (typeof window === "undefined") return null;

    const temp = document.createElement("div");
    temp.style.color = colorName;
    document.body.appendChild(temp);

    const rgb = window.getComputedStyle(temp).color;
    document.body.removeChild(temp);

    const [r, g, b] = rgb.match(/\d+/g).map(Number);

    return (
        "#" +
        [r, g, b]
            .map((x) => x.toString(16).padStart(2, "0"))
            .join("")
    );
}
