(async () => {
    const scripts = [...document.querySelectorAll("script")];
    const pattern = /(keyDown|keyUp|keyPress|onkeydown|onkeyup|onkeypress)/g;

    let rows = [];

    // Table header
    rows.push(["Type", "Source", "Status", "Matches"]);

    // Inline scripts
    for (const script of scripts) {
        if (!script.src) {
            const content = script.textContent.trim();
            const matches = content.match(pattern);

            rows.push([
                "Inline",
                "(inline script)",
                "Scanned",
                matches ? matches.join(", ") : "None"
            ]);
        }
    }

    // External scripts
    for (const script of scripts) {
        if (script.src) {
            try {
                const jsText = await fetch(script.src).then(r => r.text());
                const matches = jsText.match(pattern);

                rows.push([
                    "External",
                    script.src,
                    "Scanned",
                    matches ? matches.join(", ") : "None"
                ]);

            } catch (err) {
                rows.push([
                    "External",
                    script.src,
                    "Blocked (CORS)",
                    "Unknown"
                ]);
            }
        }
    }

    // Convert rows to a readable table
    const colWidths = [
        Math.max(...rows.map(r => r[0].length)),
        Math.max(...rows.map(r => r[1].length)),
        Math.max(...rows.map(r => r[2].length)),
        Math.max(...rows.map(r => r[3].length))
    ];

    const table = rows
        .map(row =>
            row
                .map((cell, i) => cell.padEnd(colWidths[i]))
                .join(" | ")
        )
        .join("\n");

    return table;
})();
