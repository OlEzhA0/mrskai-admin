const { Router } = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { check, validationResult } = require('express-validator');

router.post(
  '/register',
  [
    check('login', 'Некорректный логин'),
    check('password', 'Минимум 6 символов').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.status(400).json({ message: "Некорректные данные при регистрации" })
      }

      const { login, password } = req.body;

      const candidate = await User.findOne({ name: login });

      if (candidate) {
        res.status(400).json({ message: "Такой пользователь уже сущесвтует" })
      }

      const hashedPass = await bcrypt.hash(password, 12);

      const user = new User({ name: login, password: hashedPass })

      await user.save();

      res.status(200).json({ message: 'Пользователь создан' })

    } catch (e) {
      console.log(e)
      console.log(e.message)
      res.status(500).json({ message: "Что-то пошло не так..." })
    }
  })

router.post(
  '/login'
  ,
  [
    check('login', 'введите корректный логин').isLength({ min: 3 }),
    check('login', 'введите корректный логин').exists()
  ]
  ,
  async (req, res) => {
    try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.status(400).json({ message: "Некорректные данные при регистрации" })
      }

      const { login, password } = req.body;
      const user = await User.findOne({ name: login });

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Неверный пароль" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      res.json({ token, userId: user.id })
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так..." })
    }
  })

module.exports = router;