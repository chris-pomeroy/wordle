import Key from './Key'
import styles from './Keyboard.module.css'

type Props = {
    keyHandler: (key: string) => void
    getKeyClasses: (key: string) => string[]
}

const Keyboard = ({keyHandler, getKeyClasses}: Props) => {
    
    const keys = [
        ["Q","W","E","R","T","Y","U","I","O","P"],
        ["A","S","D","F","G","H","J","K","L"],
        ["↵","Z","X","C","V","B","N","M","⌫"]
    ]

    return (
        <div className={styles.keyboard}>
            {keys.map((row, index) => (
                <div key={index} className={styles.keyrow}>
                    {row.map(letter => <Key key={letter} letter={letter} onClick={() => keyHandler(letter)} classes={getKeyClasses(letter)} />)}
                </div>
            ))}
        </div>
    )
}

export default Keyboard