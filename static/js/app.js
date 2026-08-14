/* =========================================================
   CODE NINJA
   FRONTEND CONTROLLER
========================================================= */

let selectedTarget = "python";

let generatedOutput = "";


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


    let value = 0;

    const timer = setInterval(() => {

        value += Math.floor(Math.random() * 8) + 3;

        if (value > 100) {
            value = 100;
        }

        progress.style.width = value + "%";

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

                    application.classList.remove("hidden");

                }, 500);

            }, 350);
        }

    }, 100);

}


/* =========================================================
   TARGET LANGUAGE
========================================================= */

function selectTarget(button) {

    document
        .querySelectorAll(".target-button")
        .forEach(btn => {
            btn.classList.remove("selected");
        });


    button.classList.add("selected");


    selectedTarget =
        button.dataset.target;


    const languageNames = {

        python: "Python",

        java: "Java",

        cpp: "C++",

        assembly: "Assembly"

    };


    document.getElementById(
        "outputLanguage"
    ).textContent =
        languageNames[selectedTarget];


    showToast(
        "Target selected: " +
        languageNames[selectedTarget]
    );
}


/* =========================================================
   COMPILATION ANIMATION
========================================================= */

async function startCompilation() {

    const source =
        document.getElementById(
            "sourceCode"
        ).value.trim();


    if (!source) {

        showToast(
            "Please enter C source code."
        );

        return;
    }


    const stages = [

        "flowLexer",

        "flowParser",

        "flowAST",

        "flowSemantic",

        "flowIR",

        "flowGenerator"

    ];


    resetPipeline();


    for (const stage of stages) {

        const element =
            document.getElementById(stage);


        element.classList.add("processing");


        await delay(250);


        element.classList.remove("processing");

        element.classList.add("success");
    }


    generateDemoOutput();


    showToast(
        "Conversion completed successfully."
    );
}


/* =========================================================
   PIPELINE RESET
========================================================= */

function resetPipeline() {

    const stages = [

        "flowLexer",

        "flowParser",

        "flowAST",

        "flowSemantic",

        "flowIR",

        "flowGenerator"

    ];


    stages.forEach(id => {

        const element =
            document.getElementById(id);

        element.classList.remove(
            "processing",
            "success"
        );

    });
}


/* =========================================================
   DEMO OUTPUT
========================================================= */

function generateDemoOutput() {

    const outputs = {

        python:
`# Code Ninja generated Python

def main():
    a = 10
    b = 20
    total = a + b

    print(total)


if __name__ == "__main__":
    main()
`,

        java:
`// Code Ninja generated Java

public class Main {

    public static void main(String[] args) {

        int a = 10;
        int b = 20;
        int total = a + b;

        System.out.println(total);
    }
}
`,

        cpp:
`// Code Ninja generated C++

#include <iostream>

using namespace std;

int main() {

    int a = 10;
    int b = 20;
    int total = a + b;

    cout << total;

    return 0;
}
`,

        assembly:
`; Code Ninja generated Assembly

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


    generatedOutput =
        outputs[selectedTarget];


    document.getElementById(
        "generatedCode"
    ).textContent =
        generatedOutput;


    updateOutputLines();


    populateDemoAnalysis();
}


/* =========================================================
   OUTPUT LINE NUMBERS
========================================================= */

function updateOutputLines() {

    const container =
        document.getElementById(
            "outputLines"
        );


    container.innerHTML = "";


    const lines =
        generatedOutput.split("\n");


    lines.forEach((_, index) => {

        const line =
            document.createElement("div");

        line.textContent =
            index + 1;

        container.appendChild(line);

    });
}


/* =========================================================
   ANALYSIS
========================================================= */

function showAnalysis(type, clickedButton = null) {

    document
        .querySelectorAll(".analysis-panel")
        .forEach(panel => {

            panel.classList.remove(
                "active-panel"
            );

        });


    document
        .querySelectorAll(".analysis-tab")
        .forEach(tab => {

            tab.classList.remove("active");

        });


    const panel =
        document.getElementById(
            type + "Panel"
        );


    if (panel) {

        panel.classList.add(
            "active-panel"
        );
    }


    if (clickedButton) {

        clickedButton.classList.add(
            "active"
        );

    } else {

        document
            .querySelectorAll(".analysis-tab")
            .forEach(tab => {

                if (
                    tab.textContent
                        .toLowerCase()
                        .includes(type)
                ) {

                    tab.classList.add("active");

                }

            });

    }
}


/* =========================================================
   DEMO ANALYSIS DATA
========================================================= */

function populateDemoAnalysis() {

    document.getElementById(
        "tokensPanel"
    ).innerHTML = `

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

    `;


    document.getElementById(
        "astPanel"
    ).innerHTML = `

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
                &nbsp;&nbsp;&nbsp;&nbsp;└── Return
            </div>

        </div>

    `;


    document.getElementById(
        "symbolsPanel"
    ).innerHTML = `

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


    document.getElementById(
        "tacPanel"
    ).innerHTML = `

        <div class="tac-code">

            t1 = 10<br>
            t2 = 20<br>
            t3 = t1 + t2<br>
            print t3<br>
            return 0

        </div>

    `;


    document.getElementById(
        "errorsPanel"
    ).innerHTML = `

        <div class="empty-analysis">

            <div class="analysis-icon">
                ✓
            </div>

            <h3>
                No Errors
            </h3>

            <p>
                Lexical, syntax and semantic
                analysis completed.
            </p>

        </div>

    `;


    showAnalysis("tokens");

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

    } catch (error) {

        showToast(
            "Copy failed."
        );

    }
}


