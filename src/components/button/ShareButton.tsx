import { useState } from 'react'
import styles from './Button.module.css'
import ShareIcon from "./ShareIcon"

type Props = {
    currentStreak: number
    bestStreak: number
    statistics: number[]
}

function getStreakEmoji(streak: number) {
    return streak >= 20 ? "🔥" :
        streak >= 10 ? "🌟" :
        streak >= 5 ? "⭐" :
        streak >= 1 ? "👍" :
        "💩"
}

function getWinPercentageEmoji(percentage: number) {
    return percentage >= 90 ? "🏆" :
        percentage >= 70 ? "🙌" :
        percentage >= 50 ? "👏" :
        percentage >= 30 ? "👌" :
        "💩";
}

function ShareButton({statistics, currentStreak, bestStreak} : Props) {

    const [shareButtonText, setShareButtonText] = useState("Share")

    const winPercentage = Math.round(100 - (statistics[statistics.length-1] * 100 / statistics.reduce((a, b) => a + b, 0)))
    const shareText = 'Wordle Statistics\n\n' +
        `${getStreakEmoji(currentStreak)} current streak: ${currentStreak}\n` +
        `${getStreakEmoji(bestStreak)} best streak: ${bestStreak}\n` +
        `${getWinPercentageEmoji(winPercentage)} win rate: ${winPercentage}%`

    function share() {
        if (navigator.share) {
            navigator.share({
                title: "Wordle Statistics",
                text: shareText
            })
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                if (shareButtonText !== "Copied") {
                    setTimeout(() => setShareButtonText("Share"), 2000)
                }
                setShareButtonText("Copied")
            })
        }
    }

    return <div className={styles.button} onClick={share}><ShareIcon/>{shareButtonText}</div>
}

export default ShareButton