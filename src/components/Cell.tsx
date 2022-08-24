import styles from './Cell.module.css'

type Props = {
    letter: string
    colour: string
    spin: boolean
}

const Cell = ({letter, colour, spin} : Props) => <div className={`${styles.cell} ${styles[colour]} ${spin ? styles.spin : ""}`}>{letter}</div>

export default Cell