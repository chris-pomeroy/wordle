import styles from './Key.module.css'
type Props = {
    letter: string
    onClick: () => void
    isActive: boolean
    colour: string
}

const Key = ({letter, onClick, isActive, colour}: Props) => {
    return <div className={`${styles.key} ${styles[colour]} ${isActive ? styles.active : ''}`} onClick={onClick}>{letter}</div>
}

export default Key