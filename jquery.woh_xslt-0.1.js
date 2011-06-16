;(function($) {
	/**
	 * jquery.woh_xslt.js - version 0.1
	 * A jQuery plugin for ajax XML+XSLT integration on XHTML Documents
	 *
	 * Copyright (c) 2010, William Ochetski Hellas (http://ligona.org)
	 * Liscensed under the MIT License (MIT-LICENSE.txt)
	 * http://www.opensource.org/licenses/mit-license.php
	 * Created: 2010-05-08 | Updated: 2010-05-08
	**/
	$.fn.woh_xslt = function(options)
	{
		// Setup default option values
		var defaults = {
			xml : null,
			xsl : null
		};
		var options = $.extend(defaults, options);
		// Helpers values
		var _$meta;
		var $page_container;
		return this.each(function() {
			$page_container = $(this);
			_$meta = $page_container;
			// Initialise meta data
			if (options.xml === null || options.xsl === null)
				return false;
			var _returned = '';
			_returned = _woh_xslt_result();
			// loop for damn IE bug
			while (_returned == '')
				continue;
			$page_container.html(_returned);
		});
		function _woh_xslt_load(file_name)
		{
			if (window.XMLHttpRequest) {
				var _xhttp = new XMLHttpRequest();
			} else {
				var _xhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			_xhttp.open("GET", arguments[0], false);
			_xhttp.send("");
			return _xhttp.responseXML;
		}
		;
		function _woh_xslt_result()
		{
			var _xml = _woh_xslt_load(options.xml);
			var _xsl = _woh_xslt_load(options.xsl);
			// code for Mozilla, Firefox, Opera, etc.
			if (document.implementation && document.implementation.createDocument)
			{
				var xsltProcessor = new XSLTProcessor();
				xsltProcessor.importStylesheet(_xsl);
				return xsltProcessor.transformToFragment(_xml, document);
			}
			// code for damn IE
			else if (window.ActiveXObject)
			{
				return _xml.transformNode(_xsl);
			}
		}
		;
	};
})(jQuery);