export default function Die(props) {
  const style = {
    backgroundColor: props.isHold ? "#59E391" : "#FFFF",
  };
  return (
    <button
      className="tenzei-btn p-7 text-4xl rounded-md outline-noe"
      style={style}
      id={props.id}
      onClick={() => props.holdHendler(props.id)}
    >
      {props.value}
    </button>
  );
}
