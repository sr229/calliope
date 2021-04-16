/// <reference path='..//vscode.d.ts'/>
/// <reference path='../vscode.proposed.d.ts'/>
import * as vscode from 'vscode';

class MothershipWorkspaces extends vscode.TreeItem {
	//TODO: find out what kind of data we want to instantiate here!
}


export function activate(context: vscode.ExtensionContext) {
	console.log("Project Mothership has loaded successfully!");
}

// this method is called when your extension is deactivated
export function deactivate() {}