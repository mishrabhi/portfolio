exports.index = (req,res) => {
    res.render('index', {
        title: 'Abhishek - Portfolio',
        layout: 'layout'
    });
}

exports.projectList = (req, res) => {
    res.render('projects', {
        title: 'Projects',
        navProject: true,
        layout: 'layout'
    });
}

exports.blogs = (req,res) => {
    res.render('blogs', {
        title: 'Blogs',
        layout: 'layout',
        navBlogs: true
    });
}

exports.contact = (req,res) => {
    res.render('contact', {
        title: 'contact',
        layout: 'layout',
        mavContact: true
    });
}

exports.projectDetail = (req, res) => {
    res.render('projectDetail', {
        title: 'Project Detail',
        layout: 'layout'
    });
}

exports.blogDetail = (req, res) => {
    res.render('blogDetail', {
        title: 'blogDetail',
        layout: 'layout'
    });
}


exports.signIn = (req, res) => {
    res.render('signin', {
        title: 'signin',
        layout: 'loginLayout'
    });
}

exports.signUp = (req, res) => {
    res.render('signup', {
        title: 'Signup',
        layout: 'loginlayout'
    });
}