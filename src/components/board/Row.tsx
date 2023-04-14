import Cell from './Cell';
import styles from './Row.module.css'

type Props = {
    guess: string
    colours: string[]
    jiggle: boolean
    reveal: boolean
}

function Row({guess, colours, jiggle, reveal}: Props) {
    const row = guess.split('').concat(Array(5 - guess.length).fill(""))
    const spin = colours.every(colour => colour === "green")
    return (
        <div className={`${styles.row} ${jiggle ? styles.jiggle : ""}`}>
            {row.map((letter, index) => <Cell key={index} letter={letter} colour={colours[index]} spin={spin} reveal={reveal} />)}
        </div>
    )
}

export default Row