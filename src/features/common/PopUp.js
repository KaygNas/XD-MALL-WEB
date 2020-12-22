import { Cancel } from "../../images/Icons"

export default function PopUp({ children, className, onClose }) {
    return (
        <>
            <div className={"pop-up-wraper " + className}>
                {children}
                <div onClick={onClose}>
                    <Cancel className="pop-up__cancel"></Cancel>
                </div>
            </div>

            <div className="pop-up-mask"></div>
        </>
    )
}
