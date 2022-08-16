import Cell from './Cell';
import styles from './Row.module.css'

type Props = {
    guess: string
}

const Row = ({guess}: Props) => {
    const row = guess.split('').concat(Array(5 - guess.length).fill(""))
    return (
        <div className={styles.row}>
            {
                row.map((letter, index) => <Cell key={index} letter={letter}/>)
            }
        </div>
    )
}

export default Row;