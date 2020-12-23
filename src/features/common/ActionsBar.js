import { SpinArrow } from "./Animation"
export default function ActionsBar({
    total,
    subTotal,
    btnText,
    btnAction,
    isLoading
}) {
    return (
        <div className="car-drop-list__action-bar d-flex flex-row align-items-center justify-content-between">
            <span className="action-bar__total">总计：￥{total}</span>
            <button
                className="btn btn-warning"
                onClick={btnAction}
                disabled={isLoading}
            >
                <SpinArrow isShown={isLoading}></SpinArrow>
                {btnText}
            </button>
        </div>
    )
}
