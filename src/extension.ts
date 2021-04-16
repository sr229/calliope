/// <reference path='..//vscode.d.ts'/>
/// <reference path='../vscode.proposed.d.ts'/>
import * as vscode from 'vscode';

class MothershipHost extends vscode.TreeItem {
	hostName?: string;

	constructor(hostname: string) {
		super(`${hostname}`);
		this.hostName = hostname;
	}
}

class MothershipHosts extends vscode.TreeItem {
	readonly hosts = new Map<number, MothershipHost>();

	constructor() {
		super('Hosts', vscode.TreeItemCollapsibleState.Expanded);
	}
}

type MothershipHostElement = MothershipHosts | MothershipHost;

class MothershipHostsTreeDataProvider implements vscode.TreeDataProvider<MothershipHostElement> {
	readonly hosts = new MothershipHosts();

	protected readonly onDidChangeTreeDataEmitter = new vscode.EventEmitter<MothershipHostElement | undefined>();
	readonly onDidChangeTreeData = this.onDidChangeTreeDataEmitter.event;

	constructor() {}

	getTreeItem(element: MothershipHostElement): vscode.TreeItem {
		return element;
	}

	getChildren(element?: MothershipHostElement): vscode.ProviderResult<MothershipHostElement[]> {
		if (!element) {
			return [this.hosts];
		}

		if (element === this.hosts) {
			return [...this.hosts.hosts.values()];
		}

		return [];
	}

	getParent(element: MothershipHostElement): MothershipHostElement | undefined {
		if (element instanceof MothershipHost) {
			return this.hosts;
		}

		return undefined;
	}
}

export function activate(context: vscode.ExtensionContext) {
	const mothershipHostsTreeDataProvider = new MothershipHostsTreeDataProvider();

	const workspaceView = vscode.window.createTreeView('mothershipHosts', {
		treeDataProvider: mothershipHostsTreeDataProvider
	});
	console.log("Project Mothership has loaded successfully!");
}

// this method is called when your extension is deactivated
export function deactivate() {}