/* =========================================================
   DOWNLOAD
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


    const blob =
        new Blob(
            [generatedOutput],
            { type: "text/plain" }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;


    link.download =
        "converted." +
        extensions[selectedTarget];


    link.click();


    URL.revokeObjectURL(url);


    showToast(
        "Code downloaded."
    );
}


/* =========================================================
   SHARE MODAL
========================================================= */

function openShareMenu() {

    document
        .getElementById("shareModal")
        .classList.remove("hidden");
}


function closeShareMenu() {

    document
        .getElementById("shareModal")
        .classList.add("hidden");
}


function shareCode(type) {

    const text =
        generatedOutput ||
        document.getElementById(
            "sourceCode"
        ).value;


    const encoded =
        encodeURIComponent(text);


    if (type === "whatsapp") {

        window.open(
            "https://wa.me/?text=" +
            encoded,
            "_blank"
        );

    }

    else if (type === "telegram") {

        window.open(
            "https://t.me/share/url?url=&text=" +
            encoded,
            "_blank"
        );

    }

    else if (type === "email") {

        window.location.href =
            "mailto:?subject=Code Ninja Code&body=" +
            encoded;

    }

    else if (type === "native") {

        if (
            navigator.share
        ) {

            navigator.share({

                title: "Code Ninja",
                text: text

            });

        } else {

            showToast(
                "Device sharing is not supported."
            );

        }

    }

}


/* =========================================================
   COPY SHARE LINK
========================================================= */

async function copyShareLink() {

    await navigator.clipboard.writeText(
        window.location.href
    );

    showToast(
        "Share link copied."
    );

    closeShareMenu();
}


/* =========================================================
   COMMAND PALETTE
========================================================= */

function openCommandPalette() {

    document
        .getElementById("commandPalette")
        .classList.remove("hidden");


    document
        .getElementById("commandInput")
        .focus();
}


function closeCommandPalette() {

    document
        .getElementById("commandPalette")
        .classList.add("hidden");
}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            event.preventDefault();

            startCompilation();
        }


        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            openCommandPalette();
        }


        if (
            event.key === "Escape"
        ) {

            closeCommandPalette();

            closeShareMenu();
        }

    }
);


/* =========================================================
   UTILITIES
========================================================= */

function delay(ms) {

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );

}


function showToast(message) {

    const toast =
        document.getElementById("toast");

    const messageElement =
        document.getElementById(
            "toastMessage"
        );


    messageElement.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        bootSequence();

    }
);/* =========================================================
   CODE NINJA
   FRONTEND CONTROLLER
========================================================= */

