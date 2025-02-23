import { useState, useEffect } from 'react'
import { loadFromLocalStorage, saveToLocalStorage } from '/utils/localstorage'

const getThemePreference = () => {
    let themePreference = loadFromLocalStorage('theme')
    if (themePreference) return themePreference

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'
}

export default function ThemeButton() {
    let [theme, setTheme] = useState(getThemePreference)

    useEffect(() => {
        document.body.classList.add(theme)
    }, [])

    function toggleTheme() {
        let newTheme = (theme === 'dark') ? 'light' : 'dark'
        document.body.classList.replace(theme, newTheme)

        setTheme(newTheme)

        saveToLocalStorage('theme', newTheme)
    }

    return (
        <button
            className="theme btn"
            onClick={toggleTheme}
            aria-label="">
            T
        </button>
    )
}