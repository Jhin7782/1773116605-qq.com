var vm = new Vue({
	el: '#Body',
	template: '<div>{{ fruit }}</div>',
	data: {
		fruit: 'apple'
	}
})

console.log(vm.fruit);