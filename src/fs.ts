export class FileInfo {
    filePath: string;
    modifiedMs: number;
    isLink: boolean;

    constructor(filePath: string, modifiedMs: number, isLink: boolean) {
        this.filePath = filePath;
        this.modifiedMs = modifiedMs;
        this.isLink = isLink;
    }
}

export function synchronisedFiles(localFiles: Array<FileInfo>, remoteFiles: Array<FileInfo>): Array<FileInfo> {
    return new Array();
}
