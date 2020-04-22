
const storage = {
	// 仍然需要设置时长，虽然浏览器关闭会清除
	set(name, value){
		if(!value){
			localStorage.removeItem(name)
			return
		}
		const expire = new Date().getTime()
		localStorage[name] = JSON.stringify({
			value,
			// time:expire + 24 * 60 * 60 * 1000
			time:expire +  10 * 60 * 1000

		})
	},
	get(name){
		const data = localStorage[name]
		if(data !== undefined){
			let cacheData = JSON.parse(data)
			if(!cacheData || cacheData.time < new Date()){
				localStorage.removeItem(name)
				return null
			}
			return cacheData.value
		}
	},
	remove(name){
		return localStorage.removeItem(name)
	}
}

export default storage



