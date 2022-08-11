import { node } from '../Board/Board';
import Cell from '../Cell/Cell';
import styles from './Row.module.css'

type Props = {
    word: node[]
}

const Row = ({word}: Props) => (
    <div className={styles.row}>
        {
            word.map((node, index) => <Cell key={index} letter={node.letter}/>)
        }
    </div>
)

export default Row;