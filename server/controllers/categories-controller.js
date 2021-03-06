'use strict';

module.exports = ({data}) => {
    return {
        loadCategories(req, res) {
            data.getAllCategories()
                .then((categories) => {
                    return res.status(200).render('categories/categories', { result: { categories, user: req.user } });
                })
                .catch(err => {
                    res.status(500).redirect('/500');
                });
        },
        getCategoryByTitle(req, res) {
            const link = req.params.link;
            data.getCategoryByLink(link)
                .then(category => {
                    category.competitions.forEach(x => x.category = category.title);
                    return res.status(200).render('categories/category', { result: { category, user: req.user } });
                })
                .catch(err => {
                    res.status(500).redirect('/500');
                })
        },
        getCreateCategory(req, res) {
            return res.status(200).render('categories/create-category', { result: { user: req.user } });
        },
        createCategory(req, res) {
            let body = req.body;
            data.createCategory({
                title: body.title,
                description: body.description,
                image: req.file ? req.file.filename : null,
                link: body.title.replace(' ', '-').toLowerCase()
            })
                .then(category => {
                    res.redirect(`/categories/${category.link}`);
                })
                .catch(err => {
                    res.status(500).redirect('/500');
                });
        }
    };
};