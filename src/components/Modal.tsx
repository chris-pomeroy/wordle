import styles from './Modal.module.css'

type Props = {
    startNewGame: () => void
    active: boolean
}

const Modal = ({startNewGame, active} : Props) => (
    <div className={`${styles.backdrop} ${active ? styles.active : ""}`}>
        <div className={styles.modal}>
            <div className={styles.modalText}>Congratulations!</div>
            <div onClick={startNewGame} className={styles.modalButton}>New Game</div>
        </div>
    </div>
)

export default Modal