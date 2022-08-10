import Cell from '../Cell/Cell';
import styles from './Row.module.css'

type Props = {
    word: string[]
}

const Row = ({word}: Props) => (
    <div className={styles.row}>
        {
            word.map((letter, index) => <Cell key={index} letter={letter}/>)
        }
    </div>
)

export default Row;