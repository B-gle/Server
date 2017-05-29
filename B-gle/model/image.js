class image {
    setFilePath(filePath) {
        this.filePath = filePath;
    }

    setThumbnail(thumbnail) {
        this.thumbnail = thumbnail;
    }

    setURL(url) {
        this.url = url;
    }

    getFilePath() {
        return this.filePath;
    }

    getThumbnail() {
        return this.thumbnail;
    }

    geturl() {
        return this.url;
    }

    setType(type){
        this.type = type;
    }
    getType(){
        return this.type;
    }
}

module.exports = image;

