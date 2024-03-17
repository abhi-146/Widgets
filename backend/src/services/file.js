const File = require("../models/file.model");
const { getWidgetById } = require("./widget");
const path = require('path');
const fs = require('fs');
const { resize } = require("../utilities/utility");

exports.toAuthJson = function(file) {

    try {
        
        let jsonFile =  {
            id: file._id,
            widgetId: file.widgetId,
            name: file.name,
            displayName: file.displayName,
            url: file.url,
            thumbnailUrl: file.thumbnailUrl,
            size: file.size,
            mimeType: file.mimeType,
            desc: file.desc,
            password: file.password
        }

        return jsonFile
    } catch (error) {
        throw error;
    }
}

exports.getFileById = async (fileId) => {

    try {

        var file = await File.findById(fileId);

        if (!file) {
            throw Error("FileNotFound");
        }

        return file;

    } catch (error) {
        throw error;
    }

}

exports.getAllFiles = async (widgetId) => {

    try {

        const files = await File.find({ widgetId: widgetId });
        return files;

    } catch (error) {
        throw error;
    }
}

exports.addFile = async (widgetId, fileData) => {
    try {

        let updatedFileData = {
            widgetId: widgetId,
            name: fileData.filename,
            displayName: fileData.originalname,
            url: encodeURIComponent(process.env.SERVER_URL + '/uploads/' + fileData.filename),
            size: fileData.size,
            mimeType: fileData.mimetype
        };

        // Store thumbnail
        let thumbnailName = '';
        if (fileData.mimetype.indexOf('image') !== -1) {
            thumbnailName = await resize(fileData);
        } else if (fileData.mimetype.indexOf('pdf') !== -1) {
            thumbnailName = 'pdf-thumbnail.png'
        } else if (fileData.mimetype.indexOf('audio') !== -1) {
            thumbnailName = 'audio-thumbnail.png'
        } else if (fileData.mimetype.indexOf('video') !== -1) {
            thumbnailName = 'video-thumbnail.png'
        } else if (fileData.mimetype.indexOf('zip') !== -1) {
            thumbnailName = 'zip-thumbnail.png'
        } else {
            thumbnailName = 'document.png'
        }

        updatedFileData.thumbnailUrl = encodeURIComponent(process.env.SERVER_URL + '/uploads/thumbnails/' + thumbnailName);
        let file = new File(updatedFileData);

        await file.save();

        // update files array in widget
        let widget = await getWidgetById(widgetId);
        let filesArray = widget?.htmlData?.files?.docs || [];
        filesArray.push(file.id);
        if (filesArray) {
            widget.htmlData.files.docs = filesArray;
        }

        await widget.save();

        return file;

    } catch (error) {
        throw error;
    }
}

exports.updateFile = async (fileId, fileData) => {
    try {

        const updatedFile = await File.findByIdAndUpdate(
            fileId,
            fileData,
            {
                new: true, // Return the updated document
                runValidators: true
            }
        );

        if (!updatedFile) {
            throw Error("FileNotFound");
        }

        return updatedFile;

    } catch (error) {
        throw error;
    }
}

exports.deleteFile = async (fileId) => {
    try {

        const deletedFile = await File.findByIdAndDelete(fileId);

        if (!deletedFile) {
            throw Error("FileNotFound");
        }

        // Delete file from uploads folder
        const filePath = path.join(process.cwd(), 'uploads', deletedFile.name);
        if (filePath) {
            fs.unlinkSync(filePath);
        }

        if (deletedFile.mimeType.indexOf('image') !== -1) {
            // Delete image thumbnail
            const thumbnailfilePath = path.join(process.cwd(), 'uploads/thumbnails/', path.parse(deletedFile.name).name + '-thumbnail.jpg');
            if (thumbnailfilePath) {
                fs.unlinkSync(thumbnailfilePath);
            }
        }

        // Update files array of widget
        const widget = await getWidgetById(deletedFile.widgetId);
        let filesArray = widget?.htmlData?.files?.docs || [];
        const indexToRemove = filesArray.findIndex((file) => { return file.toString() === fileId });
        if (indexToRemove !== -1) {
            filesArray.splice(indexToRemove, 1);
        }
        widget.htmlData.files.docs = filesArray;

        await widget.save();

        return deletedFile;

    } catch (error) {
        throw error;
    }
}

exports.deleteWidgetFiles = async (widgetId) => {
    try {

        const filesToDelete = await File.find({ widgetId: widgetId });

        await File.deleteMany({ widgetId: widgetId });

        filesToDelete.forEach(file => {
            const filePath = path.join(process.cwd(), 'uploads', file.name);
            if (filePath) {
                fs.unlinkSync(filePath);
            }

            const thumbnailfilePath = path.join(process.cwd(), 'uploads/thumbnails/', path.parse(file.name).name + '-thumbnail.jpg');
            if (thumbnailfilePath) {
                fs.unlinkSync(thumbnailfilePath);
            }

        });

        return filesToDelete;
    } catch (error) {
        throw error;
    }
};