export function SpinArrow({ isShown, className }) {
    return (
        <i
            className={`bi bi-arrow-counterclockwise animation--loading ${className}`}
            style={{ display: isShown ? "inline" : "none" }}
        ></i>
    )
}
