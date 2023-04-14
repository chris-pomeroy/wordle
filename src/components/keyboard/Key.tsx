import styles from './Key.module.css'
type Props = {
    letter: string
    onClick: () => void
    classes: string[]
}

function Key({letter, onClick, classes}: Props) {
    classes = classes.map(className => styles[className])
    classes.push(styles.key)
    if (letter === "Enter" || letter === "⌫") {
        classes.push(styles.large)
    }
    if (letter === "Enter") {
        classes.push(styles.smallText)
    }
    return <div className={classes.join(" ")} onClick={onClick}>{letter}</div>
}

export default Key