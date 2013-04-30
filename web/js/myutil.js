function escapeHtml(src) {
	return src.replace(/&/g, '&amp;')
		.replace(/>/g, '&gt;')
		.replace(/</g, '&lt;');
}

function showConfirmDialog(title, message, onOK, onCancel) {
	var dialogId = "mydialog_" + rand(1000000);
	var confirmModalLabelId = dialogId + "label";
	var dialogOKButtonId = dialogId + "OK";

	$("body").tap().append(
	'<div id="' + dialogId + '" class="modal hide fade" role="dialog" tabindex="-1" aria-labelledby="' + confirmModalLabelId + '" aria-hidden="true">'
	+ '	<div class="modal-header"> '
	+ '		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
	+ '		<h3 Id="' + confirmModalLabelId + '">' + title + '</h3>'
	+ '	</div>'
	+ '	<div class="modal-body">'
	+ '		<p>' + message + '</p>'
	+ '	</div>'
	+ '	<div class="modal-footer">'
	+ '		<button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>'
	+ '		<button class="btn btn-primary" id="' + dialogOKButtonId + '">OK</button>'
	+ '	</div>'
	+ '</div>'
	);
	var okButtonClicked = false;

	//ダイアログでOKボタンが押された時だけ処理実行
	$('#' + dialogOKButtonId).tap().on('click', function() {
		okButtonClicked = true;
		$('#' + dialogId).modal('hide');
	});

	$('#' + dialogId).tap().on('hide', function() {
		if (okButtonClicked) {
			if (typeof(onOK) != 'undefined') {
				onOK();
			}
		}
		else {
			if (typeof(onCancel) != 'undefined') {
				onCancel();
			}
		}
		$('#' + dialogId).remove();
	});

	$('#' + dialogId).tap().modal();
}

function rand(max) {
	var min = 1;
	return Math.floor(Math.random() * (max - min + 1)) + min
}
