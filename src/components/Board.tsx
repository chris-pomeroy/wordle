import { useEffect } from 'react';
import Row from './Row';
import styles from './Board.module.css';
import Keyboard from './Keyboard';
import useKeyHandler from '../hooks/useKeyHandler';

const Board = () => {

    useEffect(() => {
        document.addEventListener("keydown", keyDownEventHandler)
        return () => document.removeEventListener("keydown", keyDownEventHandler)
    })

    useEffect(() => {
        document.addEventListener("keyup", keyUpEventHandler)
        return () => document.removeEventListener("keyup", keyUpEventHandler)
    })

    const {guesses, colours, keyHandler, keyDownEventHandler, keyUpEventHandler, isActiveKey, getKeyColour} = useKeyHandler()

    return (
        <>
            <div className={styles.board}>
                {
                    guesses.map((guess, index) => <Row key={index} guess={guess} colours={colours[index]} />)
                }
            </div>
            <Keyboard keyHandler={keyHandler} isActive={isActiveKey} getKeyColour={getKeyColour} />
        </>
    )
}

export default Board