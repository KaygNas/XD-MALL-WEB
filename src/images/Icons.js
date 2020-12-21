export function ArrowRight({ className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fillRule="currentColor"
            className={"bi bi-arrow-right-circle " + className}
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5A.5.5 0 0 0 4 8z"
            />
        </svg>
    )
}
export function ArrowLeft({ className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fillRule="currentColor"
            className={"bi bi-arrow-left-circle " + className}
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
        </svg>
    )
}

export function ArrowLeftShort({ className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fillRule="currentColor"
            className={"bi bi-arrow-left-short " + className}
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
        </svg>
    )
}

export function ArrowRightShort({ className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fillRule="currentColor"
            className={"bi bi-arrow-right-short " + className}
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
            />
        </svg>
    )
}

export function Cancel({ className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fillRule="currentColor"
            className={"bi bi-x " + className}
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
        </svg>
    )
}
