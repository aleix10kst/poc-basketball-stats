import { useEffect, useRef } from 'react';
import { formatTime } from '../functions/format-time.functions';
import { useMatch, useMatchDispatch } from '../providers/match.provider';

export const Scorer = () => {
  const { isTicking, timeLeft, quarter } = useMatch();
  const dispatch = useMatchDispatch();
  const intervalRef = useRef<NodeJS.Timer | undefined>(undefined);

  useEffect(() => {
    if (!isTicking) {
      return () => clearInterval(intervalRef.current!);
    }
    intervalRef.current = setInterval(() => {
      if (timeLeft === 0) {
        if (quarter < 4) {
          dispatch({ type: 'end quarter' });
        }
        clearInterval(intervalRef.current!);
        return;
      }
      dispatch({ type: 'changed', payload: { timeLeft: timeLeft - 1 } });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [isTicking, dispatch, timeLeft, quarter]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'Space') {
        return;
      }
      dispatch({ type: 'changed', payload: { isTicking: !isTicking } });
    };
    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dispatch, isTicking]);

  return (
    <div>
      <pre>
        Time left: {formatTime(timeLeft)} / Quarter: {quarter}
        <hr />
        <button onClick={() => dispatch({ type: 'reset' })}>Reset match</button>
      </pre>
    </div>
  );
};
