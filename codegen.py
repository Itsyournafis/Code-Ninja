class CodeGenerator:

    def __init__(self, target):
        self.target = target.lower()

    def generate(self, instructions):

        if self.target == "python":
            return self.generate_python(instructions)

        if self.target == "java":
            return self.generate_java(instructions)

        if self.target == "cpp":
            return self.generate_cpp(instructions)

        if self.target == "assembly":
            return self.generate_assembly(instructions)

        raise ValueError(
            f"Unsupported target language: {self.target}"
        )

    # =========================
    # PYTHON
    # =========================

    def generate_python(self, instructions):

        output = [
            "# Code Ninja - Generated Python Code",
            ""
        ]

        for instruction in instructions:

            op = instruction.get("op")
            args = instruction.get("args", [])

            if op == "DECLARE":

                variable = args[0]
                value = args[1]

                output.append(
                    f"{variable} = {value}"
                )

            elif op == "ADD":

                result, left, right = args

                output.append(
                    f"{result} = {left} + {right}"
                )

            elif op == "SUB":

                result, left, right = args

                output.append(
                    f"{result} = {left} - {right}"
                )

            elif op == "MUL":

                result, left, right = args

                output.append(
                    f"{result} = {left} * {right}"
                )

            elif op == "DIV":

                result, left, right = args

                output.append(
                    f"{result} = {left} / {right}"
                )

            elif op == "PRINT":

                output.append(
                    f"print({args[0]})"
                )

            elif op == "RETURN":

                output.append(
                    f"return {args[0]}"
                )

        return "\n".join(output)

    # =========================
    # JAVA
    # =========================

    def generate_java(self, instructions):

        output = [
            "// Code Ninja - Generated Java Code",
            "",
            "public class Main {",
            "    public static void main(String[] args) {"
        ]

        for instruction in instructions:

            op = instruction.get("op")
            args = instruction.get("args", [])

            if op == "DECLARE":

                variable = args[0]
                value = args[1]

                output.append(
                    f"        int {variable} = {value};"
                )

            elif op == "ADD":

                result, left, right = args

                output.append(
                    f"        int {result} = {left} + {right};"
                )

            elif op == "SUB":

                result, left, right = args

                output.append(
                    f"        int {result} = {left} - {right};"
                )

            elif op == "MUL":

                result, left, right = args

                output.append(
                    f"        int {result} = {left} * {right};"
                )

            elif op == "DIV":

                result, left, right = args

                output.append(
                    f"        int {result} = {left} / {right};"
                )

            elif op == "PRINT":

                output.append(
                    f"        System.out.println({args[0]});"
                )

            elif op == "RETURN":

                pass

        output.append("    }")
        output.append("}")

        return "\n".join(output)

    # =========================
    # C++
    # =========================

    def generate_cpp(self, instructions):

        output = [
            "// Code Ninja - Generated C++ Code",
            "#include <iostream>",
            "",
            "using namespace std;",
            "",
            "int main() {"
        ]

        for instruction in instructions:

            op = instruction.get("op")
            args = instruction.get("args", [])

            if op == "DECLARE":

                variable = args[0]
                value = args[1]

                output.append(
                    f"    int {variable} = {value};"
                )

            elif op == "ADD":

                result, left, right = args

                output.append(
                    f"    int {result} = {left} + {right};"
                )

            elif op == "SUB":

                result, left, right = args

                output.append(
                    f"    int {result} = {left} - {right};"
                )

            elif op == "MUL":

                result, left, right = args

                output.append(
                    f"    int {result} = {left} * {right};"
                )

            elif op == "DIV":

                result, left, right = args

                output.append(
                    f"    int {result} = {left} / {right};"
                )

            elif op == "PRINT":

                output.append(
                    f"    cout << {args[0]} << endl;"
                )

            elif op == "RETURN":

                output.append(
                    f"    return {args[0]};"
                )

        output.append("}")

        return "\n".join(output)

    # =========================
    # ASSEMBLY
    # =========================

    def generate_assembly(self, instructions):

        output = [
            "; Code Ninja - Generated Assembly",
            "; x86-64 style pseudo assembly",
            ""
        ]

        for instruction in instructions:

            op = instruction.get("op")
            args = instruction.get("args", [])

            if op == "DECLARE":

                variable = args[0]
                value = args[1]

                output.append(
                    f"; {variable} = {value}"
                )

            elif op == "ADD":

                result, left, right = args

                output.append(
                    f"MOV RAX, {left}"
                )

                output.append(
                    f"ADD RAX, {right}"
                )

                output.append(
                    f"MOV {result}, RAX"
                )

            elif op == "SUB":

                result, left, right = args

                output.append(
                    f"MOV RAX, {left}"
                )

                output.append(
                    f"SUB RAX, {right}"
                )

                output.append(
                    f"MOV {result}, RAX"
                )

            elif op == "MUL":

                result, left, right = args

                output.append(
                    f"MOV RAX, {left}"
                )

                output.append(
                    f"IMUL RAX, {right}"
                )

                output.append(
                    f"MOV {result}, RAX"
                )

            elif op == "DIV":

                result, left, right = args

                output.append(
                    f"MOV RAX, {left}"
                )

                output.append(
                    "XOR RDX, RDX"
                )

                output.append(
                    f"DIV {right}"
                )

                output.append(
                    f"MOV {result}, RAX"
                )

            elif op == "PRINT":

                output.append(
                    f"; PRINT {args[0]}"
                )

            elif op == "RETURN":

                output.append(
                    f"MOV RAX, {args[0]}"
                )

                output.append(
                    "RET"
                )

        return "\n".join(output)