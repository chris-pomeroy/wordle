import styles from './Chart.module.css'

type Props = {
    statistics: number[]
}

function Chart({statistics} : Props) {
    const labels = ['1', '2', '3', '4', '5', '6', 'X']

    function getWidth(index: number) {
        return statistics[index] * 100 / Math.max(...statistics)
    }

    return (
        <div className={styles.chart}>
            {labels.map((label, index) => (
                <div key={label} className={styles.row}>
                    <div className={styles.label}>{label}</div>
                    {statistics[index] !== 0 &&
                        <div className={styles.bar}>
                            <div style={{width: getWidth(index) + '%'}}>{statistics[index]}</div>
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

export default Chart