import styles from './Modal.module.css'

type Props = {
    active: boolean
    children: JSX.Element
}

const ModalBackdrop = ({active, children} : Props) => (
    <div className={`${styles.backdrop} ${active ? styles.active : ""}`}>
        {children}
    </div>
)

export default ModalBackdrop