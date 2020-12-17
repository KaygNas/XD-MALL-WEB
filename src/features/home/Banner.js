import blankImg from "../../images/blank_img.png"

export default function Banner() {
    return (
        <div className="banner-wraper row">
            <div className="banner__action--pre"></div>
            <img
                className="banner__img"
                alt="banner_img"
                src={blankImg}
            ></img>
            <div className="banner__action--next"></div>
            <Indicator></Indicator>
        </div>
    )
}

export function Indicator() {
    return (
        <div className="indicator-wraper">
            <div className="indicator--current"></div>
            <div className="indicator"></div>
        </div>
    )
}