import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { FileInfo } from './fs';


function getAllFiles(dirPath: string, allFiles: Array<FileInfo>, depth: number): Array<FileInfo> {
	const files = fs.readdirSync(dirPath);

	files.forEach(async (file) => {
		const stat = fs.lstatSync(`${dirPath}/${file}`);
		if (stat.isDirectory()) {
			allFiles = getAllFiles(`${dirPath}/${file}`, allFiles, depth + 1);
		} else {
			const info = new FileInfo(path.join(dirPath, '/', file), stat.mtimeMs, stat.isSymbolicLink());
			allFiles.push(info);
		}
	});

	return allFiles;
}

export async function activate(context: vscode.ExtensionContext) {
	console.log('PiSync extension activated');

	let deployArtifacts = vscode.commands.registerCommand('pisync.deployArtifacts', async () => {
		const user = vscode.workspace.getConfiguration('pisync').get('target.user');
		const address = vscode.workspace.getConfiguration('pisync').get('target.address');

		if (user === "" || address === "") {
			vscode.window.showErrorMessage('Invalid target configuration');
			return;
		}

		vscode.window.showInformationMessage(`Artifacts deployed to ${user}@${address}`);
		let channel = vscode.window.createOutputChannel("pisync");
		channel.show();

		// Get target cwd

		// Get map of files/dirs that need to be deployed (should support globbing?)
		// {
		// 	 "build": "build",
		// 	 "assets": "build/assets"
		// }
		const sm = vscode.workspace.getConfiguration('pisync').get('artifacts.synchronisedDirectories') as Record<string, string>;
		const sourceMap = new Map(Object.entries(sm));
		for (let [k, v] of sourceMap) {
			channel.appendLine(`local: ${k} -> remote: ${v}`);
		}

		// Get workspace folder
		if (vscode.workspace.workspaceFolders) {
			const workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;

			// Build into set of local files (fullpath)
			channel.appendLine(`Current dir: ${workspaceFolder}`);
			try {
				let files = new Array();
				files = getAllFiles(`${workspaceFolder}/build`, files, 0);
				for (let f of files) {
					channel.appendLine(`path: ${f.filePath}; modified: ${f.modifiedMs}; link=${f.isLink}`);
				}
			} catch (e) {
				channel.appendLine(`${e}`);
			}

		}


		// Get stats of all local files

		// Build into set of remote files (fullpath)

		// Build into set of remote directory paths

		// Get stats of all files in remote directory paths

		// Compare stats and if local has newer timestamp or remote version does not exist, add to set to upload

		// Upload files, display progress

		channel.appendLine(`Artifacts deployed to ${user}@${address}`);
	});

	context.subscriptions.push(deployArtifacts);
}

export async function deactivate() { }
