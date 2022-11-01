import styles from './Modal.module.css'
import Statistic from './Statistic'

type Props = {
    active: boolean
    startNewGame: () => void
    currentStreak: number
    bestStreak: number
}

const Modal = ({active, startNewGame, currentStreak, bestStreak} : Props) => (
    <div className={`${styles.backdrop} ${active ? styles.active : ""}`}>
        <div className={styles.modal}>
            <div className={styles.statsRow}>
                <Statistic value={currentStreak} message={["current", "streak"]} />
                <Statistic value={bestStreak} message={["best", "streak"]} />
            </div>
            <div onClick={startNewGame} className={styles.modalButton}>New Game</div>
        </div>
    </div>
)

export default Modal