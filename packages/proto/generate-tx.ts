import * as ts from 'typescript';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

function getProtobufPackage(checker: ts.TypeChecker, sourceFile: ts.SourceFile): string {
  for (const statement of sourceFile.statements) {
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name) && declaration.name.text === 'protobufPackage' && declaration.initializer) {
          return declaration.initializer.getText(sourceFile).replace(/['"`]/g, ''); // Remove quotes from string literal
        }
      }
    }
  }
  return ''; // Default to an empty string or null if not found
}

function isNodeExported(node: ts.Node): boolean {
  return (
    !!node.modifiers && node.modifiers.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) ||
    (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
  );
}

function findMsgExports(fileNames: string[], options: ts.CompilerOptions) {
  let exportObjects: Array<{ parser: string; type: string; }> = [];

  let program = ts.createProgram(fileNames, options);
  let checker = program.getTypeChecker();

  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      const protobufPackage = getProtobufPackage(checker, sourceFile);

      ts.forEachChild(sourceFile, node => {
        if (!isNodeExported(node)) {
          return;
        }

        if (ts.isClassDeclaration(node) || ts.isFunctionDeclaration(node) || ts.isVariableStatement(node)) {
          let nameNode: ts.Node & { name?: ts.Node } = node;
          if (ts.isVariableStatement(node)) {
            const declarations = node.declarationList.declarations;
            nameNode = declarations.length ? declarations[0] : node; // Take the first declaration for simplicity
          }
          if (nameNode.name && ts.isIdentifier(nameNode.name)) {
            const symbol = checker.getSymbolAtLocation(nameNode.name);
            if (symbol) {
              const exportedName = symbol.getName();
              if (exportedName.startsWith("Msg")) {
                exportObjects.push({ parser: exportedName, type: protobufPackage });
              }
            }
          }
        }
      });
    }
  }
  return exportObjects;
}

const files = glob.sync('ts-out/**/*.ts');
const options = { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2015 };

const msgExports = findMsgExports(files, options);

// Now we use msgExports to generate the content
const importLines = msgExports.map((exp, index) => `import * as _${index} from './path/to/${exp.parser}';`).join('\n');
const exportLines = `export const Msgs = [\n${msgExports.map((exp, index) => `  { parser: _${index}.${exp.parser}, typeUrl: '/${exp.type}.${exp.parser}' },`).join('\n')}\n];`;

const fileContent = `${importLines}\n\n${exportLines}`;

const outputPath = path.join(__dirname, '..', 'generatedExports.ts');
fs.writeFileSync(outputPath, fileContent);

console.log('Exports generated in generatedExports.ts');
