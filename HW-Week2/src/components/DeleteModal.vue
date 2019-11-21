<template lang="pug">
  div
    //- Modal
    #deleteModal.modal.fade(
        tabindex="-1" 
        role="dialog" 
        aria-labelledby="deleteModal" 
        aria-hidden="true" 
        data-backdrop="static" 
        data-keyboard="false"
    )
        .modal-dialog.modal-dialog-centered(role="document")
            .modal-content
                .modal-body
                    h2.text-center.mt-5 確定要刪除嗎?
                    .d-flex.justify-content-center.mt-3.mb-4
                        img(src="../assets/exclamation-mark.png")
                    .d-flex.justify-content-center
                        button.btn.btn-secondary(type="button" data-dismiss="modal" @click.prevent="clear") 取消
                        button.btn.btn-outline-danger.ml-3(type="button" data-dismiss="modal" @click.prevent="checkDel") 刪除
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component
export default class DeleteModal extends Vue {
    @Emit("delete")
    checkDel(): void {}

    @Emit("clear")
    clear(): void {}
}
</script>

<style lang="scss" scoped>
img {
    width: 15%;
    height: 15%;
}
</style>