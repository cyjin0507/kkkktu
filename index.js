let data = [];

$.getJSON("./output.json", (jsonData) => {
    data = jsonData;
});

let value = "";
let max = $("#word-length").val();
let isCounter = true;

const findValue = (array, searchValue) => {
    const isDescending = $("#desc").is(":checked");
    return array.filter(item => 
        item.Merged_Data.startsWith(searchValue) && 
        item.Merged_Data.length <= max
    ).sort((a, b) => 
        isDescending ? 
        b.Merged_Data.length - a.Merged_Data.length : 
        a.Merged_Data.length - b.Merged_Data.length
    );
};

const draw = () => {
    const result = findValue(data, value);
    $("#list").html('');

    if (isCounter) {
        const specialItems = result.filter(x => x.Merged_Data.includes("한방"));
        specialItems.forEach(x => {
            $("#list").append(`<p style="color:red">${x.Merged_Data.replace("한방", "")}</p>`);
        });
    }

    const regularItems = result.filter(x => !x.Merged_Data.includes("한방"));
    regularItems.forEach(x => {
        $("#list").append(`<p>${x.Merged_Data}</p>`);
    });
};

$("#search").on('keyup', (e) => {
    value = e.target.value;
    if (value === "") return;
    draw();
});

$(".change-type").on('change', draw);
$("#word-length").on('change', (e) => {
    max = e.target.value;
    draw();
});

$("#is-counter").on('change', (e) => {
    isCounter = e.target.checked; // 체크박스의 checked 상태로 업데이트
    draw();
});
