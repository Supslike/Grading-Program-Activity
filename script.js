const card = document.getElementById("body-card");
const table = document.getElementById('main-card');
const first_final = document.getElementById("1st-final");
const second_final = document.getElementById("2nd-final");
const third_final = document.getElementById("3rd-final");
const fourth_final = document.getElementById("4th-final");
const first_sem = document.getElementById("1stsem-final");
const second_sem = document.getElementById("2ndsem-final");
const final_average = document.getElementById("final-average");
const final_remark = document.getElementById("final-remark");
const rating = document.getElementById("rating");
const rating_desc = document.getElementById("rating-description");

var required_info = ["subject-name", "0", "1", "2", "3"];
var labeler = ["final", "remark"];
var row_count = 0;
var subject_database = {}
var subjects = [
    "English",
    "Mathematics",
    "Edukasyon sa Pagpapakatao",
    "Technology and Livelihood Education",
    "MAPEH",
    "Filipino",
    "Science",
    "Araling Panlipunan"
]
var quarters = [first_final, second_final, third_final, fourth_final]

function getColumnValues(table, columnIndex) {
    const values = [];
    const rows = table.rows;

    if (rows.length < 3) {
        console.error("Table doesn't have enough rows");
        return values;
    }

    for (let i = 2; i < rows.length - 2; i++) {
        const cell = rows[i].cells[columnIndex];
        if (cell) {
            values.push(cell.children[0].value);
        } else {
            console.error(`Cell at columnIndex ${columnIndex} is undefined in row ${i}`);
        }
    }

    return values;
}

function UpdateStats() {
    for (let o = 0; o < 4; o++) {
        const columnValues = getColumnValues(table, o + 1);
        max_grade = 100 * (card.childElementCount - 4);
        total_grades = 0
        for (let a = 0; a < card.childElementCount - 4; a ++) {
            total_grades += Number(columnValues[1 + (a - 1)])
        }
        quarters[o].textContent = `${Math.round(100 * (total_grades / max_grade))}`;
    }

    for (let u = 0; u < row_count; u++) {
        var final_subject = 0;
        for (let e = 0; e < 4; e++) {
            final_subject += Number(document.getElementById(`${u}-${e}`).value);
        }
        document.getElementById(`${u}-final`).textContent = `${Math.round(100 * (final_subject / 400))}`;
        document.getElementById(`${u}-remark`).textContent = Math.round(100 * (final_subject / 400)) >= 75 ? "PASSED" : "FAILED";
    }

    first_sem.textContent = `${Math.round(100 * ((Number(first_final.textContent) + Number(second_final.textContent)) / 200))}`;
    second_sem.textContent = `${Math.round(100 * ((Number(third_final.textContent) + Number(fourth_final.textContent)) / 200))}`;
    final_average.textContent = `${Math.round(100 * ((Number(first_sem.textContent) + Number(second_sem.textContent))/ 200))}`;
    final_remark.textContent = Math.round(100 * ((Number(first_sem.textContent) + Number(second_sem.textContent))/ 200)) >= 75 ? "Promoted!" : "Retained!";
    const final_grade = Math.round(100 * ((Number(first_sem.textContent) + Number(second_sem.textContent))/ 200));
    switch (true) {
        case final_grade === 100:
            rating.textContent = "💯 IMPOSSIBLE 💯";
            rating_desc.textContent = "You did the impossible! You nailed it! 🤩🎖️";
            break;
        case final_grade >= 98 && final_grade <= 99:
            rating.textContent = "🌟 OUTSTANDING 🌟";
            rating_desc.textContent = "You standout in your class very well! 😯🎉";
            break;
        case final_grade >= 95 && final_grade <= 97:
            rating.textContent = "🎖️ EXCELLENT 🎖️";
            rating_desc.textContent = "Your excellence showed in fashionable results. 🤩🙏";
            break;
        case final_grade >= 90 && final_grade <= 94:
            rating.textContent = "✨ VERY GOOD ✨";
            rating_desc.textContent = "Your performance is very commendable. 🌟✨";
            break;
        case final_grade >= 85 && final_grade <= 89:
            rating.textContent = "🔥 GOOD 🔥";
            rating_desc.textContent = "Your performance is commendable. 🌟🔥";
            break;
        case final_grade >= 80 && final_grade <= 84:
            rating.textContent = "🙏 SATISFACTORY 🙏";
            rating_desc.textContent = "Your performance meets expectations. 🎉🎖️";
            break;
        case final_grade >= 75 && final_grade <= 79:
            rating.textContent = "🎉 PASS 🎉";
            rating_desc.textContent = "Congratulations! You passed. 🤩😯";
            break;
        default:
            rating.textContent = "⛔️ FAIL ⛔️";
            rating_desc.textContent = "Unfortunately, you did not meet the passing criteria. 😔😔";
    }
}

