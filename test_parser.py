from compiler.lexer.lexer import Lexer
from compiler.parser import Parser

source = """
unsigned int factorial(unsigned int n)
{
    if (n == 1)
    {
        return 1;
    }

    return n * factorial(n - 1);
}
"""

lexer = Lexer(source)

tokens = lexer.tokenize()

print("\n========== TOKENS ==========\n")

for token in tokens:
    print(token)


parser = Parser(tokens)

ast = parser.parse()

print("\n========== AST ==========\n")

print(ast)

print("\n========== ERRORS ==========\n")

print(parser.errors)