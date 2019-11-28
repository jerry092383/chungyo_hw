import Mock from 'mockjs'

Mock.mock('/test', 'get', setMember)

function setMember() {
    let data: any[] = [
        {
            "name": 'jerry',
            "account": 'jerry123',
            "password": 'jerry456'
        },
        {
            "name": 'emily',
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

export default Mock;