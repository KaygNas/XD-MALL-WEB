import { ArrowLeftShort, ArrowRightShort } from "../../images/Icons"
import { useEffect, useState, useRef } from "react"
import { getDataByApi } from "../../app/dataRequest"
import { useParams, Link } from "react-router-dom"

export default function Categories() {
    const [categories, setCategories] = useState([])
    const [position, setPosition] = useState(0)
    let { id: curCategoryId } = useParams()
    curCategoryId = Number(curCategoryId)
    const row = useRef({})
    const intervalId = useRef(null)

    useEffect(() => {
        fetchCategories()
    }, [])

    async function fetchCategories() {
        const result = await getDataByApi("categories")
        setCategories(result.data)
    }

    function repeat(fn) {
        return () => (intervalId.current = setInterval(fn, 120))
    }

    function stopRepeat() {
        clearInterval(intervalId.current)
    }

    function translateTo(direction) {
        const length = categories.length
        const scrollWidth = row.current.scrollWidth
        setPosition((position) => {
            let nextPosition = position + (direction === "next" ? 1 : -1)
            nextPosition = nextPosition > length - 1 ? length - 1 : nextPosition
            nextPosition = nextPosition < 0 ? 0 : nextPosition
            row.current.style.transform = `translateX(-${
                (nextPosition / length) * scrollWidth
            }px)`
            return nextPosition
        })
    }

    return (
        <nav className="categories-wraper">
            <div
                className="categories-controler__prev"
                onMouseDown={repeat(() => translateTo("prev"))}
                onMouseUp={() => stopRepeat()}
                onClick={() => translateTo("prev")}
            >
                <ArrowLeftShort className="categories-controler__arrow"></ArrowLeftShort>
            </div>
            <div ref={row} className="categories d-flex flex-row">
                {categories.map((item) => (
                    <Category
                        key={item.id}
                        isCurrent={item.id === curCategoryId}
                        category={item}
                    />
                ))}
            </div>
            <div
                className="categories-controler__next"
                onMouseDown={repeat(() => translateTo("next"))}
                onMouseUp={() => stopRepeat()}
                onClick={() => translateTo("next")}
            >
                <ArrowRightShort className="categories-controler__arrow"></ArrowRightShort>
            </div>
        </nav>
    )
}

function Category({ category, isCurrent }) {
    return (
        <div
            className={`category-wraper d-flex flex-column align-items-center ${
                isCurrent ? "category-wraper--current" : ""
            }`}
            data-id={category.id}
        >
            <Link to={`/home/categories/${category.id}`}>
                <img
                    className="category__icon"
                    alt={category.image.altMsg}
                    src={category.image.src}
                ></img>
                {category.name}
            </Link>
        </div>
    )
}
