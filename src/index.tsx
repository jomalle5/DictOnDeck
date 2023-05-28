import {
  ButtonItem,
  definePlugin,
  PanelSection,
  ServerAPI,
  staticClasses,
  TextField
} from "decky-frontend-lib";
import {  
  VFC,
  useState,
} from "react";
import { FaShip } from "react-icons/fa";
import * as backend from './backend';
import {openTextModal} from './Components/TextModal'
{/*
  TODO:
    >Pick a way to store the state of query in between component loads and unloads
      Could store it in the backend since py code is live the whole time the plugin is mounted
      Could write it to disk
      Having the state stored in definePlugin could even work but that would require passing a function all the way down to the modal to set it
    >Design some way to show the definitions of words, could have a single list or pages
    >Potentially import the dictionaries into a database and just execute queries on that?
      Could be useful for allowing users to search multiple dictionaries at once
    >Order dictionaries entries in some way, probably by commoness (word rarity may be included in the dictionary)
    >Look at dictionaries other than JMDict_English, their definitions would need to be cleaned up after being read
*/}

const Content: VFC<{ serverAPI: ServerAPI}> = () => {

  const [text, setText] = useState("")
  const [count, setCount] = useState(0)
  backend.resolvePromise(backend.getQuery(), setText)
  return (
      <PanelSection>
        <ButtonItem
            onClick = {async () => {let data = await openTextModal(text); setText(data)}}
        >
        Search...
        </ButtonItem>
        <TextField
          value ={text}
          onKeyDown = {(e) => {if (e.key === 'Enter') setCount(count + 1)}}
          onChange={(e) => e.target.value && setText(e.target.value)}
          
        />
        Submitted {count} times {text}
      </PanelSection>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  backend.setServer(serverApi)
  return {
    title: <div className={staticClasses.Title}>DictOnDeck</div>,
    content: <Content serverAPI={serverApi}/>,
    icon: <FaShip />,
    onDismount() {

    },
    alwaysRender: true
  };
});
