import Chart from './Chart'
import styles from './Modal.module.css'
import Statistic from './Statistic'
import Button from '../button/Button'
import ShareButton from '../button/ShareButton'

type Props = {
    active: boolean
    startNewGame: () => void
    currentStreak: number
    bestStreak: number
    statistics: number[]
}

function Modal({active, startNewGame, currentStreak, bestStreak, statistics} : Props) {
    return (
        <div className={`${styles.backdrop} ${active ? styles.active : ""}`}>
            <div className={styles.modal}>
                <div className={styles.statsRow}>
                    <Statistic value={currentStreak} message={"current streak"} />
                    <Statistic value={bestStreak} message={"best streak"} />
                </div>
                <Chart statistics={statistics}/>
                <div className={styles.buttonRow}>
                    <ShareButton statistics={statistics} bestStreak={bestStreak} currentStreak={currentStreak} />
                    <Button onClick={startNewGame} text={"New Game"} />
                </div>
            </div>
        </div>
    )
}

export default Modal