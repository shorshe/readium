Handlebars.registerHelper("orUnknown",function(a){return a?a:chrome.i18n.getMessage("i18n_unknown")});Handlebars.registerHelper("fetchInzMessage",function(a){return new Handlebars.SafeString(chrome.i18n.getMessage(a))});