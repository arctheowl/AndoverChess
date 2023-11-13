type Props = {
  points: string;
};

const CleanPoints = ({ points }: Props) => {
  if (points !== undefined && points !== null) {
    points = points.trim();
    switch (points.includes("½")) {
      case true:
        return parseInt(points) + 0.5;
      default:
        return parseInt(points);
    }
  }
};

export default CleanPoints;
