import Carousel from "../common/Carousel"

export default function Banners({ data }) {
    const renderedImgs = data.map((img) => (
        <img
            key={img.src}
            className="banner__img"
            alt={img.altMsg}
            src={img.src}
        ></img>
    ))

    return (
        <div className="banner-wraper">
            <Carousel>{renderedImgs}</Carousel>
        </div>
    )
}
