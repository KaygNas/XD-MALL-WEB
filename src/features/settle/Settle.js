import ActionsBar from "../common/ActionsBar"
import "./settle.css"
import { useEffect, useState } from "react"
import { useNavTo } from "../../app/hooks"
import ProductsList from "../common/ProductsList"
import { useSelector } from "react-redux"
import { getDataByApi, postDataByApi } from "../../app/dataRequest"
import { SpinArrow } from "../common/Animation"
import { selectAllItems } from "../../app/cartSlice"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

export default function Settle() {
    const [isEditing, setIsEditing] = useState(false)
    const [address, setAddress] = useState({ status: "idle", data: {} })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const cart = useSelector((state) => state.cart)
    const listItems = selectAllItems(cart).filter((item) => item.inStock)

    const navTo = useNavTo()

    useEffect(() => {
        fetchAddress()
    }, [])

    async function fetchAddress() {
        const result = await getDataByApi("address")
        setAddress({ status: "succeeded", data: result.data })
    }

    async function saveAddress(formData) {
        setAddress({ ...address, status: "loading" })
        const result = await postDataByApi("updateAddress", formData)
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

const schema = yup.object().shape({
    name: yup
        .string()
        .required("name is required")
        .max(10, () => "name is too long"),
    tel: yup
        .string()
        .required("tel is required")
        .length(11, "telNumber should have 11 numbers")
        .matches(/^\d+$/, "telNumber should be only numbers"),
    detail: yup.string().ensure()
})

function AddressEdit({ address, onSave, onCancel }) {
    const { register, handleSubmit, watch, errors } = useForm({
        criteriaMode: "all",
        resolver: yupResolver(schema)
    })

    const tempAddress = address.data
    const isLoading = address.status === "loading"

    console.log("errors", errors)

    return (
        <>
            <form
                id="address"
                className="settle__address--edit"
                onSubmit={handleSubmit(onSave)}
            >
                <div className="input-group mb-2 row">
                    <label className="col-3" htmlFor="address_name">
                        店名：
                    </label>
                    <input
                        ref={register}
                        type="text"
                        name="name"
                        className="form-control"
                        defaultValue={tempAddress.name}
                    />
                    <ErrorMsg error={errors.name} />
                </div>

                <div className="input-group  mb-2 row">
                    <label className="col-3" htmlFor="address_tel">
                        联系电话：
                    </label>
                    <input
                        ref={register}
                        type="tel"
                        name="tel"
                        className="form-control"
                        defaultValue={tempAddress.tel}
                    />
                    <ErrorMsg error={errors.tel} />
                </div>
                <div className="input-group row">
                    <label className="col-3" htmlFor="address_detail">
                        详细地址：
                    </label>
                    <textarea
                        ref={register}
                        type="text"
                        name="detail"
                        className="form-control"
                        defaultValue={tempAddress.detail}
                    />
                    <ErrorMsg error={errors.detail} />
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

function ErrorMsg({ error }) {
    if (!error) return null

    return <span className="ml-auto col-9 text-danger">{error.message}</span>
}
