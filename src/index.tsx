import {
  Button,
  TextField,
  definePlugin,
  PanelSection,
  ServerAPI,
  staticClasses,
  ModalRoot,
  showModal
} from "decky-frontend-lib";
import {  
  VFC,
  useState
} from "react";
import { FaShip } from "react-icons/fa";

// interface AddMethodArgs {
//   left: number;
//   right: number;
// }

const Content: VFC<{ serverAPI: ServerAPI }> = ({}) => {
  const [text, setText] = useState("")
  return (
      <div style = {{}}>
        <Button 
          onClick = {() =>{
            showModal(
              <ModalRoot
               bAllowFullSize = {true}
              >
                <TextField
                  value={text}
                  onChange={(e) => setText(e?.target.value)}
                />
              </ModalRoot>
            )
          }}>
          {text}</Button>
      </div>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  return {
    title: <div className={staticClasses.Title} style = {{zIndex:0}}>DictOnDeck</div>,
    content: <Content serverAPI={serverApi}/>,
    icon: <FaShip />,
    onDismount() {

    },
  };
});
