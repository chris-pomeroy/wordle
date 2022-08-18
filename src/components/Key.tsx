import styles from './Key.module.css'
type Props = {
    letter: string
    onClick: () => void
}

const Key = ({letter, onClick}: Props) => <div className={styles.key} onClick={onClick}>{letter}</div>

export default Key