export function keepScroll() {
	return {
		deactivated(){
			document.getElementsByClassName('bv-view-scroll')[0].removeEventListener('scroll', this.handleScroll);
		},
		activated() {//后续进入
			if(this.scroll > 0){
				document.getElementsByClassName('bv-view-scroll')[0].scrollTo(0, this.scroll);
				this.scroll = 0;
				document.getElementsByClassName('bv-view-scroll')[0].addEventListener('scroll', this.handleScroll);
			}
		},
		mounted(){
			document.getElementsByClassName('bv-view-scroll')[0].addEventListener('scroll', this.handleScroll);
		},
		methods:{
			handleScroll () {
				let scrollTop = document.getElementsByClassName('bv-view-scroll')[0].scrollTop;
				this.scroll = scrollTop;
			},
		}
	}
}