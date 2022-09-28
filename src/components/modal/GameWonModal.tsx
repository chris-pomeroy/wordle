import styles from './Modal.module.css'

type Props = {
    startNewGame: () => void
}

const GameWonModal = ({startNewGame} : Props) => (
    <div className={styles.modal}>
        <div className={styles.modalText}>Congratulations!</div>
        <div onClick={startNewGame} className={styles.modalButton}>New Game</div>
    </div>
)

export default GameWonModal