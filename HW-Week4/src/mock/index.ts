import Mock from 'mockjs'


// 設置管理員帳號
const getMember = () => {
    let nameArr: any[] = ['管理員', '阿正', '檸檬', '路人'];
    let accountArr: any[] = ['admin', 'jerry123', 'emily123', 'man123'];
    let passwordArr: any[] = ['admin', 'jerry456', 'emily456', 'man456'];
    let isOpenArr: any[] = [true, true, true, false];
    let memberArr: any[] = [];
    for (let i = 0; i < 4; i++) {
        memberArr.push({
            'id': i,
            'name': nameArr[i],
            'account': accountArr[i],
            'password': passwordArr[i],
            'isOpen': isOpenArr[i]
        })
    }

    return memberArr;
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
    let teacher: any[] = ['吳岳', '張靜', '陳立', '張鎮麟', '張飛', '吳凡', '呂捷', '周盈'];
    let subjectArr: any[] = [];
    for (let i = 1; i <= 8; i++) {
        subjectArr.push({
            id: i,
            name: nameArr[i - 1],
            price: priceArr[i - 1],
            teacher: teacher[i - 1]
        });
    }

    return subjectArr;
}

// 取得學生清單
const getStudentList = () => {
    let studentArr: any[] = [];
    let subjectArr: any[] = getSubjectList();
    for (let i = 1; i <= 20; i++) {
        let ownSubject: any[] = subjectArr.filter(item => {
            if (Mock.Random.integer(0, 1)) {
                return item
            }
        });
        studentArr.push({
            id: i,
            name: Mock.Random.cname(),
            subject: ownSubject,
            phone: `09${Mock.Random.integer(10000000, 99999999)}`,
            isPayed: Mock.Random.integer(0, 1)
        });
    }

    return studentArr;
}

// 管理員修改密碼
const updatePassword = (data: any) => {
    let memberData: any = getMember();
    let index: number = memberData.findIndex((item: any) => {
        return item.account === JSON.parse(data.body).account;
    });
    if (index !== -1) {
        return {
            'status': 'success',
            'msg': '修改成功'
        }
    }
    return {
        'status': 'failed',
        'msg': '修改失敗'
    }
}

// 帳號 api
Mock.mock('/api/account', 'get', getMember);
Mock.mock('/api/login', 'post', checkLogin);
Mock.mock('/api/password', 'post', updatePassword)

// 科目 api
Mock.mock('/api/subject', 'get', getSubjectList);

// 學生 api
Mock.mock('/api/student', 'get', getStudentList);

export default Mock