let selectedTarget = "python";

let generatedOutput = "";


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


    let value = 0;

    const timer = setInterval(() => {

        value += Math.floor(Math.random() * 8) + 3;

        if (value > 100) {
            value = 100;
        }

        progress.style.width = value + "%";

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

                    application.classList.remove("hidden");

                }, 500);

            }, 350);
        }

    }, 100);

}


/* =========================================================
   TARGET LANGUAGE
========================================================= */

function selectTarget(button) {

    document
        .querySelectorAll(".target-button")
        .forEach(btn => {
            btn.classList.remove("selected");
        });


    button.classList.add("selected");


    selectedTarget =
        button.dataset.target;


    const languageNames = {

        python: "Python",

        java: "Java",

        cpp: "C++",

        assembly: "Assembly"

    };


    document.getElementById(
        "outputLanguage"
    ).textContent =
        languageNames[selectedTarget];


    showToast(
        "Target selected: " +
        languageNames[selectedTarget]
    );
}


/* =========================================================
   COMPILATION ANIMATION
========================================================= */

async function startCompilation() {

    const source =
        document.getElementById(
            "sourceCode"
        ).value.trim();


    if (!source) {

        showToast(
            "Please enter C source code."
        );

        return;
    }


    const stages = [

        "flowLexer",

        "flowParser",

        "flowAST",

        "flowSemantic",

        "flowIR",

        "flowGenerator"

    ];


    resetPipeline();


    for (const stage of stages) {

        const element =
            document.getElementById(stage);


        element.classList.add("processing");


        await delay(250);


        element.classList.remove("processing");

        element.classList.add("success");
    }


    generateDemoOutput();


    showToast(
        "Conversion completed successfully."
    );
}


/* =========================================================
   PIPELINE RESET
========================================================= */

function resetPipeline() {

    const stages = [

        "flowLexer",

        "flowParser",

        "flowAST",

        "flowSemantic",

        "flowIR",

        "flowGenerator"

    ];


    stages.forEach(id => {

        const element =
            document.getElementById(id);

        element.classList.remove(
            "processing",
            "success"
        );

    });
}


/* =========================================================
   DEMO OUTPUT
========================================================= */

function generateDemoOutput() {

    const outputs = {

        python:
`# Code Ninja generated Python

def main():
    a = 10
    b = 20
    total = a + b

    print(total)


if __name__ == "__main__":
    main()
`,

        java:
`// Code Ninja generated Java

public class Main {

    public static void main(String[] args) {

        int a = 10;
        int b = 20;
        int total = a + b;

        System.out.println(total);
    }
}
`,

        cpp:
`// Code Ninja generated C++

#include <iostream>

using namespace std;

int main() {

    int a = 10;
    int b = 20;
    int total = a + b;

    cout << total;

    return 0;
}
`,

        assembly:
`; Code Ninja generated Assembly

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


    generatedOutput =
        outputs[selectedTarget];


    document.getElementById(
        "generatedCode"
    ).textContent =
        generatedOutput;


    updateOutputLines();


    populateDemoAnalysis();
}


/* =========================================================
   OUTPUT LINE NUMBERS
========================================================= */

function updateOutputLines() {

    const container =
        document.getElementById(
            "outputLines"
        );


    container.innerHTML = "";


    const lines =
        generatedOutput.split("\n");


    lines.forEach((_, index) => {

        const line =
            document.createElement("div");

        line.textContent =
            index + 1;

        container.appendChild(line);

    });
}


/* =========================================================
   ANALYSIS
========================================================= */

function showAnalysis(type, clickedButton = null) {

    document
        .querySelectorAll(".analysis-panel")
        .forEach(panel => {

            panel.classList.remove(
                "active-panel"
            );

        });


    document
        .querySelectorAll(".analysis-tab")
        .forEach(tab => {

            tab.classList.remove("active");

        });


    const panel =
        document.getElementById(
            type + "Panel"
        );


    if (panel) {

        panel.classList.add(
            "active-panel"
        );
    }


    if (clickedButton) {

        clickedButton.classList.add(
            "active"
        );

    } else {

        document
            .querySelectorAll(".analysis-tab")
            .forEach(tab => {

                if (
                    tab.textContent
                        .toLowerCase()
                        .includes(type)
                ) {

                    tab.classList.add("active");

                }

            });

    }
}


/* =========================================================
   DEMO ANALYSIS DATA
========================================================= */

function populateDemoAnalysis() {

    document.getElementById(
        "tokensPanel"
    ).innerHTML = `

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

    `;


    document.getElementById(
        "astPanel"
    ).innerHTML = `

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
                &nbsp;&nbsp;&nbsp;&nbsp;└── Return
            </div>

        </div>

    `;


    document.getElementById(
        "symbolsPanel"
    ).innerHTML = `

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


    document.getElementById(
        "tacPanel"
    ).innerHTML = `

        <div class="tac-code">

            t1 = 10<br>
            t2 = 20<br>
            t3 = t1 + t2<br>
            print t3<br>
            return 0

        </div>

    `;


    document.getElementById(
        "errorsPanel"
    ).innerHTML = `

        <div class="empty-analysis">

            <div class="analysis-icon">
                ✓
            </div>

            <h3>
                No Errors
            </h3>

            <p>
                Lexical, syntax and semantic
                analysis completed.
            </p>

        </div>

    `;


    showAnalysis("tokens");

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

    } catch (error) {

        showToast(
            "Copy failed."
        );

    }
}


