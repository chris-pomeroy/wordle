import styles from './Modal.module.css'

type Props = {
    startNewGame: () => void
}

const Modal = ({startNewGame} : Props) => (
    <div className={styles.backdrop}>
        <div className={styles.modal}>
            <div className={styles.modalText}>Congratulations!</div>
            <div onClick={startNewGame} className={styles.modalButton}>New Game</div>
        </div>
    </div>
)

export default Modal