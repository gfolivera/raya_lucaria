// import * as S from "../pages/style";
import successIcon from "../assets/successMsg.png";
import informIcon from "../assets/infoMsg.png";
import errorIcon from "../assets/errorMsg.png";

interface MessageProps {
  message: string;
  type: 0 | 1 | 2; // 0: success, 1: error, 2: inform
  ref: React.RefObject<HTMLDialogElement | null>;
  toglleDialog: () => void;
}

function MessageScreen({ message, type, ref, toglleDialog }: MessageProps) {
  const imageSources = [successIcon, errorIcon, informIcon];
  const dialogStyle = {
    display: "inlineBlock",
    backgroundColor: "royalblue",
    alignItems: "center",
    borderRadius: "8px",
    color: "azure",
    border: "solid 2px rgba(187, 217, 224, 0.75)",
  };

  return (
    <dialog ref={ref} style={dialogStyle}>
      <img src={imageSources[type]} width={"50"} />
      <p>{message}</p>
      <button type="button" onClick={toglleDialog}>
        OK
      </button>
    </dialog>
  );
}

export default MessageScreen;
