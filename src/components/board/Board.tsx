import styles from './Board.module.css';
import Row from './Row';

type Props = {
    guesses: string[]
    colours: string[][]
    shouldJiggle: (index: number) => boolean
    shouldReveal: (index: number) => boolean
}

const Board = ({guesses, colours, shouldJiggle, shouldReveal} : Props) => {
    return (
        <div className={styles.board}>
            {
                guesses.map((guess, index) => <Row key={index} guess={guess} colours={colours[index]} jiggle={shouldJiggle(index)} reveal={shouldReveal(index)} />)
            }
        </div>
    )
}

export default Board