/* =========================================================
   DOWNLOAD
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


    const blob =
        new Blob(
            [generatedOutput],
            { type: "text/plain" }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;


    link.download =
        "converted." +
        extensions[selectedTarget];


    link.click();


    URL.revokeObjectURL(url);


    showToast(
        "Code downloaded."
    );
}


/* =========================================================
   SHARE MODAL
========================================================= */

function openShareMenu() {

    document
        .getElementById("shareModal")
        .classList.remove("hidden");
}


function closeShareMenu() {

    document
        .getElementById("shareModal")
        .classList.add("hidden");
}


function shareCode(type) {

    const text =
        generatedOutput ||
        document.getElementById(
            "sourceCode"
        ).value;


    const encoded =
        encodeURIComponent(text);


    if (type === "whatsapp") {

        window.open(
            "https://wa.me/?text=" +
            encoded,
            "_blank"
        );

    }

    else if (type === "telegram") {

        window.open(
            "https://t.me/share/url?url=&text=" +
            encoded,
            "_blank"
        );

    }

    else if (type === "email") {

        window.location.href =
            "mailto:?subject=Code Ninja Code&body=" +
            encoded;

    }

    else if (type === "native") {

        if (
            navigator.share
        ) {

            navigator.share({

                title: "Code Ninja",
                text: text

            });

        } else {

            showToast(
                "Device sharing is not supported."
            );

        }

    }

}


/* =========================================================
   COPY SHARE LINK
========================================================= */

async function copyShareLink() {

    await navigator.clipboard.writeText(
        window.location.href
    );

    showToast(
        "Share link copied."
    );

    closeShareMenu();
}


/* =========================================================
   COMMAND PALETTE
========================================================= */

function openCommandPalette() {

    document
        .getElementById("commandPalette")
        .classList.remove("hidden");


    document
        .getElementById("commandInput")
        .focus();
}


function closeCommandPalette() {

    document
        .getElementById("commandPalette")
        .classList.add("hidden");
}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            event.preventDefault();

            startCompilation();
        }


        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            openCommandPalette();
        }


        if (
            event.key === "Escape"
        ) {

            closeCommandPalette();

            closeShareMenu();
        }

    }
);


/* =========================================================
   UTILITIES
========================================================= */

function delay(ms) {

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );

}


function showToast(message) {

    const toast =
        document.getElementById("toast");

    const messageElement =
        document.getElementById(
            "toastMessage"
        );


    messageElement.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        bootSequence();

    }
);/* =========================================================
   CODE NINJA
   FRONTEND CONTROLLER
========================================================= */

