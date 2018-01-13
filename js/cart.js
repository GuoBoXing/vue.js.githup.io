var vm = new Vue({
	//需要操作的dom节点的id
	el:"#app",
	//数据
	data:{
		totalMoney:0,
		productList:[],
		checkAllFlag:false,
		delFlag:false,
		curProduct:''
	},
	//过滤器
	filters:{
		formatMoney:function(value){
			return "￥"+value.toFixed(2)
		}
	}, 
	//入口
	mounted: function(){
		this.cartView();
	},
	//具体的业务处理的方法
	methods:{
		cartView:function(){
			let _this = this;
			this.$http.get("data/cartData.json",{"id":123}).then(res => {
				this.productList = res.data.result.list;
				//this.totalMoney = res.data.result.totalMoney;
			});
		},
		changeMoney:function(product,way){
			if(way>0){
				product.productQuantity++
			} else {
				if(product.productQuantity > 1){
					product.productQuantity--	
				}
			}
			this.calcTotalPrice();
		},
		selectedProduct:function(item){
			if(typeof item.checked == 'undefined'){
				//全局注册
				//Vue.set(item,"checked",true);
				//局部注册
				this.$set(item,"checked",true);
			} else {
				item.checked = !item.checked;
			}
			this.calcTotalPrice();
		},
		checkAll:function(flag){
			this.checkAllFlag = flag;
			var _this = this;

			_this.productList.forEach(function(item,index){
				if(typeof item.checked == 'undefined'){
					_this.$set(item,"checked",_this.checkAllFlag);
				} else {
					item.checked = _this.checkAllFlag;
				}

			})
			this.calcTotalPrice();

		},
		calcTotalPrice:function(){
			var _this = this;
			_this.totalMoney = 0;
			_this.productList.forEach(function(item,index){
				if(item.checked){
					_this.totalMoney += item.productPrice * item.productQuantity 
				}
			});
		},
		delConfirm:function(item){
			this.delFlag = true;
			this.curProduct = item;
		},
		delProduct:function(){
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1)
			this.delFlag = false;
			this.calcTotalPrice();
		}
	}
})
		Vue.filter('maney',function(value,type){
			return "￥"+value.toFixed(2)+" "+type
		})