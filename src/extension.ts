// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "serverController" is now active!');
	const serverControllerButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	serverControllerButton.text = '$(server)';
	serverControllerButton.command = 'serverController.startServer';
	serverControllerButton.show();


	context.subscriptions.push(vscode.commands.registerCommand('serverController.startServer', () => {
		const panel = vscode.window.createWebviewPanel(
			'serverController',
			'Server Controller',
			vscode.ViewColumn.Two,
			{
				enableScripts: true,
				localResourceRoots: [
					vscode.Uri.file(path.join(context.extensionPath, 'media'))
				]
			}
		);

		const mediaPath = path.join(context.extensionPath, 'media');
		const indexPath = path.join(mediaPath, 'index.html');
		
		let indexHtml = fs.readFileSync(indexPath, 'utf8');

		const scriptUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(mediaPath, 'script.js')));
		// const styleUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(mediaPath, 'style.css')));
		
		indexHtml = indexHtml.replace(/{{scriptUri}}/g, scriptUri.toString());
		// indexHtml = indexHtml.replace(/{{styleUri}}/g, styleUri.toString());

		// Set the webview HTML content to indexHtml only
		panel.webview.html = indexHtml;
	}));
	// // The command has been defined in the package.json file
	// // Now provide the implementation of the command with registerCommand
	// // The commandId parameter must match the command field in package.json
	// const disposable = vscode.commands.registerCommand('serverController.startServer', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from !');
	// });

	// context.subscriptions.push(disposable);

	
	context.subscriptions.push(serverControllerButton);
}

// This method is called when your extension is deactivated
export function deactivate() {}
