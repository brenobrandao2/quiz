export function getRandomColor() {
    const color = "hsl(" + Math.random() * 360 + ", 100%, 60%)";
    return color;
}