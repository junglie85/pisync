import * as assert from 'assert';
import { FileInfo, synchronisedFiles } from '../../fs';

suite('filesystem', () => {
    test('when there are no localfiles there are no files to transfer', () => {
        const localFiles: Array<FileInfo> = new Array();
        const remoteFiles: Array<FileInfo> = new Array();

        const filesToTransfer: Array<FileInfo> = synchronisedFiles(localFiles, remoteFiles);

        assert.deepEqual(new Array(), filesToTransfer);
    });
});
