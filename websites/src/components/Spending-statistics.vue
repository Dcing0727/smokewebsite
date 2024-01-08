<template>
    <div>
        <Side></Side>
        <div class="canv">
            <h2>烟草花销统计</h2>
            <Drag :MenuTitle="MenuTitle" :MenuItems="MenuItems" @menu-item-click="getChart"></Drag> 
            <highcharts :options="chartOptions"></highcharts>
        </div>
    </div>
</template>

<script>
    import Side from './side-bar.vue';
    import Drag from './Drop-downMenu.vue';
    import { jwtDecode } from 'jwt-decode';
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
        getChart(item) {
                // 获取用户Account
                const token = localStorage.getItem("token");
                const decodedToken = jwtDecode(token);
                const userAccount = decodedToken.sub;
                var type = 1;
                if(item == '近一年'){
                    type = 1;
                } else if(item == '近一月'){
                    type = 2;
                } else if( item == '近一周' ){
                    type = 3;
                }
                fetch('http://localhost:3000/api/user/spend', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        account: userAccount,
                        type: type             
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log(data.SpendingNumber);
                        var list = data.SpendingNumber;
                        var total = 0;
                        for (var i = 0; i<=6 ;i++){
                            total += list[i].totalExpenses;
                        }
                        
                        var template = {
                            title: {
                                text: item+ "共计："+ total + '元',
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
                                        y: list[0].totalExpenses ,
                                    }, {
                                        name: '红旗渠',
                                        y: list[1].totalExpenses,
                                    }, {
                                        name: '黄鹤楼',
                                        y: list[2].totalExpenses,
                                    }, {
                                        name: '云烟',
                                        y: list[3].totalExpenses,
                                    }, {
                                        name: '中华烟',
                                        y: list[4].totalExpenses,
                                    }, {
                                        name: '南京',
                                        y: list[5].totalExpenses,
                                    },{
                                        name: '玉溪',
                                        y: list[6].totalExpenses,
                                    }
                                    
                                    ],
                                },
                            ],
                        };
                        this.chartOptions = template;
                    } else {
                        console.log(data.error);
                        console.error("失败");
                    }
                })
                .catch(error => {
                    console.error("发生错误:", error);
                });
            },

    },  
    mounted() {
        this.getChart('近一周');
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