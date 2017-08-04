import express from 'express';
import passport from 'passport';

const router = express.Router();

//middleware to use for all requests
router.use((req, res, next) => {
    console.log('Auth is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// Нуобходима для обработки ошибок в асинхронных функциях .get(), .post(), .put(), .delete()
const asyncMiddleware = (fn) => {
    return (req, res, next) => {
        let ret = fn(req, res, next);

        if (ret && ret.catch && ret.then) {
            ret.catch(console.log);
        }
        return ret;
    }
}

const validateLoginForm = (payload) => {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.login !== 'string' || payload.login.trim().length === 0) {
        isFormValid = false;
        errors.login = 'Please provide your login.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

router.route('/login')

    .post((req, res) => {
        const validationResult = validateLoginForm(req.body);

        console.log(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            });
        }

        return passport.authenticate('local-login', (err, token, userData) => {
            if (err) {
                if (err.name === 'IncorrectCredentialsError') {
                    return res.status(400).json({
                        success: false,
                        message: err.message
                    });
                }

                return res.status(400).json({
                    success: false,
                    message: 'Could not process the form.'
                });
            }


            return res.json({
                success: true,
                message: 'You have successfully logged in!',
                token,
                user: userData
            });
        })(req, res);
    })

    export default router;