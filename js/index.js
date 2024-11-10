(function(){
	// 点击一级菜单显示或隐藏二级菜单
	const menu_message = document.querySelector('#menu-message')
	const list1 = document.querySelector('.list1')
	const li = document.querySelector('.left>ul>li:nth-child(1)')
	const arrow = document.querySelector('.left ul .on')
	menu_message.addEventListener('click', function(){
		if(list1.style.display === 'block'){
			list1.style.display = 'none'
			li.style.height = '32px'
			// 箭头的指向
			arrow.style.transform = 'rotate(-135deg)'
			arrow.style.marginLeft = '70px'
		}else{
			list1.style.display = 'block'
			li.style.height = '136px'
			arrow.style.transform = 'rotate(45deg)'
			arrow.style.marginLeft = '60px'
		}
	})
	
	// 二级菜单点击事件
	const content = document.querySelector('.right .content iframe')
	li.addEventListener('click', function(e){
		if(e.target.tagName === 'LI'){
			// 菜单高亮显示
			document.querySelector('.left .list1 li.active').classList.remove('active')
			e.target.classList.add('active')
			// 切换嵌入的页面
			if(e.target.dataset.id === '1'){
				content.src = './list.html'
			}else if(e.target.dataset.id === '2'){
				content.src = './img/iframe2.png'
			}else{
				content.src = './img/iframe2.png'
			}
		}
	})
	
	// 站内信按钮点击事件
	const message = document.querySelector('.right .header .message')
	const message_list = document.querySelector('.message-list')
	const triangle = document.querySelector('.triangle')
	message.addEventListener('click', function(){
		// 显示或隐藏提示信息和小三角
		if(message_list.style.display === 'block'){
			message_list.style.display = 'none'
			triangle.style.display = 'none'
		}else{
			message_list.style.display = 'block'
			triangle.style.display = 'block'
		}
		
	})
})();