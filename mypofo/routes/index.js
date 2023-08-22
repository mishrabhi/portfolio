exports.index = (req,res) => {
    res.render('index', {
        title: 'Abhishek - Portfolio',
        layout: 'layout'
    });
}