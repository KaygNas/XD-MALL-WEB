export function SpinArrow({ isShown, className }) {
    console.log(`spinarrow show = ${isShown}`)
    return (
        <i
            className={`bi bi-arrow-counterclockwise animation--loading ${className}`}
            style={{ display: isShown ? "inline" : "none" }}
        ></i>
    )
}
