import ActionsBar from "../common/ActionsBar"
import { renderProductsListFromArray } from "../nav/CartDropList"
import "./settle.css"
import { useState } from "react"
import { useNavTo } from "../../app/hooks"

export default function Settle() {
    const [isEditing, setIsEditing] = useState(true)
    const navTo = useNavTo()
    function submitOrder() {
        setTimeout(() => {
            navTo("/settle/succeed")
        }, 1000)
    }

    return (
        <div className="settle-wraper outter-wraper">
            <Header></Header>
            <div className="settle__address-wraper d-flex flex-row align-items-center">
                {isEditing ? (
                    <AddressEdit></AddressEdit>
                ) : (
                    <AddressDisplay></AddressDisplay>
                )}
            </div>
            <div className="settle__list-wraper">
                {renderProductsListFromArray(null)}
                <ActionsBar
                    btnText="提交订单"
                    btnAction={submitOrder}
                ></ActionsBar>
            </div>
        </div>
    )
}

function Header() {
    return <h1 className="settle__header">确认订单</h1>
}

function AddressDisplay() {
    return (
        <>
            <div className="settle__address--display">
                <div className="settle__address">
                    <span className="settle__address__name">芙蓉兴盛</span>
                    <span className="settle__address__tel">13712345678</span>
                </div>
                <div className="settle__address__detail">
                    详细的地址只有这么长应该页没有关系吧
                </div>
            </div>

            <div className="settle__address__edit-btn-wraper d-flex flex-column ml-auto">
                <button className="settle__address__edit-btn btn btn-warning">
                    修改地址
                </button>
            </div>
        </>
    )
}

function AddressEdit() {
    return (
        <>
            <form className="settle__address--edit">
                <div className="input-group mb-2 row">
                    <label className="col-3" htmlFor="address_name">
                        店名：
                    </label>
                    <input type="text" className="form-control" />
                </div>
                <div className="input-group  mb-2 row">
                    <label className="col-3" htmlFor="address_tel">
                        联系电话：
                    </label>
                    <input type="tel" className="form-control" />
                </div>
                <div className="input-group row">
                    <label className="col-3" htmlFor="address_detail">
                        详细地址：
                    </label>
                    <input type="text" className="form-control" />
                </div>
            </form>

            <div className="settle__address__edit-btn-wraper d-flex flex-column ml-auto">
                <button className="settle__address__edit-btn btn btn-warning">
                    保存
                </button>
                <button className="settle__address__edit-btn btn btn-secondary">
                    取消
                </button>
            </div>
        </>
    )
}
