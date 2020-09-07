require(['gitbook', 'jQuery'], function (gitbook, $) {
    var versions = [],
        current = window.location.href,
        pluginConfig = {};

    // Update the select with a list of versions
    function updateVersions(_versions) {
        versions = _versions || versions;
        current = $('.versions-select select').val() || current;

        // Cleanup existing selector
        $('.versions-select').remove();

        if (versions.length == 0) return;

        var $li = $('<li>', {
            'class': 'versions-select',
            'html': '<div><select></select></div>'
        });
        var $select = $li.find('select');

        $.each(versions, function(i, version) {
            var $option = $('<option>', {
                'selected': current === version.value,
                'value': version.value,
                'text': version.text
            });

            $option.appendTo($select);
        });

        $select.change(function() {
            var filtered = $.grep(versions, function(v) {
                return v.value === $select.val();
            });
            // Get actual version Object from array
            var version = filtered[0];
            
            window.location.replace(version.value)
        });

        $li.prependTo('.book-summary ul.summary');
    }

    gitbook.events.bind('start', function (e, config) {
        pluginConfig = config.versions || {};
        if (pluginConfig.options) updateVersions(pluginConfig.options);
    });

    gitbook.events.bind('page.change', function () {
        updateVersions();
    });
});
