export default function PopUp({ children, className }) {
    return (
        <div className={"pop-up-container " + className}>
            {children}
        </div>
    )
}
