const {toAuthJson, getFileById, getAllFiles, addFile, updateFile, deleteFile} = require("../services/file");
const multer = require('multer');

exports.getFileById = async (req, res) => {
    try {

        const id = req.params.id;

        const file = await getFileById(id);

        res.json({ file: toAuthJson(file) });

    } catch (error) {
        console.error(error);
    
        if(error.message == "FileNotFound") {
          return res.status(404).json("Widget not found.");
        } else {
            res.status(500).json('Internal server error');
        }

    }
}

exports.getAllFiles = async (req, res) => {
    try {
        
        const widgetId = req.params.id;
        const files = await getAllFiles(widgetId);
        let allFiles = files.map((file) => (toAuthJson(file)))
        res.status(200).json(allFiles);
        
        
    } catch (error) {

        console.error(error);
        res.status(500).json('Internal server error');

    }
}

exports.addFile = async (req, res) => {
    try {

        let widgetId = req.body.widgetId;
        let file = req.file;

        if(file) {

            const fileAdded = await addFile(widgetId, file);

            res.status(201).json({
                file: toAuthJson(fileAdded)
            });
        } else {
            throw Error("EmptyFile");
        }

    } catch(error) {
        console.log(error)
        if(error.message === "EmptyFile") {
            return res.status(400).json('Empty file');
        } else if (error instanceof multer.MulterError) {
            return res.status(400).json('File upload error: ' + error.message);
        } else if (error) {
            return res.status(500).json('Internal server error');
        }
    }
}

exports.updateFile = async (req, res) => {
    try {

        let user = req.user;

        if(!user) {
            res.status(403).send("Invalid JWT token");
        } else {

            let fileData = req.body.file;

            const updatedFile = await updateFile(req.params.id, fileData);
    
            res.status(200).json({ message: 'File updated successfully', file: toAuthJson(updatedFile) });

        }

    } catch (error) {

        console.error(error);

        if(error.message === "FileNotFound") {

            return res.status(404).json("File not found.");

        } else if(error.name == "ValidationError") {
            
            res.status(400).json(error.message);
        } else {
            
            res.status(500).json('Internal server error');
        }

    }
}

exports.deleteFile = async (req,res) => {
    try {

        let user = req.user;

        if(!user) {
            res.status(403).send("Invalid JWT token");
        } else {

            const deletedFile = await deleteFile(req.params.id);

            res.status(200).json({ message: 'File deleted successfully', file: toAuthJson(deletedFile) });

        }

    } catch (error) {

        console.error(error);

        if(error.message === "FileNotFound") {
            return res.status(404).json("File not found.");
        } else {
            res.status(500).json('Internal server error');
        }

    }
}