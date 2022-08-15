import { node } from './Board';
import Cell from './Cell';
import styles from './Row.module.css'

type Props = {
    nodes: node[]
}

const Row = ({nodes}: Props) => (
    <div className={styles.row}>
        {
            nodes.map((node, index) => <Cell key={index} node={node}/>)
        }
    </div>
)

export default Row;