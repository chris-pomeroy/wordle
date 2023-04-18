import styles from './Button.module.css'

type Props = {
    onClick: () => void
    text: string
}

function Button({onClick, text} : Props) {
    return <div className={styles.button} onClick={onClick}>{text}</div>
}

export default Button