import styles from './Key.module.css'
type Props = {
    letter: string
    onClick: () => void
    classes: string[]
}

const Key = ({letter, onClick, classes}: Props) => {
    classes = classes.map(className => styles[className])
    classes.push(styles.key)
    return <div className={classes.join(" ")} onClick={onClick}>{letter}</div>
}

export default Key