import styles from './Cell.module.css'

type Props = {
    letter: string
}

const Cell = ({letter} : Props) => <div className={styles.cell}>{letter}</div>

export default Cell;