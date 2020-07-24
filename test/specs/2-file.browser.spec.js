import LoginPage from '../pageobjects/login.page'
import BrowserPage from '../pageobjects/browser.page'
import testData from '../data/testdata'

const utilities= require("../../support/utils/Utilities")
const fs = require('fs')
const path = require('path')
const chai = require('chai')
const assert = require('assert')
const { expect } = require('chai')

describe('file browser', () => {
    before(function(){
        LoginPage.open()
        LoginPage.login()
        BrowserPage.browserLink.click()
    })
    
    it('should display folder downloads jobs', () => {
        BrowserPage.checkFolderDownloadsPopup()
    })

    it('should show all files and folders in file tree', () => {
        BrowserPage.filesTreeCLose.click()
        BrowserPage.filesTreeOpen.click()
        
        expect(BrowserPage.firstFolder).equals(testData.firstFolder)
        expect(BrowserPage.treeLeaves).to.have.lengthOf(testData.folderCount)
        //expect(BrowserPage.lastFolder).equals(testData.equipmentID)
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
    })

    it('should navigate back to parent folders', () => {
        BrowserPage.backToParentLink.doubleClick()
        expect(BrowserPage.folderSelection.getText()).equal(testData.tFolder3)
        expect(BrowserPage.checkFilePath(7)).to.equal(testData.tFolder2) 

        BrowserPage.backToParentLink.doubleClick()
        expect(BrowserPage.folderSelection.getText()).equal(testData.tFolder2)
        expect(BrowserPage.checkFilePath(5)).to.equal(testData.tFolder1) 
        
        BrowserPage.backToParentLink.doubleClick()
        expect(BrowserPage.folderSelection.getText()).equal(testData.tFolder1)
        expect(BrowserPage.checkFilePath(3)).to.equal(testData.equipmentID) 

        BrowserPage.myDocuments.click()
    })

    it('should navigate away and retain browser page state', () => {
        BrowserPage.searchLink.click()
        expect(BrowserPage.searchPageButton.getText()).equal('Search')
        expect(BrowserPage.searchPageLabel.getText()).contains("File path")
        BrowserPage.browserLink.click()
        expect(BrowserPage.folderSelection.getText()).equal(testData.tFolder4)
        expect(BrowserPage.checkFilePath(9)).to.equal(testData.tFolder3)
    })


    it('should display selected file info', () => {
        BrowserPage.rightClickFileInfo(3)
        expect(BrowserPage.popUpTitle.getText()).equal(testData.fileName)
        expect(BrowserPage.popUpText.getText()).contains("Type: File")
        expect(BrowserPage.popUpText.getText()).contains("Equipment: " + testData.equipmentID)
        BrowserPage.popUpOk.click()   
    })

    it('should display file share dialog window', () => {
        BrowserPage.rightClickFileShare(3)
        expect(BrowserPage.popUpTitle.getText()).equal('Document Share')
        BrowserPage.popUpCancel.click()   
    })

    it('should display selected folder info', () => {
        BrowserPage.rightClickFolderInfo()
        expect(BrowserPage.popUpTitle.getText()).equal(testData.folderName)
        expect(BrowserPage.popUpText.getText()).contains("Type: Folder")
        expect(BrowserPage.popUpText.getText()).contains("Equipment: " + testData.equipmentID)
        BrowserPage.popUpOk.click()   
    })

    it('should display folder share dialog window', () => {
        BrowserPage.rightClickFolderShare()
        expect(BrowserPage.popUpTitle.getText()).equal('Document Share')
        BrowserPage.popUpCancel.click()
        browser.pause(3000)   
    })

    it('should display pagination for folders', () => {

        expect(BrowserPage.selectFolder(testData.paginationFolder)).equal(testData.paginationFolder)
        expect(BrowserPage.checkFilePath(3)).to.equal(testData.paginationFolder)
        
        expect(BrowserPage.secondFolder.getText()).equal(testData.pFolder1)
        BrowserPage.secondFolder.doubleClick()
        expect(BrowserPage.checkFilePath(5)).to.equal(testData.pFolder1)
        
        expect(BrowserPage.folderSelection.getText()).equal(testData.pFolder2)
        BrowserPage.folderSelection.doubleClick()
        expect(BrowserPage.checkFilePath(7)).to.equal(testData.pFolder2)
       
        expect(BrowserPage.folderSelection.getText()).equal(testData.pFolder3)
        BrowserPage.folderSelection.doubleClick()
        expect(BrowserPage.checkFilePath(9)).to.equal(testData.pFolder3)

        BrowserPage.paginationController.waitForExist()
        
        BrowserPage.pageButton('last').click()
        BrowserPage.ldsRing.waitForDisplayed({ reverse: true })
        expect(BrowserPage.paginationController.getText()).equal('2 of 2')
        //check file expected on page 2 
        //expect($('div.webix_column:nth-child(1) > div:nth-child(13)').getText()).equal("meow.txt")

        BrowserPage.pageButton('first').click()
        BrowserPage.ldsRing.waitForDisplayed({ reverse: true })
        expect(BrowserPage.paginationController.getText()).equal('1 of 2')
        //check file expected on page 1
        //expect($('div.webix_column:nth-child(1) > div:nth-child(4)').getText()).equal("abc.txt")
        
        BrowserPage.pageButton('next').click()
        BrowserPage.ldsRing.waitForDisplayed({ reverse: true })
        expect(BrowserPage.paginationController.getText()).equal('2 of 2')
    
        BrowserPage.pageButton('prev').click()
        BrowserPage.ldsRing.waitForDisplayed({ reverse: true })
        expect(BrowserPage.paginationController.getText()).equal('1 of 2')
    })
    
    it('should delete a file from a selected folder', () => {
        expect(BrowserPage.selectFolder(testData.deleteFolder)).equal(testData.deleteFolder)
        
        for (let i = 0; i < 10; i++) {
            BrowserPage.folderSelection.doubleClick()
            BrowserPage.folderSelection.waitForDisplayed()
        }
        BrowserPage.firstFile.waitForDisplayed()
        BrowserPage.firstFile.click()
        let filename = BrowserPage.firstFile.getText()
        browser.keys("Backspace")
        BrowserPage.popUpCancel.waitForDisplayed()
        BrowserPage.popUpCancel.click()
        expect(BrowserPage.firstFile.getText()).equal(filename)
        browser.keys("Backspace")
        BrowserPage.popUpOkay.click()
        BrowserPage.firstFile.waitForDisplayed()
        browser.pause(500)
        expect(BrowserPage.firstFile.getText()).to.not.equal(filename)
    })
    
    it('should delete a folder from the file tree', () => {
        expect(BrowserPage.selectFolder(testData.deleteFolder)).equal(testData.deleteFolder)
        
        for (let i = 0; i < 9; i++) {
            BrowserPage.folderSelection.doubleClick()
            BrowserPage.folderSelection.waitForDisplayed()
        }
        BrowserPage.firstFile.waitForDisplayed()
        BrowserPage.firstFile.click()
        let foldername = BrowserPage.firstFile.getText()
        browser.keys("Backspace")
        BrowserPage.popUpCancel.waitForDisplayed()
        BrowserPage.popUpCancel.click()
        BrowserPage.firstFile.waitForDisplayed()
        expect(BrowserPage.firstFile.getText()).equal(foldername)
        browser.keys("Backspace")
        BrowserPage.popUpOkay.click()
        BrowserPage.firstFile.waitForDisplayed({ reverse: true })
    })
    
    it('should sort and refresh files in folder', () => {
        expect(BrowserPage.selectFolder(testData.equipmentID)).equal(testData.equipmentID)
        for (let x = 0; x < 5; x++) {
            BrowserPage.folderSelection.doubleClick()
            BrowserPage.folderSelection.waitForDisplayed()
        }
        
        BrowserPage.ldsRing.waitForDisplayed({ reverse: true })
        expect(BrowserPage.fileSelection(2).getText()).to.equal(testData.testFile1)
        expect(BrowserPage.fileSelection(3).getText()).to.equal(testData.testFile2)
        expect(BrowserPage.fileSelection(4).getText()).to.equal(testData.testFile3)

        BrowserPage.sizeSortLabel.click()
        BrowserPage.sizeSortButton.waitForDisplayed()
        expect(BrowserPage.fileSelection(2).getText()).to.equal(testData.testFile3)
        expect(BrowserPage.fileSelection(3).getText()).to.equal(testData.testFile1)
        expect(BrowserPage.fileSelection(4).getText()).to.equal(testData.testFile2)

        BrowserPage.refresh.click()
        BrowserPage.ldsRing.waitForDisplayed({ reverse: true })
        expect(BrowserPage.fileSelection(2).getText()).to.equal(testData.testFile1)
        expect(BrowserPage.fileSelection(3).getText()).to.equal(testData.testFile2)
        expect(BrowserPage.fileSelection(4).getText()).to.equal(testData.testFile3)
    })
})