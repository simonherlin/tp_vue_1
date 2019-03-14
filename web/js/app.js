// let list = ({
//     props: {
//       items: {
//         type: Array
//       }
//     },
//     data: () => ({
//       filterMode: 'all'
//     }),
//     template:  `<li v-for="item in elem" class="list-group-item">
//                     <input type="checkbox" v-model="item.checked" @change="calTotal">
//                     <span style="width: 200px; display: inline-block;">
//                         {{ item.text }}
//                     </span>
//                     <input v-if="item.checked" type="number" v-model="item.price" @change="calTotal" style="width: 100px">
//                     <span v-if="item.checked">€</span>
//                     <button @click="sup(item.id)" type="button" class="btn btn-outline-danger">X</button>                    
//                 </li>`,
//     methods: {
//         sup: function(id) {
//             index = this.listProduct.map(function(e) { return e.id; }).indexOf(id);
//             console.log(index)
//             if (index > -1) {
//                 this.listProduct.splice(index, 1);
//                 this.calTotal()
//             }
//         }
//     },
//     computed: {
//         list: {
//             get: function () {
//                 return this.listProduct
//             },
//             set: function (value) {
//                 this.listProduct.push({id: this.listProduct.length, text: value[0], price: value[1], checked: false})
//             }
//         }
//     }
// })

var app = new Vue({
    el: '#app',
    // components: {
    //     list
    // },
    data: {
        element: '',
        price: 0,
        total: 0,
        budget: 75,
        horsBudget: false,
        bgc: '',
        listProduct: [
            {id: 0, text: 'Bière', price: 8, checked: true},
            {id: 1, text: 'Vodka', price: 17, checked: true},
            {id: 2, text: 'Rhum', price: 0, checked: false}
        ]
    },
    computed: {
        list: {
            get: function () {
                return this.listProduct
            },
            set: function (value) {
                this.listProduct.push({id: this.listProduct.length, text: value[0], price: value[1], checked: false})
            }
        }
    },
    methods: {
        addList: function () {
            this.list.push({id:this.list.length, text: this.element, price: 0, checked: false})
            this.element = ''
        },
        sup: function(id) {
            index = this.listProduct.map(function(e) { return e.id; }).indexOf(id);
            console.log(index)
            if (index > -1) {
                this.listProduct.splice(index, 1);
                this.calTotal()
            }
        },
        calTotal: function() {
            this.total = 0
            for (let i =0; i < this.listProduct.length; i++) {
                if (this.listProduct[i].checked) {
                    this.total += parseInt(this.listProduct[i].price)
                }
            }
            this.editBudget()
        },
        editBudget: function(){
            if (this.budget > this.total){
                this.bgc = 'border-color:green'
            }else{
                this.bgc = 'border-color:red'
            }
        }
    },
    mounted() {
        this.calTotal()
    }
})