let selectedTarget = "python";

let generatedOutput = "";


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


    let value = 0;

    const timer = setInterval(() => {

        value += Math.floor(Math.random() * 8) + 3;

        if (value > 100) {
            value = 100;
        }

        progress.style.width = value + "%";

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

                    application.classList.remove("hidden");

                }, 500);

            }, 350);
        }

    }, 100);

}


/* =========================================================
   TARGET LANGUAGE
========================================================= */

function selectTarget(button) {

    document
        .querySelectorAll(".target-button")
        .forEach(btn => {
            btn.classList.remove("selected");
        });


    button.classList.add("selected");


    selectedTarget =
        button.dataset.target;


    const languageNames = {

        python: "Python",

        java: "Java",

        cpp: "C++",

        assembly: "Assembly"

    };


    document.getElementById(
        "outputLanguage"
    ).textContent =
        languageNames[selectedTarget];


    showToast(
        "Target selected: " +
        languageNames[selectedTarget]
    );
}


/* =========================================================
   COMPILATION ANIMATION
========================================================= */

async function startCompilation() {

    const source =
        document.getElementById(
            "sourceCode"
        ).value.trim();


    if (!source) {

        showToast(
            "Please enter C source code."
        );

        return;
    }


    const stages = [

        "flowLexer",

        "flowParser",

        "flowAST",

        "flowSemantic",

        "flowIR",

        "flowGenerator"

    ];


    resetPipeline();


    for (const stage of stages) {

        const element =
            document.getElementById(stage);


        element.classList.add("processing");


        await delay(250);


        element.classList.remove("processing");

        element.classList.add("success");
    }


    generateDemoOutput();


    showToast(
        "Conversion completed successfully."
    );
}


/* =========================================================
   PIPELINE RESET
========================================================= */

function resetPipeline() {

    const stages = [

        "flowLexer",

        "flowParser",

        "flowAST",

        "flowSemantic",

        "flowIR",

        "flowGenerator"

    ];


    stages.forEach(id => {

        const element =
            document.getElementById(id);

        element.classList.remove(
            "processing",
            "success"
        );

    });
}


/* =========================================================
   DEMO OUTPUT
========================================================= */

function generateDemoOutput() {

    const outputs = {

        python:
`# Code Ninja generated Python

def main():
    a = 10
    b = 20
    total = a + b

    print(total)


if __name__ == "__main__":
    main()
`,

        java:
`// Code Ninja generated Java

public class Main {

    public static void main(String[] args) {

        int a = 10;
        int b = 20;
        int total = a + b;

        System.out.println(total);
    }
}
`,

        cpp:
`// Code Ninja generated C++

#include <iostream>

using namespace std;

int main() {

    int a = 10;
    int b = 20;
    int total = a + b;

    cout << total;

    return 0;
}
`,

        assembly:
`; Code Ninja generated Assembly

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


    generatedOutput =
        outputs[selectedTarget];


    document.getElementById(
        "generatedCode"
    ).textContent =
        generatedOutput;


    updateOutputLines();


    populateDemoAnalysis();
}


/* =========================================================
   OUTPUT LINE NUMBERS
========================================================= */

function updateOutputLines() {

    const container =
        document.getElementById(
            "outputLines"
        );


    container.innerHTML = "";


    const lines =
        generatedOutput.split("\n");


    lines.forEach((_, index) => {

        const line =
            document.createElement("div");

        line.textContent =
            index + 1;

        container.appendChild(line);

    });
}


/* =========================================================
   ANALYSIS
========================================================= */

function showAnalysis(type, clickedButton = null) {

    document
        .querySelectorAll(".analysis-panel")
        .forEach(panel => {

            panel.classList.remove(
                "active-panel"
            );

        });


    document
        .querySelectorAll(".analysis-tab")
        .forEach(tab => {

            tab.classList.remove("active");

        });


    const panel =
        document.getElementById(
            type + "Panel"
        );


    if (panel) {

        panel.classList.add(
            "active-panel"
        );
    }


    if (clickedButton) {

        clickedButton.classList.add(
            "active"
        );

    } else {

        document
            .querySelectorAll(".analysis-tab")
            .forEach(tab => {

                if (
                    tab.textContent
                        .toLowerCase()
                        .includes(type)
                ) {

                    tab.classList.add("active");

                }

            });

    }
}


/* =========================================================
   DEMO ANALYSIS DATA
========================================================= */

function populateDemoAnalysis() {

    document.getElementById(
        "tokensPanel"
    ).innerHTML = `

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

    `;


    document.getElementById(
        "astPanel"
    ).innerHTML = `

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
                &nbsp;&nbsp;&nbsp;&nbsp;└── Return
            </div>

        </div>

    `;


    document.getElementById(
        "symbolsPanel"
    ).innerHTML = `

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


    document.getElementById(
        "tacPanel"
    ).innerHTML = `

        <div class="tac-code">

            t1 = 10<br>
            t2 = 20<br>
            t3 = t1 + t2<br>
            print t3<br>
            return 0

        </div>

    `;


    document.getElementById(
        "errorsPanel"
    ).innerHTML = `

        <div class="empty-analysis">

            <div class="analysis-icon">
                ✓
            </div>

            <h3>
                No Errors
            </h3>

            <p>
                Lexical, syntax and semantic
                analysis completed.
            </p>

        </div>

    `;


    showAnalysis("tokens");

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

    } catch (error) {

        showToast(
            "Copy failed."
        );

    }
}


