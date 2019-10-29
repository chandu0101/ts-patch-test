import * as ts from "typescript";
export interface TranformerOptions {

}




export function transformer(program: ts.Program, opts?: TranformerOptions) {
    console.log("Calling transformer");
    const visitor = (ctx: ts.TransformationContext, sf: ts.SourceFile, result: { seen: boolean }) => {
        const typeChecker = program.getTypeChecker();
        const visitor: ts.Visitor = (node: ts.Node) => {
            if (ts.isCallExpression(node) && node.typeArguments && node.expression.getText(sf) == "getReducer") {
                console.log("Ok here");
                return node;
            }
            return ts.visitEachChild(node, visitor, ctx)
        }

        return visitor;
    }

    return (ctx: ts.TransformationContext) => {
        return (sf: ts.SourceFile) => {
            const result = { seen: false };
            const newSf = ts.visitNode(sf, visitor(ctx, sf, result));
            return newSf;
        };
    }
}