export function pageTnScroll(scrollMain) {
	return {
		data() {
			return {
				pageScroll_H:0,
				SH:550,
				scr_t:false,
				scr_n:true,
			}
		},
		methods: {
			scrollMs(number = 0, time){
				if (!time) {
					document.getElementById(scrollMain).getElementsByClassName('bv-view-scroll')[0].scrollTop = number;
					return number;
				}
				const spacingTime = 2; // 设置循环的间隔时间  值越小消耗性能越高
				let spacingInex = time / spacingTime; // 计算循环的次数
				let nowTop = document.getElementById(scrollMain).getElementsByClassName('bv-view-scroll')[0].scrollTop; // 获取当前滚动条位置
				let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
				let scrollTimer = setInterval(() => {
					if (spacingInex > 0) {
						spacingInex--;
						this.scrollMs(nowTop += everTop);
					} else {
						clearInterval(scrollTimer); // 清除计时器
					}
				}, spacingTime);
			},
			
			scrollClick_T(){
				let SH = this.SH;
				let box = document.getElementById(scrollMain).getElementsByClassName('bv-view-scroll')[0];//外层scroll
				let boxMain = box.getElementsByClassName('bv-view-scroll-main')[0];//内容盒子
				let boxHeight = boxMain.offsetHeight;
				if(SH >= boxHeight){
					return false
				}else {
					if((this.pageScroll_H) < SH){
						this.pageScroll_H = 0;
						this.scrollMs(this.pageScroll_H,300);
						//box.scrollTop = this.pageScroll_H;
					}else {
						this.pageScroll_H -= SH;
						this.scrollMs(this.pageScroll_H,300);
						//box.scrollTop = this.pageScroll_H;
					}
				}
			},
			scrollClick_N(){
				let SH = this.SH;
				let box = document.getElementById(scrollMain).getElementsByClassName('bv-view-scroll')[0];//外层scroll
				let boxMain = box.getElementsByClassName('bv-view-scroll-main')[0];//内容盒子
				let boxHeight = boxMain.offsetHeight;
				if(SH >= boxHeight){
					return false
				}else {
					if(this.pageScroll_H >= (boxHeight-SH)){
						this.pageScroll_H = boxHeight-SH;
						this.scrollMs(this.pageScroll_H,300);
						//box.scrollTop = this.pageScroll_H;
					}else {
						this.pageScroll_H += SH;
						this.scrollMs(this.pageScroll_H,300);
						//box.scrollTop = this.pageScroll_H;
					}
				}
			},
			hScroll(){
				let box = document.getElementById(scrollMain).getElementsByClassName('bv-view-scroll')[0];//外层scroll
				let boxMain = box.getElementsByClassName('bv-view-scroll-main')[0];//内容盒子
				let boxHeight = boxMain.offsetHeight;
				this.pageScroll_H = box.scrollTop;
				if(box.scrollTop >= this.SH){
					this.scr_t = true
				}else {
					this.scr_t = false
				}
				if((this.pageScroll_H >= (boxHeight-this.SH*2))){
					this.scr_n = false
				}else {
					this.scr_n = true
				}
			}
		},
		mounted() {
			document.getElementById(scrollMain).getElementsByClassName('bv-view-scroll')[0].addEventListener('scroll', this.hScroll)
		}
	}
}