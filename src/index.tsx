import {
  definePlugin,
  PanelSection,
  ServerAPI,
  staticClasses,
  TextField,
  Navigation,
  SideMenu,
  Button,
  PanelSectionRow
} from 'decky-frontend-lib';
import {  
  VFC,
  useState,
} from "react";
import { FaShip } from "react-icons/fa";
import {openTextModal} from './Components/TextModal'
import {ResultList} from './Components/ResultList'

const Content: VFC<{ serverAPI: ServerAPI }> = ({serverAPI}) => {
  const [text, setText] = useState("あ");
  const [searchText, setSearchText] = useState("あ");
  const [searched, toggleSearched] = useState(false)
  return (
    <PanelSection>
      <TextField
        value = {text}
        onClick = {async () => {
          Navigation.CloseSideMenus();
          let data = await openTextModal(text);
          Navigation.OpenSideMenu(SideMenu.QuickAccess);
          setText(data);
        }}/>
      <Button onClick={() => {setSearchText(text); toggleSearched(true);}}></Button>
      {searched ? 
      <ResultList serverAPI={serverAPI} searchText={searchText}/> :
      <div>Search...</div>}
    </PanelSection>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  return {
    title: <div className={staticClasses.Title}>DictOnDeck</div>,
    content: <Content serverAPI={serverApi}/>,
    icon: <FaShip />,
    onDismount() {

    },
    alwaysRender: true
  };
});
