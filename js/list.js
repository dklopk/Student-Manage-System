(function(){
	const form = document.querySelector('.form') // 表单
	const mask = document.querySelector('#mask') // 遮罩
	const add = document.querySelector('#add') // 添加按钮
	// 点击增加出现学生信息表单
	add.addEventListener('click', function(){
		form.style.display = 'block'
		mask.style.display = 'block'
		// 提交按钮添加增加事件
		submit.addEventListener('click', addMessage)
	})
	// 增加学生信息到页面中
	const picture = document.querySelector('.picture') // 卡片页面大盒子
	const submit = document.getElementById("submit") // 提交按钮
	const stuNum = document.querySelector('#stuNum') // 表单控件学号
	const name = document.querySelector('#name') // 表单控件姓名
	const xibu = document.querySelector('#xibu') // 表单控件系部
	const img = document.querySelector('input[type=file]') // 表单控件图片
	// 添加内容函数
	function addMessage(e){
		e.preventDefault()
		// 确保输入内容不为空
		if(name.value !== '' && stuNum.value !== '' && xibu.value !== '' && img.value !== ''){
			// 关闭表单
			form.style.display = 'none'
			mask.style.display = 'none'
			const picture_div = document.createElement('div') // 新增卡片
			const sex = document.querySelector('input[type=radio]:checked') // 表单已选的性别
			const hobbies = document.querySelectorAll('input[type=checkbox]:checked') // 表单已选的爱好
			// 本地图片的导入 转化为url形式
			const file = img.files[0]
			const imageUrl = URL.createObjectURL(file)
			// 卡片内容
			picture_div.innerHTML = `
				<img src="${imageUrl}" alt="" />
				<p>${stuNum.value}</p>
				<p><span class="name">${name.value}</span><span class="sex">${sex.value}</span></p>
				<p>${xibu.value}</p>
			`
			const p = document.createElement('p') // 新增卡片爱好
			for(let i = 0; i < hobbies.length; i++){
				p.innerHTML +=`
					<span>${hobbies[i].value}</span>
				`
			}
			const span = p.querySelectorAll('span') // 每个新增的爱好
			// 男女标签颜色区分
			if(sex.value === '女'){
				picture_div.style.backgroundColor = '#ffccdd'
				span.forEach(function(item){
					item.style.backgroundColor = '#ffaa00'
				})
			}else{
				picture_div.style.backgroundColor = '#aaccff'
				span.forEach(function(item){
					item.style.backgroundColor = '#4488ff'
				})
			}
			picture_div.innerHTML += p.outerHTML
			// 通过 outerHTML 属性直接获取 HTML 字符串表示
			picture.appendChild(picture_div)
			// 添加成功后清空表单内容
			document.querySelector('form').reset()
		}else{
			alert('请输入完整信息')
		}
	}
	
	// 删除学生信息
	const deletes = document.querySelector('#delete') // 删除按钮
	const cancle = document.querySelector('#cancle') // 取消删除按钮
	// 删除按钮的删除函数
	function deleteElement(){
		// 点击删除后其他按钮禁用
		add.disabled = true
		deletes.disabled = true
		modify.disabled = true
		// 点击删除后取消删除按钮出现
		cancle.style.display = 'block'
		const delete_messages = document.querySelectorAll('.picture div') // 每个卡片
		delete_messages.forEach(function(item){
			item.style.boxShadow = '3px 3px 6px 3px rgba(255, 0, 0, 0.7)'
			// 每个卡片添加删除事件
			item.addEventListener('click', fn)
		})
	}
	// 每个卡片的删除事件函数
	function fn(){
		const delete_name = this.querySelector('.name')
		const result = confirm(`确定要删除【${delete_name.innerHTML}】的记录吗`)
		if(result === true){
			this.style.display = 'none' // 隐藏该卡片
		}
	}
	// 删除按钮添加删除事件  页面刷新先添加一次
	deletes.addEventListener('click', deleteElement)
	// 取消按钮添加点击事件
	cancle.addEventListener('click', function(){
		cancle.style.display = 'none'
		// 取消删除后恢复其他按钮
		add.disabled = false
		deletes.disabled = false
		modify.disabled = false
		// 清除删除按钮的事件
		deletes.removeEventListener('click', deleteElement)
		// 每个卡片清除删除事件
		const delete_messages = document.querySelectorAll('.picture div')
		delete_messages.forEach(function(item){
			item.style.boxShadow = '3px 3px 6px 3px rgba(0, 0, 0, 0.2)'
			item.removeEventListener('click', fn)
		})
	})
	// 删除按钮添加事件  第一次事件被清除后添加该事件
	deletes.addEventListener('click', function(){
		if(cancle.style.display === 'none'){
			deleteElement()
		}
	})
	// 修改学生信息
	const modify = document.querySelector('#modify') // 修改按钮
	const cancle_modify = document.querySelector('#cancle_modify') // 取消修改按钮
	// 修改按钮的点击事件函数
	function modifyElement(){
		// 点击修改后其他按钮禁用
		add.disabled = true
		deletes.disabled = true
		modify.disabled = true
		cancle_modify.style.display = 'block'
		const modify_messages = document.querySelectorAll('.picture div')
		modify_messages.forEach(function(item){
			// 改变每个卡片的阴影
			item.style.boxShadow = '3px 3px 6px 3px rgba(253, 169, 0, 0.7)'
			// 给每个卡片添加修改事件
			item.addEventListener('click', modifyEveryCards)
		})
		// 点击一次修改按钮后清除事件
		modify.removeEventListener('click', modifyElement)
	}
	// 每个卡片的修改函数
	function modifyEveryCards(){
		// 显示表单
		form.style.display = 'block'
		mask.style.display = 'block'
		// 将表单上的信息与卡片对应
		name.value = this.querySelector('.name').innerHTML // 姓名
		stuNum.value = this.querySelector('p:nth-child(2)').innerHTML // 学号
		xibu.value = this.querySelector('p:nth-child(4)').innerHTML // 院系
		// 默认选择卡片上的性别
		const sex_modify = this.querySelector('.picture .sex')
		document.querySelector(`input[type="radio"][value="${sex_modify.innerHTML}"]`).checked = true;
		// 选择卡片上的爱好标签
		const hobbies_modify = this.querySelectorAll('p:nth-child(5) span')
		document.querySelector('#tennis').checked = false
		hobbies_modify.forEach(function(item){
			document.querySelector(`input[type="checkbox"][value="${item.innerHTML}"]`).checked = true;
		})
		submit.removeEventListener('click', addMessage)
		// 提交按钮添加修改事件
		submit.addEventListener('click', modifyCard.bind(this), { once: true })
		// 如果只需要按钮点击一次，可以使用 addEventListener 的 { once: true } 选项，让事件只触发一次。
		// 这会自动在点击事件触发后移除监听器，使事件只触发一次。
	}
	// 提交按钮的修改事件函数
	function modifyCard(e){
		e.preventDefault()
		// 确认是否修改
		const modify_name = this.querySelector('.name')
		const result = confirm(`确定要修改【${modify_name.innerHTML}】的记录吗`)
		if(result === true){
			// 关闭表单
			form.style.display = 'none'
			mask.style.display = 'none'
			// 将卡片上的信息与修改后的表单对应
			const sex_modify = this.querySelector('.picture .sex')
			const hobbies_modify = this.querySelectorAll('p:nth-child(5) span')
			this.querySelector('.name').innerHTML = name.value
			this.querySelector('p:nth-child(2)').innerHTML = stuNum.value
			this.querySelector('p:nth-child(4)').innerHTML = xibu.value
			sex_modify.innerHTML = document.querySelector('input[type="radio"]:checked').value
			hobbies_modify.forEach(function(item, index){
				item.innerHTML = document.querySelectorAll('input[type="checkbox"]:checked')[index].value
			})
			// 修改头像图片
			const file = img.files[0]
			const imageUrl = file ? URL.createObjectURL(file) : this.querySelector('img').src
			this.querySelector('img').src = imageUrl
			// 清空表单
			document.querySelector('form').reset()
			// 清除提交按钮的修改事件
			submit.removeEventListener('click', modifyCard.bind(this))
			// 修改性别时卡片整体颜色会变化
			const span = this.querySelectorAll('p:nth-last-child(1) span')
			if(sex_modify.innerHTML === '女'){
				this.style.backgroundColor = '#ffccdd'
				span.forEach(function(item){
					item.style.backgroundColor = '#ffaa00'
				})
			}else{
				this.style.backgroundColor = '#aaccff'
				span.forEach(function(item){
					item.style.backgroundColor = '#4488ff'
				})
			}
		}
	}
	// 修改按钮添加修改事件  页面刷新先添加一次
	modify.addEventListener('click', modifyElement)
	// 取消修改按钮添加事件
	cancle_modify.addEventListener('click', function(){
		cancle_modify.style.display = 'none'
		// 取消修改后恢复其他按钮
		add.disabled = false
		deletes.disabled = false
		modify.disabled = false
		modify.removeEventListener('click', modifyElement)
		// 将卡片颜色变回原来
		const modify_messages = document.querySelectorAll('.picture div')
		modify_messages.forEach(function(item){
			item.style.boxShadow = '3px 3px 6px 3px rgba(0, 0, 0, 0.2)'
			item.removeEventListener('click', modifyEveryCards)
		})
	})
	// 修改按钮添加事件  第一次事件被清除后添加该事件
	modify.addEventListener('click', function(){
		if(cancle_modify.style.display === 'none'){
			modifyElement()
		}
	})
	
	// 表单关闭按钮
	const button = document.getElementById("button")
	button.addEventListener('click',function(e){
		e.preventDefault()
		document.querySelector('.form').style.display = 'none'
		document.querySelector('#mask').style.display = 'none'
		document.querySelector('form').reset()
	})
})();