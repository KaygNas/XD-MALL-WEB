import ActionsBar from "../common/ActionsBar"
import "./settle.css"
import { useEffect, useState } from "react"
import { useNavTo } from "../../app/hooks"
import ProductsList from "../common/ProductsList"
import { useSelector } from "react-redux"
import { getDataByApi, postDataByApi } from "../../app/dataRequest"
import { SpinArrow } from "../common/Animation"

export default function Settle() {
    const [isEditing, setIsEditing] = useState(false)
    const [address, setAddress] = useState({ status: "idle", data: {} })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const cart = useSelector((state) => state.cart)
    const listItems = cart.items.filter((item) => item.inStock)

    const navTo = useNavTo()

    useEffect(() => {
        fetchAddress()
    }, [])

    async function fetchAddress() {
        const result = await getDataByApi("address")
        setAddress({ status: "succeeded", data: result.data })
    }

    async function saveAddress(e) {
        e.preventDefault()
        setAddress({ ...address, status: "loading" })
        const form = new FormData(e.target)
        const result = await postDataByApi(
            "updateAddress",
            Object.fromEntries(form.entries())
        )
        setIsEditing(false)
        setAddress({ status: "succeeded", data: result.data })
    }

    function startEdit() {
        setIsEditing(true)
    }

    function cancelEdit() {
        setIsEditing(false)
    }

    function submitOrder() {
        setIsSubmitting(true)
        setTimeout(() => {
            navTo("/settle/succeed")
        }, 1000)
    }

    return (
        <div className="settle-wraper outter-wraper">
            <Header></Header>
            <div className="settle__address-wraper d-flex flex-row align-items-center">
                {isEditing ? (
                    <AddressEdit
                        address={address}
                        onSave={saveAddress}
                        onCancel={cancelEdit}
                    ></AddressEdit>
                ) : (
                    <AddressDisplay
                        address={address}
                        onStartEdit={startEdit}
                    ></AddressDisplay>
                )}
            </div>
            <div className="settle__list-wraper">
                <ProductsList items={listItems}></ProductsList>
                <ActionsBar
                    total={cart.total || 0}
                    btnText="提交订单"
                    btnAction={submitOrder}
                    isLoading={isSubmitting}
                ></ActionsBar>
            </div>
        </div>
    )
}

function Header() {
    return <h1 className="settle__header">确认订单</h1>
}

function AddressDisplay({ address, onStartEdit }) {
    return (
        <>
            <div className="settle__address--display">
                <div className="settle__address">
                    <span className="settle__address__name">
                        {address.data.name}
                    </span>
                    <span className="settle__address__tel">
                        {address.data.tel}
                    </span>
                </div>
                <div className="settle__address__detail">
                    {address.data.detail}
                </div>
            </div>

            <div className="settle__address__edit-btn-wraper d-flex flex-column ml-auto">
                <button
                    className="settle__address__edit-btn btn btn-warning"
                    onClick={onStartEdit}
                >
                    修改地址
                </button>
            </div>
        </>
    )
}

function AddressEdit({ address, onSave, onCancel }) {
    const [tempAddress, setTempAddress] = useState(address.data)
    function onEditAddress(type, input) {
        setTempAddress({ ...tempAddress, [type]: input })
    }
    const isLoading = address.status === "loading"

    return (
        <>
            <form
                id="address"
                className="settle__address--edit"
                onSubmit={onSave}
            >
                <div className="input-group mb-2 row">
                    <label className="col-3" htmlFor="address_name">
                        店名：
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={tempAddress.name}
                        onChange={(e) => onEditAddress("name", e.target.value)}
                    />
                </div>
                <div className="input-group  mb-2 row">
                    <label className="col-3" htmlFor="address_tel">
                        联系电话：
                    </label>
                    {/*TODO:表单检查*/}
                    <input
                        type="tel"
                        name="tel"
                        className="form-control"
                        value={tempAddress.tel}
                        onChange={(e) => onEditAddress("tel", e.target.value)}
                    />
                </div>
                <div className="input-group row">
                    <label className="col-3" htmlFor="address_detail">
                        详细地址：
                    </label>
                    <textarea
                        type="text"
                        name="detail"
                        className="form-control"
                        value={tempAddress.detail}
                        onChange={(e) =>
                            onEditAddress("detail", e.target.value)
                        }
                    />
                </div>
            </form>

            <div className="settle__address__edit-btn-wraper d-flex flex-column ml-auto">
                <button
                    className="settle__address__edit-btn btn btn-warning"
                    type="submit"
                    form="address"
                    disabled={isLoading}
                >
                    <SpinArrow isShown={isLoading}></SpinArrow>
                    保存
                </button>
                <button
                    className="settle__address__edit-btn btn btn-secondary"
                    onClick={onCancel}
                >
                    取消
                </button>
            </div>
        </>
    )
}
