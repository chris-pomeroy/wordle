import Chart from './Chart'
import styles from './Modal.module.css'
import Statistic from './Statistic'

type Props = {
    active: boolean
    startNewGame: () => void
    currentStreak: number
    bestStreak: number
    statistics: number[]
}

const Modal = ({active, startNewGame, currentStreak, bestStreak, statistics} : Props) => (
    <div className={`${styles.backdrop} ${active ? styles.active : ""}`}>
        <div className={styles.modal}>
            <div className={styles.statsRow}>
                <Statistic value={currentStreak} message={"current streak"} />
                <Statistic value={bestStreak} message={"best streak"} />
            </div>
            <Chart statistics={statistics}/>
            <div onClick={startNewGame} className={styles.modalButton}>New Game</div>
        </div>
    </div>
)

export default Modal