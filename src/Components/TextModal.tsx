import { TextField, ButtonItem, PanelSection, ModalRoot, showModal} from 'decky-frontend-lib'
import { FunctionComponent, useState } from 'react'

export function openTextModal( startText: string,): 
  Promise<string> {
    return new Promise((resolve,reject) => {
      const Modal = ({closeModal}: {closeModal?: () => void}) => (
        <ModalRoot
          onCancel={() => {
            reject('');
            closeModal?.()
          }}
        >
          <TextModal
            startText = {startText}
            onSubmit = {async (text) => {resolve(text)}}
            closeModal={closeModal}
          />
        </ModalRoot>
      ); showModal(<Modal/>)
    });
  } 

interface TextModalProps {
    startText: string;
    onSubmit: (res: string) => void;
    closeModal?: () => void
}

const TextModal: FunctionComponent<TextModalProps> = ({
  startText,
  onSubmit,
  closeModal
}) => {
  const [text, setText] = useState<string>(startText)
  return(
    <div>
      <TextField
        value = {text}
        onChange = {(e) => e.target.value && setText(e.target.value)}
        onKeyDown = {(e) => {if (e.key === 'Enter') {onSubmit(text); closeModal?.()}}}
        />
      <PanelSection>
        <ButtonItem
          onClick = {() => {
            onSubmit(text);
            closeModal?.()
            }}
        	>
          Submit
        </ButtonItem>
        <ButtonItem
          onClick = {() => {closeModal?.()}}
          >
          Close
        </ButtonItem>
      </PanelSection>
    </div>
    );
};

export default TextModal;