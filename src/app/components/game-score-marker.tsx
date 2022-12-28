type GameScoreMarkerProps = {
  x: number;
  y: number;
  scoreValue: number;
  successful: boolean;
};

export const GameScoreMarker = ({
  x,
  y,
  scoreValue,
  successful,
}: GameScoreMarkerProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        color: `${successful ? 'green' : 'red'}`,
      }}
    >
      {scoreValue}
    </div>
  );
};
