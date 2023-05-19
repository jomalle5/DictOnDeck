import {
  ModalRoot,
  showModal
} from 'decky-frontend-lib'
import TextModal from './Components/TextModal'

class SearchManager {  
  openTextModal( startText: string,): 
    Promise<string> {
    return new Promise((resolve,reject) => {
      const Content = ({closeModal}: {closeModal?: () => void}) => (
        <ModalRoot
          onCancel={() => {
            reject('');
            closeModal?.()
          }}
        >
          <TextModal
            startText = {startText}
            onSubmit = {resolve}
            closeModal={closeModal}
          />
        </ModalRoot>
      ); showModal(<Content/>)
    });
  }
}
export default SearchManager;