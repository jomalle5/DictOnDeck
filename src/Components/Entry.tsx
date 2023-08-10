import {Field, Focusable, gamepadDialogClasses} from 'decky-frontend-lib'
import { VFC } from 'react'
import { DictEntry } from '../types'

interface EntryProps{
    entry: DictEntry
}
export const Entry: VFC<EntryProps> = ({
    entry
}) => {
    return(
        <Focusable>
            <Field label={entry.expression} className = {gamepadDialogClasses.Field} childrenLayout='below' highlightOnFocus={true} focusable={true}>
                {entry.reading}
            </Field>
        </Focusable>
    )
};
