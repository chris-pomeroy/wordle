import Row from './Row';
import styles from './Board.module.css';
import Keyboard from './Keyboard';
import useKeyHandler from '../hooks/useKeyHandler';

const Board = () => {

    const {guesses, colours, keyHandler, getKeyClasses} = useKeyHandler()

    return (
        <>
            <div className={styles.board}>
                {
                    guesses.map((guess, index) => <Row key={index} guess={guess} colours={colours[index]} />)
                }
            </div>
            <Keyboard keyHandler={keyHandler} getKeyClasses={getKeyClasses} />
        </>
    )
}

export default Board