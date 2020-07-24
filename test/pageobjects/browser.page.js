import Page from './page'
import ModalComponent from './components/browser_modal.component'

class BrowserPage extends Page {
    
    //Main Nav Links
    get browserLink() {return $('=Browser')}
    get searchLink() {return $('=Search')}
    get searchPageButton() {return $('.button.ui:nth-child(1)')}
    get searchPageLabel() {return $('.ui.label')}

    //File Tree
    get myFiles() {return $('.webix_selected > span:nth-child(3)')}
    get myFilesTree() {return $$('.webix_tree_leaves .webix_tree_branch_2')}
    get filesTreeCLose() {return $('.webix_tree_leaves .webix_tree_open')}
    get filesTreeOpen() {return $('.webix_tree_leaves .webix_tree_close')}
    myFilesFolder(folder) {return $(`div[webix_tm_id="/${folder}"]`) }

    //Zip Downloads Popup
    get ldsRing() {return $('.lds-ring')}
    get folderDownloadsBtn() {return $('.button.ui:nth-child(1)')}
    get closeDownloads() {return $('.zip-jobs-header > button')}
    downloadZip(row) {return $(`.et-tr.ember-view:nth-child(${row}) .ember-view:nth-child(5)`)}
    jobID(row) {return $(`.et-tr.ember-view:nth-child(${row}) .et-cell-content`)}
    
    //File Explorer
    get refresh() {return $('.wxi-sync')}
    get sizeSortLabel() {return $('.webix_last_row:nth-child(2) > div:nth-child(1)')}
    get sizeSortButton() {return $('.webix_ss_sort_single')}
    get firstFile() {return $('.webix_column:nth-child(1) > div:nth-child(2)')} 
    get folderSelection() {return $('.webix_cell.folder')}
    fileSelection(row) {return $(`.webix_column:nth-child(1) > div:nth-child(${row})`);}
    get secondFolder() {return $('.webix_cell.folder:nth-child(3)')}
    get filePath() {return $('.webix_header > div:nth-child(1)')}
    get backToParentLink() {return $('.webix_fmanager_back')}
    get myDocuments() {return $('.webix_tree_branch_5')}
    myFilePath(folder) { return $(`.webix_fmanager_path_chunk:nth-child(${folder})`) }

    //Right Click Options
    get downloadLink() {return $('.webix_list_item.menu[webix_l_id="bbdownload"]')}
    get shareLink() {return $('.webix_list_item.menu[webix_l_id="bbshare"]')}
    get infoLink() {return $('.webix_list_item.menu[webix_l_id="bbinfo"]')}

    //Popup Dialog Options
    get popUpTitle() {return $('.webix_popup_title')}
    get popUpText() {return $('.webix_popup_text')}
    get popUpOk() {return $('.webix_popup_button')}
    get popUpCancel() {return $('.webix_popup_button:nth-child(1)')}
    get popUpOkay() {return $('.webix_popup_button:nth-child(2)')}  
    
    //Pagination
    get paginationController() {return $('.webix_pager')}
    pageButton(button) {return $(`.webix_pager_item[webix_p_id="${button}"]`)}
    
    //File/Folders Search
    get searchBox() {return $('.webix_el_box > input')}
    get searchNavText() {return $('.webix_template')}
    get folderCard() {return $('.webix_fmanager_card_name.folder')}
    get threeDots() {return $('.wxi-dots')}
    get folderIcon() {return $('.webix_fmanager_folder_icon')}
    get fileCard() {return $('.webix_fmanager_card')}
    get fileCardName() {return $('.webix_fmanager_card_name')}
    fileTile(tile)  {return $(`.webix_dataview_item.tiles:nth-child(${tile})`)}

    get treeLeaves(){
        return this.myFilesTree.map((modal) => new ModalComponent(modal));
    }

    get firstFolder(){
        return this.treeLeaves[0].folderName
    }
    
    get lastFolder(){
        let index = this.treeLeaves.length
        return this.treeLeaves[index-1].folderName
    }

    fileName(row){
        return this.fileSelection(row).$('.file-name').getText()
    }

    get folderName(){
        return this.folderSelection.getText()
    }

    folderDownload(row){
        this.ldsRing.waitForDisplayed({ timeout: 300000, reverse: true })
        this.downloadZip(row).waitForExist({ timeout: 300000 })
        this.downloadZip(row).click()
        return this
    }

    getJobID(row){
        this.jobID(row).waitForExist({ timeout: 300000 })
        return this.jobID(row).getText()
    }
    
    selectFolder(folder){
        this.myFilesFolder(folder).scrollIntoView()
        this.myFilesFolder(folder).click()
        return this.myFilesFolder(folder).getText()
    }

    checkFilePath(folder){
        return this.myFilePath(folder).getText()
    }

    checkFolderDownloadsPopup(){
        this.folderDownloadsBtn.waitForDisplayed()
        this.folderDownloadsBtn.click()
        this.closeDownloads.click()
    }

    closeFolderDownloadsPopup(){
        this.closeDownloads.waitForDisplayed()
        this.closeDownloads.click()
    }

    rightClickFileInfo(row){
        this.fileSelection(row).waitForExist()
        this.fileSelection(row).click()
        this.fileSelection(row).click({button: 2})
        this.infoLink.waitForExist()
        this.infoLink.click()
    }

    rightClickFolderInfo(){
        this.folderSelection.waitForExist()
        this.folderSelection.click()
        this.folderSelection.click({button: 2})
        this.infoLink.waitForExist()
        this.infoLink.click()
    }

    rightClickCardInfo(){
        this.threeDots.waitForDisplayed()
        this.threeDots.click()
        this.infoLink.waitForDisplayed()
        this.infoLink.click()
    }

    rightClickFileShare(row){
        this.fileSelection(row).waitForExist()
        this.fileSelection(row).click()
        this.fileSelection(row).click({button: 2})
        this.shareLink.waitForExist()
        this.shareLink.click()
    }

    rightClickFolderShare(){
        this.folderSelection.waitForExist()
        this.folderSelection.click()
        this.folderSelection.click({button: 2})
        this.shareLink.waitForExist()
        this.shareLink.click()
    }

    rightClickCardShare(){
        this.threeDots.waitForDisplayed()
        this.threeDots.click()
        this.shareLink.waitForDisplayed()
        this.shareLink.click()
        this.popUpCancel.click()
        this.popUpCancel.waitForDisplayed({ reverse: true })
    }

    rightClickFileDownload(row){
        this.fileSelection(row).waitForExist()
        this.fileSelection(row).click()
        this.fileSelection(row).click({button: 2})
        this.downloadLink.waitForExist()
        this.downloadLink.click()
    }

    rightClickFolderDownload(){
        this.folderSelection.waitForExist()
        this.folderSelection.click()
        this.folderSelection.click({button: 2})
        this.downloadLink.waitForExist()
        this.downloadLink.click()
    }

    rightClickSelectedFolderDownload(folder){
        this.myFilesFolder(folder).waitForExist()
        this.myFilesFolder(folder).click()
        this.myFilesFolder(folder).click({button: 2})
        this.downloadLink.waitForExist()
        this.downloadLink.click()
    }

    rightClickCardDownload(){
        this.threeDots.waitForDisplayed()
        this.threeDots.click()
        this.downloadLink.waitForDisplayed()
        this.downloadLink.click()
        this.downloadLink.waitForDisplayed({ reverse: true })
    }
}
export default new BrowserPage()