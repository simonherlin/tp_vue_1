let list = ({
    props: {
      items: {
        type: Array
      }
    },
    data: () => ({
      filterMode: 'all'
    }),
    template:  `
        <ul class="list-group w-25">
            <li class="list-group-item" v-for="(item, index) in list" :key="index"" style="display: flex;">
                <div class="mr-5 w-25 d-inline-block"">
                    <input type="checkbox" v-model="item.checked"/>
                    {{ item.text }}
                </div>
                <div class="input-group w-50 " v-if="item.checked">
                    <input type="number" class="form-control" v-model="item.price" @change='total'>
                    <div class="input-group-append">
                        <span class="input-group-text">€</span>
                    </div>
                </div>
                <div class="mr-5 w-25 d-inline-block">
                    <button type="button" @click="sup(item.id)" class="btn btn-danger">Supprimer</button>
                </div>
            </li>
        </ul>`,
    methods: {
        sup: function(id) {
            index = this.items.map(function(e) { return e.id; }).indexOf(id);
            if (index > -1) {
                this.items.splice(index, 1);
                this.$parent.calTotal()
            }
        },
        total: function() {
            this.$parent.calTotal()
        }
    },
    computed: {
        list () {
            if(this.filterMode === 'notBought')
              return this.items.filter(i => !i.checked)
            else if(this.filterMode === 'bought')
              return this.items.filter(i => i.checked)
            else
              return this.items
      }
    }
})

var app = new Vue({
    el: '#app',
    components: {
        list
    },
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
            this.saveList()
        },
        // sup: function(id) {
        //     index = this.listProduct.map(function(e) { return e.id; }).indexOf(id);
        //     console.log(index)
        //     if (index > -1) {
        //         this.listProduct.splice(index, 1);
        //         this.calTotal()
        //     }
        //     this.saveList()
        // },
        calTotal: function() {
            console.log('hey')
            this.total = 0
            for (let i =0; i < this.listProduct.length; i++) {
                if (this.listProduct[i].checked) {
                    this.total += parseInt(this.listProduct[i].price)
                }
            }
            this.editBudget()
            this.saveList()
        },
        editBudget: function(){
            if (this.budget > this.total){
                this.bgc = 'border-color:green'
            }else{
                this.bgc = 'border-color:red'
            }
            this.saveBudget()
        },
        saveList: function() {
            const parsed = JSON.stringify(this.listProduct);
            localStorage.setItem('listProduct', parsed);
        },
        saveBudget: function () {
            const parsed = JSON.stringify(this.budget);
            localStorage.setItem('budget', parsed);
        }
    },
    mounted() {
        if (localStorage.getItem('listProduct')) {
            try {
              this.listProduct = JSON.parse(localStorage.getItem('listProduct'));
            } catch(e) {
              localStorage.removeItem('listProduct');
            }
          }
          if (localStorage.getItem('budget')) {
            try {
                this.budget = JSON.parse(localStorage.getItem('budget'));
              } catch(e) {
                localStorage.removeItem('budget');
              } 
          }
        this.calTotal()
    }
})