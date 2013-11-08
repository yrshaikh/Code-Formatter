/* set defaults here */
var rock = 
{
    beautify_in_progress: false,
    editor: null // codemirror editor
};
/* beautify method */
function beautify() {
    if (rock.beautify_in_progress) return;
    rock.beautify_in_progress = true;
    var source = rock.editor ? rock.editor.getValue() : $('#source').val(), output, opts = {};
    if (looksLikeHtml(source)) {
        output = html_beautify(source, opts);
    } else {
        output = js_beautify(source, opts);
    }
    if (rock.editor) {
        rock.editor.setValue(output);
    } else {
        $('#source').val(output);
    }
    rock.beautify_in_progress = false;
}
function looksLikeHtml(source) {
    var trimmed = source.replace(/^[ \t\n\r]+/, '');
    var comment_mark = '<' + '!-' + '-';
    return (trimmed && (trimmed.substring(0, 1) === '<' && trimmed.substring(0, 4) !== comment_mark));
}
/* set up CodeMirror */
function initCodeMirror(){
	var textArea = $('#source')[0];    
    rock.editor = CodeMirror.fromTextArea(textArea, {
            theme: 'default',
            lineNumbers: true
        });
    rock.editor.focus();    
}
/* change theme */
function selectTheme() {
	var theme = $("#select-theme").val();
	rock.editor.setOption("theme", theme);
}
/* init drop down for themes */
function initThemeDropdown(){
	$("#select-theme").select2({});
}
/* clear text area */
function clearText(){
	rock.editor.setValue('');
}

$(function() {
    initCodeMirror();
    initThemeDropdown();
    $('.submit').click(beautify);
	$('#clearBtn').click(clearText);
	$('#select-theme').click(selectTheme);
});
