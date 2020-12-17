
export default function Nav() {
    return (
        <nav className="nav-bar-wraper outter-wraper row align-items-center">
            <div className="nav-bar__favicon mr-auto">
                <i class="nav-bar__icon bi bi-house"></i>祥达易购
            </div>

            <div className="nav-bar__search-wraper mx-auto">
                <div className="nav-bar__search">
                    <i class="nav-bar__search__icon--start  bi bi-search"></i>
                    <input class="nav-bar__search__input"></input>
                    <i class="nav-bar__search__icon--end bi bi-x"></i>
                </div>
            </div>

            <div className="nav-bar__action-button">
                <i class="nav-bar__icon  bi bi-search"></i>搜索
            </div>
            <div className="nav-bar__action-button">
                <i class="nav-bar__icon  bi bi-cart"></i>购物车
            </div>
            <div className="nav-bar__action-button">
                <i class="nav-bar__icon bi bi-person"></i>我的
            </div>
        </nav>
    )
}