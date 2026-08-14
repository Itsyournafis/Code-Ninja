from flask import Flask, render_template, request, jsonify

from compiler.lexer.lexer import Lexer
from compiler.parser import Parser
from compiler.semantic import SemanticAnalyzer
from compiler.ir import IRGenerator
from compiler.codegen import CodeGenerator


# ============================================================
# FLASK APPLICATION
# ============================================================

app = Flask(__name__)


# ============================================================
# HOME PAGE
# ============================================================

@app.route("/")
def home():

    return render_template("index.html")


# ============================================================
# CONVERT CODE
# ============================================================

@app.route("/convert", methods=["POST"])
def convert():

    try:

        # ----------------------------------------------------
        # GET REQUEST DATA
        # ----------------------------------------------------

        data = request.get_json(silent=True)

        if not data:

            return jsonify({
                "success": False,
                "error": "No JSON data received."
            }), 400

        source_code = data.get(
            "code",
            ""
        )

        target = data.get(
            "target",
            "python"
        ).lower()


        # ----------------------------------------------------
        # EMPTY CODE CHECK
        # ----------------------------------------------------

        if not source_code.strip():

            return jsonify({

                "success": False,

                "error": "Please enter C source code."

            }), 400


        # ====================================================
        # 1. LEXICAL ANALYSIS
        # ====================================================

        lexer = Lexer(source_code)

        tokens = lexer.tokenize()


        # Convert Token objects → JSON
        token_data = []

        for token in tokens:

            if hasattr(token, "to_dict"):

                token_data.append(
                    token.to_dict()
                )

            else:

                token_data.append({

                    "type": getattr(
                        token,
                        "type",
                        "UNKNOWN"
                    ),

                    "value": getattr(
                        token,
                        "value",
                        ""
                    ),

                    "line": getattr(
                        token,
                        "line",
                        0
                    )

                })


        # ====================================================
        # 2. PARSING
        # ====================================================

        parser = Parser(tokens)

        ast = parser.parse()


        # ====================================================
        # 3. SEMANTIC ANALYSIS
        # ====================================================

        semantic = SemanticAnalyzer()

        semantic_result = semantic.analyze(ast)


        # ----------------------------------------------------
        # SAFE SEMANTIC RESULT
        # ----------------------------------------------------

        if not isinstance(
            semantic_result,
            dict
        ):

            semantic_result = {}


        symbols = semantic_result.get(
            "symbols",
            {}
        )

        errors = semantic_result.get(
            "errors",
            []
        )


        # ====================================================
        # 4. INTERMEDIATE CODE / TAC
        # ====================================================

        ir_generator = IRGenerator()

        tac = ir_generator.generate(ast)


        # ====================================================
        # 5. TARGET CODE GENERATION
        # ====================================================

        code_generator = CodeGenerator(
            target
        )

        generated_code = code_generator.generate(
            tac
        )


        # ====================================================
        # SUCCESS RESPONSE
        # ====================================================

        return jsonify({

            "success": True,

            "code": generated_code,

            "tokens": token_data,

            "ast": ast,

            "symbols": symbols,

            "errors": errors,

            "tac": tac,

            "target": target

        })


    # ========================================================
    # ERROR HANDLING
    # ========================================================

    except Exception as e:

        import traceback

        traceback.print_exc()

        return jsonify({

            "success": False,

            "error": str(e)

        }), 500


# ============================================================
# HEALTH CHECK
# ============================================================

@app.route("/health")
def health():

    return jsonify({

        "status": "ok",

        "application": "Code Ninja",

        "message": "Compiler engine is running."

    })


# ============================================================
# APPLICATION START
# ============================================================

if __name__ == "__main__":

    app.run(
        debug=True
    )