function add_row(name) {
    var new_row = document.createElement("tr");
    if (row_count % 2 === 0) {
        new_row.className = "added-row even";
    }
    else {
        new_row.className = "added-row odd";
    }
    var columns = []
    for (let i = 0; i < required_info.length; i++) {
        var inputElement = document.createElement("input");
        if (i === 0) {
            inputElement.type = "text";
            inputElement.value = name
            inputElement.classList = "input-text";
        }
        else {
            inputElement.type = "number";
            inputElement.value = 100;
            inputElement.classList = "input-int";
            inputElement.max = "100";
            inputElement.min = "50";
        }
        inputElement.id = `${row_count}-${required_info[i]}`;
        inputElement.addEventListener("input", UpdateStats);
        var new_column = document.createElement("td");
        new_column.appendChild(inputElement)
        new_row.appendChild(new_column);
        columns.push(new_column);
    }

    for (let i = 0; i < labeler.length; i++) {
        var new_column = document.createElement("td");
        new_column.id = `${row_count}-${labeler[i]}`;
        new_column.textContent = "None";
        new_row.appendChild(new_column);
        columns.push(new_column);
    }
    subject_database[row_count] = {"child": columns, "parent": new_row};
    card.appendChild(new_row);
    row_count += 1;
    card.insertBefore(new_row, card.children[2]);
    UpdateStats();
}

function remove_row() {
    if (row_count <= 0) {
        return
    }
    subject_database["0"]["parent"].remove();
    delete subject_database["0"];
    for (let i = 0; i < row_count - 1; i++) {
        subject_database[i] = subject_database[i + 1];
        for (let o = 0; o < 4; o++) {
            cur_id = subject_database[i]["child"][1 + o].children[0].id;
            if (cur_id.indexOf('-') !== -1) {
                var final_id = "-" + cur_id.slice(cur_id.indexOf('-') + 1);
            }
            subject_database[i]["child"][1 + o].children[0].id = `${String(i) + String(final_id)}`;
        }

        for (let o = 0; o < 2; o++) {
            cur_id = subject_database[i]["child"][Number(`${subject_database[i]["child"].length - (o + 1)}`)].id;
            if (cur_id.indexOf('-') !== -1) {
                var final_id = "-" + cur_id.slice(cur_id.indexOf('-') + 1);
            }
            subject_database[i]["child"][Number(`${subject_database[i]["child"].length - (o + 1)}`)].id = `${String(i) + String(final_id)}`;
        }
        delete subject_database[i + 1];
    }
    row_count -= 1;
    UpdateStats();
}

document.getElementById("preset1").addEventListener("click", function() {
    current_row = row_count
    for (var i = 0; i < current_row; i++) {
        remove_row();
    }
    for (var i = subjects.length - 1; i >= 0; i--) {
        add_row(subjects[i])
    }
})

document.getElementById("add-subject").addEventListener("click", function() {
    add_row(`Subject ${row_count + 1}`);
});

document.getElementById("remove-subject").addEventListener("click", function() {
    remove_row();
});