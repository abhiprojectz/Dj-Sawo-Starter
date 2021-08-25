var checked = `<span style="display:flex;">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5 12l5 5l10 -10" />
    </svg></span>`;

var cols = document.querySelectorAll(".color-box");

cols.forEach((el) => {
	if (el.getAttribute("color") === base_color) {
		el.innerHTML = checked;
	}
})

function HexCode(color) {
	const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
	const hex = `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
	return hex;
}


var el = document.querySelectorAll(".color-box")
var color_val = document.querySelector("#color-val")
var color_indicator = document.querySelector("#color_indicator")


for (let i = 0; i < el.length; i++) {
	el[i].onclick = function () {
		var c = 0;
		while (c < el.length) {
			el[c++].innerHTML = '';
		}
		el[i].innerHTML = checked;
		color_val.value = HexCode(el[i].style.backgroundColor);
		color_indicator.style.backgroundColor = HexCode(el[i].style.backgroundColor);
		update_content();
	};
}


// for (let i = 0; i < theme_btns.length; i++) {
//     theme_btns[i].onclick = function() {
//     var c = 0;
//     while (c < el.length) {
//         theme_btns[c++].classList.remove("btn-primary");
//     }
//     theme_btns[i].classList.add("btn-primary");
//     theme.value = theme_btns[i].textContent;

//   };
// }


var theme_btns = document.querySelectorAll(".theme_btn");
var theme = document.querySelector('#theme');
theme_btns.forEach((el) => {
	el.onclick = () => {
		$(el).siblings('button').removeClass('btn-pri').end().addClass('btn-pri');
		theme.value = el.textContent;
		update_content();
	}
})


var title_aligns = document.querySelectorAll(".title_ali_btn");
title_aligns.forEach((el) => {
	el.onclick = () => {
		$(el).siblings('button').removeClass('btn-pri').end().addClass('btn-pri');
		document.querySelector("#title_align").value = el.textContent;
		update_content();
	}
})


function update_content() {
	var title = document.querySelector("#resume_title")
	var theme = document.querySelector("#theme")
	var color_val = document.querySelector("#color-val");
	var font_size = document.querySelector("#font_size")
	var title_align = document.querySelector("#title_align")
	var spacing = document.querySelector("#spacing")

	fetch(update_url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"X-CSRFToken": getCookie("csrftoken"),
			},
			body: JSON.stringify({
				"theme": theme.value,
				"font_size": font_size.value,
				"title_align": title_align.value,
				"spacing": spacing.value,
				"base_color": color_val.value
			}),
		})
		.then(response => response.text())
		.then(data => {
			document.querySelector("#iframe-preview").src = document.querySelector("#iframe-preview").src;
			console.log("Successfully updated!")
		})
		.catch((error) => {
			console.log(error)
			swal(error);
		});
}