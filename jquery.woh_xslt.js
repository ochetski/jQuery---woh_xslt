;(function($)
{
	/**
	 * jquery.woh_xslt.js - version 1.0
	 * A jQuery plugin for ajax XML+XSLT integration on XHTML Documents
	 *
	 * @author	William Ochetski Hellas
	**/
	$.fn.woh_xslt = function(options)
	{
		// Setup default option values
		var defaults = {
				xml : null,
				xsl : null
			},
			options = $.extend(defaults, options),
			_$page_container;
		return this.each(function()
		{
			_$page_container = $(this);
			// Initialise meta data
			if(options.xml === null || options.xsl === null) {
				return false;
			}
			var _returned = '';
			_returned = _woh_xslt_result();
			// loop for damn IE bug
			while(_returned == '')
				continue;
			_$page_container.html(_returned);
		});
		function _xml_load(file_name)
		{
			if(window.XMLHttpRequest) {
				var _xhttp = new XMLHttpRequest();
			} else {
				var _xhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			_xhttp.open("GET", arguments[0], false);
			_xhttp.send("");
			return _xhttp.responseXML;
		};
		function _woh_xslt_result()
		{
			var _xml = _xml_load(options.xml);
			var _xsl = _xml_load(options.xsl);
			// code for Mozilla, Firefox, Opera, etc.
			if(document.implementation && document.implementation.createDocument) {
				var xsltProcessor = new XSLTProcessor();
				xsltProcessor.importStylesheet(_xsl);
				return xsltProcessor.transformToFragment(_xml, document);
			} else if(window.ActiveXObject) {
				// code for damn IE
				return _xml.transformNode(_xsl);
			}
		};
	};
})(jQuery);