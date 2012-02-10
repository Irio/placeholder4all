// Placeholder
function isPlaceholderSupported() {
  var input = document.createElement("input");
  return ('placeholder' in input);
}

function isBlankInput(input) {
  if ($(input).val() == null ||
      $(input).val() == '' ||
      $(input).val() == inputPlaceholder(input)) {
    return true;
  } else {
    return false;
  }
}

function inputPlaceholder(input, value) {
  inputId = $(input).attr('name');
  if (typeof(value) == 'undefined') {
    return placeHolderList[inputId];
  } else {
    placeHolderList[inputId] = value;
  }
}


function convertPlaceholderToValue(input) {
  text = $(input).attr('title');

  if (isBlankInput(input)) {
    $(input).attr('value', text);
    inputPlaceholder(input, text);
  }

  $(input).click(function() {
    if ($(input).attr('value') == inputPlaceholder(input)) {
      $(input).val(null);
    };
  });

  $(input).blur(function() {
    if (isBlankInput(input)) {
      $(input).val(inputPlaceholder(input));
    }
  })
}

function clearPlaceholderValue(form) {
  $(form).find("input[type=text][title], input[type=password][title]").each(function() {
    if ($(this).val() == inputPlaceholder(this)) {
      $(this).val(null);
    }
  });
}

function convertPlaceholders(universe) {
  if (typeof(universe) == 'undefined') {
    universe = $('html');
  }
  if (!isPlaceholderSupported()) {
    universe.find("input[type=text][title], input[type=password][title]").each(function() {
      convertPlaceholderToValue(this);
    });
    $('form').submit(function() {
      clearPlaceholderValue(this);
      if (!$(this).valid()) {
        convertPlaceholders($(this));
        return false;
      }
    });
  } else {
    universe.find("input[type=text][title], input[type=password][title]").each(function() {
      placeholder = $(this).attr('title');
      $(this).attr('placeholder', placeholder);
    });
  }
  return universe;
}