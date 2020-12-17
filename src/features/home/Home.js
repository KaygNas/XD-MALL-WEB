import Banner from "./Banner"
import Content from "./Content"

export default function Home() {
    return (
        <div className="home-wraper outter-wraper row d-flex flex-column align-items-center">
            <Banner></Banner>
            <Content></Content>
        </div>
    )
}