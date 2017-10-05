/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

/**
 * Module: TYPO3/CMS/Blog/SetupWizard
 */
define(['jquery', 'TYPO3/CMS/Backend/Modal', 'TYPO3/CMS/Backend/Severity'], function($, Modal, Severity) {
	'use strict';

	var SocialImageWizard = {
		triggerSelector: '.t3js-blog-social-image-wizard'
	};

	SocialImageWizard.initialize = function() {
		$(document).on('click', SocialImageWizard.triggerSelector, function(e) {
			e.preventDefault();
			var $element = $(this);
			var buttons = [
				{
					text: $element.data('button-close-text') || 'Close',
					active: true,
					btnClass: 'btn-default',
					trigger: function() {
						Modal.currentModal.trigger('modal-dismiss');
					}
				},
				{
					text: $element.data('button-ok-text') || 'OK',
					btnClass: 'btn-primary',
					trigger: function() {
						Modal.currentModal.trigger('modal-dismiss');
						self.location.href = $element.attr('href')
							.replace('%40title', Modal.currentModal.find('input[name="title"]').val())
							.replace('%40template', Modal.currentModal.find('input[name="template"]:checked').length)
							.replace('%40install', Modal.currentModal.find('input[name="install"]:checked').length);
					}
				}
			];
			Modal.loadUrl('Blog Social Image Wizard', Severity.notice, buttons, $element.data('wizardUrl'), function() {}, '');
		});
	};

	SocialImageWizard.initialize();
	return SocialImageWizard;
});