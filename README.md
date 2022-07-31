# go-group-imports-with-local

VSCode extension for separating imports in Go files into 4 groups:
1. Standard library imports,
2. Third party imports,
3. local from your organization,
4. Own.

## Extension Settings

* `groupImportsFromLocal.onSave`: automatically group imports on save. Default value is `true`.
* `groupImportsFromLocal.localPackage`: To be set to properly define your organization package
