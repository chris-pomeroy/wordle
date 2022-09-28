import styles from './Cell.module.css'

type Props = {
    letter: string
    colour: string
    spin: boolean
}

const Cell = ({letter, colour, spin} : Props) => (
    <div className={`${styles.cell} ${spin ? styles.spin : ""}`}>
        {letter && <div className={`${colour === "grey" ? "" : styles.shiftUp} ${styles.grey}`}>{letter}</div>}
        <div className={styles[colour]}>{letter}</div>
    </div>
)

export default Cell