import styles from './Board.module.css';
import Row from './Row';

type Props = {
    guesses: string[]
    colours: string[][]
    shouldJiggle: (index: number) => boolean
}

const Board = ({guesses, colours, shouldJiggle} : Props) => {
    return (
        <div className={styles.board}>
            {
                guesses.map((guess, index) => <Row key={index} guess={guess} colours={colours[index]} jiggle={shouldJiggle(index)} />)
            }
        </div>
    )
}

export default Board