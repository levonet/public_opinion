module.exports = function(config) {

    config.nodes('*.bundles/*', function(nodeConfig) {
        nodeConfig.addTechs([
            [ require('enb/techs/file-provider'), { target: '?.bemjson.js' } ],
            [ require('enb/techs/files') ],
            [ require('enb/techs/deps') ],
            [ require('enb/techs/bemdecl-from-bemjson') ],
            [ require('enb/techs/css-ie') ],
            [ require('enb-bemxjst/techs/bemtree-old') ],
            [ require('enb-diverse-js/techs/browser-js'), { target: '?.browser.js' } ],
            [ require('enb/techs/file-merge'), { target : '?.pre.js', sources : ['?.config.js', '?.browser.bemhtml.js', '?.browser.js'] } ],
            [ require('enb-modules/techs/prepend-modules'), { source : '?.pre.js', target : '?.js' } ],
            [ require('enb-stylus/techs/css-stylus'), { target: '?.noprefix.css' } ],
            [ require('enb-bemxjst/techs/bemhtml-old') ],
            [ require('enb-bemxjst/techs/html-from-bemjson') ]
        ]);

        // Client BEMHTML
        nodeConfig.addTechs([
            [ require('enb/techs/bemdecl-from-deps-by-tech'), {
                target : '?.js.bemhtml.bemdecl.js',
                sourceTech : 'js',
                destTech : 'bemhtml'
            }],
            [ require('enb/techs/bemdecl-merge'), {
                bemdeclSources : ['?.js.bemhtml.bemdecl.js', '?.bemdecl.js'],
                bemdeclTarget : '?.bemhtml.bemdecl.js'
            }],

            [ require('enb/techs/deps-old'), {
                depsTarget : '?.bemhtml.deps.js',
                bemdeclTarget : '?.bemhtml.bemdecl.js'
            }],
            [require('enb/techs/files'), {
                depsTarget : '?.bemhtml.deps.js',
                filesTarget : '?.bemhtml.files',
                dirsTarget : '?.bemhtml.dirs'
            }],

            [require('enb-bemxjst/techs/bemhtml-old'), {
                target : '?.browser.bemhtml.js',
                filesTarget : '?.bemhtml.files',
                devMode : false
            }]
        ]);

        nodeConfig.addTargets([
            '?.min.css',
            '?.min.ie.css',
            '?.min.js',
            '?.html'
        ]);
    });

    config.nodes('*desktop.bundles/*', function(nodeConfig) {
        nodeConfig.addTechs([
            [ require('enb/techs/levels'), { levels: getDesktops(config) } ],
            [ require('enb-autoprefixer/techs/css-autoprefixer'), {
                browserSupport: [ 'last 2 versions', 'ie 10', 'ff 24', 'opera 12.16' ],
                sourceTarget: '?.noprefix.css'
            }]
        ]);
    });

    config.nodes('*touch-pad.bundles/*', function(nodeConfig) {
        nodeConfig.addTechs([
            [ require('enb/techs/levels'), { levels: getTouchPads(config) } ],
            [ require('enb-autoprefixer/techs/css-autoprefixer'), {
                browserSupport: [ 'android 4', 'ios 5' ],
                sourceTarget: '?.noprefix.css'
            }]
        ]);
    });

    config.nodes('*touch-phone.bundles/*', function(nodeConfig) {
        nodeConfig.addTechs([
            [ require('enb/techs/levels'), { levels: getTouchPhones(config) } ],
            [ require('enb-autoprefixer/techs/css-autoprefixer'), {
                browserSupport: [ 'android 4', 'ios 6', 'ie 10' ],
                sourceTarget: '?.noprefix.css'
            }]
        ]);
    });

    config.mode('development', function(modeConfig) {
        config.nodes('*.bundles/*', function(nodeConfig) {
            nodeConfig.addTechs([
                [ require('enb/techs/js'), { sourceSuffixes: 'development.js', target: '?.config.js' } ],
                [ require('enb/techs/file-copy'), { sourceTarget: '?.css', destTarget: '?.min.css' } ],
                [ require('enb/techs/file-copy'), { sourceTarget: '?.ie.css', destTarget: '?.min.ie.css' } ],
                [ require('enb/techs/file-copy'), { sourceTarget: '?.js', destTarget: '?.min.js' } ]
            ]);
        });
    });

    config.mode('production', function(modeConfig) {
        config.nodes('*.bundles/*', function(nodeConfig) {
            nodeConfig.addTechs([
                [ require('enb/techs/js'), { sourceSuffixes: 'production.js', target: '?.config.js' } ],
                [ require('enb/techs/borschik'), { sourceTarget: '?.css', destTarget: '?.min.css' } ],
                [ require('enb/techs/borschik'), { sourceTarget: '?.ie.css', destTarget: '?.min.ie.css' } ],
                [ require('enb/techs/borschik'), { sourceTarget: '?.js', destTarget: '?.min.js' } ]
            ]);
        });
    });

};

function getDesktops(config) {
    return [
        { path: 'libs/bem-core/common.blocks', check: false },
        { path: 'libs/bem-core/desktop.blocks', check: false },
        { path: 'libs/bem-components/common.blocks', check: false },
        { path: 'libs/bem-components/design/common.blocks', check: false },
        { path: 'libs/bem-components/desktop.blocks', check: false },
        { path: 'libs/bem-components/design/desktop.blocks', check: false },
        'config.blocks',
        'common.blocks',
        'desktop.blocks'
    ].map(function(level) {
        return config.resolvePath(level);
    });
}

function getTouchPads(config) {
    return [
        { path: 'libs/bem-core/common.blocks', check: false },
        { path: 'libs/bem-core/touch.blocks', check: false },
        { path: 'libs/bem-components/common.blocks', check: false },
        { path: 'libs/bem-components/design/common.blocks', check: false },
        { path: 'libs/bem-components/touch.blocks', check: false },
        { path: 'libs/bem-components/design/touch.blocks', check: false },
        { path: 'libs/bem-components/design/touch-pad.blocks', check: false },
        'config.blocks',
        'common.blocks',
        'touch.blocks',
        'touch-pad.blocks'
    ].map(function(level) {
        return config.resolvePath(level);
    });
}

function getTouchPhones(config) {
    return [
        { path: 'libs/bem-core/common.blocks', check: false },
        { path: 'libs/bem-core/touch.blocks', check: false },
        { path: 'libs/bem-components/common.blocks', check: false },
        { path: 'libs/bem-components/design/common.blocks', check: false },
        { path: 'libs/bem-components/touch.blocks', check: false },
        { path: 'libs/bem-components/design/touch.blocks', check: false },
        { path: 'libs/bem-components/design/touch-phone.blocks', check: false },
        'config.blocks',
        'common.blocks',
        'touch.blocks',
        'touch-phone.blocks'
    ].map(function(level) {
        return config.resolvePath(level);
    });
}
