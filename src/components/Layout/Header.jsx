import ThemeButton from '/src/components/Layout/ThemeButton'

function Logo() {
    return (
        <div
            className="logo__container">
            <div
                className="logo__wrapper">
                <img
                    src="./check-logo.svg"
                    alt="logo"
                    className="logo" />
            </div>
            <p>Simple<span>Task</span></p>
        </div>
    )
}


export default function Header() {

    return (
        <header>
            <Logo />
            <div
                className="controls__container">
                <ThemeButton />
            </div>
        </header>
    )
}