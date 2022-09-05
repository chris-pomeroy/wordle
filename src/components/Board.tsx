import Row from './Row';
import styles from './Board.module.css';
import Keyboard from './Keyboard';
import useKeyHandler from '../hooks/useKeyHandler';
import Modal from './Modal';

const Board = () => {

    const {guesses, colours, shouldShowModal, shouldJiggle, keyHandler, getKeyClasses, startNewGame} = useKeyHandler()

    return (
        <>
            <header className={styles.header}>
                <span className={styles.headerLogo}>Wordle</span>
            </header>
            <div className={styles.board}>
                {
                    guesses.map((guess, index) => <Row key={index} guess={guess} colours={colours[index]} jiggle={shouldJiggle(index)} />)
                }
            </div>
            {<Modal startNewGame={startNewGame} active={shouldShowModal()} />}
            <Keyboard keyHandler={keyHandler} getKeyClasses={getKeyClasses} />
        </>
    )
}

export default Board