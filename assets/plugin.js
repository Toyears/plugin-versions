require(['gitbook', 'jQuery'], function (gitbook, $) {
    var versions = [],
        host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port,
        current_version = window.location.pathname.replace(/\//g, ''),
        pluginConfig = {};

    // Update the select with a list of versions
    function updateVersions(_versions) {
        versions = _versions || versions;
        current_version = $('.versions-select select').val() || current_version;
        // Cleanup existing selector
        $('.versions-select').remove();

        if (versions.length == 0) return;

        var $li = $('<li>', {
            'class': 'versions-select',
            'html': '<div><select></select></div>'
        });
        var $select = $li.find('select');

        $.each(versions, function(i, version) {
            var $option = $('<option>', version);
            $option.appendTo($select);
        });
        $select.find("option[value='"+current_version+"']").attr("selected", true)

        $select.change(function() {
            var filtered = $.grep(versions, function(v) {
                return v.value === $select.val();
            });
            // Get actual version Object from array
            var version = filtered[0];
            
            window.location.replace(host + '/' + version.value + '/')
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
