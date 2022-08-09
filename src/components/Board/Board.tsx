import Row from '../Row/Row';
import styles from './Board.module.css';

const board = () => (
    <div className={styles.board}>
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
    </div>
)

export default board;