import styles from './Modal.module.css'

type Props = {
    startNewGame: () => void
    answer: string
}

const GameLostModal = ({startNewGame, answer} : Props) => (
    <div className={styles.modal}>
        <div className={styles.modalText}>Better Luck Next Time</div>
        <div className={styles.modalText}>The answer was {answer}</div>
        <div onClick={startNewGame} className={styles.modalButton}>New Game</div>
    </div>
)

export default GameLostModal