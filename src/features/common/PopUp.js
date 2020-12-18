import { Cancel } from "../../images/Icons"

export default function PopUp({ children, className }) {
    return (
        <>
            <div className={"pop-up-wraper " + className}>
                {children}
                <Cancel className="pop-up__cancel"></Cancel>
            </div>

            <div className="pop-up-mask"></div>
        </>
    )
}
