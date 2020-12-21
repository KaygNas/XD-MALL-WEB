import { Link } from "react-router-dom"

export default function SettleSucceed() {
    return (
        <div className="settle-noti-wraper d-flex flex-column align-items-center mx-auto">
            <i className="settle-noti__icon bi bi-check2-circle"></i>
            <h1 className="settle-noti__title">订单提交成功</h1>
            <Link to="/home" className="settle-noti__back btn btn-primary">
                返回首页
            </Link>
        </div>
    )
}
