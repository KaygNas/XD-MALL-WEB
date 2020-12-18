import Banner from "./Banner"
import Content from "./Content"
import Categories from "./Categories"


export default function Home() {
    return (
        <main className="home-wraper outter-wraper d-flex flex-column align-items-center">
            <Banner></Banner>
            <Categories></Categories>
            <Content></Content>

        </main>
    )
}