import {
  definePlugin,
  PanelSection,
  ServerAPI,
  staticClasses,
  TextField,
  Navigation,
  SideMenu,
  DialogButton,
  PanelSectionRow,
  Focusable
} from 'decky-frontend-lib'

import {  
  VFC,
  useState
} from "react"
import { FaBook, FaSearch } from "react-icons/fa"

import { openTextModal } from './Components/TextModal'
import { ResultList } from './Components/ResultList'

const Content: VFC<{ serverAPI: ServerAPI }> = ({serverAPI}) => {
  const [text, setText] = useState("")
  const [searchText, setSearchText] = useState("")
  const [searched, toggleSearched] = useState(false)

  return (
    <PanelSection>

      <PanelSectionRow>
        <Focusable 
          flow-children='horizontal'
          style={{display: "flex", justifyContent: 'space-between', padding: 0, gap: "8px"}}
        >
          <div 
          style={{flexGrow: 1}}
          >
            <TextField
              value = {text}
              onClick = {async () => {
                Navigation.CloseSideMenus();
                let data = await openTextModal(text);
                Navigation.OpenSideMenu(SideMenu.QuickAccess);
                setText(data);
              }}
            />
          </div>
          <DialogButton 
            style={{minWidth: 0, width: "15%", padding: "6px"}}
            onClick={() => {setSearchText(text); toggleSearched(true);}}
          >
            <FaSearch/>
          </DialogButton>
        </Focusable>
      </PanelSectionRow>
      <PanelSectionRow>
        {searched ? 
          <ResultList 
            serverAPI = {serverAPI}
            searchText = {searchText}
          /> : 
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Search...</div>}
      </PanelSectionRow>
    </PanelSection>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  return {
    title: <div className={staticClasses.Title}>DictOnDeck</div>,
    content: <Content serverAPI={serverApi}/>,
    icon: <FaBook />,
    onDismount() {

    },
    alwaysRender: true
  };
});
