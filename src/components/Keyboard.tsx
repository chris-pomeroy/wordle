import Key from './Key'
import styles from './Keyboard.module.css'

type Props = {
    keyHandler: (key: string) => void
    isActive: (key: string) => boolean
    getKeyColour: (key: string) => string
}

const Keyboard = ({keyHandler, isActive, getKeyColour}: Props) => {
    
    const keys = [
        ["Q","W","E","R","T","Y","U","I","O","P"],
        ["A","S","D","F","G","H","J","K","L"],
        ["↵","Z","X","C","V","B","N","M","⌫"]
    ]

    return (
        <div className={styles.keyboard}>
            {keys.map((row, index) => (
                <div key={index} className={styles.keyrow}>
                    {row.map(letter => <Key key={letter} letter={letter} onClick={() => keyHandler(letter)} isActive={isActive(letter)} colour={getKeyColour(letter)} />)}
                </div>
            ))}
        </div>
    )
}

export default Keyboard