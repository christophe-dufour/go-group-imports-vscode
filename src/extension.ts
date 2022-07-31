'use strict';
import { commands, ExtensionContext, workspace } from 'vscode';
import { goGroupImportsWithLocal } from './group';
import { updateSaveRegistration } from './register';

export function activate(context: ExtensionContext) {
  let disposable = commands.registerCommand(
    'extension.goGroupImportsWithLocal',
    goGroupImportsWithLocal
  );
  context.subscriptions.push(disposable);

  updateSaveRegistration();
  workspace.onDidChangeConfiguration(updateSaveRegistration);
}

export function deactivate() { }
