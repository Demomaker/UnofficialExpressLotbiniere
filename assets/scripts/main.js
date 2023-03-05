const FILE_TYPES = Object.freeze({
    FileImage: 'fileImage',
    FileOther: 'fileOther',
});

const fileExtensionToType = {
    'png': FILE_TYPES.FileImage,
    'jpg': FILE_TYPES.FileImage,
    'pdf': FILE_TYPES.FileImage,
}

const getFileExtension = (fileURL) => {
    return fileURL.split('.').pop();
}

const getFileType = (fileURL) => {
    const extension = getFileExtension(fileURL);
    return fileExtensionToType[extension] ?? FILE_TYPES.Other;
}

const getExtraElement = (fileType, fileURL) => {
    switch (fileType) {
        case FILE_TYPES.FileImage:
            const imgElement = document.createElement('img');
            imgElement.src = fileURL;
            return imgElement;
        case FILE_TYPES.FileText:
            return undefined;
        case FILE_TYPES.FileOther:
            return undefined;
    }
}

const generateElement = (fileType, fileURL) => {
    const divElement = document.createElement('div');
    const hElement = document.createElement('h4');
    hElement.textContent = fileTitles[fileURL];
    const extraElement = getExtraElement(fileType, fileURL);
    const viewButtonElement = document.createElement('button');
    viewButtonElement.textContent = 'Actions';
    viewButtonElement.onclick = () => {
        window.open(fileURL);
    };
    const nodeArray = extraElement ? [hElement, extraElement, viewButtonElement] : [hElement, viewButtonElement];
    nodeArray.map(node => divElement.appendChild(node));
    return divElement;
}

const generateFilesInBody = (fileURLs) => {
    console.log(fileURLs);
    for(const fileURL of fileURLs) {
        const fileType = getFileType(fileURL);
        const element = generateElement(fileType, fileURL);
        document.body.append(element);
    }
}

generateFilesInBody(fileURLs);