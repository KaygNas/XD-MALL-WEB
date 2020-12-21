import { useHistory } from "react-router-dom"

export function useNavTo() {
    const history = useHistory()
    return (url) => history.push(url)
}
