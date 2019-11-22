<template lang="pug">
    div
        .row
            .col-6.col-sm-4.col-lg-3.col-xl-2.my-2(v-for="(item, index) in moviesData" :key="index")
                .card.shadow.img-container.w-100
                    img.card-img-top(:src="item.poster")
                    .overlay.d-flex.flex-column.justify-content-center.align-items-center
                        button.btn.btn-primary.mx-5.mb-2(@click.prevent="addShowMovies(item.id)" v-if="action == 'add'") 加入
                        button.btn.btn-danger.mx-5.mb-2(@click.prevent="removeShowMovies(item.id)" v-if="action == 'remove'") 移除
                        button.btn.btn-warning.mx-5.mb-2(@click.prevent="movie = item; event = '修改'" data-toggle="modal" :data-target="`#movieForm${id}`") 修改
                        button.btn.btn-info.mx-5.mb-2(@click.prevent="movie = item" data-toggle="modal" :data-target="`#viewMovies${id}`") 檢視
        
        //- 電影表單 Modal
        MovieForm(:movie-datas="movie" :id="id" :event="event")

        //- 檢視視窗 Modal
        ViewMovies(:movie="movie" :id="id")
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import ViewMovies from '@/views/backEnd/movies/components/ViewMovies.vue';
import MovieForm from '@/views/backEnd/movies/components/MovieForm.vue';

@Component({
    components: {
        ViewMovies,
        MovieForm
    }
})
export default class MovieCard extends Vue {
    // Prop
    @Prop([Array, Object])
    moviesData!: any[] | object

    @Prop(String)
    action!: string

    @Prop(Number)
    id!: number

    // Data
    movieId: number = 0;
    movie: any[] = [];
    event: string = '';

    // 加入
    @Emit('add')
    addShowMovies(id: number) {}
    
    // 移除
    @Emit('remove')
    removeShowMovies(id: number) {}
}
</script>