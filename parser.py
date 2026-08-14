class ParserError(Exception):
    pass


class Parser:

    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0

    # =========================================================
    # BASIC TOKEN FUNCTIONS
    # =========================================================

    def current(self):
        if self.pos < len(self.tokens):
            return self.tokens[self.pos]
        return None

    def peek(self, offset=1):
        index = self.pos + offset

        if index < len(self.tokens):
            return self.tokens[index]

        return None

    def advance(self):
        token = self.current()

        if token is not None:
            self.pos += 1

        return token

    def check(self, value=None, token_type=None):

        token = self.current()

        if token is None:
            return False

        if value is not None and token.value != value:
            return False

        if token_type is not None and token.type != token_type:
            return False

        return True

    def match(self, value=None, token_type=None):

        if self.check(value, token_type):
            return self.advance()

        return None

    def expect(self, value=None, token_type=None):

        token = self.current()

        if not self.check(value, token_type):

            actual = "EOF" if token is None else (
                f"{token.type} '{token.value}'"
            )

            expected = value if value is not None else token_type

            raise ParserError(
                f"Expected {expected}, got {actual}"
            )

        return self.advance()

    # =========================================================
    # MAIN PARSER
    # =========================================================

    def parse(self):

        body = []

        # Parse includes / preprocessor tokens if present
        while self.current() is not None:

            # int main(...)
            if self.check("int") and self.peek() is not None:

                if self.peek().value == "main":
                    return self.parse_program()

            # Skip anything before main
            self.advance()

        return {
            "type": "Program",
            "body": body
        }

    # =========================================================
    # PROGRAM
    # =========================================================

    def parse_program(self):

        # int
        self.expect("int")

        # main
        self.expect("main")

        # (
        self.expect("(")

        # )
        self.expect(")")

        # {
        self.expect("{")

        body = []

        while self.current() is not None and not self.check("}"):

            statement = self.parse_statement()

            if statement is not None:
                body.append(statement)

        # }
        self.expect("}")

        return {
            "type": "Program",
            "body": body
        }

    # =========================================================
    # STATEMENTS
    # =========================================================

    def parse_statement(self):

        token = self.current()

        if token is None:
            return None

        # int / float / char / double declarations
        if token.value in (
            "int",
            "float",
            "double",
            "char"
        ):
            return self.parse_declaration()

        # printf(...)
        if token.value == "printf":
            return self.parse_printf()

        # return
        if token.value == "return":
            return self.parse_return()

        # identifier = expression;
        if token.type == "IDENTIFIER":

            if self.peek() is not None and self.peek().value == "=":
                return self.parse_assignment()

        # Unknown statement
        self.advance()

        return None

    # =========================================================
    # DECLARATION
    # =========================================================

    def parse_declaration(self):

        data_type = self.advance().value

        name_token = self.expect(token_type="IDENTIFIER")

        name = name_token.value

        value = None

        # =
        if self.match("="):

            value = self.parse_expression()

        # ;
        self.expect(";")

        return {
            "type": "Declaration",
            "data_type": data_type,
            "name": name,
            "value": value
        }

    # =========================================================
    # ASSIGNMENT
    # =========================================================

    def parse_assignment(self):

        name = self.expect(
            token_type="IDENTIFIER"
        ).value

        self.expect("=")

        value = self.parse_expression()

        self.expect(";")

        return {
            "type": "Assignment",
            "name": name,
            "value": value
        }

    # =========================================================
    # PRINTF
    # =========================================================

    def parse_printf(self):

        self.expect("printf")

        self.expect("(")

        arguments = []

        if not self.check(")"):

            while True:

                arguments.append(
                    self.parse_expression()
                )

                if not self.match(","):
                    break

        self.expect(")")

        self.expect(";")

        return {
            "type": "Printf",
            "arguments": arguments
        }

    # =========================================================
    # RETURN
    # =========================================================

    def parse_return(self):

        self.expect("return")

        value = None

        if not self.check(";"):
            value = self.parse_expression()

        self.expect(";")

        return {
            "type": "Return",
            "value": value
        }

    # =========================================================
    # EXPRESSIONS
    # =========================================================

    def parse_expression(self):

        return self.parse_additive()

    # =========================================================
    # + -
    # =========================================================

    def parse_additive(self):

        left = self.parse_multiplicative()

        while self.check("+") or self.check("-"):

            operator = self.advance().value

            right = self.parse_multiplicative()

            left = {
                "type": "BinaryExpression",
                "operator": operator,
                "left": left,
                "right": right
            }

        return left

    # =========================================================
    # * / %
    # =========================================================

    def parse_multiplicative(self):

        left = self.parse_primary()

        while (
            self.check("*")
            or self.check("/")
            or self.check("%")
        ):

            operator = self.advance().value

            right = self.parse_primary()

            left = {
                "type": "BinaryExpression",
                "operator": operator,
                "left": left,
                "right": right
            }

        return left

    # =========================================================
    # PRIMARY
    # =========================================================

    def parse_primary(self):

        token = self.current()

        if token is None:
            raise ParserError(
                "Unexpected end of input"
            )

        # NUMBER
        if token.type == "NUMBER":

            self.advance()

            return {
                "type": "Literal",
                "value": token.value
            }

        # STRING
        if token.type == "STRING":

            self.advance()

            return {
                "type": "Literal",
                "value": token.value
            }

        # IDENTIFIER
        if token.type == "IDENTIFIER":

            self.advance()

            return {
                "type": "Identifier",
                "name": token.value
            }

        # Parenthesized expression
        if token.value == "(":

            self.advance()

            expression = self.parse_expression()

            self.expect(")")

            return expression

        raise ParserError(
            f"Unexpected token: {token.type} '{token.value}'"
        )