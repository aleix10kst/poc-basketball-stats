import { MouseEvent, useEffect, useRef, useState } from 'react';
import { GameScoreMarker } from './components/game-score-marker';
import { Scorer } from './components/scorer';
import { formatTime } from './functions/format-time.functions';
import { useMatch } from './providers/match.provider';

type GameEventType = 'score' | 'foul';

type ScoreValue = 1 | 2 | 3;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type GameEvent = {
  ocurredAt: number;
  type: GameEventType;
};

type GameScoreEvent = GameEvent & {
  successful: boolean;
  value: ScoreValue;
  playerId: number;
  position: { x: number; y: number };
};

export function App() {
  const { isTicking, quarter, timeLeft } = useMatch();
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsety] = useState(0);
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [scoreValue, setScoreValue] = useState<ScoreValue>(2);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scoreEvents = events.filter(
    ({ type }) => type === 'score'
  ) as GameScoreEvent[];

  useEffect(() => {
    if (!containerRef) {
      return;
    }
    const offsetX = containerRef.current?.offsetLeft ?? 0;
    const offsetY = containerRef.current?.offsetTop ?? 0;
    setOffsetX(offsetX);
    setOffsety(offsetY);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'z' && event.metaKey && events.length > 1) {
        setEvents((events) => events.slice(0, events.length - 1));
      }
      if (['1', '2', '3'].includes(event.key)) {
        setScoreValue(Number(event.key) as ScoreValue);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [events]);

  const handleClickEvent = (event: MouseEvent) => {
    if (!isTicking) {
      return;
    }
    const positionX = event.pageX - offsetX;
    const positionY = event.pageY - offsetY;

    const scoreEvent: GameScoreEvent = {
      ocurredAt: timeLeft * quarter,
      successful: true,
      type: 'score',
      value: scoreValue,
      position: { x: positionX, y: positionY },
      playerId: 10,
    };
    setEvents((events) => [...events, scoreEvent]);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
      <Scorer />
      <div>Active score: {scoreValue}</div>
      <div style={{ display: 'flex', columnGap: '1rem' }}>
        <div
          style={{
            height: 397,
            width: 700,
            position: 'relative',
          }}
          ref={containerRef}
          onClick={handleClickEvent}
        >
          <img
            src="/basketball-court.jpg"
            alt="court"
            width="100%"
            height="100%"
            style={{ aspectRatio: '16 / 9', position: 'absolute', inset: 0 }}
          />
          {scoreEvents.map((event) => (
            <GameScoreMarker
              key={event.ocurredAt}
              x={event.position.x}
              y={event.position.y}
              scoreValue={event.value}
              successful={event.successful}
            />
          ))}
        </div>
        <div>
          Events
          <ul style={{ listStyle: 'none' }}>
            {scoreEvents.map((event) => (
              <li key={event.ocurredAt}>
                {formatTime(event.ocurredAt)} - {event.value} - {event.playerId}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
