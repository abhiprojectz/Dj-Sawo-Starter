var toolbarOptions = [{
	'header': 1
}, {
	'header': 2
}, 'bold', 'italic', 'underline', 'strike', {
	'align': "right"
}, {
	'list': 'ordered'
}, {
	'list': 'bullet'
}];

//     const bindings = {
//   enter: {
//     key: "/",
//     shiftKey: null,
//     handler: (range, context) => {
//       // Handle enter
//       console.log(range, "dgdgdg")

//     //   this.formatText(range, 'bold', true);
//     }
//   }
// };

var quill_config = {
	"theme": 'snow',
	"modules": {
		"toolbar": toolbarOptions,
		//   keyboard: {
		//   bindings
		// },
	},
	"placeholder": 'Compose an epic...',
};

const Keyboard = Quill.import('modules/keyboard');
var quill = new Quill('#editor', quill_config);

var markdownOptions = {
	// ignoreTags: [ 'strikethrough'], // @option - if you need to ignore some tags.

	//     tags: { // @option if you need to change for trigger pattern for some tags. 
	//     blockquote: {
	//       pattern: /^(\|){1,6}\s/g,
	//     },
	//     bold: {
	//       pattern:  /^(\|){1,6}\s/g,
	//     },
	//     italic: {
	//       pattern: /(\_){1}(.+?)(?:\1){1}/g,
	//     },
	//   },
};

new QuillMarkdown(quill, markdownOptions);


quill.on('text-change', function (delta, source) {
	// var text = quill.getText();
	var text = quill.root.innerHTML;

	// compiled.innerHTML = marked(text, { sanitize: true });


	var sel = quill.root.ownerDocument.getSelection();
	if (sel.rangeCount > 0) {
		var range = sel.getRangeAt(0);
		var rects = range.getClientRects();
		if (rects.length > 0) {

			$("#pop").css('top', rects[0].top + 'px');
			$("#pop").css('left', rects[0].left + 'px');


		}
	}

});


document.addEventListener("keydown", function (e) {
	if (e.keyCode === 18) { //checks whether the pressed key is "Enter"
		document.querySelector("#pop").style.display = "block";
	}
});

document.querySelector("#pop").onclick = (el) => {
	document.querySelector("#pop").style.display = "none";
}


function apply_shortcut(data, index) {
	const selection = quill.getSelection(); // get position of cursor (index of selection)

	if (index === 0) {
		quill.insertText(selection.index, data);
		quill.setSelection((selection.index + data.length));
	}

	if (index === 1) {
		// quill.deleteText(selection.index - 1, selection.index)
		quill.insertText(selection.index, data);
		quill.setSelection((selection.index + data.length));
	}

	if (index === 2) {
		quill.insertText(selection.index, data);
		quill.setSelection((selection.index + data.length));
	}

	if (index === 3) {
		quill.insertText(selection.index, data);
		quill.setSelection((selection.index + data.length) - 2);
	}

	if (index === 4) {
		quill.insertText(selection.index, data);
		quill.setSelection((selection.index + data.length) - 1);
	}

	if (index === 5) {
		quill.insertText(selection.index, data);
		quill.setSelection((selection.index + data.length) - 3);
	}

	if (index === 6) {
		quill.insertText(selection.index, data);
		quill.setSelection((selection.index + data.length) - 3);
	}

	if (index === 7) {
		quill.insertText(selection.index, data);
		quill.setSelection((selection.index + data.length) - 1);
	}

	if (index === 8) {
		quill.insertText(selection.index, data);
		quill.setSelection((selection.index + data.length));
	}
}


function htmlDecode(input) {
	var doc = new DOMParser().parseFromString(input, "text/html");
	return doc.documentElement.textContent;
}

var raw = resume_content;

quill.root.innerHTML = htmlDecode(raw);

var store_lasts = [];
store_lasts.push(quill.getText());

var intervalId = setInterval(function () {

	if (quill.getText() !== store_lasts[store_lasts.length - 1] && (quill.getText() !== "" || quill.getText() !== " ")) {
		store_lasts.push(quill.getText())
		update_content()
	}

}, 2000);


function update_content() {
	var text = quill.root.innerHTML;
	var title = document.querySelector("#resume_title")
	// var theme = document.querySelector("#theme")
	// var color_val = document.querySelector("#color_val")
	// var font_size = document.querySelector("#font_size")
	// var title_align = document.querySelector("#title_align")

	fetch(update_url , {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"X-CSRFToken": getCookie("csrftoken"),
			},
			body: JSON.stringify({
				"contents": text,
				"title": title.value
				// "theme": theme,
				// "font_size": font_size,
				// "title_align": title_align
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


var last_target;
document.addEventListener('click', function (e) {
	e = e || window.event;
	var target = e.target || e.srcElement,
		text = target.textContent || target.innerText;

	if (target.tagName == 'SPAN') {
		last_target = target.parentNode;
	} else {
		if (!pop.contains(target)) {
			pop.style.display = 'none';
		}
	}

}, false);