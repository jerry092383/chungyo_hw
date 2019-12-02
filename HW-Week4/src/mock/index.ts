import Mock from 'mockjs'


// 設置管理員帳號
const getMember = () => {
    let data: any[] = [
        {
            "name": "管理員",
            "account": 'admin',
            "password": 'admin',
            "isOpen": true
        },
        {
            "name": '阿正',
            "account": 'jerry123',
            "password": 'jerry456',
            "isOpen": false
        },
        {
            "name": '檸檬',
            "account": 'emily123',
            "password": 'emily456',
            "isOpen": true
        },
        {
            "name": 'louis',
            "account": 'louis123',
            "password": 'louis456',
            "isOpen": true
        }
    ]

    return data;
}

// 確認是否登入成功
const checkLogin = (member: any) => {
    let members: any[] = getMember();
    member = JSON.parse(member.body);
    for (let i = 0; i < members.length; i++) {
        let checkAccount: boolean = member.account === members[i].account;
        let checkPassword: boolean = member.password === members[i].password;
        if (checkAccount && checkPassword) {
            let checkAuthority: boolean = members[i].isOpen;
            if (!checkAuthority) {
                return {
                    'msg': '此帳號已被停權!!',
                    'status': 'failed'
                }
            }
            return {
                'msg': `${members[i].name} 歡迎登入!!`,
                'status': 'success',
                'data': members[i]
            }
        }

    }

    return {
        "msg": '帳號或密碼錯誤!!',
        'status': 'failed'
    }
}

// 取得科目清單
const getSubjectList = () => {
    let nameArr: any[] = ['國文', '英文', '數學', '化學', '物理', '公民', '歷史', '地理'];
    let priceArr: any[] = [2000, 2000, 2000, 2500, 2500, 1500, 1500, 1500];
    let subjectArr: any[] = [];
    for (let i = 0; i < 8; i++) {
        subjectArr.push({
            name: nameArr[i],
            price: priceArr[i],
            teacher: `${Mock.mock('@cfirst')}${Mock.mock('@clast')}`
        });
    }

    return subjectArr;
}

// 取得學生清單
const getStudentList = () => {
    let studentArr: any[] = [];
    for (let i = 0; i < 10; i++) {
        studentArr.push({
            name: Mock.Random.cname()
        });
    }

    return studentArr;
}

const setMemberIsOpen = (setData: any) => {
    let memberArr = getMember();
    
}

Mock.mock('/api/account/isOpen', 'post', setMemberIsOpen)
Mock.mock('/api/account', 'get', getMember);
Mock.mock('/api/login', 'post', checkLogin);
Mock.mock('/api/subject', 'get', getSubjectList);
Mock.mock('/api/student', 'get', getStudentList);

export default Mock