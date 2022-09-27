import styles from './SuccessModal.module.css'

type Props = {
    startNewGame: () => void
}

const SuccessModal = ({startNewGame} : Props) => (
    <div className={styles.modal}>
        <div className={styles.modalText}>Congratulations!</div>
        <div onClick={startNewGame} className={styles.modalButton}>New Game</div>
    </div>
)

export default SuccessModal