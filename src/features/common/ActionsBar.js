export default function ActionsBar({ total, subTotal, btnText, btnAction }) {
    return (
        <div className="car-drop-list__action-bar d-flex flex-row align-items-center justify-content-between">
            <span className="action-bar__total">总计：￥{total}</span>
            <button className="btn btn-warning" onClick={btnAction}>
                {btnText}
            </button>
        </div>
    )
}