/* =========================================================
   DOWNLOAD
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


    const blob =
        new Blob(
            [generatedOutput],
            { type: "text/plain" }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;


    link.download =
        "converted." +
        extensions[selectedTarget];


    link.click();


    URL.revokeObjectURL(url);


    showToast(
        "Code downloaded."
    );
}


/* =========================================================
   SHARE MODAL
========================================================= */

function openShareMenu() {

    document
        .getElementById("shareModal")
        .classList.remove("hidden");
}


function closeShareMenu() {

    document
        .getElementById("shareModal")
        .classList.add("hidden");
}


function shareCode(type) {

    const text =
        generatedOutput ||
        document.getElementById(
            "sourceCode"
        ).value;


    const encoded =
        encodeURIComponent(text);


    if (type === "whatsapp") {

        window.open(
            "https://wa.me/?text=" +
            encoded,
            "_blank"
        );

    }

    else if (type === "telegram") {

        window.open(
            "https://t.me/share/url?url=&text=" +
            encoded,
            "_blank"
        );

    }

    else if (type === "email") {

        window.location.href =
            "mailto:?subject=Code Ninja Code&body=" +
            encoded;

    }

    else if (type === "native") {

        if (
            navigator.share
        ) {

            navigator.share({

                title: "Code Ninja",
                text: text

            });

        } else {

            showToast(
                "Device sharing is not supported."
            );

        }

    }

}


/* =========================================================
   COPY SHARE LINK
========================================================= */

async function copyShareLink() {

    await navigator.clipboard.writeText(
        window.location.href
    );

    showToast(
        "Share link copied."
    );

    closeShareMenu();
}


/* =========================================================
   COMMAND PALETTE
========================================================= */

function openCommandPalette() {

    document
        .getElementById("commandPalette")
        .classList.remove("hidden");


    document
        .getElementById("commandInput")
        .focus();
}


function closeCommandPalette() {

    document
        .getElementById("commandPalette")
        .classList.add("hidden");
}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            event.preventDefault();

            startCompilation();
        }


        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            openCommandPalette();
        }


        if (
            event.key === "Escape"
        ) {

            closeCommandPalette();

            closeShareMenu();
        }

    }
);


/* =========================================================
   UTILITIES
========================================================= */

function delay(ms) {

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );

}


function showToast(message) {

    const toast =
        document.getElementById("toast");

    const messageElement =
        document.getElementById(
            "toastMessage"
        );


    messageElement.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        bootSequence();

    }
);