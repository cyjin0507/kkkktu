let data = [];


$.getJSON("./output.json", (jsonData) => {
    data = jsonData;
});


let value = "";
let max = 6;

const findValue = (array, searchValue) => {
    const isDescending = $("#desc").is(":checked");
    return array.filter(item => item.Merged_Data.startsWith(searchValue) && item.Merged_Data.length <= max)
        .sort((a, b) => isDescending ?
            b.Merged_Data.length - a.Merged_Data.length :
            a.Merged_Data.length - b.Merged_Data.length);
};

const draw = () => {
    const result = findValue(data, value);
    $("#list").html('');
    result.forEach(x => {
        $("#list").append(`
            <p>${x.Merged_Data}</p>
        `);
    });
}


$("#search").on('keyup', (e) => {
    $("#list").html('');
    value = e.target.value;
    if (value === "") {
        return;
    }
    
    draw();
});


$(".change-type").on('change', () => {
    draw();
});

$(".word-length").on('change', (e) => {
    const {target} = e;
    max = e.target.value;

    // if(type == "min" && min >= max) {
    //     $("#min-length").val(min-1);
    // } else if(type == "max" && min <= max) {
    //     $("#max-length").val(max-1);
    // }
    draw()
    
    

})
