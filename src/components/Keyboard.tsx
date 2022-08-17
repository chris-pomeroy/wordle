import Key from './Key'
import styles from './Keyboard.module.css'

const Keyboard = () => {

    const keys = [
        ["Q","W","E","R","T","Y","U","I","O","P"],
        ["A","S","D","F","G","H","J","K","L"],
        ["Z","X","C","V","B","N","M"]
    ]

    return (
        <div className={styles.keyboard}>
            {keys.map(row => (
                <div className={styles.keyrow}>{row.map(letter => <Key letter={letter} />)}</div>
            ))}
        </div>
    )

}

export default Keyboard