import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [blackCount, setBlackCount] = useState(2);
  const [whiteCount, setWhiteCount] = useState(2);

  const [turnJudge, setTurnJudge] = useState("black");

  const directions = [
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
  ];

  const [turnColor, setTurnColor] = useState(1);
  const clickCell = (x: number, y: number) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    let stonePlaced = false;
    if (newBoard[y][x] === 0) {
      for (const canPlace of directions) {
        for(let distance = 1; distance < 8; distance++) {
          if (newBoard[y + canPlace[0] * distance] === undefined) {
            break;
          } else {
            if (newBoard[y + canPlace[0] * distance][x + canPlace[1] * distance] === undefined) {
              break;
            } else if (newBoard[y + canPlace[0] * distance][x + canPlace[1] * distance] === 0) {
              break;
            } else if (newBoard[y + canPlace[0] * distance][x + canPlace[1] * distance] === turnColor) {
              if (distance > 1) {
                for(let back = distance; back >= 0; back--) {
                  newBoard[y + canPlace[0] * back][x + canPlace[1] * back] = turnColor;
                }
                setBoard(newBoard);
                setTurnColor(3 - turnColor);
                stonePlaced = true;
              }
              break;
            } else if (newBoard[y + canPlace[0] * distance][x + canPlace[1] * distance] === 3 - turnColor) {
              continue;
            }
          }
        }
      }
    }

    if (stonePlaced) {
      let countStoneBlack = 0;
      let countStoneWhite = 0;
      for (let wide = 0; wide < 8; wide++) {
        for (let warp = 0; warp < 8; warp++) {
          if (newBoard[wide][warp] === 1) {
            countStoneBlack++;
          } else if (newBoard[wide][warp] === 2) {
            countStoneWhite++;
          }
        }
      }
      setBlackCount(countStoneBlack);
      setWhiteCount(countStoneWhite);

      if (turnColor === 2) {
        setTurnJudge("Black"); 
      } else if (turnColor === 1) {
        setTurnJudge("White");
      }
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.now}>
        Black: {blackCount} / White: {whiteCount}
      </h2>
      <h2 className={styles.now}>
        Turn: {turnJudge}
      </h2>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickCell(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ backgroundColor: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
