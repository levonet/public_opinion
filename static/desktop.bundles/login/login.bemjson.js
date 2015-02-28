({
    block: 'page',
    title: 'Login',
    head: [
        { elem: 'css', url: 'login.min.css' },
        { elem: 'js', url: 'login.min.js' },
        '<!--[if IE]>',
            { elem : 'css', url : 'login.min.ie.css' },
        '<![endif]-->'
    ],
    content: [
        { block: 'fb-like' }
    ]
})
