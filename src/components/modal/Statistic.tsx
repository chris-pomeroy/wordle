import styles from './Statistic.module.css'

type Props = {
    value: number
    message: string[]
}

const Statistic = ({value, message}: Props) => (
    <div className={styles.statistic}>
        <h2>{value}</h2>
        {message.map(line => <div>{line}</div>)}
    </div>
)

export default Statistic