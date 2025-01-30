function formatJson() {
    let input = document.getElementById("jsonInput").value;
    try {
        let formatted = JSON.stringify(JSON.parse(input), null, 4);
        document.getElementById("jsonInput").value = formatted;
    } catch (error) {
        alert("Invalid JSON format!");
    }
}

function searchJson() {
    let input = document.getElementById("jsonInput").value;
    let searchKeys = document.getElementById("searchKeys").value.toLowerCase().split(/,|\n/).map(key => key.trim()).filter(key => key);
    let resultsDiv = document.getElementById("results");
    let missingResultsDiv = document.getElementById("missingResults");
    resultsDiv.innerHTML = "<h4>Found Keys</h4>";
    missingResultsDiv.innerHTML = "<h4>Missing Keys</h4>";

    if (!input.trim()) {
        alert("Please paste JSON first!");
        return;
    }
    if (searchKeys.length === 0) {
        alert("Please enter at least one key!");
        return;
    }

    try {
        let jsonData = JSON.parse(input);
        let foundItems = [];
        let missingItems = [...searchKeys];

        function search(obj, path = "") {
            for (let key in obj) {
                if (typeof obj[key] === "object") {
                    search(obj[key], path ? `${path}.${key}` : key);
                } else {
                    let index = missingItems.indexOf(key.toLowerCase());
                    if (index !== -1) {
                        foundItems.push(`${path}.${key}: ${obj[key]}`);
                        missingItems.splice(index, 1);
                    }
                }
            }
        }
        search(jsonData);

        foundItems.slice(0, 200).forEach(item => {
            let p = document.createElement("p");
            p.textContent = item;
            resultsDiv.appendChild(p);
        });

        missingItems.forEach(item => {
            let p = document.createElement("p");
            p.textContent = item;
            missingResultsDiv.appendChild(p);
        });
    } catch (error) {
        alert("Invalid JSON format! Please format first.");
    }
}

function clearSearch() {
    document.getElementById("searchKeys").value = "";
    document.getElementById("results").innerHTML = "<h4>Found Keys</h4>";
    document.getElementById("missingResults").innerHTML = "<h4>Missing Keys</h4>";
}

function resetTool() {
    document.getElementById("jsonInput").value = "";
    document.getElementById("searchKeys").value = "";
    clearSearch();
}
