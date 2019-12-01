import Mock from 'mockjs'

Mock.mock('/api/test', 'get', setMember);
Mock.mock('/api/login', 'post', checkLogin);
Mock.mock('/api/subject', 'get', getSubjectList)

// 設置管理員帳號
function setMember() {
    let data: any[] = [
        {
            "name": "管理員",
            "account": 'admin',
            "password": 'admin',
        },
        {
            "name": '阿正',
            "account": 'jerry123',
            "password": 'jerry456'
        },
        {
            "name": '檸檬',
            "account": 'emily123',
            "password": 'emily456'
        },
        {
            "name": 'louis',
            "account": 'louis123',
            "password": 'louis456'
        }
    ]

    return data;
}

// 確認是否登入成功
function checkLogin(member: any) {
    let members: any[] = setMember();
    member = JSON.parse(member.body);
    for (let i = 0; i < members.length; i++) {
        let checkAccount: boolean = member.account === members[i].account;
        let checkPassword: boolean = member.password === members[i].password;
        if (checkAccount && checkPassword) {
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
function getSubjectList() {
    let subjectArr: any[] = [
        {
            'name': '國文',
            'price': 2000,
            'teacher': '吳凡'
        }
    ];

    return subjectArr;
}

export default Mock