import { useEffect, useState } from "react";
// import * as S from "../pages/style";
import successIcon from "../assets/successMsg.png";
import informIcon from "../assets/infoMsg.png";
import errorIcon from "../assets/errorMsg.png";

interface MessageProps {
  message: string;
  type: "success" | "error" | "inform";
  ref: React.RefObject<HTMLDialogElement | null>;
  toglleDialog: () => void;
}

function MessageScreen({ message, type, ref, toglleDialog }: MessageProps) {
  const imageSources = [successIcon, errorIcon, informIcon];
  const [typeRef, setTypeRef] = useState<number>(1);
  const dialogStyle = {
    display: "inlineBlock",
    backgroundColor: "rgb(0, 146, 146)",
    alignItems: "center",
    borderRadius: "8px",
    border: "solid 2px rgba(187, 217, 224, 0.75)",
  };
  useEffect(() => {
    switch (type) {
      case "success":
        setTypeRef(0);
        break;
      case "error":
        setTypeRef(1);
        break;
      case "inform":
        setTypeRef(2);
        break;
    }
  }, []);
  return (
    <dialog ref={ref} style={dialogStyle}>
      <img src={imageSources[typeRef]} width={"50"} />
      <p>{message}</p>
      <button type="button" onClick={toglleDialog}>
        OK
      </button>
    </dialog>
  );
}

export default MessageScreen;
