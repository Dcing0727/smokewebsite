<template>
    <div>
        <Side></Side>
        <div class="canv">
            <h2>烟草花销统计</h2>
            <Drag :MenuTitle="MenuTitle" :MenuItems="MenuItems"></Drag> 
            <highcharts :options="chartOptions"></highcharts>
        </div>
    </div>
</template>

<script>
    import Side from './side-bar.vue';
    import Drag from './Drop-downMenu.vue';
    
    export default{
        components: {
            Side,
            Drag
        },
        data(){
            return {
                chartOptions: {},
                MenuTitle: '时间选择',
                MenuItems: ["近一年", "近一月", "近一周"],
                
            };
        },
        methods: {
            getChart() {
                var template = {
                    title: {
                        text: "烟草花销统计",
                    },
                    chart: {
                        type: 'pie',
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        // width:300,
                        // height: 200,
                    },
                    accessibility: {
                        enabled: false, // 将这里的值设置为 false
                    },
                    credits: {
                        enabled: false,
                    },
                    plotOptions: {
                        pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false           
                                },
                                showInLegend: true
                        }
                    },
                    series: [
                        {
                            type: 'pie',
                            name: "人民币",
                            colorByPoint: true,
                            data: [{
                                name: '利群',
                                y: 500,
                            }, {
                                name: '中华',
                                y: 30,
                            }, {
                                name: '黄鹤楼',
                                y: 20,
                            }, {
                                name: '黄鹤楼',
                                y: 20,
                            }, {
                                name: '红旗渠',
                                y: 20,
                            }, {
                                name: '南京',
                                y: 34,
                            }
                            
                            
                            ],
                        },
                    ],
            };
            this.chartOptions = template;
        },
    },  
    mounted() {
        this.getChart();
    },

};


</script>



<style scoped>
    .canv {
        position: absolute;
        margin-left: 220px;
        margin-top: 80px;
        background-color: white;
        width: 83%;
        height: 85%;
        border-radius: 15px;
    }

    .canv h2 {
        margin: 10px;
        padding: 5px;
        border-left: 10px solid #fdda24;
        width: 180px;
    }


</style>