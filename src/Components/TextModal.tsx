import { TextField, ButtonItem, PanelSection} from 'decky-frontend-lib'
import { FunctionComponent, useState } from 'react'

export interface TextModalProps {
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
        <div className = "DictTextInput">
            <TextField
                value = {text}
                onChange = {(e) => e.target.value && setText(e.target.value)}
                onKeyDown = {(e) => {if (e.key === 'Enter') onSubmit(text)}}
            />
            <PanelSection>
                <ButtonItem
                    onClick = {() => {
                        onSubmit(text);
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