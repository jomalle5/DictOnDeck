import { 
    Focusable,
    DialogButton,
    PanelSectionRow
 } from 'decky-frontend-lib'
import { VFC } from 'react'
import {
    FaChevronLeft, 
    FaChevronRight
} from 'react-icons/fa'
interface PaginationProps {
    currentPage: number
    totalPages: number
    changePage: (num: number) => void
}

export const Pagination: VFC<PaginationProps> =  ({
    currentPage,
    totalPages,
    changePage
}) => {
    return(
    <PanelSectionRow>
        <Focusable
            flow-children='horizontal'
            style = {{display: "flex", padding: 0, gap: "8px", justifyContent:'space-around'}}
        >
            <DialogButton 
                style={{minWidth: 0, width: "25%", height: "28px", padding: "6px"}}
                onClick = {() => {changePage(currentPage - 1)}}
            >
                <FaChevronLeft/>
            </DialogButton>
            <div
                style={{minWidth: 0, width: "50%", height: "28px", padding: "6px", textAlign:'center'}}
            >
                {currentPage} / {totalPages}
            </div>
            <DialogButton
                style={{minWidth: 0, width: "25%", height: "28px", padding: "6px"}}
                onClick = {() => {changePage(currentPage + 1)}}
            >
                <FaChevronRight/>
            </DialogButton>
        </Focusable>
    </PanelSectionRow>
    )
}
