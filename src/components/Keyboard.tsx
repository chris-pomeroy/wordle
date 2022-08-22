import Key from './Key'
import styles from './Keyboard.module.css'

type Props = {
    keys: string[][]
    keyHandler: (key: string) => void
    isActive: (key: string) => boolean
    getKeyColour: (key: string) => string
}

const Keyboard = ({keys, keyHandler, isActive, getKeyColour}: Props) => (
    <div className={styles.keyboard}>
        {keys.map((row, index) => (
            <div key={index} className={styles.keyrow}>
                {row.map(letter => <Key key={letter} letter={letter} onClick={() => keyHandler(letter)} isActive={isActive(letter)} colour={getKeyColour(letter)} />)}
            </div>
        ))}
    </div>
)

export default Keyboard