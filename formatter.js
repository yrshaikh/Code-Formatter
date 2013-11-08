var the = {
            //use_codemirror: (!window.location.href.match(/without-codemirror/)),
            beautify_in_progress: false,
            editor: null // codemirror editor
        };
function beautify() {
    if (the.beautify_in_progress) return;
    the.beautify_in_progress = true;
    var source = the.editor ? the.editor.getValue() : $('#source').val(), output, opts = {};
    if (looks_like_html(source)) {
        output = html_beautify(source, opts);
    } else {
        if ($('#detect-packers').prop('checked')) {
            source = unpacker_filter(source);
        }
        output = js_beautify(source, opts);
    }
    if (the.editor) {
        the.editor.setValue(output);
    } else {
        $('#source').val(output);
    }
    the.beautify_in_progress = false;
}

function looks_like_html(source) {
    var trimmed = source.replace(/^[ \t\n\r]+/, '');
    var comment_mark = '<' + '!-' + '-';
    return (trimmed && (trimmed.substring(0, 1) === '<' && trimmed.substring(0, 4) !== comment_mark));
}

function selectTheme() {
	var theme = $("#select-theme").val();
	the.editor.setOption("theme", theme);
}

$(function() {
    var default_text = "sample code to go here";
    var textArea = $('#source')[0];
    //if (the.use_codemirror && typeof CodeMirror !== 'undefined') {
        the.editor = CodeMirror.fromTextArea(textArea, {
                theme: 'default',
                lineNumbers: true
            });
        the.editor.focus();
        the.editor.setValue(default_text);
        $('.CodeMirror').click(function () {
            if (the.editor.getValue() == default_text) {
                the.editor.setValue('');
            }
        });
    /*} else {
        $('#source').val(default_text).bind('click focus', function () {
            if ($(this).val() == default_text) {
                $(this).val('');
            }
        }).bind('blur', function () {
            if (!$(this).val()) {
                $(this).val(default_text);
            }
        });
    }*/
    $(window).bind('keydown', function (e) {
        if (e.ctrlKey && e.keyCode == 13) {
            beautify();
        }
    })
    $('.submit').click(beautify);
    //$('select').change(beautify);
  	// old code
	$("#select-theme").select2({});
	$("#source").focus();
	$('#formatBtn').bind("click", function() {});
	$('#clearBtn').bind("click", function() {
	 	$("#source").val("");
	});
	$('#select-theme').bind("click", function() {
	 	selectTheme();
	});

});
