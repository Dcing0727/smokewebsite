<template>
    <div>
        <Side></Side>
        <div class="canv">
            <h1 id="divTyping">{{typedString}}</h1>
            <rain  :rainNumber="100" :rotateDeg="40" :w="1.2" :h="140"></rain>
        </div>

    </div>
    
</template>
<script>
    import Side from './side-bar.vue'
    import rain from './background-vue.vue'
    export default {
    name: 'smoke-statistics',
    data() {
        return {
            str: '戒烟统计页面',
            typedString: '',
        };
    },
    components: {
        Side,
        rain,
    },
    methods: {
        typing() {                     //打字特效
            let i = 0;
            const typingInterval = setInterval(() => {
            if (i <= this.str.length) {
                this.typedString = this.str.slice(0, i++) + '|';
            } else {
                clearInterval(typingInterval);
                this.typedString = this.str;
            }
        }, 300);
        },
    },
    mounted() {
        this.typing(); // 先执行一次，避免等待6秒后才开始第一次执行
        setInterval(() => {
            this.typing();
        }, 6000);
    },
    };
</script>


<style scoped>
    /* .box{
        position: absolute;
        top: 30%;
        left: 15%;
        color: black;
    } */
    .canv {
        position: absolute;
        margin-left: 220px;
        margin-top: 80px;
        background-color: white;
        width: 83%;
        height: 85%;
        border-radius: 15px;
        background-image: url('@/assets/夜空.jpg');
        background-size: cover;
        background-position: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .canv h1{
        color: white;
        font-size: 60px;
        font-family: "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
    }

    
</style>