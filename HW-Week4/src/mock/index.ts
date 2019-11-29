import Mock from 'mockjs'

Mock.mock('/api/test', 'get', setMember);
Mock.mock('/api/login', 'post', checkLogin);

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

function checkLogin(member: any) {
    let members: any[] = setMember();
    member = JSON.parse(member.body);
    for (let i = 0; i < members.length; i++) {
        let checkAccount: boolean = member.account === members[i].account;
        let checkPassword: boolean = member.password === members[i].password;
        if (checkAccount && checkPassword) {
            localStorage.setItem('member', JSON.stringify(members[i]))
            return {
                'msg': `${members[i].name} 歡迎登入!!`,
                'status': 'success'
            }
        }

    }

    return {
        "msg": '帳號或密碼錯誤!!',
        'status': 'failed'
    }
}

export default Mock