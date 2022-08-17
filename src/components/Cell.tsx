import styles from './Cell.module.css'

type Props = {
    letter: string
    colour: string
}

const Cell = ({letter, colour} : Props) => <div className={`${styles.cell} ${styles[colour]}`}>{letter}</div>

export default Cell