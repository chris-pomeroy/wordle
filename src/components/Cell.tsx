import { node } from './Board'
import styles from './Cell.module.css'

type Props = {
    node: node
}

const Cell = ({node} : Props) => <div className={`${styles.cell} ${styles[node.colour]}`}>{node.letter}</div>

export default Cell;