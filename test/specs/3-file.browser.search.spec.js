import LoginPage from '../pageobjects/login.page'
import BrowserPage from '../pageobjects/browser.page'
import testData from '../data/testdata'

const utilities= require("../../support/utils/Utilities")
const path = require('path')
const { expect } = require('chai')

describe('file browser search', () => {
    before(function(){
        LoginPage.open()
        LoginPage.login()
        BrowserPage.browserLink.click()
    })
    
    it('should return folder search results', () => {
        BrowserPage.myFiles.scrollIntoView()
        BrowserPage.myFiles.click()
        
        BrowserPage.searchBox.click()
        browser.pause(200)
        BrowserPage.searchBox.addValue(testData.equipmentID)
        
        BrowserPage.searchNavText.waitForDisplayed()
        expect(BrowserPage.searchNavText.getText()).equal('Search results in My Files')
        
        BrowserPage.folderCard.waitForDisplayed()
        expect(BrowserPage.folderCard.getText()).equal(testData.equipmentID)
        
        BrowserPage.rightClickCardDownload()
        BrowserPage.checkFolderDownloadsPopup()

        BrowserPage.rightClickCardInfo()
        expect(BrowserPage.popUpTitle.getText()).equal(testData.equipmentID)
        expect(BrowserPage.popUpText.getText()).contains("Type: Folder")
        expect(BrowserPage.popUpText.getText()).contains("File Count: 4")
        BrowserPage.popUpOk.click()

        browser.pause(300)
        BrowserPage.rightClickCardShare()

        BrowserPage.folderIcon.waitForDisplayed()
        BrowserPage.folderIcon.doubleClick()
        
        BrowserPage.searchBox.waitForDisplayed()
        BrowserPage.searchBox.click()
        browser.pause(200)
        BrowserPage.searchBox.addValue('RAUNY')

        BrowserPage.searchNavText.waitForDisplayed()
        expect(BrowserPage.searchNavText.getText()).equal('Search results in My Files/rauny-1')
        
        BrowserPage.folderIcon.doubleClick()

        BrowserPage.fileName(2).waitForDisplayed
        expect(BrowserPage.fileName(2)).equal('audio_only.m4a')
        expect(BrowserPage.fileName(3)).equal('zoom_0.mp4')
        expect(BrowserPage.fileName(4)).equal('playback.m3u')

        BrowserPage.searchBox.click()
        BrowserPage.searchBox.setValue('m4a')
        BrowserPage.fileCard.waitForDisplayed()
        browser.pause(300)
        expect(BrowserPage.fileCardName.getText()).to.equal('audio_only.m4a')
        
        BrowserPage.searchBox.click()
        BrowserPage.searchBox.setValue('mp4')
        BrowserPage.fileCard.waitForDisplayed()
        browser.pause(300) 
        expect(BrowserPage.fileCardName.getText()).to.equal('zoom_0.mp4')
       
        BrowserPage.searchBox.click()
        BrowserPage.searchBox.setValue('m3u')
        BrowserPage.fileCard.waitForDisplayed()
        browser.pause(300)
        expect(BrowserPage.fileCardName.getText()).to.equal('playback.m3u')

        BrowserPage.searchBox.click()
        BrowserPage.searchBox.setValue('m')
        BrowserPage.fileCard.waitForDisplayed()
        browser.pause(300)

        expect(BrowserPage.fileTile(1).getText()).to.equal('playback.m3u')
        browser.pause(300)
        expect(BrowserPage.fileTile(2).getText()).to.equal('audio_only.m4a')
        browser.pause(300)
        expect(BrowserPage.fileTile(3).getText()).to.equal('zoom_0.mp4')
       
        BrowserPage.rightClickCardInfo()
        expect(BrowserPage.popUpTitle.getText()).equal('playback.m3u')
        expect(BrowserPage.popUpText.getText()).contains("Type: File")
        expect(BrowserPage.popUpText.getText()).contains(testData.equipmentID)
        BrowserPage.popUpOk.click()
        
        browser.pause(300)
        BrowserPage.rightClickCardShare()
        browser.pause(300)

        browser.pause(300)
        BrowserPage.rightClickCardDownload()
        
        let searchFilePath = path.join(global.downloadDir, 'playback.m3u')
        browser.call(function () {
            return utilities.checkExistsWithTimeout (searchFilePath, 60000)
        })
    })
})