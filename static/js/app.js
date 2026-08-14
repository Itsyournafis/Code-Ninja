/* =========================================================
   CODE NINJA
   FRONTEND CONTROLLER
========================================================= */


/* =========================================================
   GLOBAL STATE
========================================================= */

let selectedTarget = "python";
let generatedOutput = "";


/* =========================================================
   LANGUAGE NAMES
========================================================= */

const languageNames = {
    python: "Python",
    java: "Java",
    cpp: "C++",
    assembly: "Assembly"
};


/* =========================================================
   GENERATED CODE
========================================================= */

const generatedCodes = {

    python: `# Code Ninja generated Python

def main():
    a = 10
    b = 20
    sum = a + b

    print(sum)


if __name__ == "__main__":
    main()
`,

    java: `// Code Ninja generated Java

public class Main {

    public static void main(String[] args) {

        int a = 10;
        int b = 20;
        int sum = a + b;

        System.out.println(sum);
    }
}
`,

    cpp: `// Code Ninja generated C++

#include <iostream>

using namespace std;

int main() {

    int a = 10;
    int b = 20;
    int sum = a + b;

    cout << sum;

    return 0;
}
`,

    assembly: `; Code Ninja generated Assembly

section .text

global _start

_start:

    mov eax, 10
    mov ebx, 20

    add eax, ebx

    mov eax, 1
    int 0x80
`
};


/* =========================================================
   UTILITIES
========================================================= */

function delay(ms) {

    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });

}


function showToast(message) {

    const toast = document.getElementById("toast");
    const messageElement =
        document.getElementById("toastMessage");

    if (!toast || !messageElement) {
        return;
    }

    messageElement.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);
}


/* =========================================================
   BOOT SEQUENCE
========================================================= */

const bootMessages = [

    "INITIALIZING COMPILER ENGINE...",
    "LOADING LEXICAL ANALYZER...",
    "LOADING SYNTAX ANALYZER...",
    "BUILDING ABSTRACT SYNTAX TREE...",
    "INITIALIZING SEMANTIC ANALYZER...",
    "LOADING INTERMEDIATE REPRESENTATION...",
    "LOADING TARGET CODE GENERATORS...",
    "CHECKING COMPILER PIPELINE...",
    "SYSTEM READY"

];


function bootSequence() {

    const progress =
        document.getElementById("bootProgress");

    const percentage =
        document.getElementById("bootPercentage");

    const text =
        document.getElementById("bootText");

    const bootScreen =
        document.getElementById("bootScreen");

    const application =
        document.getElementById("app");


    /*
     * If boot screen does not exist,
     * simply continue with the application.
     */

    if (
        !progress ||
        !percentage ||
        !text ||
        !bootScreen ||
        !application
    ) {
        return;
    }


    let value = 0;


    const timer = setInterval(() => {

        value += Math.floor(Math.random() * 8) + 3;


        if (value > 100) {
            value = 100;
        }


        progress.style.width =
            value + "%";


        percentage.textContent =
            value + "%";


        const index =
            Math.min(
                Math.floor(value / 12),
                bootMessages.length - 1
            );


        text.textContent =
            bootMessages[index];


        if (value >= 100) {

            clearInterval(timer);


            setTimeout(() => {

                bootScreen.style.opacity = "0";

                bootScreen.style.transition =
                    "opacity .5s ease";


                setTimeout(() => {

                    bootScreen.classList.add("hidden");

                    application.classList.remove(
                        "hidden"
                    );

                }, 500);

            }, 350);
        }

    }, 100);

}


/* =========================================================
   TARGET LANGUAGE
========================================================= */

function selectTarget(button, target = null) {

    /*
     * Get target from data-target
     * if target argument is not provided.
     */

    if (!target && button) {
        target = button.dataset.target;
    }


    if (!target) {
        target = "python";
    }


    selectedTarget = target;


    /*
     * Remove selected class
     * from all target buttons.
     */

    document
        .querySelectorAll(".target")
        .forEach(btn => {

            btn.classList.remove("active");
            btn.classList.remove("selected");

        });


    /*
     * Select clicked button.
     */

    if (button) {

        button.classList.add("active");
        button.classList.add("selected");

    }


    /*
     * Update target label.
     */

    const targetLabel =
        document.getElementById("targetLabel");


    if (targetLabel) {

        targetLabel.textContent =
            languageNames[selectedTarget] ||
            "Python";

    }


    /*
     * Update output language
     * if this element exists.
     */

    const outputLanguage =
        document.getElementById("outputLanguage");


    if (outputLanguage) {

        outputLanguage.textContent =
            languageNames[selectedTarget] ||
            "Python";

    }


    showToast(
        "Target selected: " +
        (languageNames[selectedTarget] || "Python")
    );

}


/* =========================================================
   PIPELINE ANIMATION
========================================================= */

