import blankImg from "../../images/blank_img.png"
import Carousel from "../common/Carousel"


export default function Banner() {
    return (
        <div className="banner-wraper">
            <Carousel>
                <img
                    className="banner__img"
                    alt="banner_img"
                    src={blankImg}
                ></img>
                <img
                    className="banner__img"
                    alt="banner_img"
                    src={blankImg}
                ></img>
                <img
                    className="banner__img"
                    alt="banner_img"
                    src={blankImg}
                ></img>
            </Carousel>
        </div>
    )
}

