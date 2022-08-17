import styles from './Key.module.css'
type Props = {
    letter: string
}

const Key = ({letter}: Props) => <div className={styles.key}>{letter}</div>

export default Key