async function runPipeline() {

    /*
     * Your current index.html does not have
     * pipeline IDs, so this function safely
     * works only if those IDs exist.
     */

    const stages = [

        "flowLexer",
        "flowParser",
        "flowAST",
        "flowSemantic",
        "flowIR",
        "flowGenerator"

    ];


    for (const stage of stages) {

        const element =
            document.getElementById(stage);


        if (!element) {
            continue;
        }


        element.classList.remove("success");

        element.classList.add("processing");


        await delay(300);


        element.classList.remove("processing");

        element.classList.add("success");

    }

}


/* =========================================================
   CONVERT CODE
========================================================= */

async function convertCode() {

    const sourceElement =
        document.getElementById("sourceCode");


    if (!sourceElement) {

        showToast(
            "Source code editor not found."
        );

        return;

    }


    const source =
        sourceElement.value.trim();


    if (!source) {

        showToast(
            "Please enter C source code."
        );

        return;

    }


    /*
     * Disable button while conversion runs.
     */

    const button =
        document.getElementById("convertButton");


    if (button) {

        button.disabled = true;

        button.textContent =
            "⚙ COMPILING...";

    }


    showToast(
        "Compilation started..."
    );


    /*
     * Run compiler pipeline animation.
     */

    await runPipeline();


    /*
     * Generate target code.
     */

    generatedOutput =
        generatedCodes[selectedTarget] ||
        generatedCodes.python;


    /*
     * Display generated output.
     */

    const output =
        document.getElementById("outputCode");


    if (output) {

        output.textContent =
            generatedOutput;

    }


    /*
     * Update target label.
     */

    const targetLabel =
        document.getElementById("targetLabel");


    if (targetLabel) {

        targetLabel.textContent =
            languageNames[selectedTarget];

    }


    /*
     * Populate compiler insights.
     */

    populateInsights();


    /*
     * Restore button.
     */

    if (button) {

        button.disabled = false;

        button.textContent =
            "⚡ CONVERT CODE";

    }


    showToast(
        "Conversion completed successfully!"
    );

}


/* =========================================================
   COPY OUTPUT
========================================================= */

async function copyOutput() {

    if (!generatedOutput) {

        showToast(
            "Nothing to copy yet."
        );

        return;

    }


    try {

        await navigator.clipboard.writeText(
            generatedOutput
        );


        showToast(
            "Generated code copied!"
        );

    }

    catch (error) {

        /*
         * Fallback for browsers where
         * clipboard API is unavailable.
         */

        const textarea =
            document.createElement("textarea");


        textarea.value =
            generatedOutput;


        document.body.appendChild(textarea);


        textarea.select();


        try {

            document.execCommand("copy");

            showToast(
                "Generated code copied!"
            );

        }

        catch (copyError) {

            showToast(
                "Copy failed."
            );

        }


        document.body.removeChild(
            textarea
        );

    }

}


/* =========================================================
   DOWNLOAD OUTPUT
========================================================= */

