function scheduleHtmlParser(html) {
    let $raw = $('.kbcontent').toArray();
    console.log($raw)
    let courses = [];
    let name = "";
    let teacher = "";
    let weeks = "";
    let sections = "";
    let position = "";
    let day = "";

    for (index in $raw){
        data = $raw[index];
        if (data.children.length == 0){
            continue;
        }
        if (data.children != []){
            if (data.children.length == 1){
                continue;
            }
        }
        
        name = data.children[0].data;
        let extract = _extract_data(data);
        console.log(typeof name);
        for (var i=0; i<extract.length; i++){
            if (extract[i] == undefined){
                continue;
            }
            if (extract[i] == "教师"){
                teacher = extract[i+1];
            }else if (extract[i] == "周次(节次)"){
                weeks = extract[i+1];
                sections = extract[i+1];
            }else if (extract[i] == "教室"){
                position = extract[i+1];
            }
            try{
                if(name.indexOf("行业认知") != -1){
                    position = "待定";
                }
            }catch{
                
            }
            if(name != "" && teacher != "" && weeks != "" && sections != "" && position != ""){
                weeks = weeks.match(/(\S*)\[/);
                weeks = weeks[1].replace('(周)', '');
                weeks = _get_week(weeks);
                sections = sections.match(/\[(\S*)\]/);
                sections = sections[1].replace('-', '');
                while (sections.indexOf("-") != -1){
                    sections = sections.replace('-', '');
                }
                sections = sections.replace('节', '');
                sections = _get_section(sections);
                
                day = _get_day(index)
        
                let courseInfo = {
                    "name": name,
                    "position": position,
                    "day": day,
                    "teacher": teacher,
                    "sections":sections,
                    "weeks": weeks
                };
                //console.log(courseInfo);
                courses.push(courseInfo);
                teacher = "";
                weeks = "";
                sections = "";
                position = "";
                day = "";
                try {
                    i = i + 8;
                    name = extract[i];
                    //console.log(name);
                } catch(error) {

                }
            }
           
        }

    }

    

    Result = {
        "courseInfos": courses,
        "sectionTimes": createSectionTimes()
    };
    console.log(Result)
    return Result;
}


function _extract_data(node) {
    var child = node.children,
        arr = [];
    try {
        arr.push(node["attribs"].title);
        arr.push(node.children[0].data);
    } catch (error){

    }
    
    if (child) {
        child.forEach(function(node) {
            arr = arr.concat(_extract_data(node));
        });
    }
    return arr;
}

function _get_week(data) {
    let result = [];
    let raw = data.split(',');
    for (i in raw) {

        if (raw[i].indexOf('-') == -1) {
            result.push(parseInt(raw[i]));
        } else {
            let begin = raw[i].split('-')[0];
            let end = raw[i].split('-')[1];
            for (let i = parseInt(begin); i <= parseInt(end); i++) {
                result.push(i);
            }
        }
    }
    return result.sort(function (a, b) {
        return a - b
    });

}

function _get_section(data) {
    let section = []
    let num = 0;
    let i = 0;
    do {
        num = parseInt(data.substr(i, 2));
        section.push({"section":num});
        i = i + 2;
    } while (i < data.length);
    return section;
}

function _get_day(index) {
    day = index / 2;
    day = day + 1;
    day = day % 7;
    if (day == 0){
        day = 7;
    }
    return day
}

function createSectionTimes() {
    let sectionTimes = [
        {
            "section": 1,
            "startTime": "08:30",
            "endTime": "09:10"
        }, 
        {
            "section": 2,
            "startTime": "09:20",
            "endTime": "10:00"
        },
        {
            "section": 3,
            "startTime": "10:20",
            "endTime": "11:00"
        },
        {
            "section": 4,
            "startTime": "11:10",
            "endTime": "11:50"
        },
        {
            "section": 5,
            "startTime": "14:00",
            "endTime": "14:40"
        },
        {
            "section": 6,
            "startTime": "14:50",
            "endTime": "15:30"
        },
        {
            "section": 7,
            "startTime": "15:50",
            "endTime": "16:30"
        },
        {
            "section": 8,
            "startTime": "16:40",
            "endTime": "17:20"
        },
        {
            "section": 9,
            "startTime": "18:50",
            "endTime": "19:30"
        },
        {
            "section": 10,
            "startTime": "19:30",
            "endTime": "20:10"
        },
        {
            "section": 11,
            "startTime": "20:20",
            "endTime": "21:00"
        },
        {
            "section": 12,
            "startTime": "21:00",
            "endTime": "21:40"
        }
    ]
    return sectionTimes
}