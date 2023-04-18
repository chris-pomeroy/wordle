import { useState } from 'react'
import styles from './Button.module.css'
import ShareIcon from "./ShareIcon"

type Props = {
    currentStreak: number
    bestStreak: number
    statistics: number[]
}

function getStreakEmoji(streak: number) {
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

function getWinPercentageEmoji(percentage: number) {
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
            navigator.clipboard.writeText(shareText)
            if (shareButtonText !== "Copied") {
                setTimeout(() => setShareButtonText("Share"), 2000)
            }
            setShareButtonText("Copied")
        }
    }

    return <div className={styles.button} onClick={share}><ShareIcon/>{shareButtonText}</div>
}

export default ShareButton