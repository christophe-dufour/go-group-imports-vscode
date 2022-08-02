import { window } from 'vscode';
import { goGroupImportsWithLocal } from './group';

export const groupImportsOnSave = () => {
  if (!window.activeTextEditor.document.languageId.includes('go')) {
    return;
  }
  return goGroupImportsWithLocal();
};
