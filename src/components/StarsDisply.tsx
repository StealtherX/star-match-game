import { mathUtils } from "../utilities/math-utilities";

export const StarsDisply = (props) => {
  return (
    <>
      {mathUtils.range(1, props.count).map((starId) => (
        <div key={starId} className="star" />
      ))}
    </>
  );
};
