import {
    ServerAPI,
    PanelSection,
    ProgressBar,
    PanelSectionRow
} from 'decky-frontend-lib'
import {
    VFC,
    useEffect,
    useState
} from 'react'
import { Entry } from './Entry'
import { Pagination } from './Pagination'
import { DictEntry } from '../types'

interface ResultListProps {
    serverAPI: ServerAPI
    searchText: string
}

interface SearchMethodArgs {
    text: string
}

export const ResultList: VFC<ResultListProps> = ({
    serverAPI,
    searchText
}) => {
    const entriesPerPage = 4

    const [loading, setLoading] = useState(false)
    const [entries, setEntries] = useState<DictEntry[]>([])
    const [currentPage, setCurrentPage] = useState(1)

    const changePage = (num: number) => {
        if (num > 0 && num <= Math.ceil(entries.length/entriesPerPage)) {
          setCurrentPage(num)
        }
    }

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

    const indexOfLastEntry = currentPage * entriesPerPage
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
    const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry)
    
    if (loading) {
        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <ProgressBar indeterminate nProgress={0}/>
            </div>
        )
    }
    return(
        <PanelSection>
            {currentEntries?.map((entry) => {
                    return (
                        <PanelSectionRow>
                            <Entry entry={entry}/>
                        </PanelSectionRow>)
            })}
            <Pagination
                currentPage = {currentPage}
                totalPages = {Math.ceil(entries.length/entriesPerPage)}
                changePage={changePage}
            />
        </PanelSection>
    )
}