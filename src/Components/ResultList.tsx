import { PanelSectionRow, ProgressBar, ServerAPI } from 'decky-frontend-lib'
import {VFC, useState, useEffect} from 'react'
import {Entry} from './Entry'
import {DictEntry} from '../types'

interface ResultListProps {
    serverAPI: ServerAPI
    searchText: string
}

interface SearchMethodArgs {
    text: string
}

export const ResultList: VFC<ResultListProps> = (
    {serverAPI},
    {searchText}
) => {
    const [entries, setEntries] = useState<DictEntry[]>([])
    const [loading, setLoading] = useState(false)

    useEffect (() => {
        const getEntries = async () => {
            setLoading((current) => !current)
            const res = await serverAPI.callPluginMethod<SearchMethodArgs, string> ("search", {text: searchText});
            if (res.success) {
                setEntries(JSON.parse(res.result))
            }
            setLoading((current) => !current)
        }
        getEntries()
    }, [searchText])

    if (!loading) {
        return(
            <ul>
                {entries?.map((entry) => {
                    return (<Entry entry={entry}/>)
                })}
            </ul>
        )
    }
    return(<p>Loading</p>)
}