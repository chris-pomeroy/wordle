import styles from './Cell.module.css'

type Props = {
    letter: string
    colour: string
    spin: boolean
    reveal: boolean
}

function Cell({letter, colour, spin, reveal} : Props) {
    return (
        <div className={`${styles.cell} ${spin ? styles.spin : ""}`}>
            <div className={reveal ? styles.shiftUp : ""}>{letter}</div>
            <div className={colour ? styles[colour] : styles.incorrect}>{letter}</div>
        </div>
    )
}

export default Cell