import styles from './Key.module.css'
type Props = {
    letter: string
    onClick: () => void
    isActive: boolean
}

const Key = ({letter, onClick, isActive}: Props) => <div className={`${styles.key} ${isActive ? styles.active : ''}`} onClick={onClick}>{letter}</div>

export default Key