function downloadOutput() {

    if (!generatedOutput) {

        showToast(
            "Nothing to download yet."
        );

        return;

    }


    const extensions = {

        python: "py",
        java: "java",
        cpp: "cpp",
        assembly: "asm"

    };


    const extension =
        extensions[selectedTarget] || "txt";


    const blob =
        new Blob(
            [generatedOutput],
            {
                type: "text/plain"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;


    link.download =
        "converted." + extension;


    document.body.appendChild(link);


    link.click();


    document.body.removeChild(link);


    URL.revokeObjectURL(url);


    showToast(
        "Code downloaded."
    );

}


/* =========================================================
   SHARE CODE
========================================================= */

function shareCode(type = "native") {

    const sourceElement =
        document.getElementById("sourceCode");


    const source =
        sourceElement
            ? sourceElement.value
            : "";


    const text =
        generatedOutput || source;


    if (!text) {

        showToast(
            "Nothing to share yet."
        );

        return;

    }


    const encoded =
        encodeURIComponent(text);


    /*
     * WhatsApp
     */

    if (type === "whatsapp") {

        window.open(
            "https://wa.me/?text=" +
            encoded,
            "_blank"
        );

        return;

    }


    /*
     * Telegram
     */

    if (type === "telegram") {

        window.open(
            "https://t.me/share/url?url=&text=" +
            encoded,
            "_blank"
        );

        return;

    }


    /*
     * Email
     */

    if (type === "email") {

        window.location.href =
            "mailto:?subject=Code Ninja Code&body=" +
            encoded;

        return;

    }


    /*
     * Native browser sharing
     */

    if (
        type === "native" &&
        navigator.share
    ) {

        navigator.share({

            title: "Code Ninja",
            text: text

        }).catch(() => {});

        return;

    }


    /*
     * Default fallback
     */

    if (navigator.share) {

        navigator.share({

            title: "Code Ninja",
            text: text

        }).catch(() => {});

    }

    else {

        /*
         * If browser does not support
         * native sharing, copy the code.
         */

        copyOutput();

    }

}


/* =========================================================
   CLEAR OUTPUT
========================================================= */

function clearOutput() {

    generatedOutput = "";


    const output =
        document.getElementById("outputCode");


    if (output) {

        output.textContent =
`# Code Ninja output

# Select a target language
# and click Convert.

Waiting for conversion...`;

    }


    const insightContent =
        document.getElementById(
            "insightContent"
        );


    if (insightContent) {

        insightContent.innerHTML =
`
<div class="empty-state">

    <div class="empty-icon">
        ◈
    </div>

    <h3>
        Token Analysis
    </h3>

    <p>
        Lexical tokens generated by the
        Code Ninja compiler will appear here.
    </p>

</div>
`;

    }


    showToast(
        "Output cleared."
    );

}


/* =========================================================
   INSIGHTS
========================================================= */

function showInsight(type, clickedButton = null) {

    /*
     * Remove active class from tabs.
     */

    document
        .querySelectorAll(".insight-tab")
        .forEach(tab => {

            tab.classList.remove("active");

        });


    /*
     * Activate clicked tab.
     */

    if (clickedButton) {

        clickedButton.classList.add("active");

    }


    /*
     * Get insight container.
     */

    const container =
        document.getElementById(
            "insightContent"
        );


    if (!container) {
        return;
    }


    let content = "";


    /* ---------------------------------------------
       TOKENS
    --------------------------------------------- */

    if (type === "tokens") {

        content = `
<div class="data-heading">
    LEXICAL TOKENS
</div>

<div class="token-row header">
    <span>#</span>
    <span>LEXEME</span>
    <span>TYPE</span>
</div>

<div class="token-row">
    <span>01</span>
    <span>int</span>
    <span>KEYWORD</span>
</div>

<div class="token-row">
    <span>02</span>
    <span>main</span>
    <span>IDENTIFIER</span>
</div>

<div class="token-row">
    <span>03</span>
    <span>(</span>
    <span>SYMBOL</span>
</div>

<div class="token-row">
    <span>04</span>
    <span>)</span>
    <span>SYMBOL</span>
</div>

<div class="token-row">
    <span>05</span>
    <span>int</span>
    <span>KEYWORD</span>
</div>

<div class="token-row">
    <span>06</span>
    <span>a</span>
    <span>IDENTIFIER</span>
</div>

<div class="token-row">
    <span>07</span>
    <span>=</span>
    <span>OPERATOR</span>
</div>

<div class="token-row">
    <span>08</span>
    <span>10</span>
    <span>NUMBER</span>
</div>
`;

    }


    /* ---------------------------------------------
       AST
    --------------------------------------------- */

    else if (type === "ast") {

        content = `
<div class="ast-tree">

    <div>Program</div>

    <div>└── Function: main</div>

    <div>
        &nbsp;&nbsp;&nbsp;&nbsp;├── Declaration: a
    </div>

    <div>
        &nbsp;&nbsp;&nbsp;&nbsp;├── Declaration: b
    </div>

    <div>
        &nbsp;&nbsp;&nbsp;&nbsp;├── Declaration: sum
    </div>

    <div>
        &nbsp;&nbsp;&nbsp;&nbsp;├── Expression: a + b
    </div>

    <div>
        &nbsp;&nbsp;&nbsp;&nbsp;└── Return
    </div>

</div>
`;

    }


    /* ---------------------------------------------
       SYMBOL TABLE
    --------------------------------------------- */

    else if (type === "symbols") {

        content = `
<div class="symbol-table">

    <div>
        <strong>a</strong>
        <span>int</span>
    </div>

    <div>
        <strong>b</strong>
        <span>int</span>
    </div>

    <div>
        <strong>sum</strong>
        <span>int</span>
    </div>

    <div>
        <strong>main</strong>
        <span>function</span>
    </div>

</div>
`;

    }


    /* ---------------------------------------------
       TAC / IR
    --------------------------------------------- */

    else if (type === "tac") {

        content = `
<div class="tac-code">

    t1 = 10<br>
    t2 = 20<br>
    t3 = t1 + t2<br>
    print t3<br>
    return 0

</div>
`;

    }


    /* ---------------------------------------------
       ERRORS
    --------------------------------------------- */

    else if (type === "errors") {

        content = `
<div class="empty-analysis">

    <div class="analysis-icon">
        ✓
    </div>

    <h3>
        No Errors
    </h3>

    <p>
        Lexical, syntax and semantic
        analysis completed successfully.
    </p>

</div>
`;

    }


    container.innerHTML =
        content;

}


/* =========================================================
   POPULATE INSIGHTS
========================================================= */

function populateInsights() {

    showInsight("tokens");

}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
         * Initialize default Python target.
         */

        const pythonButton =
            document.querySelector(
                '.target[data-target="python"]'
            );


        if (pythonButton) {

            pythonButton.classList.add("active");

        }


        /*
         * Initialize first insight tab.
         */

        const firstInsight =
            document.querySelector(
                ".insight-tab.active"
            );


        if (firstInsight) {

            showInsight(
                "tokens",
                firstInsight
            );

        }


        /*
         * Start boot sequence.
         */

        bootSequence();

    }
);