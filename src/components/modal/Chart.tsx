import styles from './Chart.module.css'

type Props = {
    statistics: number[]
}

const Chart = ({statistics} : Props) => {
    const labels = ['1', '2', '3', '4', '5', '6', 'X']

    const getWidth = (index : number) => statistics[index] * 100 / Math.max(...statistics);

    return (
        <div className={styles.chart}>
            {labels.map((label, index) => (
                <div key={label} className={styles.row}>
                    <div className={styles.label}>{label}</div>
                    <div className={styles.bar}>
                        <div style={{width: getWidth(index) + '%'}}></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Chart