import { useState } from 'react'
import Chart from './Chart'
import styles from './Modal.module.css'
import ShareIcon from './ShareIcon'
import Statistic from './Statistic'

type Props = {
    active: boolean
    startNewGame: () => void
    currentStreak: number
    bestStreak: number
    statistics: number[]
}

const getStreakEmoji = (streak: number) => {
    if (streak >= 20) {
        return "🔥"
    }
    if (streak >= 10) {
        return "🌟"
    }
    if (streak >= 5) {
        return "⭐"
    }
    if (streak  >= 1) {
        return "👍"
    }
    return "💩"
}

const getWinPercentageEmoji = (percentage: number) => {
    if (percentage >= 90) {
        return "🏆"
    }
    if (percentage >= 70) {
        return "🙌"
    }
    if (percentage >= 50) {
        return "👏"
    }
    if (percentage >= 30) {
        return "👌"
    }
    return "💩"
}

const Modal = ({active, startNewGame, currentStreak, bestStreak, statistics} : Props) => {

    const [shareButtonText, setShareButtonText] = useState("Share")

    const winPercentage = 100 - Math.round(statistics[statistics.length-1] * 100 / statistics.reduce((a, b) => a + b, 0))
    const shareText = 'Wordle Statistics\n\n' +
    `${getStreakEmoji(currentStreak)} current streak: ${currentStreak}\n` +
    `${getStreakEmoji(bestStreak)} best streak: ${bestStreak}\n` +
    `${getWinPercentageEmoji(winPercentage)} win rate: ${winPercentage}%`

    const fallback = () => {
        navigator.clipboard.writeText(shareText)
        if (shareButtonText !== "Copied") {
            setTimeout(() => setShareButtonText("Share"), 2000)
        }
        setShareButtonText("Copied")
    }

    const share = () => {
        if (navigator.share) {
            navigator.share({
                title: "Wordle Statistics",
                text: shareText
            })
            .catch(fallback)
        } else {
            fallback()
        }
    }

    return (
        <div className={`${styles.backdrop} ${active ? styles.active : ""}`}>
            <div className={styles.modal}>
                <div className={styles.statsRow}>
                    <Statistic value={currentStreak} message={"current streak"} />
                    <Statistic value={bestStreak} message={"best streak"} />
                </div>
                <Chart statistics={statistics}/>
                <div className={styles.buttonRow}>
                    <div className={styles.modalButton} onClick={share}><ShareIcon/>{shareButtonText}</div>
                    <div className={styles.modalButton} onClick={startNewGame}>New Game</div>
                </div>
            </div>
        </div>
    )
}

export default Modal