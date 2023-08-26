import {Field, Focusable} from 'decky-frontend-lib'
import { VFC } from 'react'
import { DictEntry } from '../types'

interface EntryProps{
    entry: DictEntry
}
export const Entry: VFC<EntryProps> = ({
    entry
}) => {
    return(
        <Focusable
            style={{
                width: '100%',
                margin: 0,
                padding: 0
            }}
        >
            <Field
                focusable={true}
                highlightOnFocus={true}
                padding='standard'
                spacingBetweenLabelAndChild="none"
                label={entry.expression}
                description={entry.glossary[0]}
                childrenContainerWidth='min'
            >
                {"("+entry.reading+")"}
            </Field>
        </Focusable>
    )
};
