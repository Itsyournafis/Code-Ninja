from compiler.lexer.lexer import Lexer
from compiler.parser import Parser
from compiler.ir import IRGenerator


source_code = '''
#include <stdio.h>

int main() {

    int a = 10;
    int b = 20;

    int sum = a + b;

    printf("%d", sum);

    return 0;
}
'''


print("\n========== SOURCE CODE ==========")
print(source_code)


# ==========================================
# 1. LEXER
# ==========================================

print("\n========== TOKENS ==========")

lexer = Lexer(source_code)
tokens = lexer.tokenize()

for token in tokens:
    print(token)


# ==========================================
# 2. PARSER
# ==========================================

print("\n========== PARSER / AST ==========")

parser = Parser(tokens)
ast = parser.parse()

print(ast)


# ==========================================
# 3. TAC / IR
# ==========================================

print("\n========== TAC / IR ==========")

ir_generator = IRGenerator()
tac = ir_generator.generate(ast)

print(tac)