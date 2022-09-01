import Cell from './Cell';
import styles from './Row.module.css'

type Props = {
    guess: string
    colours: string[]
    jiggle: boolean
    onJiggleAnimationEnd: () => void
}

const Row = ({guess, colours, jiggle, onJiggleAnimationEnd}: Props) => {
    const row = guess.split('').concat(Array(5 - guess.length).fill(""))
    const spin = colours.every(colour => colour === "green")
    return (
        <div className={`${styles.row} ${jiggle ? styles.jiggle : ""}`} onAnimationEnd={onJiggleAnimationEnd}>
            {row.map((letter, index) => <Cell key={index} letter={letter} colour={colours[index]} spin={spin} />)}
        </div>
    )
}

export default Row