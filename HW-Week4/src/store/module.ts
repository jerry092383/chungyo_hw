import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
    name: 'myModule',
    namespaced: true
})
export default class module extends VuexModule {
    member: any = {
        name: '' as string,
        account: '' as string,
        isLogin: false as boolean
    };

    get getLoginStatus() {
        return this.member.isLogin;
    }

    get getMemberData() {
        return this.member;
    }

    @Mutation
    SET_MEMBER_STATUS(memberData: any) {
        this.member.name = memberData.name;
        this.member.account = memberData.account;
        this.member.isLogin = true;
    }

    @Mutation
    LOGOUT_MEMBER() {
        this.member = {};
        this.member.isLogin = false;
    }
}