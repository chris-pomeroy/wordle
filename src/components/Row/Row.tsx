import Cell from '../Cell/Cell';
import styles from './Row.module.css'

const row = () => (
    <div className={styles.row}>
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
    </div>
)

export default row;