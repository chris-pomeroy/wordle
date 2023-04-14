import styles from './Statistic.module.css'

type Props = {
    value: number
    message: string
}

function Statistic({value, message}: Props) {
    return (
        <div className={styles.statistic}>
            <h2>{value}</h2>
            {message.split(" ").map(line => <div key={line}>{line}</div>)}
        </div>
    )
}

export default Statistic