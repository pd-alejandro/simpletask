const saveToLocalStorage = (item, value) => {
    let newValue = (value instanceof Object) ? JSON.stringify(value) : value
    localStorage.setItem(item, newValue)
}
const loadFromLocalStorage = (item, isObjectExpected = false) => {
    const value = localStorage.getItem(item)
    return (isObjectExpected) ? JSON.parse(value) : value
}

export { saveToLocalStorage, loadFromLocalStorage };