import LoginPage from '../pageobjects/login.page'
import BrowserPage from '../pageobjects/browser.page'
import testData from '../data/testdata'

const utilities= require("../../support/utils/Utilities")
const path = require('path')
const assert = require('assert')
const { expect } = require('chai')

describe('file browser download', () => {
    before(function(){
        LoginPage.open()
        LoginPage.login()
        BrowserPage.browserLink.click()
    })
    
    it('should display selected folder contents and file path', () => {
        expect(BrowserPage.selectFolder(testData.equipmentID)).equal(testData.equipmentID)
        expect(BrowserPage.checkFilePath(3)).to.equal(testData.equipmentID) 
        
        expect(BrowserPage.folderSelection.getText()).equal(testData.tFolder1)
        BrowserPage.folderSelection.doubleClick()
        expect(BrowserPage.checkFilePath(5)).to.equal(testData.tFolder1) 

        expect(BrowserPage.folderSelection.getText()).equal(testData.tFolder2)
        BrowserPage.folderSelection.doubleClick()
        expect(BrowserPage.checkFilePath(7)).to.equal(testData.tFolder2) 

        expect(BrowserPage.folderSelection.getText()).equal(testData.tFolder3)
        BrowserPage.folderSelection.doubleClick()
        expect(BrowserPage.checkFilePath(9)).to.equal(testData.tFolder3)
        //BrowserPage.checkFolderContents() 
    })

    it('should download folder contents in zip format', () => {
        BrowserPage.rightClickFolderDownload()
        expect(BrowserPage.folderName).equal(testData.folderName)
        BrowserPage.folderDownloadsBtn.click()
        let fileName = BrowserPage.getJobID(2) + '.zip'
        console.log("JOB_ID: " + fileName)
        let filePath = path.join(global.downloadDir, fileName)
        
        assert.ok(BrowserPage.folderDownload(2))
        
        browser.call(function () {
            return utilities.checkExistsWithTimeout (filePath, 60000)
        })
        //BrowserPage.checkFolderStructure()
        BrowserPage.closeFolderDownloadsPopup()
    })

    it('should complete a large folder download', () => {
        BrowserPage.selectFolder(testData.largeFolder)
        BrowserPage.rightClickSelectedFolderDownload(testData.largeFolder)
        BrowserPage.popUpTitle.waitForDisplayed()
        expect(BrowserPage.popUpTitle.getText()).equal('Downloading a large folder')
        BrowserPage.popUpCancel.click()
        BrowserPage.selectFolder(testData.largeFolder)
        BrowserPage.rightClickSelectedFolderDownload(testData.largeFolder)
        BrowserPage.popUpOkay.waitForDisplayed()
        BrowserPage.popUpOkay.click()
        expect(BrowserPage.popUpText.getText()).equal('Please keep the page open for the download to complete.')
        BrowserPage.popUpOk.click()
        BrowserPage.folderDownloadsBtn.click()
        let fileName = BrowserPage.getJobID(3) + '.zip'
        console.log("JOB_ID: " + fileName)
        let filePath = path.join(global.downloadDir, fileName)
        
        assert.ok(BrowserPage.folderDownload(3))
        
        browser.call(function () {
             return utilities.checkExistsWithTimeout(filePath, 300000)
        })
        BrowserPage.closeFolderDownloadsPopup()
    })

})