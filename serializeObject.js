;(function($){
var rSelectTextarea = /select|textarea/i;
var rInputCheckbox = /text|password|checkbox|hidden|number/i;
var rCheckbox = /checkbox/i;
var rRadio = /radio/i;

/**
 * Сериализует форму в объект вида
 * <code>
 *      {
 *          name1: ["value1", "value2", "value3", ...],
 *          name2: "value2",
 *          name3: "value3",
 *          ...
 *      }
 * </code>
 */
$.fn.serializeObject = function(){

    var values = {};

    // все элементы формы
    this.map(function() {
        return this.elements ? jQuery.makeArray(this.elements) : this;
    })
    // такие, что:
    .filter(function() {
        // есть name, чтобы можно было запостить и не задизейбленые
        return this.name && !this.disabled
                // текстареи, секты, инпуты, в т.ч. чекбоксы независимо отмеченные или нет
                && (rSelectTextarea.test(this.nodeName) || rInputCheckbox.test(this.type)
                    // радио, только если отмеченные, чтобы сразу получить value отмеченного
                    || rRadio.test(this.type) && this.checked);
    })
    .each(function(){
        // если невыбранный чекбокс, то '', если выбранный или не чекбокс - value
        var val = (rCheckbox.test(this.type) && !this.checked) ? '' : $(this).val();
        var name = this.name;

        // если в объекте уже есть поле с таким name, то нужно строить массив
        if(typeof values[name] != "undefined"){
            if($.isArray(values[name])){
                values[name].push(val);
            }
            else {
                values[name] = [values[name], val];
            }
        }
        else {
            values[name] = val;
        }
    });

    return values;
}
})(jQuery);
