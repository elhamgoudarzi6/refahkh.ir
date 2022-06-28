const Controller = require(`${config.path.controller}/Controller`);
const AdminTransform = require(`${config.path.transform}/v1/AdminTransform`);
const bcrypt = require('bcrypt');
module.exports = new class AuthController extends Controller {


register(req, res) {
        req.checkBody('username', 'وارد کردن فیلد نام کاربری الزامیست').notEmpty();
        req.checkBody('password', 'وارد کردن فیلد رمز عبور الزامیست').notEmpty();
     
        if (this.showValidationErrors(req, res))
            return;
        this.model.Admin.findOne({username: req.body.username}, (err, Admin) => {
            if (err) throw err;
            if (Admin) {
                return res.json({
                    data: 'این نام کاربری قبلا ثبت شده است',
                    success: false
                });
            } else {
                this.model.Admin({
                    username: req.body.username,
                    password: req.body.password,
                    adminName: req.body.adminName,
                    image: req.body.image,
                }).save(err => {
                    if (err) {
                        throw err;
                    }
                    return res.json({
                        data: 'ادمین با موفقیت ثبت  شد',
                        success: true
                    });
                })
            }
        })
    }


    login(req , res) {
        req.checkBody('username' , 'وارد کردن فیلد نام کاربری الزامیست').notEmpty();
        req.checkBody('password' , 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Admin.findOne({ username : req.body.username } , (err , Admin) => {
                if(err) throw err;
            if(Admin == null)
                return res.status(422).json({
                    data : 'اطلاعات وارد شده صحیح نیست',
                    success : false
                });
            bcrypt.compare(req.body.password , Admin.password , (err , status) => {
                if(! status)
                    return res.status(422).json({
                        success : false,
                        data : 'پسورد وارد شده صحیح نمی باشد'
                    })
                return res.json({
                    data: new AdminTransform().transform(Admin, true),
                    success : true
                });
            })
        })

    }

    updateAdmin(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Admin.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            adminName: req.body.adminName,
            image: req.body.image,
        }, (err, Admin) => {
            if (err) throw err;
            if (Admin) {
                return res.json({
                    data: ' اطلاعات ادمین با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین ادمینی وجود ندارد',
                success: false
            });
        });
    }

}
