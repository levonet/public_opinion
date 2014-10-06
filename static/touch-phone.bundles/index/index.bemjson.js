({
    block: 'page',
    title: 'Hello, World!',
    head: [
        { elem: 'css', url: 'index.min.css' },
        { elem: 'js', url: 'index.min.js' },
        '<!--[if IE]>',
            { elem : 'css', url : 'index.min.ie.css' },
        '<![endif]-->'
    ],
    content: [
        'Hello, World!'
    ]
})
