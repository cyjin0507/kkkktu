let data = []; // 데이터를 저장할 배열

// JSON 파일 로드
$.getJSON("./output.json", (jsonData) => {
    data = jsonData; // JSON 데이터를 data 배열에 저장
});

// 현재 검색어
let value = "";

// 검색 및 정렬 함수
const findValue = (array, searchValue) => {
    const isDescending = $("#desc").is(":checked"); // 체크박스나 라디오 버튼의 상태 확인
    return array.filter(item => item.Merged_Data.startsWith(searchValue)) // 앞글자만 검색
                .sort((a, b) => isDescending ? 
                    b.Merged_Data.length - a.Merged_Data.length : 
                    a.Merged_Data.length - b.Merged_Data.length); // 길이에 따라 정렬
};

// 키 입력 이벤트
$("#search").on('keyup', (e) => {
    $("#list").html('');
    value = e.target.value; // 현재 검색어 업데이트
    if (value === "") {
        return; // 검색어가 비어 있으면 리턴
    }
    const result = findValue(data, value); // 검색 및 정렬 수행
    
    // 결과를 리스트에 추가
    result.forEach(x => {
        $("#list").append(`
            <p>${x.Merged_Data}</p>
        `);
    });
});

// 라디오 버튼 또는 체크박스 변경 이벤트
$(".change-type").on('change', () => {
    const result = findValue(data, value); // 현재 검색어로 다시 검색 및 정렬
    $("#list").html(''); // 기존 목록 초기화
    result.forEach(x => {
        $("#list").append(`
            <p>${x.Merged_Data}</p>
        `);
    });
});
