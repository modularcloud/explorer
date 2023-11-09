import * as ts from 'typescript';
import { glob } from 'glob';

function findMsgExports(fileNames: string[], options: ts.CompilerOptions): string[] {
  let allExports: string[] = [];

  // Create a Program using the set of root file names in fileNames
  let program = ts.createProgram(fileNames, options);

  // Get the checker, we will use it to find more about classes
  let checker = program.getTypeChecker();

  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      // For each source file, visit all the nodes
      ts.forEachChild(sourceFile, visit);
    }
  }

  function visit(node: ts.Node) {
    // Only consider exported nodes
    if (!isNodeExported(node)) {
      return;
    }

    if (ts.isModuleDeclaration(node)) {
      // This is a namespace, visit its children
      ts.forEachChild(node, visit);
    } else if (ts.isClassDeclaration(node) || ts.isFunctionDeclaration(node)) {
      // Variable and function declaration
      addExportIfMsg(node);
    } else if (ts.isVariableStatement(node)) {
      // Variable statement, can contain multiple declarations
      for (const declaration of node.declarationList.declarations) {
        addExportIfMsg(declaration);
      }
    }
  }

  function addExportIfMsg(node: ts.Node & { name?: ts.Node }) {
    if (node.name && ts.isIdentifier(node.name)) {
      const symbol = checker.getSymbolAtLocation(node.name);
      if (symbol) {
        const exportedName = symbol.getName();
        // Check if the exported name starts with "Msg"
        if (exportedName.startsWith("Msg")) {
          allExports.push(exportedName);
        }
      }
    }
  }

  function isNodeExported(node: ts.Node): boolean {
    return (
      !!node.modifiers && node.modifiers.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) ||
      (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
    );
  }

  return allExports;
}

// Specify path to the root TypeScript files and options
const files = glob.sync('ts-out/**/*.ts');
const options = { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2015 };

const msgExports = findMsgExports(files, options);

// Generate code based on the exports
// ...

console.log(msgExports);
